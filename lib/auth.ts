// import "server-only"; // Ensures this code only runs on the server [^3]
// import { JWTPayload, SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";
// import { cache } from "react";

// // Define the shape of your session payload
// export interface SessionPayload {
//   accessToken: string;
//   refreshToken: string;
//   expiresAt: Date;
// }

// const secretKey = process.env.SESSION_SECRET;
// if (!secretKey) {
//   throw new Error("SESSION_SECRET environment variable is not set.");
// }
// const encodedKey = new TextEncoder().encode(secretKey);

// /**
//  * Encrypts the session payload using JWT.
//  * @param payload The session data to encrypt.
//  * @returns A promise that resolves to the encrypted JWT string.
//  */
// export async function encrypt(payload: JWTPayload): Promise<string> {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d") // Session expires in 7 days, adjust as needed
//     .sign(encodedKey);
// }

// /**
//  * Decrypts the session JWT.
//  * @param session The JWT string to decrypt.
//  * @returns A promise that resolves to the decrypted payload or null if verification fails.
//  */
// export async function decrypt(
//   session: string = ""
// ): Promise<JWTPayload | null> {
//   try {
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ["HS256"],
//     });
//     return payload as JWTPayload;
//   } catch (error) {
//     console.error("Failed to verify session:", error);
//     return null;
//   }
// }

// /**
//  * Creates a new session by encrypting tokens and setting a cookie.
//  * @param accessToken The access token from your Django backend.
//  * @param refreshToken The refresh token from your Django backend.
//  * @param expiresIn The expiration time of the access token (in seconds) to calculate cookie expiry.
//  */
// export async function createSession(
//   accessToken: string,
//   refreshToken: string,
//   expiresIn: number
// ) {
//   const expiresAt = new Date(Date.now() + expiresIn * 1000); // Convert seconds to milliseconds
//   const session = await encrypt({ accessToken, refreshToken, expiresAt });
//   const cookieStore = await cookies();

//   cookieStore.set("session", session, {
//     httpOnly: true, // Prevents client-side JavaScript from accessing the cookie [^3]
//     secure: process.env.NODE_ENV === "production", // Use https in production [^3]
//     expires: expiresAt, // Cookie expires when the access token expires
//     sameSite: "lax", // Recommended for CSRF protection [^3]
//     path: "/", // Cookie is available across the entire site [^3]
//   });

//   return session;
// }

// /**
//  * Deletes the session cookie.
//  */
// export async function deleteSession() {
//   const cookieStore = await cookies();
//   cookieStore.delete("session");
// }

// /**
//  * Retrieves and decrypts the session from the cookie.
//  * @returns A promise that resolves to the session payload or null if no valid session exists.
//  */
// export const getSession = cache(async function (): Promise<JWTPayload | null> {
//   const cookieStore = await cookies();
//   const session = cookieStore.get("session")?.value;
//   if (!session) return null;
//   return decrypt(session);
// });

import { User } from "@/schemas/auth";
import { cookies } from "next/headers";

export interface SessionPayload {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user?: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class AuthError extends Error {
  constructor(message: string, public status = 401) {
    super(message);
    this.name = "AuthError";
  }
}

// Server-side session management
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}

export async function setSession(session: SessionPayload | null) {
  const cookieStore = await cookies();

  if (!session) {
    cookieStore.delete("session");
    return;
  }

  cookieStore.set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

// Refresh tokens and handle rotation
export async function refreshTokens(
  refreshToken: string
): Promise<SessionPayload | null> {
  try {
    const response = await fetch(`${BASE_URL}/account/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new AuthError("Failed to refresh token", response.status);
    }

    const data = await response.json();

    // Create new session with rotated tokens
    const newSession: SessionPayload = {
      accessToken: data.access,
      refreshToken: data.refresh || refreshToken, // Use new refresh token if provided
      expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
    };

    await setSession(newSession);
    return newSession;
  } catch (error) {
    console.error("Token refresh failed:", error);
    await setSession(null); // Clear invalid session
    return null;
  }
}

// Check if token needs refresh (refresh 5 minutes before expiry)
export function shouldRefreshToken(session: SessionPayload): boolean {
  const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
  return session.expiresAt < fiveMinutesFromNow;
}

// Get valid session with automatic refresh
export async function getValidSession(): Promise<SessionPayload | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  // Check if token needs refresh
  if (shouldRefreshToken(session)) {
    return await refreshTokens(session.refreshToken);
  }

  return session;
}

// Make authenticated API calls with automatic token refresh
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const session = await getValidSession();

  if (!session) {
    throw new AuthError("No valid session");
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  // If we get 401, try to refresh once more
  if (response.status === 401) {
    const refreshedSession = await refreshTokens(session.refreshToken);

    if (!refreshedSession) {
      throw new AuthError("Session expired");
    }

    // Retry with new token
    return fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${refreshedSession.accessToken}`,
      },
    });
  }

  return response;
}

// Get user profile with automatic token management
export async function getUserProfile(): Promise<User | null> {
  try {
    const response = await authenticatedFetch("/account/me/profile");

    if (!response.ok) {
      throw new AuthError("Failed to fetch user profile", response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

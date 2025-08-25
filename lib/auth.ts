import { User } from "@/schemas/auth";
import { cookies } from "next/headers";
import { logout } from "./actions";
import { redirect } from "next/navigation";

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

// Refresh tokens and handle rotation
export async function refreshTokens(): Promise<SessionPayload | null> {
  try {
    const session = await getSession();
    const response = await fetch("http://localhost:3000/api/auth/refresh", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ session }),
    });

    if (response.ok) {
      const data: SessionPayload = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

// Check if token needs refresh (refresh 5 minutes before expiry)
export function shouldRefreshToken(session: SessionPayload): boolean {
  const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000; // 5 minutes from now
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
    return await refreshTokens();
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
    const refreshedSession = await refreshTokens();
    console.log("refreshedSession");

    if (!refreshedSession) {
      await logout();
    }

    // Retry with new token
    return fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${refreshedSession?.accessToken}`,
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
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

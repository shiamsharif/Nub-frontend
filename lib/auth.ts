import "server-only"; // Ensures this code only runs on the server [^3]
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";

// Define the shape of your session payload
export interface SessionPayload {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is not set.");
}
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Encrypts the session payload using JWT.
 * @param payload The session data to encrypt.
 * @returns A promise that resolves to the encrypted JWT string.
 */
export async function encrypt(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Session expires in 7 days, adjust as needed
    .sign(encodedKey);
}

/**
 * Decrypts the session JWT.
 * @param session The JWT string to decrypt.
 * @returns A promise that resolves to the decrypted payload or null if verification fails.
 */
export async function decrypt(
  session: string = ""
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as JWTPayload;
  } catch (error) {
    console.error("Failed to verify session:", error);
    return null;
  }
}

/**
 * Creates a new session by encrypting tokens and setting a cookie.
 * @param accessToken The access token from your Django backend.
 * @param refreshToken The refresh token from your Django backend.
 * @param expiresIn The expiration time of the access token (in seconds) to calculate cookie expiry.
 */
export async function createSession(
  accessToken: string,
  refreshToken: string,
  expiresIn: number
) {
  const expiresAt = new Date(Date.now() + expiresIn * 1000); // Convert seconds to milliseconds
  const session = await encrypt({ accessToken, refreshToken, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie [^3]
    secure: process.env.NODE_ENV === "production", // Use https in production [^3]
    expires: expiresAt, // Cookie expires when the access token expires
    sameSite: "lax", // Recommended for CSRF protection [^3]
    path: "/", // Cookie is available across the entire site [^3]
  });

  return session;
}

/**
 * Deletes the session cookie.
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

/**
 * Retrieves and decrypts the session from the cookie.
 * @returns A promise that resolves to the session payload or null if no valid session exists.
 */
export const getSession = cache(async function (): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return decrypt(session);
});

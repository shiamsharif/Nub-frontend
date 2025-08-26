import { DefaultUser } from "next-auth";
import { type User as UserType } from "./schemas/auth";

// Define possible error types
export type NextAuthError =
  | "InvalidCredentialsError"
  | "RefreshAccessTokenError"
  | "NetworkError"
  | "TokenExpiredError"
  | "UnknownError";

// Interface for detailed error
export interface NextAuthErrorDetail {
  type: NextAuthError;
  message: string;
  statusCode?: number; // Optional status code if relevant
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: UserType;
  }
  interface User extends UserType {
    accessToken?: string;
    refreshToken?: string;
  }
  interface DefaultSession {
    accessToken?: string;
    refreshToken?: string;
    user: UserType;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: NextAuthError;
  }
}

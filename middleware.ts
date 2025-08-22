// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // List of protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/update-password"];

  // Check exact matches and dynamic dashboard/task/[id]
  const isProtected =
    protectedRoutes.includes(pathname) ||
    pathname.startsWith("/dashboard/task/");

  if (isProtected && !session) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname); // optional: to redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware only on these routes
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/task/:path*",
    "/profile",
    "/update-password",
  ],
};

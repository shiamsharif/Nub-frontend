// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  const isAuthenticated = !!request.auth;

  const { pathname } = request.nextUrl;

  console.log({ isAuthenticated });

  // List of protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/update-password"];

  // List of auth routes
  const authRoutes = [
    "/auth",
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/verify-email",
    "/auth/set-new-password",
  ];

  // Check exact matches and dynamic dashboard/task/[id]
  const isProtected =
    protectedRoutes.includes(pathname) ||
    pathname.startsWith("/dashboard/task/");

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname); // optional: to redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

// Apply middleware only on these routes
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/task/:path*",
    "/profile",
    "/update-password",
    "/auth",
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/verify-email",
    "/auth/set-new-password",
  ],
};

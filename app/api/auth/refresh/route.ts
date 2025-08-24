// // app/api/auth/refresh/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { SessionPayload } from "@/lib/auth";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { refreshToken } = body;

//     if (!refreshToken) {
//       return NextResponse.json(
//         { message: "Refresh token required" },
//         { status: 400 }
//       );
//     }

//     // Call Django backend to refresh tokens
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/account/token/refresh/`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ refresh: refreshToken }),
//       }
//     );

//     if (!response.ok) {
//       if (response.status === 401) {
//         // Refresh token is invalid/expired
//         const cookieStore = await cookies();
//         cookieStore.delete("session");

//         return NextResponse.json(
//           { message: "Refresh token expired" },
//           { status: 401 }
//         );
//       }

//       const errorData = await response.json();
//       return NextResponse.json(
//         { message: errorData.message || "Token refresh failed" },
//         { status: response.status }
//       );
//     }

//     const tokens = await response.json();

//     // Create new session with both tokens
//     const newSession: SessionPayload = {
//       accessToken: tokens.access,
//       refreshToken: refreshToken, // Use new refresh token if provided
//       expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
//     };

//     // Set secure cookie with new session
//     const cookieStore = await cookies();
//     cookieStore.set("session", JSON.stringify(newSession), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60, // 7 days
//       path: "/",
//     });

//     return NextResponse.json(newSession);
//   } catch (error) {
//     console.error("Token refresh error:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { type NextRequest, NextResponse } from "next/server";
import { refreshTokens, getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.refreshToken) {
      return NextResponse.json(
        { message: "No refresh token available" },
        { status: 401 }
      );
    }

    const newSession = await refreshTokens(session.refreshToken);

    if (!newSession) {
      return NextResponse.json(
        { message: "Failed to refresh token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      accessToken: newSession.accessToken,
      refreshToken: newSession.refreshToken,
      expiresAt: newSession.expiresAt,
    });
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
  }
}

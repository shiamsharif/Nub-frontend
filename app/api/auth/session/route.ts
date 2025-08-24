// import { NextResponse } from "next/server";
// import { createSession, getSession } from "@/lib/auth";

// /**
//  * GET /api/auth/session
//  * Returns the current session payload if authenticated.
//  */
// export async function GET() {
//   try {
//     const session = await getSession();
//     if (!session) {
//       return NextResponse.json(
//         { message: "Not authenticated" },
//         { status: 401 }
//       );
//     }
//     // Do not send sensitive data like raw tokens directly to the client if not needed.
//     // For this example, we'll send them, but in a real app, you might filter this.
//     return NextResponse.json(session, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching session:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * POST /api/auth/session
//  * Creates a new session with access and refresh tokens.
//  * This is typically called after a successful login.
//  */
// export async function POST(request: Request) {
//   try {
//     const { accessToken, refreshToken } = await request.json();
//     if (!accessToken || !refreshToken) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const expiresIn = 7 * 24 * 60 * 60; // 7 days in seconds

//     // Create a new session
//     await createSession(accessToken, refreshToken, expiresIn);
//     return NextResponse.json(
//       { message: "Session created successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating session:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { type NextRequest, NextResponse } from "next/server";
import { getValidSession, getUserProfile } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getValidSession();

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get fresh user data
    const user = await getUserProfile();

    return NextResponse.json({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
      user,
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ message: "Session error" }, { status: 401 });
  }
}

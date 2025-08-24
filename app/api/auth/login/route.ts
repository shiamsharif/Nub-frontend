// import { NextResponse } from "next/server";
// import { createSession } from "@/lib/auth";

// export async function POST(request: Request) {
//   try {
//     const { accessToken, refreshToken, expiresIn } = await request.json();

//     if (!accessToken || !refreshToken || typeof expiresIn !== "number") {
//       return NextResponse.json(
//         { message: "Missing tokens or expiry" },
//         { status: 400 }
//       );
//     }

//     // Create the session cookie with the received tokens
//     await createSession(accessToken, refreshToken, expiresIn);

//     const payload = {
//       accessToken,
//       refreshToken,
//       expiresIn,
//     };

//     return NextResponse.json(
//       { message: "Login successful", payload },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Login API error:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { type NextRequest, NextResponse } from "next/server";
import { setSession, type SessionPayload } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Authenticate with Django backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/account/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || "Login failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Create session with tokens
    const session: SessionPayload = {
      accessToken: data.access,
      refreshToken: data.refresh,
      expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
      user: data.user,
    };

    await setSession(session);

    return NextResponse.json({
      message: "Login successful",
      user: data.user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

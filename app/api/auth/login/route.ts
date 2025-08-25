import { setSession } from "@/lib/actions";
import { type SessionPayload } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";

async function getUser(accessToken: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/account/me/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}

// POST /api/auth/login
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
    const user = await getUser(data.access);

    // Create session with tokens
    const session: SessionPayload = {
      accessToken: data.access,
      refreshToken: data.refresh,
      expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
      user: user,
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

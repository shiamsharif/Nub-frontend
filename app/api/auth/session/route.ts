import { type NextRequest, NextResponse } from "next/server";
import { getValidSession, getUserProfile } from "@/lib/auth";
import { cookies } from "next/headers";

// GET /api/auth/session
export async function GET(request: NextRequest) {
  try {
    const session = await getValidSession();

    if (!session) {
      return NextResponse.json(null);
    }

    // Get fresh user data
    const user = await getUserProfile();

    const payload = {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
      user,
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(null);
  }
}

// POST /api/auth/session
export async function POST(request: Request) {
  try {
    const { session } = await request.json();
    const cookieStore = await cookies();

    if (!session) {
      console.log("Deleting session");
      cookieStore.delete("session");
      return NextResponse.json(
        { message: "Session deleted successfully" },
        { status: 200 }
      );
    }

    cookieStore.set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    console.log("Creating session:", session);
    return NextResponse.json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

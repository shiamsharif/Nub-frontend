import { type NextRequest, NextResponse } from "next/server";
import { setSession } from "@/lib/actions";

// POST /api/auth/refresh
export async function POST(request: NextRequest) {
  try {
    const { session } = await request.json();

    if (!session?.refreshToken) {
      return NextResponse.json(
        { message: "No refresh token available" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/account/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: session.refreshToken }),
      }
    );

    const newSession = await response.json();

    if (!newSession) {
      return NextResponse.json(null);
    }

    const payload = {
      ...session,
      accessToken: newSession.access,
    };
    await setSession(payload);

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Refresh error:", error);
    await setSession(null);
    return NextResponse.json(null);
  }
}

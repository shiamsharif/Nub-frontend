import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { accessToken, refreshToken, expiresIn } = await request.json();

    if (!accessToken || !refreshToken || typeof expiresIn !== "number") {
      return NextResponse.json(
        { message: "Missing tokens or expiry" },
        { status: 400 }
      );
    }

    // Create the session cookie with the received tokens
    await createSession(accessToken, refreshToken, expiresIn);

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

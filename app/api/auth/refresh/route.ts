import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/account/token/refresh/`;
    const { accessToken, refreshToken, expiresIn } = await request.json();

    if (!accessToken || !refreshToken || typeof expiresIn !== "number") {
      return NextResponse.json(
        { message: "Missing tokens or expiry" },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to refresh token" },
        { status: 400 }
      );
    }

    const newAccessToken = await response.json();

    // Create the session cookie with the received tokens
    await createSession(newAccessToken, refreshToken, expiresIn);

    const payload = {
      accessToken: newAccessToken,
      refreshToken,
      expiresIn,
    };

    return NextResponse.json(
      { message: "Login successful", payload },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

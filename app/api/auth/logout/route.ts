import { setSession } from "@/lib/actions";
import { type NextRequest, NextResponse } from "next/server";

// POST /api/auth/logout
export async function POST(request: NextRequest) {
  try {
    console.log("Logging out");
    await setSession(null);
    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    await setSession(null);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

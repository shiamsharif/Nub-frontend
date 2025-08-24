// import { NextResponse } from "next/server";
// import { deleteSession } from "@/lib/auth";

// export async function POST() {
//   try {
//     await deleteSession();
//     return NextResponse.json({ message: "Logout successful" }, { status: 200 });
//   } catch (error) {
//     console.error("Logout API error:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { type NextRequest, NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Clear the session
    await setSession(null);

    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

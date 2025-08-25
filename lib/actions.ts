"use server";

import { cookies } from "next/headers";
import { SessionPayload } from "./auth";

export async function setSession(session: SessionPayload | null) {
  const cookieStore = await cookies();

  if (!session) {
    cookieStore.delete("session");
    return;
  }

  cookieStore.set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function logout() {
  console.log("client logout");
  await fetch("http://localhost:3000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

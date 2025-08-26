"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../ui/spinner";
import { useSession } from "next-auth/react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession(); // assuming your context exposes these
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.replace("/auth/login");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <Spinner />;
  }

  return <>{children}</>;
}

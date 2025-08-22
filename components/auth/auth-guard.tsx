"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import Spinner from "../ui/spinner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useAuth(); // assuming your context exposes these
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/auth/login");
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return <Spinner />;
  }

  return <>{children}</>;
}

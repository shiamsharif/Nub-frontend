"use client";

import { useState, useEffect, useCallback } from "react";
import type { SessionPayload } from "@/lib/auth"; // Import the type

interface UseSessionResult {
  session: SessionPayload | null;
  isLoading: boolean;
  error: string | null;
  refreshSession: () => Promise<void>;
}

export function useSession(): UseSessionResult {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data: SessionPayload = await response.json();
        setSession(data);
      } else if (response.status === 401) {
        setSession(null); // Not authenticated
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch session");
        setSession(null);
      }
    } catch (err) {
      console.error("Error fetching session:", err);
      setError("Network error or server unreachable");
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return { session, isLoading, error, refreshSession: fetchSession };
}

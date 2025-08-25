"use client";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { type SessionPayload } from "@/lib/auth";
import { toast } from "sonner";

type AuthContextType = {
  session: SessionPayload | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refetchSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
      });

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
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        if (response.ok) {
          await fetchSession(); // Refresh session after login
          toast.success("Login successful!");
          return true;
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Login failed");
          toast.error(errorData.message || "Login failed");
          return false;
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Network error or server unreachable");
        toast.error("Network error or server unreachable");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchSession]
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setSession(null);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Error logging out:", err);
      // Still clear session on client side even if server call fails
      setSession(null);
    }
  }, []);

  const refetchSession = useCallback(async () => {
    await fetchSession();
  }, [fetchSession]);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        error,
        login,
        logout,
        refetchSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

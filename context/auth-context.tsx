"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SessionPayload } from "@/lib/auth";

type AuthContextType = {
  session: SessionPayload | null;
  isLoading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  refreshToken: () => Promise<SessionPayload | null>;
  setSession: (session: SessionPayload | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [user, setUser] = useState<any>(null);
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

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setSession(null);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh");
      if (response.ok) {
        const data: SessionPayload = await response.json();
        setSession(data);
        return data;
      } else if (response.status === 401) {
        setSession(null); // Not authenticated
        await logout();
        return null;
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to refresh token");
        setSession(null);
        await logout();
        return null;
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
      setError("Network error or server unreachable");
      setSession(null);
      await logout();
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        error,
        refreshToken,
        logout,
        setSession,
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

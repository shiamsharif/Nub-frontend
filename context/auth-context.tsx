// src/context/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  refreshAuthToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const cookies = useCookies();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    // Initialize from cookies on mount
    const tokenFromCookie = cookies.get("authToken");
    const refreshTokenFromCookie = cookies.get("refreshToken");

    if (tokenFromCookie) setToken(tokenFromCookie);
    if (refreshTokenFromCookie) setRefreshToken(refreshTokenFromCookie);

    setLoading(false);
  }, []);

  const login = (newToken: string, newRefreshToken: string) => {
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    cookies.set("authToken", newToken, { path: "/" });
    cookies.set("refreshToken", newRefreshToken, { path: "/" });
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    cookies.remove("authToken");
    cookies.remove("refreshToken");
    router.push("/login");
  };

  const refreshAuthToken = async (): Promise<string | null> => {
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      login(data.token, data.refreshToken);
      return data.token;
    } catch (error) {
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        refreshToken,
        login,
        logout,
        refreshAuthToken,
        loading,
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

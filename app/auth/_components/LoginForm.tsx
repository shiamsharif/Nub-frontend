"use client";
import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginSchema, LoginSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useApi from "@/hooks/use-api";
import { InputBox } from "@/components/ui/input-box";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { SessionPayload } from "@/lib/auth";

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setSession } = useAuth();
  const { mutate: login, isLoading } = useApi("/account/login/", {
    method: "POST",
  });
  const router = useRouter();

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const loginResponse = (await login(data)) as
        | { access: string; refresh: string }
        | undefined;
      if (loginResponse) {
        const payload = {
          accessToken: loginResponse.access,
          refreshToken: loginResponse.refresh,
          expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
        };
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create session");
        } else {
          const result = await response.json();
          toast(result?.message || "Login successful", {
            icon: "✅",
            duration: 3000,
          });
          // console.log("Session From Login:", result);
          setSession(result?.payload as SessionPayload);
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast("Failed to login", {
        icon: "❌",
        duration: 3000,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <InputBox
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...field}
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <InputBox
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...field}
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="mt-4 text-center space-y-2">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot your password?
        </Link>
        <div className="text-sm text-gray-600 dark:text-gray-100">
          {"Don't have an account? "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

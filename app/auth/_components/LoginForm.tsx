"use client";
import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginSchema, LoginSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { InputBox } from "@/components/ui/input-box";
import { toast } from "sonner";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [loginLoading, setLoginLoading] = useState(false);
  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginSchemaType) => {
    setLoginLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });

      console.log(res);
    } catch (error) {
      console.error("Login error:", error);
      toast("Failed to login", {
        icon: "❌",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setLoginLoading(false);
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
        <Button type="submit" className="w-full" disabled={loginLoading}>
          {loginLoading ? "Signing in..." : "Sign in"}
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

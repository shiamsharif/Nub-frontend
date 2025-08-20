"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import useApi from "@/hooks/use-api";
import { Controller, useForm } from "react-hook-form";
import { InputBox } from "@/components/ui/input-box";

export function ForgotPasswordForm() {
  const { control, handleSubmit } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPassword, isLoading } = useApi(
    "/account/forget-password/",
    {
      method: "POST",
      requireAuth: true,
    }
  );

  const [sent, setSent] = useState(false);
  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    const response = await forgotPassword(data);
    if (response) {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md bg-zinc-50 dark:bg-zinc-800">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
            </div>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset link to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Link
                href="/auth/auth/login"
                className="text-blue-600 hover:underline"
              >
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send reset link"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link
          href="/auth/login"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

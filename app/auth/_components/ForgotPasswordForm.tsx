"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import useApi from "@/hooks/use-api";
import { Controller, useForm } from "react-hook-form";
import { InputBox } from "@/components/ui/input-box";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPassword, isLoading } = useApi("/account/send-otp/", {
    method: "POST",
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    const response = await forgotPassword(data);
    if (response) {
      router.push("/auth/set-new-password");
      localStorage.setItem("email", data.email);
      toast("Email sent successfully", {
        icon: "✅",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
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

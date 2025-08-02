"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBox } from "@/components/ui/input-box";
import useApi from "@/hooks/use-api";

export function RegisterForm() {
  const { control, handleSubmit } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const { mutate: register, isLoading } = useApi(
    "/account/signup/university/",
    {
      method: "POST",
    }
  );
  const router = useRouter();

  const onSubmit = async (data: RegisterSchemaType) => {
    const response = await register(data);
    console.log(response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState }) => (
              <InputBox
                label="Username"
                placeholder="Enter your username"
                {...field}
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="applied_for"
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="applied_for">Applied For</Label>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select applied for" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="ItStaff">IT Staff</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="text-red-500">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>

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
          name="phone_number"
          render={({ field, fieldState }) => (
            <InputBox
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
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
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600 dark:text-gray-100">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

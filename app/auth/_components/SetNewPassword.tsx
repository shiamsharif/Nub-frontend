"use client";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { setNewPasswordSchema, SetNewPasswordSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBox } from "@/components/ui/input-box";
import useApi from "@/hooks/use-api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

export default function SetNewPassword() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SetNewPasswordSchemaType>({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const { mutate: setNewPassword, isLoading } = useApi(
    "/account/forgot-password/",
    {
      method: "POST",
    }
  );

  const onSubmit = async (data: SetNewPasswordSchemaType) => {
    const payload: Record<string, string> = {
      ...data,
      new_password: data.password,
      confirm_new_password: data.confirm_password,
    };
    const email = localStorage.getItem("email");
    if (!email) {
      toast("Email not found", {
        icon: "❌",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }
    if (email) {
      payload.email = email;
    }

    const response = await setNewPassword(payload);
    if (response) {
      toast("Password changed successfully", {
        icon: "✅",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
      router.push("/auth/login");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          control={control}
          name="otp"
          render={({ field, fieldState }) => (
            <div className="w-full space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Otp
                <span className="text-red-500 ml-1">*</span>
              </label>

              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.error && (
                <span className="text-sm text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
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

        <Controller
          control={control}
          name="confirm_password"
          render={({ field, fieldState }) => (
            <InputBox
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              {...field}
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
}

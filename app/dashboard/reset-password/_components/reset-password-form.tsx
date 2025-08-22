"use client";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBox } from "@/components/ui/input-box";
import useApi from "@/hooks/use-api";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const { control, handleSubmit, reset } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const { mutate: resetPassword, isLoading } = useApi(
    "/account/password-reset/",
    {
      method: "POST",
      requireAuth: true,
    }
  );

  const onSubmit = async (payload: ResetPasswordSchemaType) => {
    const response = await resetPassword(payload);
    if (response) {
      reset();
      toast("Password reset successfully", {
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
          name="old_password"
          render={({ field, fieldState }) => (
            <InputBox
              label="Old Password"
              type="password"
              placeholder="Enter your old password"
              {...field}
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="new_password"
          render={({ field, fieldState }) => (
            <InputBox
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              {...field}
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirm_new_password"
          render={({ field, fieldState }) => (
            <InputBox
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your new password"
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

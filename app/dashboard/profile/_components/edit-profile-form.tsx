"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useApi from "@/hooks/use-api";
import { userProfileRevalidate } from "@/lib/tag-invalidate";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBox } from "@/components/ui/input-box";
import { useCallback, useState } from "react";
import { User, userProfileSchema, UserProfileSchemaType } from "@/schemas/auth";
import { Edit3 } from "lucide-react";

type EditTaskModalProps = {
  user: User | null;
};

export default function EditProfileForm({ user }: EditTaskModalProps) {
  if (!user) {
    return null;
  }
  const [open, onOpenChange] = useState<boolean>(false);
  const { control, handleSubmit, watch } = useForm<UserProfileSchemaType>({
    resolver: zodResolver(userProfileSchema),
    mode: "onChange",
    values: {
      username: user.username,
      phone_number: user.phone_number,
      university_id: user.university_id,
    },
  });

  const { mutate: updateProfile, isLoading } = useApi(`/account/me/profile/`, {
    method: "PUT",
    requireAuth: true,
  });

  const isChanged = useCallback(() => {
    return (
      user.username !== watch("username") ||
      user.phone_number !== watch("phone_number") ||
      user.university_id !== watch("university_id")
    );
  }, []);

  const onSubmit = async (payload: UserProfileSchemaType) => {
    const response = await updateProfile(payload);
    if (response) {
      onOpenChange(false);
      userProfileRevalidate();
      toast("Profile updated successfully!", {
        icon: "✅",
        description: "Your profile has been updated.",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors border border-white border-opacity-30">
          <Edit3 size={16} />
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task and save them.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Controller
              control={control}
              name="username"
              render={({ field, fieldState }) => (
                <InputBox
                  label="Username"
                  {...field}
                  placeholder="Enter your username"
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
                  {...field}
                  placeholder="Enter your phone number"
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="university_id"
              render={({ field, fieldState }) => (
                <InputBox
                  label="University ID"
                  {...field}
                  placeholder="Enter your university ID"
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading || !isChanged()} type="submit">
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

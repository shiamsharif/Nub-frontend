"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/use-api";
import { taskViewRevalidate } from "@/lib/tag-invalidate";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function MarkAsResolved({ taskId }: { taskId: number }) {
  if (!taskId) {
    return null;
  }
  const [open, onOpenChange] = useState<boolean>(false);
  const { mutate: markAsResolved, isLoading } = useApi(
    `/task/resolve/${taskId}/`,
    {
      method: "PUT",
      requireAuth: true,
    }
  );

  const onMarkAsResolved = async () => {
    const response = await markAsResolved({ status: "resolved" });
    taskViewRevalidate();
    if (response) {
      toast("Task resolved successfully!", {
        icon: "✅",
        description: "Your task has been resolved.",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark Resolved
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently resolved your
            task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => onMarkAsResolved()}
          >
            {isLoading ? "Resolving..." : "Resolve"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
} from "@/components/ui/alert-dialog";
import useApi from "@/hooks/use-api";
import {
  taskDetailsRevalidate,
  taskViewRevalidate,
} from "@/lib/tag-invalidate";
import { OpenStateType } from "@/schemas/task";
import React from "react";
import { toast } from "sonner";

type DeleteTaskModalProps = {
  open: boolean;
  onOpenChange: (openState: OpenStateType | null) => void;
  taskId: number | null | undefined;
  setTask: (task: null) => void;
};

export default function DeleteTaskModal({
  open,
  onOpenChange,
  taskId,
  setTask,
}: DeleteTaskModalProps) {
  if (!taskId) {
    return null;
  }

  const { mutate: deleteTask, isLoading } = useApi(`/task/delete/${taskId}/`, {
    method: "DELETE",
    requireAuth: true,
  });

  const onDeleteTask = async () => {
    const response = await deleteTask();
    taskViewRevalidate();
    if (response) {
      setTask(null);
      onOpenChange(null);

      toast("Task deleted successfully!", {
        icon: "✅",
        description: "Your task has been deleted.",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTask(null);
          onOpenChange(null);
        } else {
          onOpenChange("delete");
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => onDeleteTask()}
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

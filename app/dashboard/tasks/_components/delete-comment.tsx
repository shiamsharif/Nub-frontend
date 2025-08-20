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
import React from "react";

type DeleteCommentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: number | null;
  setTaskId: (taskId: number | null) => void;
};

export default function DeleteCommentModal({
  open,
  onOpenChange,
  taskId,
  setTaskId,
}: DeleteCommentModalProps) {
  if (!taskId) {
    return null;
  }

  const { mutate: deleteComment, isLoading } = useApi(
    `/task/comments/${taskId}/`,
    {
      method: "DELETE",
      requireAuth: true,
    }
  );

  const onDeleteComment = async () => {
    await deleteComment();
    setTaskId(null);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => onDeleteComment()}
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

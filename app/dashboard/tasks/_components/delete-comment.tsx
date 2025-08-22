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
import { taskDetailsRevalidate } from "@/lib/tag-invalidate";
import { OpenStateType } from "@/schemas/task";
import React from "react";
import { toast } from "sonner";

type DeleteCommentModalProps = {
  open: boolean;
  onOpenChange: (openState: OpenStateType | null) => void;
  taskId: number;
  commentId: number | null | undefined;
  setComment: (comment: null) => void;
};

export default function DeleteCommentModal({
  open,
  onOpenChange,
  taskId,
  commentId,
  setComment,
}: DeleteCommentModalProps) {
  if (!commentId) {
    return null;
  }

  const { mutate: deleteComment, isLoading } = useApi(
    `/task/comments/${commentId}/`,
    {
      method: "DELETE",
      requireAuth: true,
    }
  );

  const onDeleteComment = async () => {
    const response = await deleteComment();
    taskDetailsRevalidate(taskId);
    if (response) {
      setComment(null);
      onOpenChange(null);

      toast("Comment deleted successfully!", {
        icon: "✅",
        description: "Your comment has been deleted.",
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
          setComment(null);
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

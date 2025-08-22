"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TextAreaBox } from "@/components/ui/textarea-box";
import useApi from "@/hooks/use-api";
import { taskDetailsRevalidate } from "@/lib/tag-invalidate";
import { Comment, OpenStateType } from "@/schemas/task";
import { useState } from "react";
import { toast } from "sonner";

type EditCommentProps = {
  taskId: number;
  comment: Comment | null;
  setComment: (comment: null) => void;
  open: boolean;
  onOpenChange: (openState: OpenStateType | null) => void;
};

export default function EditComment({
  taskId,
  comment,
  open,
  onOpenChange,
  setComment,
}: EditCommentProps) {
  if (!comment) {
    return null;
  }

  const [commentBody, setCommentBody] = useState(comment.body);

  const { mutate: updateComment, isLoading } = useApi(
    `/task/comments/${comment.id}/`,
    {
      method: "PATCH",
      body: {
        body: commentBody,
      },
      requireAuth: true,
    }
  );

  const isCommentChanged = comment.body !== commentBody;
  const isEmptyComment = commentBody.trim() === "";

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCommentChanged) {
      toast("Comment is not changed", {
        icon: "❌",
        description: "Your comment is not changed.",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }

    if (isEmptyComment) {
      toast("Comment is empty", {
        icon: "❌",
        description: "Your comment is empty.",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }

    const response = await updateComment();
    if (response) {
      onOpenChange(null);
      taskDetailsRevalidate(taskId);
      toast("Comment updated successfully!", {
        icon: "✅",
        description: "Your comment has been updated.",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <Dialog
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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleUpdateComment}>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>
              Make changes to your comment and save them.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <TextAreaBox
              required
              label="Comment"
              placeholder="Write your comment here..."
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={!isCommentChanged || isLoading || isEmptyComment}
              type="submit"
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

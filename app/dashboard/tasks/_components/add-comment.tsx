import useApi from "@/hooks/use-api";
import { Send } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AddComment({ taskId }: { taskId: number }) {
  const [newComment, setNewComment] = useState("");

  const { mutate: onAddComment, isLoading } = useApi(
    `/task/comments/${taskId}/`,
    {
      method: "POST",
      requireAuth: true,
    }
  );

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isLoading) return;

    const response = await onAddComment({ body: newComment.trim() });
    if (response) {
      toast("Comment added successfully!", {
        icon: "✅",
        description: "Your comment has been posted.",
        duration: 3000,
      });
      setNewComment("");
    }
  };

  return (
    <form onSubmit={handleSubmitComment} className="mb-8">
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
        >
          Add a comment
        </label>
        <textarea
          id="comment"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share updates, ask questions, or provide additional information..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={!newComment.trim() || isLoading}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Send size={14} />
        {isLoading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}

import { Comment } from "@/schemas/task";
import { User } from "lucide-react";

export const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={14} className="text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900 text-sm">
              {comment.username}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(comment.created)}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {comment.body}
          </p>
        </div>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Comment, OpenStateType } from "@/schemas/task";
import { EllipsisVertical, SquarePen, Trash2, User } from "lucide-react";

type CommentCardProps = {
  comment: Comment;
  onOpenStateChange: (openState: OpenStateType) => void;
  setComment: (comment: Comment | null) => void;
};

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onOpenStateChange,
  setComment,
}) => {
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
    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={14} className="text-blue-600 dark:text-blue-50" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900 dark:text-gray-50 text-sm">
              {comment.username}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-200">
              {formatDate(comment.created)}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {comment.body}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setComment(comment);
                onOpenStateChange("edit");
              }}
            >
              <SquarePen className="mr-2 stroke-blue-500" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setComment(comment);
                onOpenStateChange("delete");
              }}
            >
              <Trash2 className="mr-2 stroke-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

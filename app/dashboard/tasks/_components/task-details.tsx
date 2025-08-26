"use client";
import {
  Calendar,
  Monitor,
  HardDrive,
  Zap,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { Comment, OpenStateType, Task } from "@/schemas/task";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CommentCard } from "./comment-card";
import AddComment from "./add-comment";
import DeleteCommentModal from "./delete-comment";
import EditComment from "./edit-comment";
import MarkAsResolved from "../../_components/mark-as-resolved";
import { User } from "@/schemas/auth";
import { useAuth } from "@/context/auth-context";

interface TaskDetailsProps {
  task: Task;
}

const StatusBadge: React.FC<{ status: Task["status"] }> = ({ status }) => {
  const statusConfig: Record<Task["status"], { color: string; icon: any }> = {
    pending: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: Clock,
    },
    in_progress: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: AlertCircle,
    },
    resolved: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}
    >
      <Icon size={14} />
      {status.replace("-", " ")}
    </span>
  );
};

const IssueTypeBadge: React.FC<{ type: Task["issues_type"] }> = ({ type }) => {
  const config = {
    hardware: {
      color: "bg-red-50 text-red-700 border-red-200",
      icon: HardDrive,
    },
    software: {
      color: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Monitor,
    },
  };

  const typeConfig = config[type];
  const Icon = typeConfig?.icon ?? Monitor;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${
        typeConfig?.color ?? "bg-purple-50 text-purple-700 border-purple-200"
      }`}
    >
      <Icon size={14} />
      {type}
    </span>
  );
};

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  const [openState, setOpenState] = useState<OpenStateType | null>(null);
  const [comment, setComment] = useState<Comment | null>(null);
  const router = useRouter();
  const { session, logout } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isAdmin =
    session?.user?.user_type === "Teacher" ||
    session?.user?.user_type === "ItStaff";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant={"ghost"}
            className="inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Tasks
          </Button>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                  {task.task_name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <StatusBadge status={task.status} />
                  <IssueTypeBadge type={task.issues_type} />
                </div>
              </div>
              {isAdmin && task.status !== "resolved" && (
                <MarkAsResolved taskId={task.id} />
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {task.description}
              </p>
            </div>

            {/* Equipment Details */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Equipment Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <Monitor
                      size={18}
                      className="text-gray-600 dark:text-gray-100"
                    />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Monitor
                    </span>
                  </div>
                  <span className="font-mono text-sm bg-zinc-50 dark:bg-zinc-700 px-3 py-1 rounded border">
                    {task.monitor_id}
                  </span>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <HardDrive
                      size={18}
                      className="text-gray-600 dark:text-gray-100"
                    />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Computer
                    </span>
                  </div>
                  <span className="font-mono text-sm bg-zinc-50 dark:bg-zinc-700 px-3 py-1 rounded border">
                    {task.computer_id}
                  </span>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap
                      size={18}
                      className="text-gray-600 dark:text-gray-100"
                    />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      UPS
                    </span>
                  </div>
                  <span className="font-mono text-sm bg-zinc-50 dark:bg-zinc-700 px-3 py-1 rounded border">
                    {task.ups_id}
                  </span>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin
                      size={18}
                      className="text-gray-600 dark:text-gray-100"
                    />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Location
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    Room: {task.room_number}
                  </span>
                </div>
              </div>
            </div>

            {/* Task Information */}
            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-100">
                  Created
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar
                    size={14}
                    className="text-gray-400 dark:text-gray-50"
                  />
                  <time className="text-sm text-gray-900 dark:text-gray-200">
                    {formatDate(task.created_at)}
                  </time>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-100">
                  Last Updated
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar
                    size={14}
                    className="text-gray-400 dark:text-gray-50"
                  />
                  <time className="text-sm text-gray-900 dark:text-gray-200">
                    {formatDate(task.updated_at)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare
              size={20}
              className="text-gray-600 dark:text-gray-100"
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Comments ({task.comments.length})
            </h2>
          </div>

          {/* Add Comment Form */}
          {task?.status !== "resolved" && <AddComment taskId={task.id} />}

          {/* Comments List */}
          <div className="space-y-4">
            {task.comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare
                  size={48}
                  className="text-gray-300 dark:text-gray-200 mx-auto mb-4"
                />
                <p className="text-gray-500 dark:text-gray-100">
                  No comments found!
                </p>
              </div>
            ) : (
              task.comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onOpenStateChange={setOpenState}
                  setComment={setComment}
                  task={task}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <EditComment
        key={`edit-comment-${comment?.id}`}
        open={openState === "edit"}
        onOpenChange={setOpenState}
        taskId={task.id}
        comment={comment}
        setComment={setComment}
      />

      <DeleteCommentModal
        key={`delete-comment-${comment?.id}`}
        open={openState === "delete"}
        onOpenChange={setOpenState}
        taskId={task.id}
        commentId={comment?.id}
        setComment={setComment}
      />
    </div>
  );
};

export default TaskDetails;

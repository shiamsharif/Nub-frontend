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
  Eye,
} from "lucide-react";
import { Task } from "@/schemas/task";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StatusBadge: React.FC<{ status: Task["status"] }> = ({ status }) => {
  const statusConfig: Record<
    NonNullable<Task["status"]>,
    { color: string; icon: React.ElementType }
  > = {
    pending: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: Clock,
    },
    "in-progress": {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: AlertCircle,
    },
    resolved: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config ? config.icon : null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      {Icon && <Icon size={12} />}
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
  const Icon = typeConfig ? typeConfig.icon : Monitor;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
        typeConfig?.color ?? "bg-purple-50 text-purple-700 border-purple-200"
      }`}
    >
      {Icon && <Icon size={12} />}
      {type}
    </span>
  );
};

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
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
    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-sm border border-border p-6 hover:shadow-md hover:border-zinc-600  transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-1">
            {task.task_name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <StatusBadge status={task.status} />
            <IssueTypeBadge type={task.issues_type} />
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-100 text-sm mb-4 leading-relaxed">
        {task.description}
      </p>

      {/* Equipment Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-100">
          <Monitor size={14} className="text-gray-400" />
          <span className="font-medium">Monitor:</span>
          <span className="font-mono text-xs bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded">
            {task.monitor_id}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-100">
          <HardDrive size={14} className="text-gray-400" />
          <span className="font-medium">Computer:</span>
          <span className="font-mono text-xs bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded">
            {task.computer_id}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-100">
          <Zap size={14} className="text-gray-400" />
          <span className="font-medium">UPS:</span>
          <span className="font-mono text-xs bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded">
            {task.ups_id}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-600">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-200">
          <MapPin size={14} className="text-gray-400 dark:text-gray-300" />
          <span className="font-medium">Room {task.room_number}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-200">
            <Calendar size={12} />
            <time dateTime={task.created_at}>
              {formatDate(task.created_at)}
            </time>
          </div>

          <Link href={`/dashboard/tasks/${task.id}`}>
            <Button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-gray-50 bg-blue-50 dark:bg-zinc-700 hover:bg-blue-100 dark:hover:bg-gray-600 border border-blue-200 dark:border-gray-700 rounded-lg transition-colors duration-200">
              <Eye size={12} />
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

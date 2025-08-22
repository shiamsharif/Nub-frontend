"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  HardDrive,
  Monitor,
  AlertCircle,
  EllipsisVertical,
  SquarePen,
  Trash2,
} from "lucide-react";
import { OpenStateType, Task } from "@/schemas/task";
import TaskFilterOption from "./task-filter-option";
import Link from "next/link";
import MarkAsResolved from "./mark-as-resolved";
import { useState } from "react";
import EditTaskModal from "./edit-task-modal";
import DeleteTaskModal from "./delete-task-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StatusBadge: React.FC<{ status: Task["status"] }> = ({ status }) => {
  const statusConfig: Record<
    NonNullable<Task["status"]>,
    { color: string; icon: React.ElementType }
  > = {
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

export function AdminDashboard({ tasks }: { tasks: Result<Task> }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openState, setOpenState] = useState<OpenStateType | null>(null);
  const pendingTasks = tasks.results.filter(
    (task) => task.status === "pending"
  );
  const inProgressTasks = tasks.results.filter(
    (task) => task.status === "in_progress"
  );
  const resolvedTasks = tasks.results.filter(
    (task) => task.status === "resolved"
  );

  console.log(tasks);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              IT Support Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-100">
              Monitor and manage all IT support tasks
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-zinc-50 dark:bg-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Tasks
                </CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {pendingTasks.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting attention
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-50 dark:bg-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  In Progress
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {inProgressTasks.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently being worked on
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-50 dark:bg-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Resolved Tasks
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {resolvedTasks.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully completed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <TaskFilterOption count={tasks.count} />

          {/* Task List */}
          <Card className="bg-zinc-50 dark:bg-zinc-800 mt-3">
            <CardHeader>
              <CardTitle>All Tasks ({tasks.count})</CardTitle>
              <CardDescription>
                Manage all IT support tasks from this dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.results.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No tasks found</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                ) : (
                  tasks.results.map((task) => (
                    <div
                      key={task.id}
                      className="border dark:border-zinc-700 rounded-lg p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{task.task_name}</h3>
                            <StatusBadge status={task.status} />
                            <IssueTypeBadge type={task.issues_type} />
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-1">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1 ">
                              <Users className="w-3 h-3" />
                              {task.user}
                            </span>
                            <span>•</span>
                            <span>
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }).format(new Date(task.created_at))}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {task.status !== "resolved" && (
                            <MarkAsResolved taskId={task.id} />
                          )}
                          <Link href={`/dashboard/tasks/${task.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant={"ghost"} className="h-8 w-8 p-0">
                                <EllipsisVertical />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTask(task);
                                  setOpenState("edit");
                                }}
                              >
                                <SquarePen className="mr-2 stroke-blue-500" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTask(task);
                                  setOpenState("delete");
                                }}
                              >
                                <Trash2 className="mr-2 stroke-red-500" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <EditTaskModal
            key={`edit-${selectedTask?.id}`}
            task={selectedTask}
            open={openState === "edit"}
            onOpenChange={setOpenState}
            setTask={setSelectedTask}
          />

          <DeleteTaskModal
            key={`delete-${selectedTask?.id}`}
            taskId={selectedTask?.id}
            open={openState === "delete"}
            onOpenChange={setOpenState}
            setTask={setSelectedTask}
          />
        </div>
      </main>
    </div>
  );
}

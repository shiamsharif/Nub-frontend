"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  HardDrive,
  Monitor,
  AlertCircle,
  Eye,
} from "lucide-react";
import { OpenStateType, Task } from "@/schemas/task";
import TaskFilterOption from "./task-filter-option";
import { useState } from "react";
import EditTaskModal from "./edit-task-modal";
import DeleteTaskModal from "./delete-task-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MarkAsResolved from "./mark-as-resolved";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const tableCols = [
  "ID",
  "Task Name",
  "Description",
  "Room Number",
  "Issue Type",
  "Status",
  "Date",
  "Action",
  "View",
];

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

export function AdminDashboard({
  tasks,
  pendingTaskCount,
  resolvedTaskCount,
}: {
  tasks: Result<Task>;
  pendingTaskCount: number;
  resolvedTaskCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openState, setOpenState] = useState<OpenStateType | null>(null);
  const page_size = Number(searchParams.get("page_size") || 10);
  const page = Number(searchParams.get("page") || 1);

  // Pagination
  const pages = Math.ceil((tasks.count || 0) / page_size);
  const isNextDisabled = page >= pages;
  const isPreviousDisabled = page <= 1;

  const onChangeSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const newPathname = `${pathname}?${params.toString()}`;
    router.push(newPathname);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              IT Support Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-100">
              Monitor and manage all IT support tasks
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mb-6">
            <Card className="bg-zinc-50 dark:bg-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {tasks.count}
                </div>
                <p className="text-xs text-muted-foreground">
                  All IT support tasks
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-50 dark:bg-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Tasks
                </CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {pendingTaskCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting attention
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
                  {resolvedTaskCount}
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
          <Card className="bg-zinc-50 dark:bg-zinc-800 mt-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="w-full flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {page} of {tasks.count}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={isPreviousDisabled}
                    onClick={() =>
                      onChangeSearchParams("page", (page - 1).toString())
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    disabled={isNextDisabled}
                    onClick={() =>
                      onChangeSearchParams("page", (page + 1).toString())
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[50svh] overflow-auto">
              <Table className="min-w-max">
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow className="border-none hover:bg-zinc-200 dark:hover:bg-zinc-950">
                    {tableCols.map((col) => (
                      <TableHead key={col}>{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.results.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.task_name}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {task.description.split(" ").slice(0, 10).join(" ")}
                      </TableCell>
                      <TableCell>{task?.room_number ?? "-"}</TableCell>
                      <TableCell>
                        <IssueTypeBadge type={task.issues_type} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={task.status} />
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(task.created_at))}
                      </TableCell>
                      <TableCell>
                        {task.status !== "resolved" ? (
                          <MarkAsResolved taskId={task.id} />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/tasks/${task.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-500 text-blue-500 hover:text-blue-600"
                          >
                            <Eye />
                            Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

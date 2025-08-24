"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OpenStateType, Task } from "@/schemas/task";
import TaskCard from "./task-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DeleteTaskModal from "./delete-task-modal";
import { useState } from "react";
import EditTaskModal from "./edit-task-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  EllipsisVertical,
  Eye,
  HardDrive,
  Monitor,
  SquarePen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tableCols = [
  "ID",
  "Task Name",
  "Description",
  "Issue Type",
  "Room Number",
  "Status",
  "Actions",
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

interface TaskListProps {
  tasks: Result<Task>;
}

export function TaskList({ tasks }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openState, setOpenState] = useState<OpenStateType | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchTerm = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";
  const issuesTypeFilter = searchParams.get("issues_type") || "all";

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
    <>
      {/* Task List */}
      {tasks.results.length === 0 ? (
        <Card className="bg-zinc-50 dark:bg-zinc-800">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-300 text-lg">
                No tasks found
              </p>
              <p className="text-gray-400 dark:text-gray-300 text-sm mt-2">
                {searchTerm ||
                statusFilter !== "all" ||
                issuesTypeFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first task to get started"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
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
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.results.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.task_name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {task.description.split(" ").slice(0, 10).join(" ")}
                    </TableCell>
                    <TableCell>
                      <IssueTypeBadge type={task.issues_type} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={task.status} />
                    </TableCell>
                    <TableCell>{task.room_number}</TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(task.created_at))}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
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
                      </div>
                    </TableCell>
                    <TableCell>
                      {task.status !== "resolved" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} className="h-8 w-8 p-0">
                              <EllipsisVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
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
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      )}

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
    </>
  );
}

"use client";
import { Card, CardContent } from "@/components/ui/card";
import { OpenStateType, Task } from "@/schemas/task";
import TaskCard from "./task-card";
import { useSearchParams } from "next/navigation";
import DeleteTaskModal from "./delete-task-modal";
import { useState } from "react";
import EditTaskModal from "./edit-task-modal";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openState, setOpenState] = useState<OpenStateType | null>(null);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";
  const issuesTypeFilter = searchParams.get("issues_type") || "all";

  return (
    <>
      {/* Task List */}
      {tasks.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onOpenStateChange={setOpenState}
              setTask={setSelectedTask}
            />
          ))}
        </div>
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

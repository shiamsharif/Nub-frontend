"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskList } from "./task-list";
import { CreateTaskDialog } from "./create-task-dialog";
import { Task } from "@/schemas/task";

export function UserDashboard({ tasks }: { tasks: Task[] }) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                My Tasks
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-100">
                Manage and track your IT support requests
              </p>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>

          <TaskList tasks={tasks} />

          <CreateTaskDialog
            open={createDialogOpen}
            onOpenChange={setCreateDialogOpen}
          />
        </div>
      </main>
    </div>
  );
}

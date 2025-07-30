"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar";
import { TaskList } from "@/components/task-list";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { AdminDashboard } from "@/components/admin-dashboard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export function UserDashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    // Mock tasks data
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Network connectivity issue in Lab 1",
        description:
          "Students are unable to connect to the internet in Computer Lab 1",
        status: "pending",
        priority: "high",
        createdBy: "john.doe@nub.edu",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "2",
        title: "Printer not working in Office 205",
        description:
          "The HP LaserJet printer in Office 205 is showing error messages",
        status: "in-progress",
        priority: "medium",
        createdBy: "jane.smith@nub.edu",
        createdAt: "2024-01-14T14:20:00Z",
        updatedAt: "2024-01-15T09:15:00Z",
      },
      {
        id: "3",
        title: "Software installation request",
        description:
          "Need to install Adobe Creative Suite on 10 computers in Design Lab",
        status: "resolved",
        priority: "low",
        createdBy: "mike.wilson@nub.edu",
        createdAt: "2024-01-13T16:45:00Z",
        updatedAt: "2024-01-14T11:30:00Z",
      },
    ];
    setTasks(mockTasks);
  }, []);

  const handleCreateTask = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy">
  ) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdBy: user?.email || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setCreateDialogOpen(false);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Show admin dashboard for IT Staff
  if (user?.role === "ITStaff") {
    return (
      <AdminDashboard
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  }

  // Show regular user dashboard for other roles
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

          <TaskList
            tasks={tasks.filter((task) => task.createdBy === user?.email)}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            currentUser={user}
          />

          <CreateTaskDialog
            open={createDialogOpen}
            onOpenChange={setCreateDialogOpen}
            onCreateTask={handleCreateTask}
          />
        </div>
      </main>
    </div>
  );
}

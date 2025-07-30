"use client";

import { LandingPage } from "@/components/landing-page";
import { useAuth } from "@/components/auth-provider";
import { Task, UserDashboard } from "@/components/user-dashboard";
import { AdminDashboard } from "@/components/admin-dashboard";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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

  if (user) {
    if (user) {
      return (
        <AdminDashboard
          tasks={mockTasks}
          onUpdateTask={() => {}}
          onDeleteTask={() => {}}
        />
      );
    } else {
      return <UserDashboard />;
    }
  }

  return <LandingPage />;
}

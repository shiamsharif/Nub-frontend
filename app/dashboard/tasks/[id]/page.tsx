"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Task } from "@/schemas/task";
import { CommentSection } from "@/components/comment-section";

// Mock data for tasks (should ideally come from a global state or API)
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Network connectivity issue in Lab 1",
    description:
      "Students are unable to connect to the internet in Computer Lab 1. This is affecting multiple workstations and needs urgent attention. We have tried restarting the router but the issue persists. Please investigate the network infrastructure in the lab.",
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
      "The HP LaserJet printer in Office 205 is showing error messages and is not printing. It seems to be a driver issue or a connection problem. We have tried reinstalling the drivers but it did not resolve the problem. Please check the printer's connectivity and driver installation.",
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
      "Need to install Adobe Creative Suite on 10 computers in Design Lab for the new graphic design course. The licenses are available, and the installation needs to be completed before the next semester starts. Please coordinate with the design department for scheduling.",
    status: "resolved",
    priority: "low",
    createdBy: "mike.wilson@nub.edu",
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
  },
  {
    id: "4",
    title: "Projector bulb replacement in Lecture Hall A",
    description:
      "The projector in Lecture Hall A is dim and needs a new bulb. This is impacting presentations and lectures. Please replace the bulb as soon as possible to ensure clear visibility for students.",
    status: "pending",
    priority: "high",
    createdBy: "prof.davis@nub.edu",
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
  },
  {
    id: "5",
    title: "New user account creation",
    description:
      "Please create a new user account for incoming faculty member Dr. Emily White. Her start date is next Monday, and she will need access to university systems and email. Please ensure all necessary permissions are granted.",
    status: "in-progress",
    priority: "medium",
    createdBy: "hr.admin@nub.edu",
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
];

// Mock comments for tasks
const mockComments = {
  "1": [
    {
      id: "c1",
      author: "IT Admin",
      content: "Investigating network logs now. Looks like a DHCP issue.",
      createdAt: "2024-01-15T11:00:00Z",
    },
    {
      id: "c2",
      author: "John Doe",
      content: "Any updates? Still no internet in Lab 1.",
      createdAt: "2024-01-15T14:00:00Z",
    },
  ],
  "2": [
    {
      id: "c3",
      author: "IT Staff",
      content:
        "Checked drivers, seems fine. Suspect hardware fault. Ordering replacement.",
      createdAt: "2024-01-15T10:00:00Z",
    },
  ],
};

export default function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<any[]>([]); // State for comments

  useEffect(() => {
    // Simulate fetching task details
    const foundTask = mockTasks.find((t) => t.id === taskId);
    setTask(foundTask || null);
    setComments(mockComments[taskId as keyof typeof mockComments] || []);
  }, [taskId]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-foreground text-lg">Task not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
        <div className="px-4 py-6 sm:px-0">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tasks
          </Button>

          <Card className="bg-card mb-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-foreground">
                {task.title}
              </CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge className={getStatusColor(task.status)}>
                  {task.status.replace("-", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Description
                </Label>
                <p className="mt-1 text-foreground whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>Created by: {task.createdBy}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Updated: {new Date(task.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <CommentSection taskId={taskId} initialComments={comments} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

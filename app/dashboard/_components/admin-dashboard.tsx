"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Users,
  TrendingUp,
} from "lucide-react";
import { TaskDetailDialog } from "./task-detail-dialog";
import { Task } from "@/schemas/task";
import { useAuth } from "@/context/auth-context";

const tasks: Task[] = [
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

export function AdminDashboard() {
  const { session: user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleMarkResolved = (taskId: string) => {
    // onUpdateTask(taskId, { status: "resolved" });
  };

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const resolvedTasks = tasks.filter((task) => task.status === "resolved");
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

            <Card className="bg-zinc-50 dark:bg-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  High Priority
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {highPriorityTasks.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Urgent attention needed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6 bg-zinc-50 dark:bg-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Search & Filter Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks, users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-zinc-50 dark:bg-zinc-900"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-50 dark:bg-zinc-900">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-50 dark:bg-zinc-900">
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Task List */}
          <Card className="bg-zinc-50 dark:bg-zinc-800">
            <CardHeader>
              <CardTitle>All Tasks ({filteredTasks.length})</CardTitle>
              <CardDescription>
                Manage all IT support tasks from this dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No tasks found</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border dark:border-zinc-700 rounded-lg p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{task.title}</h3>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-1">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1 ">
                              <Users className="w-3 h-3" />
                              {task.createdBy}
                            </span>
                            <span>•</span>
                            <span>
                              {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {task.status !== "resolved" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkResolved(task.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Resolved
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTask(task)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {selectedTask && (
            <TaskDetailDialog
              task={selectedTask}
              open={!!selectedTask}
              onOpenChange={(open) => !open && setSelectedTask(null)}
              onUpdateTask={() => {}}
              onDeleteTask={() => {}}
              currentUser={user}
            />
          )}
        </div>
      </main>
    </div>
  );
}

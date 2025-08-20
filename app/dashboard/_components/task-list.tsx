"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Task } from "@/schemas/task";
import TaskCard from "./task-card";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-zinc-50 dark:bg-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
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
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
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
      <div className="grid gap-4">
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
                  priorityFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first task to get started"}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

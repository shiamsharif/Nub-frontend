"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task, taskSchema, TaskSchemaType } from "@/schemas/task";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBox } from "@/components/ui/input-box";
import { TextAreaBox } from "@/components/ui/textarea-box";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTask: (
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy">
  ) => void;
}

export function CreateTaskDialog({
  open,
  onOpenChange,
  onCreateTask,
}: CreateTaskDialogProps) {
  const { control, handleSubmit } = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {},
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    status: "pending" as "pending" | "in-progress" | "resolved",
  });

  const onSubmit = (e: TaskSchemaType) => {
    onCreateTask(formData);
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Create a new IT support task. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState }) => (
                <InputBox
                  label="Title"
                  {...field}
                  placeholder="Enter title"
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="room_number"
                render={({ field, fieldState }) => (
                  <InputBox
                    label="Room Number"
                    {...field}
                    placeholder="Enter room number"
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="computer_id"
                render={({ field, fieldState }) => (
                  <InputBox
                    label="Computer ID"
                    {...field}
                    placeholder="Enter computer ID"
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="monitor_id"
                render={({ field, fieldState }) => (
                  <InputBox
                    label="Monitor ID"
                    {...field}
                    placeholder="Enter monitor ID"
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="ups_id"
                render={({ field, fieldState }) => (
                  <InputBox
                    label="UPS ID"
                    {...field}
                    placeholder="Enter ups ID"
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="issue_type"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label htmlFor="issue_type">
                      Issue Type <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="status"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label htmlFor="status">
                      Status <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <TextAreaBox
                  label="Description"
                  {...field}
                  placeholder="Enter description"
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

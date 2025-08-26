"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { taskSchema, TaskSchemaType } from "@/schemas/task";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBox } from "@/components/ui/input-box";
import { TextAreaBox } from "@/components/ui/textarea-box";
import useApi from "@/hooks/use-api";
import { toast } from "sonner";
import { taskViewRevalidate } from "@/lib/tag-invalidate";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTaskDialog({
  open,
  onOpenChange,
}: CreateTaskDialogProps) {
  const { control, handleSubmit } = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task_name: "",
      description: "",
      computer_id: "",
      issues_type: "hardware",
      monitor_id: "",
      room_number: "",
      ups_id: "",
    },
  });
  const { mutate: createTask, isLoading } = useApi("/task/create/", {
    method: "POST",
    requireAuth: true,
  });

  const onSubmit = async (data: TaskSchemaType) => {
    const response = await createTask(data);
    if (response) {
      taskViewRevalidate();
      onOpenChange(false);
      toast("Task created successfully!", {
        icon: "✅",
        description: "Your task has been created and is now pending review.",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }
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
              name="task_name"
              render={({ field, fieldState }) => (
                <InputBox
                  label="Task Name"
                  {...field}
                  placeholder="Enter task name"
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
                    
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="issues_type"
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label htmlFor="issues_type">
                    Issue Type <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issues type" />
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

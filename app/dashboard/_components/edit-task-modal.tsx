"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useApi from "@/hooks/use-api";
import { taskViewRevalidate } from "@/lib/tag-invalidate";
import { OpenStateType, Task } from "@/schemas/task";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { taskSchema, TaskSchemaType } from "@/schemas/task";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputBox } from "@/components/ui/input-box";
import { TextAreaBox } from "@/components/ui/textarea-box";
import { useCallback } from "react";

type EditTaskModalProps = {
  task: Task | null;
  setTask: (task: null) => void;
  open: boolean;
  onOpenChange: (openState: OpenStateType | null) => void;
};

export default function EditTaskModal({
  task,
  open,
  onOpenChange,
  setTask,
}: EditTaskModalProps) {
  if (!task) {
    return null;
  }
  const { control, handleSubmit, watch } = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    values: {
      task_name: task.task_name,
      description: task.description,
      computer_id: task.computer_id,
      issues_type: task.issues_type,
      monitor_id: task.monitor_id,
      room_number: task.room_number,
      ups_id: task.ups_id,
    },
  });

  const { mutate: updateTask, isLoading } = useApi(`/task/update/${task.id}/`, {
    method: "PUT",
    requireAuth: true,
  });

  const isChanged = useCallback(() => {
    return (
      task.task_name !== watch("task_name") ||
      task.description !== watch("description") ||
      task.computer_id !== watch("computer_id") ||
      task.issues_type !== watch("issues_type") ||
      task.monitor_id !== watch("monitor_id") ||
      task.room_number !== watch("room_number") ||
      task.ups_id !== watch("ups_id")
    );
  }, []);

  const onSubmit = async (payload: TaskSchemaType) => {
    const response = await updateTask(payload);
    if (response) {
      onOpenChange(null);
      taskViewRevalidate();
      toast("Task updated successfully!", {
        icon: "✅",
        description: "Your task has been updated.",
        duration: 3000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTask(null);
          onOpenChange(null);
        } else {
          onOpenChange("delete");
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task and save them.
            </DialogDescription>
          </DialogHeader>

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
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading || !isChanged()} type="submit">
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import * as z from "zod";

// Task Schema
const taskStatusSchema = z.enum(["pending", "in-progress", "resolved"], {
  required_error: "Status is required",
});
const taskIssueTypeSchema = z.enum(["hardware", "software"], {
  required_error: "Issue type is required",
});
export const taskSchema = z.object({
  room_number: z.string({ required_error: "Room number is required" }),
  computer_id: z.string({ required_error: "Computer ID is required" }),
  monitor_id: z.string({ required_error: "Monitor ID is required" }),
  ups_id: z.string({ required_error: "UPS ID is required" }),
  title: z.string({ required_error: "Title is required" }).min(2, {
    message: "Title must be at least 2 characters long",
  }),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),
  status: taskStatusSchema,
  issue_type: taskIssueTypeSchema,
});

// Task Type
export type TaskSchemaType = z.infer<typeof taskSchema>;
export type TaskStatusType = z.infer<typeof taskStatusSchema>;
export type TaskIssueType = z.infer<typeof taskIssueTypeSchema>;

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

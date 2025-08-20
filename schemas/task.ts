import * as z from "zod";

// Task Schema
const taskIssueTypeSchema = z.enum(["hardware", "software"], {
  required_error: "Issues type is required",
});
export const taskSchema = z.object({
  room_number: z.string({ required_error: "Room number is required" }),
  computer_id: z.string({ required_error: "Computer ID is required" }),
  monitor_id: z.string({ required_error: "Monitor ID is required" }),
  ups_id: z.string({ required_error: "UPS ID is required" }),
  task_name: z.string({ required_error: "Task Name is required" }).min(2, {
    message: "Task Name must be at least 2 characters long",
  }),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),
  issues_type: taskIssueTypeSchema,
});

// Task Type
export type TaskSchemaType = z.infer<typeof taskSchema>;
export type TaskIssueType = z.infer<typeof taskIssueTypeSchema>;

export type Comment = {
  body: string;
  created: string;
  id: number;
  updated: string;
  username: string;
};

export type Task = TaskSchemaType & {
  created_at: string;
  id: number;
  updated_at: string;
  user: number;
  status: string;
  comments: Comment[];
};

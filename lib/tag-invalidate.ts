"use server";
import { revalidateTag } from "next/cache";

const taskViewRevalidate = () => {
  revalidateTag("task-view");
};

const taskDetailsRevalidate = (taskId: number) => {
  revalidateTag(`task-details-${taskId}`);
};

export { taskViewRevalidate, taskDetailsRevalidate };

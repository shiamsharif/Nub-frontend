import { Task } from "@/schemas/task";
import { getSession } from "@/lib/auth";
import TaskDetails from "../_components/task-details";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

async function fetchTaskDetails(
  taskId: string,
  accessToken: string
): Promise<Task | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/details/${taskId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: [`task-details-${taskId}`],
          revalidate: 60, // Revalidate every 60 seconds
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch task details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching task details:", error);
    return null;
  }
}

type TaskDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function TaskDetailsPage({
  params,
}: {
  params: Promise<TaskDetailsPageProps["params"]>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const task = await fetchTaskDetails(id, (session as any).accessToken);

  // Handle case where task is not found
  if (!task) {
    return (
      <div className="container mx-auto py-44">
        <Card className="max-w-lg mx-auto bg-zinc-50 dark:bg-zinc-800">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-300 text-lg">
                No tasks found
              </p>
              <p className="text-gray-400 dark:text-gray-300 text-sm mt-2">
                Please check the task ID
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <TaskDetails task={task} />;
}

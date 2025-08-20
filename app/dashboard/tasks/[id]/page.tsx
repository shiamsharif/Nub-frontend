import { Task } from "@/schemas/task";
import { getSession } from "@/lib/auth";
import TaskDetails from "../_components/task-details";

async function fetchTaskDetails(taskId: string): Promise<Task | null> {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/details/${taskId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
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

  const task = await fetchTaskDetails(id);

  // Handle case where task is not found
  if (!task) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <p className="text-foreground text-lg">Task not found.</p>
        </main>
      </div>
    );
  }

  return <TaskDetails task={task} />;
}

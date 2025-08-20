import { UserDashboard } from "./_components/user-dashboard";
import { Task } from "@/schemas/task";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function fetchTaskList(accessToken: string): Promise<Task[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/listView`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ["task-view"],
          revalidate: 60, // Revalidate every 60 seconds
        },
      }
    );
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching task list:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  const tasks = await fetchTaskList((session as any).accessToken);

  return <UserDashboard tasks={tasks} />;
}

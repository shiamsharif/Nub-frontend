import { Task } from "@/schemas/task";
import { authenticatedFetch } from "./auth";

type FetchTaskListProps = {
  endpoint: string;
  accessToken: string;
  page: string;
  page_size: string;
  statusFilter: string;
  issuesTypeFilter: string;
  searchTerm: string;
};

export async function fetchTaskList({
  endpoint,
  accessToken,
  page,
  page_size,
  statusFilter,
  issuesTypeFilter,
  searchTerm,
}: FetchTaskListProps): Promise<Result<Task>> {
  try {
    const params = new URLSearchParams({
      page,
      limit: page_size,
    });
    if (statusFilter && statusFilter !== "all")
      params.set("status", statusFilter);
    if (issuesTypeFilter && issuesTypeFilter !== "all")
      params.set("issues_type", issuesTypeFilter);
    if (searchTerm) params.set("search", searchTerm);

    // const response = await fetch(
    //   `${
    //     process.env.NEXT_PUBLIC_API_URL
    //   }/task/${endpoint}/?${params.toString()}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     next: {
    //       tags: ["task-view"],
    //       revalidate: 60, // Revalidate every 60 seconds
    //     },
    //   }
    // );

    const response = await authenticatedFetch(
      `/task/${endpoint}/?${params.toString()}`,
      {
        next: {
          tags: ["task-view"],
          revalidate: 60,
        },
      }
    );

    // console.log("Response status:", response);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching task list:", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
}

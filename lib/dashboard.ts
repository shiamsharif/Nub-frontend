import { Task } from "@/schemas/task";
import { fetchClient } from "./fetch-client";

type FetchTaskListProps = {
  endpoint: string;
  page: string;
  page_size: string;
  statusFilter: string;
  issuesTypeFilter: string;
  searchTerm: string;
};

export async function fetchTaskList({
  endpoint,
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

    const response = await fetchClient(
      `/task/${endpoint}/?${params.toString()}`,
      {
        next: {
          tags: ["task-view"],
          revalidate: 60,
        },
      }
    );

    console.log("Response status:", response);
    if (!response.ok) {
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
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

export async function fetchPendingTaskCount(): Promise<number> {
  try {
    const response = await fetchClient("/task/pending-tasks/", {
      next: {
        tags: ["pending-task-count"],
        revalidate: 60,
      },
    });
    if (!response.ok) {
      return 0;
    }
    const data = await response.json();
    return data?.count ?? 0;
  } catch (error) {
    console.error("Error fetching pending task count:", error);
    return 0;
  }
}

export async function fetchResolvedTaskCount(): Promise<number> {
  try {
    const response = await fetchClient("/task/resolved-tasks/", {
      next: {
        tags: ["resolved-task-count"],
        revalidate: 60,
      },
    });
    if (!response.ok) {
      return 0;
    }
    const data = await response.json();
    return data?.count ?? 0;
  } catch (error) {
    console.error("Error fetching resolved task count:", error);
    return 0;
  }
}

export async function fetchTaskDetails(taskId: string): Promise<Task | null> {
  try {
    const response = await fetchClient(`/task/details/${taskId}`, {
      next: {
        tags: [`task-details-${taskId}`],
        revalidate: 60,
      },
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching task details:", error);
    return null;
  }
}

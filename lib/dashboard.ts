import { Task } from "@/schemas/task";
import { authenticatedFetch } from "./auth";

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

    const response = await authenticatedFetch(
      `/task/${endpoint}/?${params.toString()}`,
      {
        next: {
          tags: ["task-view"],
          revalidate: 60,
        },
      }
    );

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

export async function pendingTasksCount(): Promise<Result<Task>> {
  try {
    const response = await authenticatedFetch("/task/pending-tasks/");
    if (!response.ok) {
      throw new Error("Failed to fetch pending tasks count");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching pending tasks count:", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
}

export async function resolvedTasksCount(): Promise<Result<Task>> {
  try {
    const response = await authenticatedFetch("/task/resolved-tasks/");
    if (!response.ok) {
      throw new Error("Failed to fetch resolved tasks count");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching resolved tasks count:", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
}

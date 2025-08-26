import { UserDashboard } from "./_components/user-dashboard";
import { getUserProfile } from "@/lib/auth";
import {
  fetchPendingTaskCount,
  fetchResolvedTaskCount,
  fetchTaskList,
} from "@/lib/dashboard";
import { AdminDashboard } from "./_components/admin-dashboard";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const page = String(params?.page || 1);
  const page_size = String(params?.page_size || 10);
  const statusFilter = params?.status || ("all" as string);
  const issuesTypeFilter = params?.issues_type || ("all" as string);
  const searchTerm = params?.search || "";

  const user = await getUserProfile();

  if (user?.user_type === "Student" || user?.user_type === "Staff") {
    const tasksForStudent = await fetchTaskList({
      endpoint: "listView",
      page,
      page_size,
      statusFilter,
      issuesTypeFilter,
      searchTerm,
    });
    return <UserDashboard data={tasksForStudent} />;
  }

  const [tasksForAdmin, pendingTaskCount, resolvedTaskCount] =
    await Promise.all([
      fetchTaskList({
        endpoint: "dashboard-listView",
        page,
        page_size,
        statusFilter,
        issuesTypeFilter,
        searchTerm,
      }),
      fetchPendingTaskCount(),
      fetchResolvedTaskCount(),
    ]);
  return (
    <AdminDashboard
      tasks={tasksForAdmin}
      pendingTaskCount={pendingTaskCount}
      resolvedTaskCount={resolvedTaskCount}
    />
  );
}

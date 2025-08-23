import { UserDashboard } from "./_components/user-dashboard";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/get-user";
import { fetchTaskList } from "@/lib/dashboard";
import { AdminDashboard } from "./_components/admin-dashboard";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const params = await searchParams;
  const page = String(params?.page || 1);
  const page_size = String(params?.page_size || 10);
  const statusFilter = params?.status || ("all" as string);
  const issuesTypeFilter = params?.issues_type || ("all" as string);
  const searchTerm = params?.search || "";

  const user = await getUserProfile((session as any).accessToken);

  if (user?.user_type === "Student" || user?.user_type === "Staff") {
    const tasksForStudent = await fetchTaskList({
      endpoint: "listView",
      accessToken: (session as any).accessToken,
      page,
      page_size,
      statusFilter,
      issuesTypeFilter,
      searchTerm,
    });
    return <UserDashboard data={tasksForStudent} />;
  }

  const tasksForStaff = await fetchTaskList({
    endpoint: "dashboard-listView",
    accessToken: (session as any).accessToken,
    page,
    page_size,
    statusFilter,
    issuesTypeFilter,
    searchTerm,
  });

  return <AdminDashboard tasks={tasksForStaff} />;
}

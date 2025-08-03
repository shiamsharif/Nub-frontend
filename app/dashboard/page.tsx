import { getSession } from "@/lib/auth";
import { use } from "react";
import { AdminDashboard } from "./_components/admin-dashboard";
import { UserDashboard } from "./_components/user-dashboard";
import { Task } from "@/schemas/task";

export default function DashboardPage() {
  const session = use(getSession());

  if (false) {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
}

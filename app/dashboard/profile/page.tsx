import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileDisplay from "./_components/profile-display";
import { getUserProfile } from "@/lib/get-user";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const user = await getUserProfile((session as any).accessToken);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 min-h-[70svh] flex items-center justify-center">
      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-sm border border-border hover:shadow-md hover:border-zinc-600  transition-all duration-200 overflow-hidden">
        {/* Content Section */}
        <ProfileDisplay user={user} />
      </div>
    </div>
  );
}

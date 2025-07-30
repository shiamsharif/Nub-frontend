"use client"

import { LandingPage } from "@/components/landing-page"
import { useAuth } from "@/components/auth-provider"
import { UserDashboard } from "@/components/user-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (user) {
    if (user.role === "ITStaff") {
      return <AdminDashboard />
    } else {
      return <UserDashboard />
    }
  }

  return <LandingPage />
}

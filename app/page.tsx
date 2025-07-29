"use client"

import { useAuth } from "@/components/auth-provider"
import { LandingPage } from "@/components/landing-page"
import { UserDashboard } from "@/components/user-dashboard"

export interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdBy: string
  createdAt: string
  updatedAt: string
}

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show landing page if not logged in, dashboard if logged in
  return user ? <UserDashboard /> : <LandingPage />
}

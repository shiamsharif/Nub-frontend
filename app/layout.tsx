import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar" // Import Navbar
import { Footer } from "@/components/footer" // Import Footer

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NUB IT Support - Task Manager",
  description: "Task Management System for NUB IT Support",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* Navbar is now part of the layout for consistent display */}
          {/* It will conditionally render based on user authentication state */}
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

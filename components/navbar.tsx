"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Coffee,
  User,
  LogOut,
  Settings,
  BookOpen,
  Info,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/auth-context";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="border-b bg-zinc-50 dark:bg-zinc-900 backdrop-blur supports-[backdrop-filter]:bg-zinc-50 dark:supports-[backdrop-filter]:bg-zinc-900 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-gray-50 font-bold text-sm">IT</span>
              </div>
              <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                NUB IT Support
              </span>
            </Link>
            <div className="hidden md:flex ml-8 space-x-6">
              <Link
                href="/blog"
                className="text-gray-600 dark:text-gray-100 hover:text-blue-600 transition-colors flex items-center"
              >
                <BookOpen className="w-4 h-4 mr-1" /> Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-600 dark:text-gray-100 hover:text-blue-600 transition-colors flex items-center"
              >
                <Info className="w-4 h-4 mr-1" /> About
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Animated Buy Me a Coffee Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group hidden sm:block"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Button
                variant="outline"
                size="sm"
                className="relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-50 dark:text-gray-100 border-0 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                <Coffee className="w-4 h-4 mr-2 animate-bounce" />
                <span className="relative z-10">Buy me a Coffee</span>
              </Button>
            </motion.div>

            <Button onClick={toggleTheme} variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt={"Gues"} />
                      <AvatarFallback>{"Gues".charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {"Gues"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        user@nub.ac.bd
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Student
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>

                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

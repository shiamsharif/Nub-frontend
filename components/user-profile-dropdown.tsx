"use client";
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
  User as UserIcon,
  LogOut,
  Settings,
  LockKeyholeOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getUserProfile } from "@/lib/get-user";
import { useAuth } from "@/context/auth-context";
import { User } from "@/schemas/auth";

export default function UserProfileDropdown() {
  const [user, setUser] = useState<User | null>(null);
  const { session, logout } = useAuth();

  const getUser = useCallback(async (accessToken: string) => {
    return await getUserProfile(accessToken);
  }, []);

  useEffect(() => {
    if (session) {
      getUser(session.accessToken)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [session, getUser]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder-user.jpg"
              alt={user?.username ?? "Gues"}
            />
            <AvatarFallback>
              {(user?.username ?? "Gues").charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">
              {user?.username ?? "Gues"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.user_type}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/dashboard/profile"}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/dashboard/reset-password"}>
            <LockKeyholeOpen className="mr-2 h-4 w-4" />
            <span>Reset Password</span>
          </Link>
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
  );
}

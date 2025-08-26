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
import { signOut, useSession } from "next-auth/react";

export default function UserProfileDropdown() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder-user.jpg"
              alt={session?.user?.username ?? "Gues"}
            />
            <AvatarFallback>
              {(session?.user?.username ?? "Gues").charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-semibold capitalize">
            {session?.user?.user_type === "Student" ||
            session?.user?.user_type === "Staff"
              ? session?.user?.username ?? "Guest"
              : session?.user?.username ?? "Admin"}
          </h2>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">
              {session?.user?.username ?? "Gues"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.user_type}
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
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

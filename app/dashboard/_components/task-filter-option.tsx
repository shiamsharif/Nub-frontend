"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskFilterOption({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState<string>(searchTerm);
  const statusFilter = searchParams.get("status") || "all";
  const issuesTypeFilter = searchParams.get("issues_type") || "all";
  const page_size = Number(searchParams.get("page_size") || 10);
  const page = Number(searchParams.get("page") || 1);

  // Pagination
  const pages = Math.ceil((count || 0) / page_size);
  const isNextDisabled = page >= pages;
  const isPreviousDisabled = page <= 1;

  const pathname = usePathname();

  const onChangeSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const newPathname = `${pathname}?${params.toString()}`;
    router.push(newPathname);
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => onChangeSearchParams("search", searchQuery),
      500
    );
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <Card className="bg-zinc-50 dark:bg-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end items-center  gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={isPreviousDisabled}
              onClick={() =>
                onChangeSearchParams("page", (page - 1).toString())
              }
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={isNextDisabled}
              onClick={() =>
                onChangeSearchParams("page", (page + 1).toString())
              }
            >
              Next
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-50 dark:bg-zinc-900"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              onChangeSearchParams("status", value === "all" ? "" : value);
            }}
          >
            <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-50 dark:bg-zinc-900">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={issuesTypeFilter}
            onValueChange={(value) => {
              onChangeSearchParams("issues_type", value === "all" ? "" : value);
            }}
          >
            <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900">
              <SelectValue placeholder="Filter by issues type" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-50 dark:bg-zinc-900">
              <SelectItem value="all">All Issues</SelectItem>
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="software">Software</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

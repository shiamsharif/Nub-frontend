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
import { Search, Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskFilterOption({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState<string>(searchTerm);
  const statusFilter = searchParams.get("status") || "all";
  const issuesTypeFilter = searchParams.get("issues_type") || "all";
  const pathname = usePathname();

  const onChangeSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const newPathname = `${pathname}?${params.toString()}`;
    router.push(newPathname);
  };

  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(
        () => onChangeSearchParams("search", searchQuery),
        500
      );
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  const hasFilter = searchParams.toString().length > 0;

  return (
    <Card className="bg-zinc-50 dark:bg-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex-1 flex flex-wrap items-center gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-50 dark:bg-zinc-900"
              />
            </div>
            <div className="max-w-max w-full">
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
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="max-w-max w-full">
              <Select
                value={issuesTypeFilter}
                onValueChange={(value) => {
                  onChangeSearchParams(
                    "issues_type",
                    value === "all" ? "" : value
                  );
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
          </div>
          <Button
            disabled={!hasFilter}
            variant="destructive"
            className="disabled:bg-gray-400"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <X />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div>
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft />
      </Button>
    </div>
  );
}

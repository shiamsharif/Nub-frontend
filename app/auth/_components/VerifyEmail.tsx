import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function VerifyEmail() {
  return (
    <Card className="w-full max-w-md bg-zinc-50 dark:bg-zinc-800">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">✓</span>
          </div>
        </div>
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We've sent a verification link to your email. Please click the link to
          verify your email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Back to sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

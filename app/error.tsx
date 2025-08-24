"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            We encountered an unexpected error. This has been logged and we'll
            look into it.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          {process.env.NODE_ENV === "development" && (
            <div className="mb-4 rounded-md bg-muted p-3 text-left">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Error Details:
              </p>
              <code className="text-xs text-destructive break-all">
                {error.message}
              </code>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Error ID: {error.digest || "Unknown"}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button onClick={reset} className="w-full" variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="w-full"
          >
            <Home className="mr-2 h-4 w-4" />
            Go home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

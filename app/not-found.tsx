import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-muted-foreground mb-2">
              404
            </h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Go Home</Link>
            </Button>

            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="javascript:history.back()">Go Back</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

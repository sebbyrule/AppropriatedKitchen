import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-8xl font-bold font-serif bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="mt-6 text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-muted-foreground">
        Looks like this recipe didn&apos;t make it into the cookbook.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
        <Link href="/recipes">
          <Button variant="outline">Browse Recipes</Button>
        </Link>
      </div>
    </div>
  );
}
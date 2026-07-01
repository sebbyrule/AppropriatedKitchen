import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <p className="eyebrow">Off the Menu</p>
      <h1 className="mt-4 font-serif text-[clamp(5rem,18vw,9rem)] font-light leading-none">
        4<span className="text-primary">0</span>4
      </h1>
      <h2 className="mt-6 font-serif text-2xl font-light">Page not found</h2>
      <p className="mt-3 text-muted-foreground">
        Looks like this recipe didn&apos;t make it into the cookbook.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
        <Button nativeButton={false} render={<Link href="/" />}>Go Home</Button>
        <Link
          href="/recipes"
          className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
        >
          Browse Recipes
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
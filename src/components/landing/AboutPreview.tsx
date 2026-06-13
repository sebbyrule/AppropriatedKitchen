import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutPreview() {
  return (
    <section className="border-y bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold font-serif sm:text-4xl">The Story Behind the Kitchen</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Appropriated Kitchen is about taking the food you already love and 
            giving it a fresh twist. No gatekeeping, no pretension — just 
            really good food made accessible. Every recipe is tested, 
            perfected, and served with personality.
          </p>
          <div className="mt-8">
            <Link href="/about">
              <Button variant="link" className="gap-2 text-base">
                Read the full story <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
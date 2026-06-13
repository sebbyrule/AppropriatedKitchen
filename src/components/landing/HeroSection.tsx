import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="font-serif">Your Food,</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              My Way
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl mx-auto">
            Bold flavors, approachable recipes, and a little bit of attitude.
            Cooking the food you love, reimagined the way it should be.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/recipes">
              <Button size="lg" className="gap-2">
                Browse Recipes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                About Me
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
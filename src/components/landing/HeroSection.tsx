import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* a single, faint saffron glow — atmosphere, not a gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-52 h-[40rem] w-[40rem]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 16%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-40">
        <div className="lg:col-span-9">
          <p
            className="eyebrow ak-reveal flex items-center gap-3"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="inline-block h-px w-8 bg-primary" />
            Est. 2024 — Seasonal, Unfussy Cooking
          </p>

          <h1 className="mt-8 font-serif text-[clamp(3rem,9vw,7rem)] font-light leading-[0.95] tracking-[-0.02em]">
            <span
              className="ak-reveal block"
              style={{ animationDelay: "0.12s" }}
            >
              Your Food,
            </span>
            <span
              className="ak-reveal block italic"
              style={{ animationDelay: "0.22s" }}
            >
              My Way<span className="text-primary">.</span>
            </span>
          </h1>

          <div
            className="ak-reveal mt-10 max-w-xl"
            style={{ animationDelay: "0.34s" }}
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              Bold flavors, approachable recipes, and a little bit of attitude —
              the dishes you already love, reimagined the way they should be.
            </p>
          </div>

          <div
            className="ak-reveal mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animationDelay: "0.46s" }}
          >
            <Button size="lg" nativeButton={false} render={<Link href="/recipes" />}>
              Browse Recipes
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
            >
              About the Kitchen
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Editorial side rail — index marks, generous space */}
        <aside
          className="ak-reveal hidden flex-col justify-end gap-6 border-l border-border pl-8 lg:col-span-3 lg:flex"
          style={{ animationDelay: "0.55s" }}
        >
          {[
            { n: "01", t: "Seasonal" },
            { n: "02", t: "Tested" },
            { n: "03", t: "No Gatekeeping" },
          ].map((item) => (
            <div key={item.n} className="flex items-baseline gap-4">
              <span className="font-serif text-2xl text-primary/80">
                {item.n}
              </span>
              <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {item.t}
              </span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="relative overflow-hidden border border-border bg-card px-6 py-14 sm:px-12 sm:py-20">
        {/* faint saffron glow, lower-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 16%, transparent), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-xl text-center">
          <p className="eyebrow">From the Pass</p>
          <h2 className="mt-3 font-serif text-3xl font-light sm:text-4xl">
            Recipes, in your inbox
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
            New recipes, kitchen notes, and the occasional unfiltered opinion.
            No spam — just good food.
          </p>

          <div className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="you@example.com"
              className="flex-1"
              aria-label="Email address"
              disabled
            />
            <Button disabled>Subscribe</Button>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Signup coming soon
          </p>
        </div>
      </div>
    </section>
  );
}

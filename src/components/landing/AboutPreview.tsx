import Link from "next/link";

export function AboutPreview() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">The Ethos</p>
            <h2 className="mt-3 font-serif text-3xl font-light leading-tight sm:text-4xl">
              The story behind the kitchen
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="font-serif text-2xl font-light leading-relaxed text-foreground/90 sm:text-3xl">
              Taking the food you already love and giving it a fresh twist. No
              gatekeeping, no pretension — just{" "}
              <em className="text-primary not-italic">really good food</em>, made
              accessible.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Every recipe is tested, perfected, and served with personality.
              This is cooking without the rulebook — your food, your kitchen,
              your way.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
            >
              Read the full story
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

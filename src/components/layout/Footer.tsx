import Link from "next/link";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-baseline gap-2 font-serif text-xl tracking-tight"
            >
              Appropriated <span className="italic text-foreground/90">Kitchen</span>
              <span aria-hidden className="size-1.5 rotate-45 bg-primary" />
            </Link>
            <p className="font-serif text-base italic text-muted-foreground">
              {SITE_TAGLINE}
            </p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="eyebrow">Explore</h3>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/recipes", label: "All Recipes" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter placeholder */}
          <div className="space-y-4">
            <h3 className="eyebrow">Stay in Touch</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              New recipes delivered straight to your inbox.
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70">
              Newsletter coming soon
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground sm:flex-row">
          <p>&copy; {year} Appropriated Kitchen</p>
          <p>Your Food, My Way</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="text-lg font-bold font-serif">
              {SITE_NAME}
            </Link>
            <p className="text-sm text-muted-foreground italic">{SITE_TAGLINE}</p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </h3>
            <nav className="flex flex-col gap-2">
              <Link href="/recipes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                All Recipes
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
          </div>

          {/* Newsletter placeholder */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Stay in Touch
            </h3>
            <p className="text-sm text-muted-foreground">
              Get new recipes delivered straight to your inbox.
            </p>
            <p className="text-xs text-muted-foreground">
              Newsletter coming soon!
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {year} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
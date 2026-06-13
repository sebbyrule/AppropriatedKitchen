import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterTeaser() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <Mail className="mx-auto h-8 w-8 text-primary mb-4" />
          <h2 className="text-3xl font-bold font-serif sm:text-4xl">Stay in the Loop</h2>
          <p className="mt-4 text-muted-foreground">
            Get new recipes, kitchen tips, and exclusive content delivered to 
            your inbox. No spam, just good food.
          </p>
          <div className="mt-8 flex gap-3">
            <Input
              type="email"
              placeholder="you@example.com"
              className="flex-1"
              aria-label="Email address"
              disabled
            />
            <Button disabled>Subscribe</Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Newsletter signup coming soon — stay tuned!
          </p>
        </div>
      </div>
    </section>
  );
}
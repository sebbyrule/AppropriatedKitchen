import Link from "next/link";
import { Clock } from "lucide-react";
import { DishPlaceholder } from "@/components/shared/DishPlaceholder";
import type { Recipe } from "@/types/recipe";

// Inline sample data until the recipes lib is built
const sampleRecipes: Pick<Recipe, "title" | "slug" | "excerpt" | "prepTime" | "cookTime" | "difficulty" | "tags" | "image">[] = [
  {
    title: "Classic Margherita Pizza",
    slug: "classic-margherita-pizza",
    excerpt: "A simple, authentic Margherita with fresh mozzarella, basil, and San Marzano tomatoes.",
    prepTime: "20 min",
    cookTime: "12 min",
    difficulty: "easy",
    tags: ["italian", "pizza", "vegetarian"],
    image: "",
  },
  {
    title: "Spicy Honey Garlic Chicken",
    slug: "spicy-honey-garlic-chicken",
    excerpt: "Sticky, sweet, and spicy chicken thighs that come together in one pan in under 30 minutes.",
    prepTime: "10 min",
    cookTime: "20 min",
    difficulty: "easy",
    tags: ["chicken", "asian", "quick"],
    image: "",
  },
  {
    title: "Roasted Butternut Squash Soup",
    slug: "roasted-butternut-squash-soup",
    excerpt: "Velvety smooth roasted squash soup with coconut milk and warming spices.",
    prepTime: "15 min",
    cookTime: "45 min",
    difficulty: "medium",
    tags: ["soup", "vegetarian", "fall"],
    image: "",
  },
];

export function FeaturedRecipes() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      {/* Section header */}
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">The Menu</p>
          <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl">
            Featured Recipes
          </h2>
        </div>
        <Link
          href="/recipes"
          className="hidden shrink-0 items-center gap-2 pb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
        >
          View all <span aria-hidden>&rarr;</span>
        </Link>
      </div>

      <div className="mt-5 rule rule-accent" />

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {sampleRecipes.map((recipe, i) => (
          <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className="group">
            <article className="flex h-full flex-col">
              <DishPlaceholder className="aspect-[4/3] w-full" />

              <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="font-serif text-sm normal-case tracking-normal text-primary/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {recipe.prepTime}
                </span>
                <span aria-hidden className="text-border">/</span>
                <span>{recipe.difficulty}</span>
              </div>

              <h3 className="mt-3 font-serif text-2xl font-normal leading-snug transition-colors group-hover:text-primary">
                {recipe.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {recipe.excerpt}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground/80">
                {recipe.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Mobile "View all" link */}
      <div className="mt-12 sm:hidden">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        >
          View all recipes <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Clock, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SITE_NAME } from "@/lib/constants";
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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold font-serif sm:text-4xl">Featured Recipes</h2>
          <p className="mt-2 text-muted-foreground">
            A taste of what {SITE_NAME} has to offer.
          </p>
        </div>
        <Link
          href="/recipes"
          className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all recipes &rarr;
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sampleRecipes.map((recipe) => (
          <Link key={recipe.slug} href={`/recipes/${recipe.slug}`}>
            <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <ChefHat className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {recipe.prepTime} prep
                  </span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {recipe.excerpt}
                </p>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0 flex flex-wrap gap-2">
                <Badge variant="secondary">{recipe.difficulty}</Badge>
                {recipe.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Mobile "View all" link */}
      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/recipes"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all recipes &rarr;
        </Link>
      </div>
    </section>
  );
}
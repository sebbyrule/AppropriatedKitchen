import type { Metadata } from "next";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { getAllRecipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "All Recipes",
  description:
    "Browse all recipes from Appropriated Kitchen — from quick weeknight dinners to weekend showstoppers.",
};

export default function RecipesPage() {
  const recipes = getAllRecipes();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-serif sm:text-5xl">All Recipes</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {recipes.length > 0
            ? `${recipes.length} recipe${recipes.length !== 1 ? "s" : ""} to explore`
            : "Recipes coming soon!"}
        </p>
      </div>

      {recipes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground">No recipes yet</h2>
          <p className="mt-2 text-muted-foreground">
            Check back soon — delicious things are cooking!
          </p>
        </div>
      )}
    </div>
  );
}
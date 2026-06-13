import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { RecipeHeader } from "@/components/recipes/RecipeHeader";
import { IngredientList } from "@/components/recipes/IngredientList";
import { InstructionSteps } from "@/components/recipes/InstructionSteps";
import { NutritionPanel } from "@/components/recipes/NutritionPanel";
import { PrintableRecipe } from "@/components/recipes/PrintableRecipe";
import { getRecipeBySlug, getAllRecipes } from "@/lib/recipes";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};
  return {
    title: recipe.title,
    description: recipe.excerpt,
    openGraph: {
      title: recipe.title,
      description: recipe.excerpt,
      type: "article",
      publishedTime: recipe.date,
      images: recipe.image ? [{ url: recipe.image }] : [],
    },
  };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <RecipeHeader recipe={recipe} />

      <Separator className="my-8" />

      <div className="grid gap-10 md:grid-cols-[1fr_280px]">
        <div className="space-y-10">
          <IngredientList ingredients={recipe.ingredients} />
          <InstructionSteps content={recipe.content} />
        </div>
        <aside className="md:sticky md:top-24 self-start">
          <NutritionPanel nutrition={recipe.nutrition} />
        </aside>
      </div>

      {/* Printable version (hidden in normal view) */}
      <PrintableRecipe recipe={recipe} />
    </div>
  );
}
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { RecipeHeader } from "@/components/recipes/RecipeHeader";
import { InstructionSteps } from "@/components/recipes/InstructionSteps";
import { RecipeWorkspace } from "@/components/recipes/RecipeWorkspace";
import { CookMode } from "@/components/recipes/CookMode";
import { PrintableRecipe } from "@/components/recipes/PrintableRecipe";
import { getRecipeBySlug, getAllRecipes } from "@/lib/recipes";
import { buildRecipeJsonLd } from "@/lib/recipe-jsonld";

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

  const jsonLd = buildRecipeJsonLd(recipe);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <RecipeHeader recipe={recipe} />

      <div className="mt-6 flex justify-end">
        <CookMode
          title={recipe.title}
          ingredients={recipe.ingredients}
          content={recipe.content}
        />
      </div>

      <Separator className="my-8" />

      <RecipeWorkspace
        ingredients={recipe.ingredients}
        nutrition={recipe.nutrition}
        baseServings={recipe.servings}
      >
        <InstructionSteps content={recipe.content} />
      </RecipeWorkspace>

      {/* Printable version (hidden in normal view) */}
      <PrintableRecipe recipe={recipe} />
    </div>
  );
}
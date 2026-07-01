import { DishPlaceholder } from "@/components/shared/DishPlaceholder";
import { Badge } from "@/components/ui/badge";
import { PrintButton } from "@/components/recipes/PrintButton";
import type { Recipe } from "@/types/recipe";

export function RecipeHeader({ recipe }: { recipe: Recipe }) {
  const meta = [
    { label: "Prep", value: recipe.prepTime },
    { label: "Cook", value: recipe.cookTime },
    { label: "Total", value: recipe.totalTime },
    { label: "Serves", value: String(recipe.servings) },
  ];

  return (
    <div className="space-y-8">
      {/* Title block — editorial, type-led */}
      <div className="space-y-5">
        <p className="eyebrow">Recipe</p>
        <h1 className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">
          {recipe.title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {recipe.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge>{recipe.difficulty}</Badge>
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <DishPlaceholder
        className="aspect-[2/1] w-full"
        label={`Appropriated Kitchen`}
      />

      {/* Stat strip — hairline-divided columns */}
      <div className="flex items-center justify-between gap-4">
        <dl className="grid flex-1 grid-cols-2 divide-x divide-border border-y border-border sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label} className="px-4 py-3 first:pl-0">
              <dt className="eyebrow">{m.label}</dt>
              <dd className="mt-1 font-serif text-xl">{m.value}</dd>
            </div>
          ))}
        </dl>
        <PrintButton />
      </div>
    </div>
  );
}
import { Clock, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PrintButton } from "@/components/recipes/PrintButton";
import type { Recipe } from "@/types/recipe";

export function RecipeHeader({ recipe }: { recipe: Recipe }) {
  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="aspect-[2/1] w-full rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
        <ChefHat className="h-20 w-20 text-muted-foreground/40" />
      </div>

      {/* Title & Meta */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold font-serif sm:text-5xl">{recipe.title}</h1>
        <p className="text-lg text-muted-foreground">{recipe.excerpt}</p>

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>Prep: {recipe.prepTime}</span>
          </div>
          <span className="text-border">|</span>
          <span>Cook: {recipe.cookTime}</span>
          <span className="text-border">|</span>
          <span>Total: {recipe.totalTime}</span>
          <span className="text-border">|</span>
          <span>Serves {recipe.servings}</span>
        </div>

        {/* Badges + Print */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{recipe.difficulty}</Badge>
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
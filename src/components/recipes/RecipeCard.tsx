import Link from "next/link";
import { Clock } from "lucide-react";
import { DishPlaceholder } from "@/components/shared/DishPlaceholder";
import type { Recipe } from "@/types/recipe";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group">
      <article className="flex h-full flex-col">
        <DishPlaceholder className="aspect-[4/3] w-full" />

        <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
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
  );
}

import type { ReactNode } from "react";
import type { Ingredient } from "@/types/recipe";
import { cn } from "@/lib/utils";

export function IngredientList({
  ingredients,
  className,
  action,
}: {
  ingredients: Ingredient[];
  className?: string;
  /** Optional control rendered beside the heading (e.g. a volume/weight toggle). */
  action?: ReactNode;
}) {
  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Gather</p>
          <h2 className="mt-2 font-serif text-2xl font-normal">Ingredients</h2>
        </div>
        {action}
      </div>
      <ul className="space-y-2.5 border-t border-border pt-4">
        {ingredients.map((ing, i) => (
          <li key={i} className="flex items-start gap-3 text-base">
            <span className="mt-2 size-1.5 flex-shrink-0 rotate-45 bg-primary" />
            <span>
              {ing.amount && <strong className="font-medium">{ing.amount}</strong>}{" "}
              {ing.name}
              {ing.notes && (
                <span className="text-sm text-muted-foreground"> — {ing.notes}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
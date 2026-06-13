import type { Ingredient } from "@/types/recipe";
import { cn } from "@/lib/utils";

export function IngredientList({
  ingredients,
  className,
}: {
  ingredients: Ingredient[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold font-serif">Ingredients</h2>
      <ul className="space-y-2">
        {ingredients.map((ing, i) => (
          <li key={i} className="flex items-start gap-3 text-base">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
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
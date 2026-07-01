import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Nutrition } from "@/types/recipe";

const nutrientLabels: { key: keyof Nutrition; label: string; unit: string }[] = [
  { key: "calories", label: "Calories", unit: "" },
  { key: "protein", label: "Protein", unit: "" },
  { key: "carbs", label: "Carbs", unit: "" },
  { key: "fat", label: "Fat", unit: "" },
  { key: "fiber", label: "Fiber", unit: "" },
  { key: "sodium", label: "Sodium", unit: "" },
  { key: "sugar", label: "Sugar", unit: "" },
];

export function NutritionPanel({
  nutrition,
  className,
  label = "Per serving",
  action,
}: {
  nutrition: Nutrition;
  className?: string;
  /** Caption under the heading (e.g. "Per serving" / "Whole recipe · 6 servings"). */
  label?: string;
  /** Optional control rendered beside the heading (e.g. a per-serving toggle). */
  action?: ReactNode;
}) {
  return (
    <div className={cn("border border-border bg-card p-6", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-normal">Nutrition</h2>
        {action}
      </div>
      <p className="eyebrow mt-2">{label}</p>
      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
        {nutrientLabels
          .filter((n) => nutrition[n.key] !== undefined && nutrition[n.key] !== null)
          .map((n) => (
            <div key={n.key} className="min-w-0 bg-card p-4 text-center">
              <div className="font-serif text-xl font-light tabular-nums whitespace-nowrap">
                {nutrition[n.key]}
              </div>
              <div className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                {n.label}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
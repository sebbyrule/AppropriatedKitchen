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
}: {
  nutrition: Nutrition;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-6", className)}>
      <h2 className="text-2xl font-bold font-serif mb-4">Nutrition</h2>
      <p className="text-xs text-muted-foreground mb-4">Per serving</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {nutrientLabels
          .filter((n) => nutrition[n.key] !== undefined && nutrition[n.key] !== null)
          .map((n) => (
            <div
              key={n.key}
              className="rounded-lg bg-muted/50 p-3 text-center"
            >
              <div className="text-lg font-bold">
                {nutrition[n.key]}
                {n.key === "calories" ? "" : ""}
              </div>
              <div className="text-xs text-muted-foreground">{n.label}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
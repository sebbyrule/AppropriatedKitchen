"use client";

import {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { IngredientList } from "@/components/recipes/IngredientList";
import { NutritionPanel } from "@/components/recipes/NutritionPanel";
import { ServingScaler } from "@/components/recipes/ServingScaler";
import { scaleAmount, scaleNutrition } from "@/lib/scale";
import { ingredientToGrams, formatGrams } from "@/lib/convert";
import { cn } from "@/lib/utils";
import type { Ingredient, Nutrition } from "@/types/recipe";

type NutritionMode = "serving" | "total";
type MeasureMode = "volume" | "weight";

// In-tab subscribers, so every instance of the hook reacts to a change made by
// another (cross-tab changes arrive via the native "storage" event).
const prefListeners = new Set<() => void>();

/**
 * A display preference persisted across recipes in localStorage. Uses
 * useSyncExternalStore so the SSR/first-paint value is the fallback (no
 * hydration mismatch) and the stored value is adopted right after hydration.
 */
function usePersistentPreference<T extends string>(
  key: string,
  fallback: T,
): [T, (next: T) => void] {
  const subscribe = useCallback((onChange: () => void) => {
    prefListeners.add(onChange);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) onChange();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      prefListeners.delete(onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [key]);

  const getSnapshot = useCallback((): T => {
    try {
      return (localStorage.getItem(key) as T | null) ?? fallback;
    } catch {
      return fallback;
    }
  }, [key, fallback]);

  const value = useSyncExternalStore(subscribe, getSnapshot, () => fallback);

  const set = useCallback(
    (next: T) => {
      try {
        localStorage.setItem(key, next);
      } catch {
        /* ignore write failures */
      }
      prefListeners.forEach((l) => l());
    },
    [key],
  );

  return [value, set];
}

/** Small segmented control matching the tasting-menu styling. */
function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="flex shrink-0 border border-border text-[0.65rem] uppercase tracking-[0.12em]"
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={cn(
            "px-2.5 py-1 transition-colors",
            value === opt.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Interactive recipe body. Owns the serving count, the nutrition basis, and the
 * volume/weight measure mode so the ingredient amounts and nutrition panel all
 * rescale together, live. Instructions are passed through as `children` so they
 * stay server-rendered.
 */
export function RecipeWorkspace({
  ingredients,
  nutrition,
  baseServings,
  children,
}: {
  ingredients: Ingredient[];
  nutrition: Nutrition;
  baseServings: number;
  children: ReactNode;
}) {
  const base = Math.max(1, baseServings || 1);
  // Servings are recipe-specific, so they reset per page...
  const [servings, setServings] = useState(base);
  // ...but the measure + nutrition-basis preferences carry across recipes.
  const [nutritionMode, setNutritionMode] = usePersistentPreference<NutritionMode>(
    "ak:nutrition-basis",
    "serving",
  );
  const [measure, setMeasure] = usePersistentPreference<MeasureMode>(
    "ak:measure",
    "volume",
  );

  const factor = servings / base;

  const displayIngredients = useMemo<Ingredient[]>(
    () =>
      ingredients.map((ing) => {
        if (measure === "weight") {
          const grams = ingredientToGrams(ing.amount, ing.name);
          if (grams !== null) {
            return { ...ing, amount: formatGrams(grams * factor) };
          }
        }
        return { ...ing, amount: scaleAmount(ing.amount, factor) };
      }),
    [ingredients, factor, measure],
  );

  // Stored nutrition is per-serving (invariant). "Whole recipe" = × servings.
  const shownNutrition =
    nutritionMode === "total" ? scaleNutrition(nutrition, servings) : nutrition;
  const nutritionLabel =
    nutritionMode === "total"
      ? `Whole recipe · ${servings} ${servings === 1 ? "serving" : "servings"}`
      : "Per serving";

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_280px]">
      <div className="space-y-10">
        <div className="space-y-5">
          <ServingScaler servings={servings} base={base} onChange={setServings} />
          <IngredientList
            ingredients={displayIngredients}
            action={
              <Segmented
                ariaLabel="Ingredient measure"
                value={measure}
                onChange={setMeasure}
                options={[
                  { value: "volume", label: "Volume" },
                  { value: "weight", label: "Weight" },
                ]}
              />
            }
          />
        </div>
        {children}
      </div>
      <aside className="self-start md:sticky md:top-24">
        <NutritionPanel
          nutrition={shownNutrition}
          label={nutritionLabel}
          action={
            <Segmented
              ariaLabel="Nutrition basis"
              value={nutritionMode}
              onChange={setNutritionMode}
              options={[
                { value: "serving", label: "Serving" },
                { value: "total", label: "Total" },
              ]}
            />
          }
        />
      </aside>
    </div>
  );
}

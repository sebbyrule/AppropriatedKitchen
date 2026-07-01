/**
 * Volume → weight conversion for ingredient amounts.
 *
 * Powers the "Volume / Weight" toggle on the recipe page. Uses each
 * ingredient's density (from the nutrition DB when available, otherwise a
 * curated fallback for common dry goods) to turn "3 cups flour" into grams.
 *
 * Returns null when a confident conversion isn't possible (no quantity, an
 * ambiguous count like "1 bunch", or an unknown ingredient with no unit) — the
 * caller then keeps the original volume measure.
 */

import { parseLeadingQuantity } from "@/lib/scale";
import { lookupIngredient } from "@/lib/nutrition-db";
import { resolveDensity } from "@/lib/ingredient-density";

const CUP_ML = 240;
const TBSP_ML = 15;
const TSP_ML = 5;
const OZ_G = 28.35;
const LB_G = 453.6;

const VOLUME_UNITS: Record<string, number> = {
  cup: CUP_ML, cups: CUP_ML,
  tbsp: TBSP_ML, tablespoon: TBSP_ML, tablespoons: TBSP_ML,
  tsp: TSP_ML, teaspoon: TSP_ML, teaspoons: TSP_ML,
  ml: 1, milliliter: 1, milliliters: 1,
  l: 1000, liter: 1000, liters: 1000, litre: 1000, litres: 1000,
};

const WEIGHT_UNITS: Record<string, number> = {
  g: 1, gram: 1, grams: 1,
  kg: 1000, kilogram: 1000, kilograms: 1000,
  oz: OZ_G, ounce: OZ_G, ounces: OZ_G,
  lb: LB_G, lbs: LB_G, pound: LB_G, pounds: LB_G,
};

const COUNT_UNITS: Record<string, number> = {
  clove: 4, cloves: 4,
};

/**
 * Estimate the weight in grams of an ingredient amount. `amount` carries the
 * quantity + unit ("¾ cup"), `name` the ingredient ("all-purpose flour").
 */
export function ingredientToGrams(amount: string, name: string): number | null {
  const a = (amount ?? "").trim();
  if (!a) return null;

  const parsed = parseLeadingQuantity(a);
  if (!parsed) return null;

  const { value } = parsed;
  const unit = parsed.rest.trim().split(/\s+/)[0]?.toLowerCase().replace(/[.,]/g, "") ?? "";
  const entry = lookupIngredient(name)?.entry;

  if (unit in WEIGHT_UNITS) return value * WEIGHT_UNITS[unit];

  if (unit in VOLUME_UNITS) {
    const density = resolveDensity(name, entry?.density) ?? 1;
    return value * VOLUME_UNITS[unit] * density;
  }

  if (unit in COUNT_UNITS) return value * COUNT_UNITS[unit];

  // Bare count ("2 eggs") or a generic "piece" — only if we know the unit weight.
  if ((unit === "" || unit === "piece" || unit === "pieces") && entry?.unitWeight) {
    return value * entry.unitWeight;
  }

  // pinch / dash / can / bunch / handful / slice → too ambiguous to weigh.
  return null;
}

/** Format grams for display ("6 g", "382 g", "1.2 kg"). */
export function formatGrams(g: number): string {
  if (!Number.isFinite(g) || g <= 0) return "";
  if (g >= 1000) {
    const kg = g / 1000;
    return `${Number.isInteger(kg) ? kg : kg.toFixed(1)} kg`;
  }
  if (g >= 10) return `${Math.round(g)} g`;
  return `${Math.round(g * 10) / 10} g`;
}

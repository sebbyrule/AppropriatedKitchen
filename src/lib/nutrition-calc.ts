/**
 * Local nutrition calculator.
 *
 * Parses ingredient strings (e.g., "2 cups all-purpose flour", "3 cloves garlic")
 * and calculates total nutritional values using the local ingredient database.
 */

import { lookupIngredient } from "@/lib/nutrition-db";
import { resolveDensity } from "@/lib/ingredient-density";

// ───── Volume-to-weight conversions (g per mL) ─────
// These are defaults when the ingredient doesn't have a specific density
const DEFAULT_DENSITY = 1; // g/mL (water-equivalent)

// Standard cup volumes in mL
const CUP_ML = 240;
const TABLESPOON_ML = 15;
const TEASPOON_ML = 5;

// ───── Parsed ingredient ─────
interface ParsedIngredient {
  /** The raw ingredient name (e.g., "all-purpose flour") */
  name: string;
  /** Estimated weight in grams */
  weightGrams: number;
  /** Whether parsing was successful */
  parsed: boolean;
}

/**
 * Parse a single ingredient string into amount + unit + name.
 *
 * Handles formats like:
 *   "2 cups all-purpose flour"
 *   "1 tbsp olive oil"
 *   "3 cloves garlic"
 *   "8 oz fresh mozzarella"
 *   "½ cup milk"
 *   "1 tsp salt"
 *   "200g pasta"
 */
function parseIngredientString(raw: string): ParsedIngredient {
  const trimmed = raw.trim();

  // Match: [amount] [unit] [name]  or  [amount][unit] [name]
  // Amount can be: digits, fractions (½, ¼, ¾, ⅓, ⅔, ⅛, ⅜, ⅝, ⅞), or mixed (1 ½)
  const fractionMap: Record<string, number> = {
    "½": 0.5, "¼": 0.25, "¾": 0.75, "⅓": 0.333, "⅔": 0.667,
    "⅛": 0.125, "⅜": 0.375, "⅝": 0.625, "⅞": 0.875,
  };

  // Normalize fractions in the string
  let normalized = trimmed;
  for (const [frac, val] of Object.entries(fractionMap)) {
    normalized = normalized.replace(frac, ` ${val} `);
  }

  // Try to extract amount and unit
  const pattern = /^([\d.\s]+)\s*(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|oz|ounce|ounces|lb|lbs|pound|pounds|g|gram|grams|kg|kg|ml|milliliter|milliliters|clove|cloves|piece|pieces|slice|slices|pinch|dash|handful|can|cans|bunch)\s*(.+)$/i;
  const match = normalized.match(pattern);

  if (!match) {
    // Try just [amount] [name] (no unit — assume count or weight)
    const simplePattern = /^([\d.]+)\s*(.+)$/;
    const simpleMatch = trimmed.match(simplePattern);
    if (simpleMatch) {
      const amount = parseFloat(simpleMatch[1]);
      const name = simpleMatch[2].trim();
      return estimateWeight(name, amount, "count");
    }
    // No amount at all — assume 1 serving/unit
    return estimateWeight(trimmed, 1, "count");
  }

  const amount = parseFloat(match[1].trim());
  const unit = match[2].toLowerCase();
  const name = match[3].trim();

  return estimateWeight(name, amount, unit);
}

/**
 * Estimate the weight of an ingredient given an amount and unit.
 */
function estimateWeight(name: string, amount: number, unit: string): ParsedIngredient {
  const lookup = lookupIngredient(name);
  const entry = lookup?.entry;
  const density = resolveDensity(name, entry?.density) ?? DEFAULT_DENSITY;

  let weightGrams = 0;

  switch (unit) {
    case "cup":
    case "cups": {
      weightGrams = amount * CUP_ML * density;
      break;
    }
    case "tbsp":
    case "tablespoon":
    case "tablespoons": {
      weightGrams = amount * TABLESPOON_ML * density;
      break;
    }
    case "tsp":
    case "teaspoon":
    case "teaspoons": {
      weightGrams = amount * TEASPOON_ML * density;
      break;
    }
    case "oz":
    case "ounce":
    case "ounces": {
      weightGrams = amount * 28.35;
      break;
    }
    case "lb":
    case "lbs":
    case "pound":
    case "pounds": {
      weightGrams = amount * 453.6;
      break;
    }
    case "g":
    case "gram":
    case "grams": {
      weightGrams = amount;
      break;
    }
    case "kg": {
      weightGrams = amount * 1000;
      break;
    }
    case "ml":
    case "milliliter":
    case "milliliters": {
      weightGrams = amount * density;
      break;
    }
    case "clove":
    case "cloves": {
      // Garlic clove ~4g
      weightGrams = amount * 4;
      break;
    }
    case "slice":
    case "slices": {
      // Generic slice ~30g (bread, cheese, etc.)
      weightGrams = amount * 30;
      break;
    }
    case "piece":
    case "pieces": {
      // Generic piece — use unitWeight if available, else 50g
      weightGrams = amount * (entry?.unitWeight ?? 50);
      break;
    }
    case "pinch": {
      weightGrams = amount * 0.3;
      break;
    }
    case "dash": {
      weightGrams = amount * 0.6;
      break;
    }
    case "handful": {
      weightGrams = amount * 30;
      break;
    }
    case "can":
    case "cans": {
      // Standard can ~400g (drained weight varies)
      weightGrams = amount * 400;
      break;
    }
    case "bunch": {
      // Generic bunch ~100g
      weightGrams = amount * 100;
      break;
    }
    default: {
      // Count — use unitWeight if available
      weightGrams = amount * (entry?.unitWeight ?? 50);
    }
  }

  return {
    name,
    weightGrams: Math.round(weightGrams),
    parsed: true,
  };
}

// ───── Nutrition Calculation ─────

export interface CalculatedNutrition {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber?: string;
  sodium?: string;
  sugar?: string;
  /** Per-serving values */
  perServing: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber?: string;
    sodium?: string;
    sugar?: string;
  };
  /** Warnings about ingredients that couldn't be looked up */
  warnings: string[];
  /** Total weight in grams */
  totalWeightGrams: number;
}

/**
 * Calculate nutrition for a list of ingredient strings.
 *
 * @param ingredients - Array of ingredient strings (e.g., ["2 cups flour", "1 tbsp oil"])
 * @param servings - Number of servings to divide by
 * @returns CalculatedNutrition with totals and per-serving values
 */
export function calculateNutrition(
  ingredients: { amount: string; name: string }[],
  servings: number = 1
): CalculatedNutrition {
  const warnings: string[] = [];
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;
  let totalSodium = 0;
  let totalSugar = 0;
  let totalWeight = 0;
  let hasFiber = false;
  let hasSodium = false;
  let hasSugar = false;

  for (const ing of ingredients) {
    const ingredientStr = `${ing.amount} ${ing.name}`.trim();
    const parsed = parseIngredientString(ingredientStr);

    if (!parsed.parsed || parsed.weightGrams <= 0) {
      warnings.push(`Could not parse: "${ingredientStr}"`);
      continue;
    }

    const lookup = lookupIngredient(parsed.name);
    if (!lookup) {
      warnings.push(`Unknown ingredient: "${parsed.name}" (from "${ingredientStr}")`);
      continue;
    }

    const n = lookup.entry.nutrition;
    const weight = parsed.weightGrams;
    const factor = weight / 100; // Nutrition values are per 100g

    totalCalories += n.calories * factor;
    totalProtein += n.protein * factor;
    totalCarbs += n.carbs * factor;
    totalFat += n.fat * factor;
    totalWeight += weight;

    if (n.fiber !== undefined) {
      totalFiber += n.fiber * factor;
      hasFiber = true;
    }
    if (n.sodium !== undefined) {
      // DB stores sodium in grams per 100g (like every other nutrient), so no
      // extra mg→g conversion here — just scale by weight.
      totalSodium += n.sodium * factor;
      hasSodium = true;
    }
    if (n.sugar !== undefined) {
      totalSugar += n.sugar * factor;
      hasSugar = true;
    }
  }

  const round = (v: number) => Math.round(v);
  const fmtG = (v: number) => `${round(v)}g`;

  const totals = {
    calories: round(totalCalories),
    protein: fmtG(totalProtein),
    carbs: fmtG(totalCarbs),
    fat: fmtG(totalFat),
    fiber: hasFiber ? fmtG(totalFiber) : undefined,
    sodium: hasSodium ? fmtG(totalSodium) : undefined,
    sugar: hasSugar ? fmtG(totalSugar) : undefined,
  };

  const safeServings = Math.max(1, servings);

  return {
    ...totals,
    perServing: {
      calories: round(totalCalories / safeServings),
      protein: fmtG(totalProtein / safeServings),
      carbs: fmtG(totalCarbs / safeServings),
      fat: fmtG(totalFat / safeServings),
      fiber: hasFiber ? fmtG(totalFiber / safeServings) : undefined,
      sodium: hasSodium ? fmtG(totalSodium / safeServings) : undefined,
      sugar: hasSugar ? fmtG(totalSugar / safeServings) : undefined,
    },
    warnings,
    totalWeightGrams: round(totalWeight),
  };
}
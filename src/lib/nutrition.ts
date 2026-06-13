/**
 * Nutrition API client for Edamam Nutrition Analysis API.
 *
 * Phase A (current): CLI script-based — run scripts/nutrition-fetch.ts
 * Phase B (future):  Build-time automated fetch for new/modified recipes
 */

import type { Nutrition } from "@/types/recipe";

const EDAMAM_API_URL = "https://api.edamam.com/api/nutrition-details";

interface EdamamNutrients {
  ENERC_KCAL?: { quantity: number; unit: string };
  PROCNT?: { quantity: number; unit: string };
  CHOCDF?: { quantity: number; unit: string };
  FAT?: { quantity: number; unit: string };
  FIBTG?: { quantity: number; unit: string };
  NA?: { quantity: number; unit: string };
  SUGAR?: { quantity: number; unit: string };
}

interface EdamamResponse {
  totalNutrients?: EdamamNutrients;
  yield?: number;
  error?: string;
}

function formatNutrient(value: number | undefined): string {
  if (value === undefined) return "0g";
  return `${Math.round(value)}g`;
}

/**
 * Fetch nutritional data from Edamam API for a list of ingredient strings.
 *
 * @param ingredients - Array of ingredient strings (e.g., ["2 cups flour", "1 tbsp sugar"])
 * @param title - Optional recipe title
 * @returns Parsed Nutrition object
 */
export async function fetchNutrition(
  ingredients: string[],
  title?: string
): Promise<Nutrition> {
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;

  if (!appId || !appKey) {
    throw new Error(
      "Missing EDAMAM_APP_ID or EDAMAM_APP_KEY environment variables"
    );
  }

  const response = await fetch(
    `${EDAMAM_API_URL}?app_id=${appId}&app_key=${appKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title || "Recipe",
        ingr: ingredients,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Edamam API error: ${response.status} ${response.statusText}`);
  }

  const data: EdamamResponse = await response.json();

  if (data.error) {
    throw new Error(`Edamam API error: ${data.error}`);
  }

  const n = data.totalNutrients || {};

  return {
    calories: Math.round(n.ENERC_KCAL?.quantity || 0),
    protein: formatNutrient(n.PROCNT?.quantity),
    carbs: formatNutrient(n.CHOCDF?.quantity),
    fat: formatNutrient(n.FAT?.quantity),
    fiber: n.FIBTG ? formatNutrient(n.FIBTG.quantity) : undefined,
    sodium: n.NA ? formatNutrient(n.NA.quantity) : undefined,
    sugar: n.SUGAR ? formatNutrient(n.SUGAR.quantity) : undefined,
  };
}
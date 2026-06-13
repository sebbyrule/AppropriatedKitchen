/**
 * Nutrition module — uses the local ingredient database.
 *
 * No API keys needed. Calculates nutrition from ingredient strings
 * using a built-in database of 150+ common cooking ingredients.
 *
 * For best results, use the CLI tool to generate frontmatter:
 *   npx tsx scripts/nutrition-calc.ts --servings 4 "2 cups flour, 1 tbsp oil"
 *
 * Then paste the output into your recipe's frontmatter `nutrition:` field.
 */

import { calculateNutrition } from "@/lib/nutrition-calc";
import type { Nutrition } from "@/types/recipe";

/**
 * Calculate nutrition for a list of ingredient objects.
 *
 * @param ingredients - Array of { amount, name } objects from recipe frontmatter
 * @param servings - Number of servings
 * @returns Nutrition object suitable for recipe frontmatter
 */
export function calculateRecipeNutrition(
  ingredients: { amount: string; name: string }[],
  servings: number = 1
): Nutrition {
  const result = calculateNutrition(ingredients, servings);

  return {
    calories: result.perServing.calories,
    protein: result.perServing.protein,
    carbs: result.perServing.carbs,
    fat: result.perServing.fat,
    fiber: result.perServing.fiber,
    sodium: result.perServing.sodium,
    sugar: result.perServing.sugar,
  };
}
/**
 * Builds schema.org/Recipe structured data (JSON-LD) for a recipe page.
 *
 * Emitting this lets Google render rich recipe results — photo, star ratings,
 * cook time, and calories — directly in search. Every field is derived from
 * data the recipe already carries in frontmatter.
 *
 * Reference: https://developers.google.com/search/docs/appearance/structured-data/recipe
 */

import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { parseSteps, stepPlainText } from "@/lib/recipe-steps";
import type { Recipe } from "@/types/recipe";

/** "20 min", "1 hr 30 min", "2 hours" → ISO-8601 duration ("PT20M", "PT1H30M"). */
export function toISODuration(input: string): string | undefined {
  if (!input) return undefined;
  const s = input.toLowerCase();

  const hours = s.match(/(\d+)\s*(?:hours?|hrs?|h)\b/);
  const mins = s.match(/(\d+)\s*(?:minutes?|mins?|m)\b/);

  let h = hours ? parseInt(hours[1], 10) : 0;
  let m = mins ? parseInt(mins[1], 10) : 0;

  if (!hours && !mins) {
    const n = s.match(/(\d+)/);
    if (!n) return undefined;
    m = parseInt(n[1], 10); // bare number → minutes
    h = 0;
  }

  if (h === 0 && m === 0) return undefined;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}`;
}

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl, SITE_URL).toString();
}

export function buildRecipeJsonLd(recipe: Recipe): Record<string, unknown> {
  const n = recipe.nutrition;
  const steps = parseSteps(recipe.content).map(stepPlainText).filter(Boolean);

  const nutrition: Record<string, string> = {
    "@type": "NutritionInformation",
    calories: `${n.calories} calories`,
  };
  if (n.protein) nutrition.proteinContent = n.protein;
  if (n.carbs) nutrition.carbohydrateContent = n.carbs;
  if (n.fat) nutrition.fatContent = n.fat;
  if (n.fiber) nutrition.fiberContent = n.fiber;
  if (n.sodium) nutrition.sodiumContent = n.sodium;
  if (n.sugar) nutrition.sugarContent = n.sugar;

  const prep = toISODuration(recipe.prepTime);
  const cook = toISODuration(recipe.cookTime);
  const total = toISODuration(recipe.totalTime);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.excerpt,
    datePublished: recipe.date,
    author: { "@type": "Organization", name: SITE_NAME },
    recipeYield: `${recipe.servings} servings`,
    recipeIngredient: recipe.ingredients
      .map((i) => [i.amount, i.name].filter(Boolean).join(" ").trim() + (i.notes ? `, ${i.notes}` : ""))
      .map((s) => s.trim())
      .filter(Boolean),
    nutrition,
    url: absoluteUrl(`/recipes/${recipe.slug}`),
  };

  if (recipe.image) jsonLd.image = [absoluteUrl(recipe.image)];
  if (prep) jsonLd.prepTime = prep;
  if (cook) jsonLd.cookTime = cook;
  if (total) jsonLd.totalTime = total;
  if (recipe.tags?.length) jsonLd.keywords = recipe.tags.join(", ");
  if (steps.length) {
    jsonLd.recipeInstructions = steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    }));
  }

  return jsonLd;
}

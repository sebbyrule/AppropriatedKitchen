/**
 * Nutrition Fetch CLI Tool
 *
 * Fetches nutritional data from the Edamam Nutrition Analysis API
 * and outputs it as YAML-ready frontmatter for recipe files.
 *
 * Usage:
 *   npx tsx scripts/nutrition-fetch.ts "2 cups flour, 1 tbsp sugar, 3 eggs"
 *   npx tsx scripts/nutrition-fetch.ts --title "My Recipe" "2 cups flour, 1 tbsp sugar"
 *
 * Environment variables (in .env.local):
 *   EDAMAM_APP_ID=your_app_id
 *   EDAMAM_APP_KEY=your_app_key
 */

const EDAMAM_API_URL = "https://api.edamam.com/api/nutrition-details";

interface EdamamResponse {
  uri?: string;
  yield?: number;
  calories?: number;
  totalWeight?: number;
  totalNutrients?: {
    ENERC_KCAL?: { quantity: number; unit: string };
    PROCNT?: { quantity: number; unit: string };
    CHOCDF?: { quantity: number; unit: string };
    FAT?: { quantity: number; unit: string };
    FIBTG?: { quantity: number; unit: string };
    NA?: { quantity: number; unit: string };
    SUGAR?: { quantity: number; unit: string };
  };
  error?: string;
  message?: string;
}

function formatNutrient(value: number | undefined, unit: string): string {
  if (value === undefined) return "";
  if (unit === "g") {
    return `${Math.round(value)}g`;
  }
  return `${Math.round(value)}g`;
}

function roundCalories(value: number | undefined): number {
  if (value === undefined) return 0;
  return Math.round(value);
}

async function fetchNutrition(
  ingredients: string[],
  title?: string
): Promise<EdamamResponse> {
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;

  if (!appId || !appKey) {
    console.error("\n❌ Missing Edamam credentials.");
    console.error("   Set EDAMAM_APP_ID and EDAMAM_APP_KEY in .env.local.");
    console.error("   Get yours at: https://developer.edamam.com/edamam-nutrition-api\n");
    process.exit(1);
  }

  const url = `${EDAMAM_API_URL}?app_id=${appId}&app_key=${appKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title || "Recipe",
      ingr: ingredients,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`\n❌ API error (${response.status}): ${errorBody}\n`);
    process.exit(1);
  }

  return response.json();
}

function main() {
  const args = process.argv.slice(2);
  let title = "Recipe";
  let ingredientArg = args.join(" ");

  // Check for --title flag
  const titleIndex = args.indexOf("--title");
  if (titleIndex !== -1 && titleIndex + 1 < args.length) {
    title = args[titleIndex + 1];
    // Remove title flag and value from ingredient list
    const filtered = [...args];
    filtered.splice(titleIndex, 2);
    ingredientArg = filtered.join(" ");
  }

  if (!ingredientArg) {
    console.log(`
🧑‍🍳 Nutrition Fetch — Edamam API CLI

Usage:
  npx tsx scripts/nutrition-fetch.ts "2 cups flour, 1 tbsp sugar, 3 eggs"
  npx tsx scripts/nutrition-fetch.ts --title "My Recipe" "2 cups flour, 1 tbsp sugar"

Requires EDAMAM_APP_ID and EDAMAM_APP_KEY in .env.local
    `);
    process.exit(0);
  }

  const ingredients = ingredientArg
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

  console.log(`\n🔍 Fetching nutrition for: ${ingredients.join(", ")}\n`);

  fetchNutrition(ingredients, title).then((data) => {
    if (data.error || data.message) {
      console.error(`\n❌ API error: ${data.error || data.message}\n`);
      process.exit(1);
    }

    const nutrients = data.totalNutrients;
    const calories = roundCalories(nutrients?.ENERC_KCAL?.quantity);
    const protein = formatNutrient(nutrients?.PROCNT?.quantity, "g");
    const carbs = formatNutrient(nutrients?.CHOCDF?.quantity, "g");
    const fat = formatNutrient(nutrients?.FAT?.quantity, "g");
    const fiber = formatNutrient(nutrients?.FIBTG?.quantity, "g");
    const sodium = formatNutrient(nutrients?.NA?.quantity, "g");
    const sugar = formatNutrient(nutrients?.SUGAR?.quantity, "g");
    const servings = data.yield || 1;

    // Output as YAML block for easy copy-paste into recipe frontmatter
    console.log("📋 Copy this into your recipe frontmatter:\n");
    console.log(`nutrition:`);
    console.log(`  calories: ${calories}`);
    if (protein) console.log(`  protein: "${protein}"`);
    if (carbs) console.log(`  carbs: "${carbs}"`);
    if (fat) console.log(`  fat: "${fat}"`);
    if (fiber) console.log(`  fiber: "${fiber}"`);
    if (sodium) console.log(`  sodium: "${sodium}"`);
    if (sugar) console.log(`  sugar: "${sugar}"`);
    console.log("");
    console.log(`ℹ️  Based on ${servings} serving(s).`);
    console.log(`   Total weight: ${Math.round(data.totalWeight || 0)}g\n`);
  });
}

main();
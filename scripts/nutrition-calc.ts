/**
 * Nutrition Calculator CLI Tool
 *
 * Calculates nutritional data from ingredient strings using the local
 * ingredient database. No API keys needed.
 *
 * Usage:
 *   npx tsx scripts/nutrition-calc.ts "2 cups flour, 1 tbsp sugar, 3 eggs"
 *   npx tsx scripts/nutrition-calc.ts --servings 4 "2 cups flour, 1 cup milk, 2 eggs"
 */

import { calculateNutrition } from "../src/lib/nutrition-calc";

function main() {
  const args = process.argv.slice(2);
  let servings = 1;
  let ingredientArg = args.join(" ");

  // Check for --servings flag
  const servingsIndex = args.indexOf("--servings");
  if (servingsIndex !== -1 && servingsIndex + 1 < args.length) {
    servings = parseInt(args[servingsIndex + 1], 10) || 1;
    const filtered = [...args];
    filtered.splice(servingsIndex, 2);
    ingredientArg = filtered.join(" ");
  }

  if (!ingredientArg) {
    console.log(`
🧑‍🍳 Nutrition Calculator — Local Ingredient Database

Usage:
  npx tsx scripts/nutrition-calc.ts "2 cups flour, 1 tbsp sugar, 3 eggs"
  npx tsx scripts/nutrition-calc.ts --servings 4 "2 cups flour, 1 cup milk, 2 eggs"

No API keys required — uses a built-in database of 150+ common ingredients.
    `);
    process.exit(0);
  }

  const ingredientStrings = ingredientArg
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

  // Convert to { amount, name } format
  const ingredients = ingredientStrings.map((str) => {
    // Split on first space to get amount vs name
    const match = str.match(/^([\d./½¼¾⅓⅔⅛⅜⅝⅞\s]+)\s+(.+)/);
    if (match) {
      return { amount: match[1].trim(), name: match[2].trim() };
    }
    return { amount: "", name: str };
  });

  console.log(`\n🔍 Calculating nutrition for:`);
  ingredients.forEach((ing) => console.log(`   • ${ing.amount} ${ing.name}`));
  console.log(`   Servings: ${servings}\n`);

  const result = calculateNutrition(ingredients, servings);

  if (result.warnings.length > 0) {
    console.log("⚠️  Warnings:");
    result.warnings.forEach((w) => console.log(`   • ${w}`));
    console.log("");
  }

  console.log(`📊 Total (${result.totalWeightGrams}g):`);
  console.log(`   Calories: ${result.calories}`);
  console.log(`   Protein:  ${result.protein}`);
  console.log(`   Carbs:    ${result.carbs}`);
  console.log(`   Fat:      ${result.fat}`);
  if (result.fiber) console.log(`   Fiber:    ${result.fiber}`);
  if (result.sodium) console.log(`   Sodium:   ${result.sodium}`);
  if (result.sugar) console.log(`   Sugar:    ${result.sugar}`);

  console.log(`\n📋 Per serving (${servings} servings):`);
  console.log(`   Calories: ${result.perServing.calories}`);
  console.log(`   Protein:  ${result.perServing.protein}`);
  console.log(`   Carbs:    ${result.perServing.carbs}`);
  console.log(`   Fat:      ${result.perServing.fat}`);
  if (result.perServing.fiber) console.log(`   Fiber:    ${result.perServing.fiber}`);
  if (result.perServing.sodium) console.log(`   Sodium:   ${result.perServing.sodium}`);
  if (result.perServing.sugar) console.log(`   Sugar:    ${result.perServing.sugar}`);

  console.log(`\n📋 Copy this into your recipe frontmatter:\n`);
  console.log(`nutrition:`);
  console.log(`  calories: ${result.perServing.calories}`);
  console.log(`  protein: "${result.perServing.protein}"`);
  console.log(`  carbs: "${result.perServing.carbs}"`);
  console.log(`  fat: "${result.perServing.fat}"`);
  if (result.perServing.fiber) console.log(`  fiber: "${result.perServing.fiber}"`);
  if (result.perServing.sodium) console.log(`  sodium: "${result.perServing.sodium}"`);
  if (result.perServing.sugar) console.log(`  sugar: "${result.perServing.sugar}"`);
  console.log("");
}

main();
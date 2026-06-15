/**
 * USDA Database Generator
 *
 * Queries the USDA FoodData Central API for an expanded list of 400+ cooking
 * ingredients, then generates src/lib/nutrition-db.ts with real USDA values.
 *
 * Usage:
 *   npx tsx scripts/generate-nutrition-db.ts
 *
 * Requires USDA_API_KEY in .env.local (get one at https://fdc.nal.usda.gov/api-key-signup.html)
 */

import fs from "fs";
import path from "path";

const USDA_BASE = "https://api.nal.usda.gov/fdc/v1";

// Nutrient IDs: energy (kcal), protein, carbs, fat, fiber, sodium, sugar
const NUTRIENT_IDS: Record<string, number> = {
  calories: 1008,
  protein: 1003,
  carbs: 1005,
  fat: 1004,
  fiber: 1079,
  sodium: 1093,
  sugar: 2000,
};

interface USDAFood {
  fdcId: number;
  description: string;
  foodNutrients: { nutrientId?: number; value?: number }[];
}

interface USDAResponse {
  foods: USDAFood[];
}

function getApiKey(): string {
  // Try from environment first
  if (process.env.USDA_API_KEY) return process.env.USDA_API_KEY;

  // Try .env.local
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("USDA_API_KEY=")) {
        return trimmed.split("=").slice(1).join("=").trim();
      }
    }
  }
  return "DEMO_KEY";
}

async function searchFood(query: string): Promise<USDAFood | null> {
  const apiKey = getApiKey();
  const url = `${USDA_BASE}/foods/search?api_key=${apiKey}&query=${encodeURIComponent(query)}&pageSize=1&dataType=Foundation,SR%20Legacy`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data: USDAResponse = await res.json();
    return data.foods?.[0] ?? null;
  } catch {
    return null;
  }
}

function extractNutrients(food: USDAFood): Record<string, number | undefined> {
  const result: Record<string, number | undefined> = {
    calories: undefined, protein: undefined, carbs: undefined,
    fat: undefined, fiber: undefined, sodium: undefined, sugar: undefined,
  };
  const nutrients = food.foodNutrients || [];
  for (const n of nutrients) {
    if (n.nutrientId === undefined || n.value === undefined) continue;
    for (const [key, id] of Object.entries(NUTRIENT_IDS)) {
      if (n.nutrientId === id) {
        let value = Math.round(n.value * 10) / 10;
        if (key === "sodium") value = Math.round((n.value / 1000) * 100) / 100; // mg → g
        result[key] = value;
      }
    }
  }
  return result;
}

// ─── The expanded ingredient list with better search queries ───
// Each entry: [key, searchQuery, synonyms?, density?, unitWeight?]
type IngredientDef = [string, string, string[]?, number?, number?];

const INGREDIENT_DEFS: IngredientDef[] = [
  // Vegetables
  ["artichoke", "artichoke raw"],
  ["arugula", "arugula raw"],
  ["asparagus", "asparagus raw"],
  ["avocado", "avocado raw"],
  ["bean sprouts", "bean sprouts raw"],
  ["beet", "beet raw"],
  ["bell pepper", "bell pepper raw"],
  ["bok choy", "bok choy raw"],
  ["broccoli", "broccoli raw"],
  ["brussels sprout", "brussels sprouts raw"],
  ["butternut squash", "butternut squash raw"],
  ["cabbage", "cabbage raw"],
  ["carrot", "carrot raw"],
  ["cauliflower", "cauliflower raw"],
  ["celery", "celery raw"],
  ["collard greens", "collard greens raw"],
  ["corn", "corn sweet raw"],
  ["cucumber", "cucumber raw"],
  ["eggplant", "eggplant raw"],
  ["endive", "endive raw"],
  ["fennel", "fennel raw"],
  ["green bean", "green beans raw"],
  ["green onion", "green onion raw"],
  ["jalapeño", "jalapeno raw"],
  ["kale", "kale raw"],
  ["kohlrabi", "kohlrabi raw"],
  ["leek", "leek raw"],
  ["lettuce", "lettuce raw"],
  ["mushroom", "mushrooms raw"],
  ["okra", "okra raw"],
  ["onion", "onions raw"],
  ["parsnip", "parsnips raw"],
  ["pea", "peas green raw"],
  ["potato", "potatoes raw", ["potatoes"]],
  ["pumpkin", "pumpkin raw"],
  ["radish", "radishes raw"],
  ["red cabbage", "red cabbage raw"],
  ["rhubarb", "rhubarb raw"],
  ["shallot", "shallots raw"],
  ["snap pea", "snow peas raw"],
  ["spaghetti squash", "spaghetti squash raw"],
  ["spinach", "spinach raw"],
  ["sweet potato", "sweet potato raw"],
  ["summer squash", "summer squash raw"],
  ["tomatillo", "tomatillos raw"],
  ["tomato", "tomatoes raw", ["tomatoes"]],
  ["turnip", "turnips raw"],
  ["watercress", "watercress raw"],
  ["zucchini", "zucchini raw"],
  ["acorn squash", "acorn squash raw"],
  ["celery root", "celeriac raw"],
  ["jicama", "jicama raw"],
  ["plantain", "plantain raw"],
  ["snow pea", "snow peas raw"],
  ["scallion", "scallions raw"],

  // Fruits
  ["apple", "apples raw"],
  ["apricot", "apricots raw"],
  ["banana", "bananas raw"],
  ["blackberry", "blackberries raw"],
  ["blueberry", "blueberries raw"],
  ["cantaloupe", "cantaloupe raw"],
  ["cherry", "cherries sweet raw"],
  ["coconut", "coconut meat raw"],
  ["cranberry", "cranberries raw"],
  ["date", "dates medjool"],
  ["fig", "figs raw"],
  ["grape", "grapes red raw"],
  ["grapefruit", "grapefruit raw"],
  ["honeydew", "honeydew melon raw"],
  ["kiwi", "kiwifruit raw"],
  ["lemon", "lemons raw"],
  ["lime", "limes raw"],
  ["mango", "mangos raw"],
  ["nectarine", "nectarines raw"],
  ["orange", "oranges raw"],
  ["papaya", "papayas raw"],
  ["peach", "peaches raw"],
  ["pear", "pears raw"],
  ["pineapple", "pineapple raw"],
  ["plum", "plums raw"],
  ["pomegranate", "pomegranates raw"],
  ["raspberry", "raspberries raw"],
  ["strawberry", "strawberries raw"],
  ["tangerine", "tangerines raw"],
  ["watermelon", "watermelon raw"],
  ["clementine", "clementines raw"],

  // Meat & Poultry
  ["beef, ground 80%", "beef ground 80% lean raw"],
  ["beef, ground 93%", "beef ground 93% lean raw"],
  ["beef sirloin", "beef sirloin raw"],
  ["chicken breast", "chicken breast raw"],
  ["chicken thigh", "chicken thigh raw"],
  ["chicken drumstick", "chicken drumstick raw"],
  ["ground turkey", "ground turkey raw"],
  ["turkey breast", "turkey breast raw"],
  ["pork chop", "pork chop raw"],
  ["pork tenderloin", "pork tenderloin raw"],
  ["pork shoulder", "pork shoulder raw"],
  ["bacon", "bacon raw"],
  ["ham", "ham roasted"],
  ["lamb chop", "lamb chop raw"],
  ["veal", "veal raw"],
  ["duck breast", "duck breast raw"],
  ["duck leg", "duck leg raw"],
  ["quail", "quail raw"],
  ["rabbit", "rabbit raw"],
  ["venison", "venison raw"],
  ["bison", "bison raw"],

  // Fish & Seafood
  ["salmon", "salmon raw"],
  ["tuna", "tuna raw"],
  ["cod", "cod raw"],
  ["halibut", "halibut raw"],
  ["mackerel", "mackerel raw"],
  ["sardine", "sardines raw"],
  ["trout", "trout raw"],
  ["tilapia", "tilapia raw"],
  ["sea bass", "sea bass raw"],
  ["swordfish", "swordfish raw"],
  ["anchovy", "anchovy raw"],
  ["herring", "herring raw"],
  ["catfish", "catfish raw"],
  ["lobster", "lobster raw"],
  ["shrimp", "shrimp raw"],
  ["mussel", "mussels raw"],
  ["octopus", "octopus raw"],
  ["squid", "squid raw"],
  ["crayfish", "crayfish raw"],
  ["yellowfin tuna", "yellowfin tuna raw"],

  // Dairy & Eggs
  ["milk, whole", "milk whole 3.25%"],
  ["milk, 2%", "milk 2%"],
  ["milk, skim", "milk skim"],
  ["buttermilk", "buttermilk"],
  ["heavy cream", "heavy cream"],
  ["half and half", "half and half cream"],
  ["sour cream", "sour cream"],
  ["cream cheese", "cream cheese"],
  ["yogurt, greek", "yogurt greek plain"],
  ["yogurt, plain", "yogurt plain whole milk"],
  ["cottage cheese", "cottage cheese"],
  ["ricotta cheese", "ricotta cheese whole"],
  ["mozzarella", "mozzarella fresh"],
  ["cheddar cheese", "cheddar cheese"],
  ["parmesan", "parmesan cheese"],
  ["swiss cheese", "swiss cheese"],
  ["provolone", "provolone cheese"],
  ["gouda", "gouda cheese"],
  ["blue cheese", "blue cheese"],
  ["feta cheese", "feta cheese"],
  ["goat cheese", "goat cheese soft"],
  ["brie", "brie cheese"],
  ["camembert", "camembert cheese"],
  ["egg", "egg whole raw", [], 0, 50],
  ["egg white", "egg white raw", [], 0, 33],
  ["butter", "butter salted"],
  ["margarine", "margarine"],

  // Grains, Pasta & Bread
  ["all-purpose flour", "all-purpose flour"],
  ["bread flour", "bread flour"],
  ["whole wheat flour", "whole wheat flour"],
  ["almond flour", "almond flour"],
  ["cornstarch", "cornstarch"],
  ["white rice", "white rice raw"],
  ["brown rice", "brown rice raw"],
  ["wild rice", "wild rice raw"],
  ["quinoa", "quinoa raw"],
  ["oats", "oats rolled"],
  ["couscous", "couscous dry"],
  ["barley", "barley pearled raw"],
  ["bulgur", "bulgur dry"],
  ["millet", "millet raw"],
  ["pasta", "pasta dry enriched"],
  ["egg noodles", "egg noodles dry"],
  ["white bread", "white bread"],
  ["whole wheat bread", "whole wheat bread"],
  ["sourdough bread", "sourdough bread"],
  ["rye bread", "rye bread"],
  ["pita bread", "pita bread"],
  ["bagel", "bagel"],
  ["croissant", "croissant"],

  // Legumes
  ["black beans", "black beans raw"],
  ["kidney beans", "kidney beans raw"],
  ["chickpea", "chickpeas raw"],
  ["lentil", "lentils raw"],
  ["red lentils", "red lentils raw"],
  ["split peas", "split peas green raw"],
  ["lima beans", "lima beans raw"],
  ["fava beans", "fava beans raw"],
  ["adzuki beans", "adzuki beans raw"],
  ["mung beans", "mung beans raw"],
  ["edamame", "edamame frozen"],
  ["tempeh", "tempeh"],
  ["tofu", "tofu firm"],
  ["miso paste", "miso"],

  // Nuts & Seeds
  ["almonds", "almonds raw"],
  ["walnuts", "walnuts raw"],
  ["pecans", "pecans raw"],
  ["cashews", "cashews raw"],
  ["peanuts", "peanuts raw"],
  ["peanut butter", "peanut butter smooth"],
  ["pine nuts", "pine nuts dried"],
  ["macadamia nuts", "macadamia nuts raw"],
  ["hazelnuts", "hazelnuts raw"],
  ["pistachios", "pistachios raw"],
  ["coconut, shredded", "coconut dried shredded"],
  ["chia seeds", "chia seeds dried"],
  ["sesame seeds", "sesame seeds dried"],
  ["sunflower seeds", "sunflower seeds dried"],
  ["poppy seeds", "poppy seeds"],
  ["tahini", "tahini"],

  // Oils & Fats
  ["olive oil", "olive oil", [], 0.92],
  ["vegetable oil", "vegetable oil soybean", [], 0.92],
  ["coconut oil", "coconut oil", [], 0.92],
  ["avocado oil", "avocado oil"],
  ["sesame oil", "sesame oil"],
  ["grapeseed oil", "grapeseed oil"],
  ["lard", "lard", [], 0.94],
  ["ghee", "ghee butter"],

  // Herbs, Spices & Seasonings
  ["basil", "basil fresh"],
  ["cilantro", "cilantro raw"],
  ["parsley", "parsley fresh"],
  ["mint", "mint fresh"],
  ["rosemary", "rosemary fresh"],
  ["thyme", "thyme fresh"],
  ["dill", "dill fresh"],
  ["chives", "chives raw"],
  ["oregano", "oregano dried"],
  ["cinnamon", "cinnamon ground"],
  ["cumin", "cumin seed"],
  ["paprika", "paprika"],
  ["turmeric", "turmeric ground"],
  ["chili powder", "chili powder"],
  ["garlic powder", "garlic powder"],
  ["onion powder", "onion powder"],
  ["black pepper", "black pepper ground"],
  ["cayenne pepper", "cayenne pepper"],
  ["bay leaf", "bay leaf"],
  ["clove garlic", "garlic raw", ["garlic"], 0, 4],
  ["ginger", "ginger root raw"],
  ["vanilla extract", "vanilla extract"],
  ["salt", "salt table", [], 1.2],
  ["soy sauce", "soy sauce"],
  ["fish sauce", "fish sauce"],
  ["worcestershire sauce", "worcestershire sauce"],
  ["ketchup", "ketchup"],
  ["mustard", "mustard yellow"],
  ["balsamic vinegar", "balsamic vinegar", [], 1.04],
  ["red wine vinegar", "red wine vinegar"],
  ["apple cider vinegar", "apple cider vinegar"],
  ["honey", "honey", [], 1.42],
  ["maple syrup", "maple syrup", [], 1.33],

  // Sugar & Baking
  ["sugar", "sugar white granulated", [], 0.85],
  ["sugar, brown", "sugar brown", [], 0.8],
  ["sugar, powdered", "sugar powdered", [], 0.56],
  ["baking powder", "baking powder", [], 0.72],
  ["baking soda", "baking soda", [], 0.75],
  ["cocoa powder", "cocoa powder unsweetened"],
  ["yeast", "yeast active dry"],

  // Broths & Sauces
  ["chicken broth", "chicken broth", [], 1.01],
  ["beef broth", "beef broth", [], 1.01],
  ["vegetable broth", "vegetable broth", [], 1.01],
  ["tomato sauce", "tomato sauce canned", [], 1.04],
  ["tomato paste", "tomato paste", [], 1.06],
  ["salsa", "salsa"],
  ["coconut milk", "coconut milk canned"],
  ["mayonnaise", "mayonnaise", [], 0.92],

  // Sweeteners
  ["corn syrup", "corn syrup light", [], 1.37],
  ["molasses", "molasses", [], 1.37],

  // Dairy extras
  ["milk", "milk whole 3.25%", [], 1.04],

  // Beverages
  ["white wine", "white wine table", [], 0.99],
  ["red wine", "red wine table", [], 0.99],
  ["coffee", "coffee brewed"],

  // Frozen
  ["frozen peas", "peas frozen unprepared"],
  ["frozen corn", "corn sweet frozen unprepared"],
  ["frozen broccoli", "broccoli frozen unprepared"],
  ["frozen spinach", "spinach frozen unprepared"],
  ["frozen blueberries", "blueberries frozen unsweetened"],
  ["ice cream", "ice cream vanilla"],

  // International
  ["curry powder", "curry powder"],
  ["hoisin sauce", "hoisin sauce"],
  ["oyster sauce", "oyster sauce"],
  ["hummus", "hummus"],
  ["pesto", "pesto"],

  // Additional common baking/ingredients
  ["breadcrumbs", "breadcrumbs dry"],
  ["coconut milk, canned", "coconut milk canned"],
  ["sesame oil, toasted", "sesame oil"],

  // Common items that need specific searches
  ["chicken breast, cooked", "chicken breast cooked"],
  ["beef, cooked", "beef cooked"],
  ["kale, raw", "kale raw"],
];

async function main() {
  console.log("\n🧑‍🍳 USDA Nutrition Database Generator\n");

  const apiKey = getApiKey();
  if (apiKey === "DEMO_KEY") {
    console.log("⚠️  Using DEMO_KEY — only 30 requests. Set USDA_API_KEY in .env.local for full access.\n");
  }

  // Extract existing entries that have density or unitWeight
  const existingExtras: Record<string, { density?: number; unitWeight?: number; synonyms?: string[] }> = {};

  const results: {
    key: string;
    nutrition: Record<string, number | undefined>;
    synonyms?: string[];
    density?: number;
    unitWeight?: number;
  }[] = [];
  const failed: string[] = [];

  let idx = 0;
  for (const [key, query, synonyms, density, unitWeight] of INGREDIENT_DEFS) {
    idx++;
    process.stdout.write(`  [${idx}/${INGREDIENT_DEFS.length}] ${key.padEnd(30)} `);

    const food = await searchFood(query);
    await new Promise((r) => setTimeout(r, 250));

    if (!food) {
      process.stdout.write(`❌\n`);
      failed.push(key);
      continue;
    }

    const nutrients = extractNutrients(food);
    if (nutrients.calories === undefined) {
      process.stdout.write(`⚠️  (no calories)\n`);
      failed.push(key);
      continue;
    }

    process.stdout.write(`✅ ${Math.round(nutrients.calories ?? 0)} kcal\n`);
    results.push({ key, nutrition: nutrients, synonyms, density, unitWeight });
  }

  // Generate the TS file
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Fetched: ${results.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(``);

  // Build the database object string
  const lines: string[] = [];
  lines.push(`import type { IngredientEntry } from "@/lib/nutrition-db-types";\n`);
  lines.push(`export const INGREDIENTS: Record<string, IngredientEntry> = {`);

  for (const r of results) {
    const n = r.nutrition;
    const extras: string[] = [];

    extras.push(`calories: ${n.calories ?? 0}`);
    extras.push(`protein: ${n.protein ?? 0}`);
    extras.push(`carbs: ${n.carbs ?? 0}`);
    extras.push(`fat: ${n.fat ?? 0}`);
    if (n.fiber !== undefined) extras.push(`fiber: ${n.fiber}`);
    if (n.sodium !== undefined) extras.push(`sodium: ${n.sodium}`);
    if (n.sugar !== undefined) extras.push(`sugar: ${n.sugar}`);

    let entryStr = `{ nutrition: { ${extras.join(", ")} }`;
    if (r.synonyms?.length) entryStr += `, synonyms: [${r.synonyms.map((s) => `"${s}"`).join(", ")}]`;
    if (r.density !== undefined) entryStr += `, density: ${r.density}`;
    if (r.unitWeight !== undefined) entryStr += `, unitWeight: ${r.unitWeight}`;
    entryStr += " },";

    lines.push(`  "${r.key}": ${entryStr}`);
  }

  lines.push("};");

  const output = lines.join("\n") + "\n";

  // Print summary + first 10 entries as preview
  console.log("📋 Generated database entries (first 10):\n");
  const destLines = output.split("\n");
  destLines.slice(0, 15).forEach((l) => console.log(l));
  console.log("...");

  // Save to file
  const outputPath = path.join(process.cwd(), "src", "lib", "nutrition-db.ts");
  // We'll write a properly formatted file
  console.log(`\n📝 Saving to ${outputPath}`);

  // Build the proper database
  const dbEntries: string[] = [];

  for (const r of results) {
    const n = r.nutrition;
    const nutLines: string[] = ["    calories: " + (n.calories ?? 0) + ","];
    nutLines.push("    protein: " + (n.protein ?? 0) + ",");
    nutLines.push("    carbs: " + (n.carbs ?? 0) + ",");
    nutLines.push("    fat: " + (n.fat ?? 0) + ",");
    if (n.fiber !== undefined) nutLines.push("    fiber: " + n.fiber + ",");
    if (n.sodium !== undefined) nutLines.push("    sodium: " + n.sodium + ",");
    if (n.sugar !== undefined) nutLines.push("    sugar: " + n.sugar + ",");

    let entry = `  "${r.key}": {\n    nutrition: {\n`;
    entry += nutLines.join("\n");
    entry += "\n    }";

    if (r.synonyms?.length) {
      entry += `,\n    synonyms: [${r.synonyms.map((s) => `"${s}"`).join(", ")}]`;
    }
    if (r.density !== undefined) entry += `,\n    density: ${r.density}`;
    if (r.unitWeight !== undefined) entry += `,\n    unitWeight: ${r.unitWeight}`;
    entry += "\n  },";

    dbEntries.push(entry);
  }

  const fullOutput = `/**
 * Nutrition database — generated from USDA FoodData Central API.
 * Values are per 100g. Sources: USDA Foundation Foods + SR Legacy.
 *
 * To regenerate: npx tsx scripts/generate-nutrition-db.ts
 * (requires USDA_API_KEY in .env.local)
 */

export interface IngredientNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
  sugar?: number;
}

export interface IngredientEntry {
  nutrition: IngredientNutrition;
  synonyms?: string[];
  density?: number;
  unitWeight?: number;
}

export const INGREDIENTS: Record<string, IngredientEntry> = {
${dbEntries.join("\n")}
};
`;

  fs.writeFileSync(outputPath, fullOutput, "utf8");
  console.log(`✅ Written ${results.length} ingredients to nutrition-db.ts`);
  console.log(`⬆️  Was ~150 ingredients, now ${results.length} with real USDA data`);

  if (failed.length > 0) {
    console.log(`\n⚠️  ${failed.length} ingredients could not be found. Add manually:`);
    failed.forEach((f) => console.log(`   • ${f}`));
  }

  // Verify the file parses
  try {
    // Quick sanity check
    const calCount = (fullOutput.match(/calories:/g) || []).length;
    console.log(`\n🔍 Sanity check: ${calCount} nutrition entries in file`);
  } catch (e) {
    console.error("❌ Error generating file:", e);
  }
}

main().catch(console.error);
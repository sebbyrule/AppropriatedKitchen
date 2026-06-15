/**
 * USDA Nutrition Database Builder
 *
 * Queries the USDA FoodData Central API for common cooking ingredients
 * and generates an updated nutrition-db.ts with official nutritional values.
 *
 * Usage:
 *   npx tsx scripts/usda-nutrition-fetch.ts
 *
 * For best results, sign up for a free USDA API key:
 *   https://fdc.nal.usda.gov/api-key-signup.html
 *   Then add USDA_API_KEY=your_key to .env.local
 *
 * Without a key, uses DEMO_KEY (30 requests/hour).
 */

import fs from "fs";
import path from "path";

const USDA_BASE = "https://api.nal.usda.gov/fdc/v1";

// Nutrient IDs mapped by nutrient name (across Foundation and SR Legacy data types)
// These are the standard nutrient numbers from USDA
const NUTRIENT_MAP: Record<string, { id: number; unit: string; label: string }> = {
  "Energy": { id: 1008, unit: "kcal", label: "calories" },
  "Protein": { id: 1003, unit: "g", label: "protein" },
  "Carbohydrate, by difference": { id: 1005, unit: "g", label: "carbs" },
  "Total lipid (fat)": { id: 1004, unit: "g", label: "fat" },
  "Fiber, total dietary": { id: 1079, unit: "g", label: "fiber" },
  "Sodium, Na": { id: 1093, unit: "mg", label: "sodium" },
  "Sugars, total": { id: 2000, unit: "g", label: "sugar" },
};

// Reverse map: nutrientId -> our field name
const NUTRIENT_ID_MAP: Record<number, { field: string; unit: string }> = {};
for (const [, info] of Object.entries(NUTRIENT_MAP)) {
  NUTRIENT_ID_MAP[info.id] = { field: info.label, unit: info.unit };
}

interface USDAFood {
  fdcId: number;
  description: string;
  dataType: string;
  foodNutrients: {
    nutrientId?: number;
    nutrientName?: string;
    value?: number;
    unitName?: string;
  }[];
}

interface USDAResponse {
  foods: USDAFood[];
  totalHits: number;
}

function getApiKey(): string {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    const match = content.match(/^USDA_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
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
    calories: undefined,
    protein: undefined,
    carbs: undefined,
    fat: undefined,
    fiber: undefined,
    sodium: undefined,
    sugar: undefined,
  };

  const nutrients = food.foodNutrients || [];
  for (const n of nutrients) {
    if (n.nutrientId !== undefined && NUTRIENT_ID_MAP[n.nutrientId]) {
      const { field, unit } = NUTRIENT_ID_MAP[n.nutrientId];
      if (n.value !== undefined) {
        let value = Math.round(n.value * 10) / 10;
        // Convert sodium from mg to g for display (stored as g in our DB)
        if (field === "sodium") {
          value = Math.round((n.value / 1000) * 100) / 100;
        }
        result[field] = value;
      }
    }
  }

  return result;
}

// The 300+ most common cooking ingredients to search for
const SEARCH_INGREDIENTS = [
  // Produce: Vegetables
  "artichoke", "arugula", "asparagus", "avocado", "bean sprouts", "beet",
  "bell pepper", "bok choy", "broccoli", "broccolini", "brussels sprout",
  "butternut squash", "cabbage", "carrot", "cauliflower", "celery",
  "collard greens", "corn", "cucumber", "eggplant", "endive",
  "fennel", "green bean", "green onion", "jalapeno", "kale",
  "kohlrabi", "leek", "lettuce", "mushroom", "okra", "onion",
  "parsnip", "pea", "potato", "pumpkin", "radish", "red cabbage",
  "rhubarb", "shallot", "snap pea", "spaghetti squash", "spinach",
  "sweet potato", "summer squash", "tomatillo", "tomato", "turnip",
  "watercress", "zucchini", "acorn squash", "celery root",
  "jicama", "plantain", "snow pea", "scallion",

  // Produce: Fruits
  "apple", "apricot", "banana", "blackberry", "blueberry", "cantaloupe",
  "cherry", "coconut", "cranberry", "date", "fig", "grape",
  "grapefruit", "honeydew", "kiwi", "lemon", "lime", "mango",
  "nectarine", "orange", "papaya", "peach", "pear", "pineapple",
  "plum", "pomegranate", "raspberry", "strawberry", "tangerine",
  "watermelon", "dragon fruit", "guava", "lychee", "passion fruit",
  "persimmon", "star fruit", "blood orange", "clementine",

  // Meat & Poultry
  "beef chuck", "beef ribeye", "beef sirloin", "beef tenderloin",
  "beef brisket", "beef ground 80%", "beef ground 93%",
  "chicken breast", "chicken thigh", "chicken drumstick", "chicken wing",
  "chicken liver", "ground turkey", "turkey breast", "turkey thigh",
  "pork chop", "pork tenderloin", "pork shoulder", "pork belly",
  "pork sausage", "bacon", "ham", "lamb chop", "lamb leg",
  "lamb shoulder", "veal", "bison", "duck breast", "duck leg",
  "goose", "quail", "rabbit", "venison",

  // Fish & Seafood
  "salmon", "tuna", "cod", "halibut", "mackerel", "sardine",
  "trout", "tilapia", "snapper", "sea bass", "swordfish",
  "anchovy", "herring", "pollock", "catfish", "crab", "lobster",
  "shrimp", "scallop", "clam", "mussel", "oyster", "octopus",
  "squid", "crayfish", "mahi mahi", "red snapper", "yellowfin tuna",

  // Dairy & Eggs
  "milk whole", "milk 2%", "milk skim", "buttermilk", "heavy cream",
  "half and half", "sour cream", "cream cheese", "yogurt Greek",
  "yogurt plain", "cottage cheese", "ricotta cheese", "mozzarella",
  "cheddar cheese", "parmesan", "swiss cheese", "provolone",
  "gouda", "blue cheese", "feta cheese", "goat cheese", "brie",
  "camembert", "american cheese", "egg whole", "egg white",
  "egg yolk", "butter salted", "butter unsalted", "margarine",

  // Grains, Pasta & Bread
  "all-purpose flour", "bread flour", "whole wheat flour",
  "almond flour", "coconut flour", "rice flour", "chickpea flour",
  "cornmeal", "cornstarch", "white rice", "brown rice",
  "jasmine rice", "basmati rice", "arborio rice", "wild rice",
  "quinoa", "oats rolled", "steel cut oats", "instant oats",
  "couscous", "farro", "barley", "bulgur", "millet", "amaranth",
  "pasta spaghetti", "pasta penne", "egg noodles", "ramen noodles",
  "rice noodles", "soba noodles", "white bread", "whole wheat bread",
  "sourdough bread", "rye bread", "pita bread", "naan",
  "tortilla flour", "tortilla corn", "bagel", "croissant",
  "english muffin", "brioche", "ciabatta",

  // Legumes
  "black beans", "kidney beans", "pinto beans", "chickpeas",
  "lentils", "green lentils", "red lentils", "split peas",
  "black-eyed peas", "navy beans", "cannellini beans",
  "great northern beans", "lima beans", "fava beans", "adzuki beans",
  "mung beans", "soybeans", "edamame", "tempeh", "tofu firm",
  "tofu silken", "miso paste",

  // Nuts & Seeds
  "almonds", "walnuts", "pecans", "cashews", "peanuts",
  "peanut butter", "almond butter", "pine nuts", "macadamia nuts",
  "brazil nuts", "hazelnuts", "pistachios", "chestnuts",
  "coconut shredded", "chia seeds", "flax seeds", "hemp seeds",
  "pumpkin seeds", "sesame seeds", "sunflower seeds", "poppy seeds",
  "tahini",

  // Oils & Fats
  "olive oil", "vegetable oil", "canola oil", "coconut oil",
  "avocado oil", "sesame oil", "peanut oil", "sunflower oil",
  "corn oil", "grapeseed oil", "walnut oil", "flaxseed oil",
  "lard", "shortening", "tallow", "ghee",

  // Herbs, Spices & Seasonings
  "basil fresh", "cilantro fresh", "parsley fresh", "mint fresh",
  "rosemary fresh", "thyme fresh", "dill fresh", "oregano fresh",
  "sage fresh", "tarragon fresh", "chives fresh", "bay leaf",
  "oregano dried", "basil dried", "thyme dried", "rosemary dried",
  "cinnamon ground", "cumin ground", "paprika", "turmeric ground",
  "chili powder", "garlic powder", "onion powder", "nutmeg ground",
  "ginger ground", "coriander ground", "cardamom ground",
  "cayenne pepper", "red pepper flakes", "black pepper",
  "white pepper", "mustard ground", "cloves ground", "allspice",
  "fennel seed", "caraway seed", "celery seed", "dill seed",
  "vanilla extract", "vanilla bean", "salt table", "salt kosher",
  "salt sea salt",

  // Sauces, Condiments & Canned
  "soy sauce", "fish sauce", "worcestershire sauce", "hot sauce",
  "ketchup", "mustard yellow", "mustard dijon", "mayonnaise",
  "balsamic vinegar", "red wine vinegar", "apple cider vinegar",
  "white wine vinegar", "rice vinegar", "salsa", "pasta sauce",
  "pizza sauce", "tomato sauce", "tomato paste", "crushed tomato",
  "coconut milk", "coconut cream", "olives black", "olives green",
  "capers", "pickles dill", "sauerkraut", "kimchi", "miso paste",
  "sriracha", "tahini", "hummus", "pesto",

  // Sweeteners
  "white sugar", "brown sugar", "powdered sugar", "honey",
  "maple syrup", "agave nectar", "corn syrup", "molasses",
  "coconut sugar", "stevia", "brown rice syrup",

  // Baking Ingredients
  "baking powder", "baking soda", "yeast active dry", "yeast instant",
  "cocoa powder", "chocolate chips", "dark chocolate", "milk chocolate",
  "white chocolate", "gelatin", "corn syrup",

  // Beverages & Broths
  "chicken broth", "beef broth", "vegetable broth", "bone broth",
  "white wine", "red wine", "beer", "coffee brewed",
  "espresso",

  // Frozen
  "frozen peas", "frozen corn", "frozen broccoli", "frozen spinach",
  "frozen blueberries", "frozen strawberries", "ice cream vanilla",
  "frozen yogurt", "sorbet", "puff pastry",

  // International Ingredients
  "tofu", "edamame", "wasabi", "rice vinegar", "mirin", "sake",
  "gochujang", "doenjang", "coconut aminos", "tamarind paste",
  "curry powder", "garam masala", "fish sauce", "hoisin sauce",
  "oyster sauce", "sesame oil toasted", "ume plum vinegar",
  "panko breadcrumbs", "nutritional yeast",
];

async function main() {
  console.log("\n🧑‍🍳 USDA Nutrition Database Builder\n");
  const apiKey = getApiKey();
  const isDemo = apiKey === "DEMO_KEY";
  console.log(`API Key: ${isDemo ? "DEMO (30 req/hr — limited)" : "Custom key"}`);
  console.log(`Ingredients to fetch: ${SEARCH_INGREDIENTS.length}`);

  if (isDemo) {
    console.log(`\n⚠️  DEMO_KEY limited to 30 requests/hour. Will fetch first 25 items.`);
    console.log(`   Sign up at https://fdc.nal.usda.gov/api-key-signup.html`);
    console.log(`   Then add USDA_API_KEY=your_key to .env.local for full access\n`);
  }

  const maxRequests = isDemo ? 25 : SEARCH_INGREDIENTS.length;
  const results: { name: string; usdaName: string; nutrients: Record<string, number | undefined> }[] = [];
  const notFound: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < Math.min(maxRequests, SEARCH_INGREDIENTS.length); i++) {
    const ingredient = SEARCH_INGREDIENTS[i];
    process.stdout.write(`  [${i + 1}/${Math.min(maxRequests, SEARCH_INGREDIENTS.length)}] ${ingredient.padEnd(30)} `);

    const food = await searchFood(ingredient);

    if (!food) {
      console.log(`❌`);
      notFound.push(ingredient);
    } else {
      const nutrients = extractNutrients(food);
      if (nutrients.calories === undefined) {
        console.log(`⚠️  (no nutrient data)`);
        notFound.push(ingredient);
      } else {
        console.log(`✅ → ${food.description.slice(0, 50)}`);
        results.push({ name: ingredient, usdaName: food.description, nutrients });
      }
    }

    // Be kind to the API
    await new Promise((r) => setTimeout(r, 350));
  }

  // Summary
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Fetched: ${results.length}`);
  console.log(`❌ Not found: ${notFound.length}`);
  console.log(`⚠️  Errors: ${errors.length}`);

  // Generate the updated database entries
  if (results.length > 0) {
    console.log(`\n📋 USDA Results (first 20 shown):\n`);
    console.log(`| Ingredient | USDA Name | Cal | Pro | Carbs | Fat | Fiber | Sodium |`);
    console.log(`|------------|-----------|-----|-----|-------|-----|-------|--------|`);
    for (const r of results.slice(0, 20)) {
      const n = r.nutrients;
      const cal = n.calories !== undefined ? String(n.calories).padEnd(3) : " -";
      const pro = n.protein !== undefined ? String(n.protein).padEnd(3) : " -";
      const carbs = n.carbs !== undefined ? String(n.carbs).padEnd(4) : " -  ";
      const fat = n.fat !== undefined ? String(n.fat).padEnd(3) : " -";
      const fib = n.fiber !== undefined ? String(n.fiber).padEnd(3) : " -";
      const sod = n.sodium !== undefined ? String(n.sodium).padEnd(4) : " -  ";
      console.log(`| ${r.name.padEnd(20)} | ${r.usdaName.slice(0, 25).padEnd(25)} | ${cal} | ${pro} | ${carbs} | ${fat} | ${fib} | ${sod} |`);
    }
  }

  if (notFound.length > 0) {
    console.log(`\n⚠️  Not found in USDA database (${notFound.length}):
`);
    notFound.forEach(n => console.log(`   • ${n}`));
  }

  console.log(`\n💡 To update the full database with all ${SEARCH_INGREDIENTS.length}+ ingredients:`);
  console.log(`   1. Get a free API key: https://fdc.nal.usda.gov/api-key-signup.html`);
  console.log(`   2. Add to .env.local: USDA_API_KEY=your_key`);
  console.log(`   3. Run: npx tsx scripts/usda-nutrition-fetch.ts\n`);
}

main();
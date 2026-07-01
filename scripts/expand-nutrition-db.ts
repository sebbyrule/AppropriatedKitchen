/**
 * Nutrition Database Expander  (non-destructive, merge-based)
 *
 * Loads the EXISTING src/lib/nutrition-db.ts (preserving every current entry,
 * its hand-tuned density / unitWeight / synonyms, and the lookupIngredient
 * helper), fetches a large batch of ADDITIONAL ingredients from the USDA
 * FoodData Central API, merges them in, and rewrites the file.
 *
 * Existing keys are never overwritten — only new keys are added.
 *
 * Usage:
 *   npx tsx scripts/expand-nutrition-db.ts          # fetch + write
 *   npx tsx scripts/expand-nutrition-db.ts --dry    # fetch + report, no write
 *
 * Requires USDA_API_KEY in .env.local
 *   (free key: https://fdc.nal.usda.gov/api-key-signup.html)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  INGREDIENTS as EXISTING,
  type IngredientEntry,
} from "../src/lib/nutrition-db";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "src", "lib", "nutrition-db.ts");
const DRY = process.argv.includes("--dry");

const USDA_BASE = "https://api.nal.usda.gov/fdc/v1";

// nutrientId → our field. Calories handled separately with a fallback chain.
const NUTRIENT_IDS: Record<string, number> = {
  protein: 1003,
  carbs: 1005,
  fat: 1004,
  fiber: 1079,
  sodium: 1093,
  sugar: 2000,
};
// Energy (kcal): prefer 1008, fall back to Atwater general/specific factors.
const CALORIE_IDS = [1008, 2047, 2048];

interface USDAFood {
  fdcId: number;
  description: string;
  dataType?: string;
  foodNutrients: { nutrientId?: number; value?: number }[];
}

function getApiKey(): string {
  if (process.env.USDA_API_KEY) return process.env.USDA_API_KEY.trim();
  const envPath = path.join(ROOT, ".env.local");
  if (fs.existsSync(envPath)) {
    const m = fs.readFileSync(envPath, "utf8").match(/^USDA_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  }
  return "DEMO_KEY";
}

const API_KEY = getApiKey();

async function searchFoods(query: string): Promise<USDAFood[]> {
  const url =
    `${USDA_BASE}/foods/search?api_key=${API_KEY}` +
    `&query=${encodeURIComponent(query)}&pageSize=10` +
    `&dataType=Foundation,SR%20Legacy`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = (await res.json()) as { foods?: USDAFood[] };
    return data.foods ?? [];
  } catch {
    return [];
  }
}

type Nutrients = {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sodium?: number;
  sugar?: number;
};

function extractNutrients(food: USDAFood): Nutrients {
  const byId = new Map<number, number>();
  for (const n of food.foodNutrients ?? []) {
    if (n.nutrientId !== undefined && n.value !== undefined && !byId.has(n.nutrientId)) {
      byId.set(n.nutrientId, n.value);
    }
  }

  const out: Nutrients = {};

  // calories with fallback chain
  for (const id of CALORIE_IDS) {
    if (byId.has(id)) {
      out.calories = Math.round(byId.get(id)!);
      break;
    }
  }

  for (const [field, id] of Object.entries(NUTRIENT_IDS)) {
    if (!byId.has(id)) continue;
    let v = byId.get(id)!;
    if (field === "sodium") {
      v = Math.round((v / 1000) * 100) / 100; // mg → g, matching existing DB convention
    } else {
      v = Math.round(v * 10) / 10;
    }
    (out as Record<string, number>)[field] = v;
  }

  return out;
}

// Generic words that shouldn't drive relevance matching.
const MODIFIERS = new Set([
  "raw", "dried", "ground", "fresh", "canned", "whole", "plain", "unsweetened",
  "sweetened", "prepared", "cooked", "mature", "all", "varieties", "in", "water",
  "drained", "frozen", "dry", "powder", "unprepared", "boneless", "large",
  "medium", "small", "ready", "to", "bake", "serve", "type", "standard", "seeds",
  "seed", "leaf", "and", "or", "with", "the", "of", "long", "short", "grain",
]);

function tokenize(s: string): string[] {
  return s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

const dataRank = (t?: string) =>
  t === "Foundation" ? 0 : t === "SR Legacy" ? 1 : 2;

/**
 * Choose the best-matching food: must contain the key noun and ≥60% of the
 * meaningful query terms, then prefer Foundation/SR Legacy and the shortest
 * (i.e. plainest, least composite) description. Returns null if nothing is a
 * confident match — failing is better than inserting a wrong food.
 */
function pickFood(
  foods: USDAFood[],
  query: string,
): { food: USDAFood; nutrients: Nutrients } | null {
  let core = tokenize(query).filter((t) => !MODIFIERS.has(t) && t.length > 2);
  if (core.length === 0) core = tokenize(query);
  const keyNoun = core[0];

  type Cand = { food: USDAFood; nutrients: Nutrients; ratio: number; len: number };
  const cands: Cand[] = [];

  for (const food of foods) {
    const nutrients = extractNutrients(food);
    if (nutrients.calories === undefined) continue;
    const desc = food.description.toLowerCase();
    if (!desc.includes(keyNoun)) continue;
    const covered = core.filter((t) => desc.includes(t)).length;
    const ratio = covered / core.length;
    if (ratio < 0.6) continue;
    cands.push({ food, nutrients, ratio, len: food.description.length });
  }

  if (cands.length === 0) return null;
  cands.sort(
    (a, b) =>
      b.ratio - a.ratio ||
      dataRank(a.food.dataType) - dataRank(b.food.dataType) ||
      a.len - b.len,
  );
  return { food: cands[0].food, nutrients: cands[0].nutrients };
}

// [key, searchQuery, synonyms?, density(g/mL)?, unitWeight(g)?]
type Def = [string, string, string[]?, number?, number?];

const NEW_INGREDIENTS: Def[] = [
  // ── Vegetables ──────────────────────────────────────────────
  ["napa cabbage", "napa cabbage raw", ["chinese cabbage"]],
  ["swiss chard", "chard swiss raw", ["chard"]],
  ["mustard greens", "mustard greens raw"],
  ["turnip greens", "turnip greens raw"],
  ["beet greens", "beet greens raw"],
  ["dandelion greens", "dandelion greens raw"],
  ["romaine lettuce", "lettuce cos romaine raw"],
  ["iceberg lettuce", "lettuce iceberg raw"],
  ["portobello mushroom", "mushrooms portabella raw"],
  ["shiitake mushroom", "mushrooms shiitake raw"],
  ["cremini mushroom", "mushrooms brown italian crimini raw"],
  ["water chestnut", "water chestnuts chinese raw"],
  ["bamboo shoots", "bamboo shoots raw"],
  ["red onion", "onions red raw"],
  ["yam", "yam raw"],
  ["taro", "taro raw"],
  ["cassava", "cassava raw"],
  ["chayote", "chayote raw"],
  ["broccoli rabe", "broccoli raab raw", ["rapini"]],
  ["sweet corn cob", "corn sweet yellow raw"],
  ["hubbard squash", "squash winter hubbard raw"],
  ["delicata squash", "squash winter all varieties raw"],
  ["nori", "seaweed laver raw", ["seaweed", "nori"]],
  ["kelp", "seaweed kelp raw", ["kombu"]],
  ["wakame", "seaweed wakame raw"],

  // ── Fruits ──────────────────────────────────────────────────
  ["guava", "guava raw"],
  ["passion fruit", "passion fruit raw"],
  ["persimmon", "persimmons japanese raw"],
  ["starfruit", "carambola starfruit raw", ["carambola"]],
  ["mulberry", "mulberries raw"],
  ["gooseberry", "gooseberries raw"],
  ["kumquat", "kumquats raw"],
  ["jackfruit", "jackfruit raw"],
  ["lychee", "litchis raw"],
  ["prune", "plums dried prunes", ["dried plum"]],
  ["raisin", "raisins seedless"],
  ["dried apricot", "apricots dried"],
  ["dried cranberry", "cranberries dried sweetened"],
  ["dried fig", "figs dried"],
  ["currant", "currants red raw"],
  ["elderberry", "elderberries raw"],

  // ── Meat & Poultry ──────────────────────────────────────────
  ["beef chuck", "beef chuck pot roast raw"],
  ["beef ribeye", "beef ribeye steak boneless raw"],
  ["beef tenderloin", "beef tenderloin steak raw"],
  ["beef brisket", "beef brisket flat half raw"],
  ["beef short rib", "beef short ribs raw"],
  ["flank steak", "beef flank steak raw"],
  ["skirt steak", "beef skirt steak raw"],
  ["beef liver", "beef liver raw"],
  ["chicken wing", "chicken wing raw"],
  ["whole chicken", "chicken broilers whole raw"],
  ["chicken liver", "chicken liver raw"],
  ["turkey thigh", "turkey thigh raw"],
  ["pork belly", "pork belly raw"],
  ["pork sausage", "pork sausage raw"],
  ["italian sausage", "sausage italian pork raw"],
  ["chorizo", "chorizo pork beef"],
  ["prosciutto", "prosciutto"],
  ["salami", "salami dry pork"],
  ["pepperoni", "pepperoni pork beef"],
  ["hot dog", "frankfurter beef", ["frankfurter"]],
  ["lamb leg", "lamb leg whole raw"],
  ["lamb shoulder", "lamb shoulder whole raw"],
  ["ground lamb", "lamb ground raw"],
  ["goose", "goose domesticated raw"],

  // ── Fish & Seafood ──────────────────────────────────────────
  ["crab", "crab blue raw"],
  ["scallop", "scallops raw"],
  ["clam", "clam mixed species raw"],
  ["oyster", "oyster eastern raw"],
  ["snapper", "snapper raw"],
  ["mahi mahi", "mahimahi raw", ["dolphinfish"]],
  ["haddock", "haddock raw"],
  ["pollock", "pollock atlantic raw"],
  ["flounder", "flatfish flounder sole raw", ["sole"]],
  ["grouper", "grouper raw"],
  ["perch", "perch raw"],
  ["smoked salmon", "salmon smoked lox", ["lox"]],
  ["canned tuna", "tuna light canned in water drained"],
  ["canned salmon", "salmon pink canned"],

  // ── Dairy & Eggs ────────────────────────────────────────────
  ["egg yolk", "egg yolk raw", [], 0, 17],
  ["american cheese", "cheese pasteurized process american"],
  ["monterey jack", "cheese monterey"],
  ["colby cheese", "cheese colby"],
  ["mascarpone", "cheese mascarpone"],
  ["queso fresco", "cheese queso fresco"],
  ["kefir", "kefir plain", [], 1.03],
  ["evaporated milk", "milk evaporated", [], 1.07],
  ["sweetened condensed milk", "milk condensed sweetened", [], 1.29],
  ["almond milk", "almond milk unsweetened", [], 1.03],
  ["soy milk", "soymilk unsweetened", [], 1.03],
  ["whipped cream", "cream whipped pressurized"],

  // ── Grains, Pasta & Bread ───────────────────────────────────
  ["jasmine rice", "rice white long-grain raw"],
  ["basmati rice", "rice white basmati raw"],
  ["arborio rice", "rice white short-grain raw"],
  ["buckwheat", "buckwheat groats roasted dry"],
  ["amaranth", "amaranth grain uncooked"],
  ["farro", "wheat emmer farro raw", ["emmer"]],
  ["cornmeal", "cornmeal whole-grain yellow"],
  ["grits", "corn grits white dry"],
  ["rye flour", "rye flour medium"],
  ["semolina", "semolina enriched"],
  ["panko breadcrumbs", "bread crumbs panko", ["panko"]],
  ["naan", "naan bread"],
  ["flour tortilla", "tortillas flour", [], 0, 45],
  ["corn tortilla", "tortillas corn", [], 0, 26],
  ["english muffin", "english muffins plain"],
  ["ciabatta", "ciabatta bread"],
  ["cornbread", "cornbread"],
  ["ramen noodles", "noodles ramen cooked"],
  ["rice noodles", "rice noodles dry"],
  ["soba noodles", "soba noodles cooked"],
  ["udon noodles", "noodles japanese udon cooked"],
  ["macaroni", "pasta macaroni dry enriched"],

  // ── Legumes & Soy ───────────────────────────────────────────
  ["pinto beans", "pinto beans mature raw"],
  ["navy beans", "navy beans mature raw"],
  ["cannellini beans", "white beans mature raw", ["white beans"]],
  ["great northern beans", "great northern beans mature raw"],
  ["black-eyed peas", "cowpeas blackeye raw", ["cowpeas"]],
  ["soybeans", "soybeans mature raw"],
  ["refried beans", "refried beans canned"],
  ["silken tofu", "tofu soft silken"],
  ["natto", "natto"],

  // ── Nuts & Seeds ────────────────────────────────────────────
  ["almond butter", "almond butter plain"],
  ["brazil nuts", "brazil nuts dried"],
  ["chestnuts", "chestnuts european raw"],
  ["flax seeds", "flaxseed", ["linseed"]],
  ["hemp seeds", "hemp seeds hulled"],
  ["pumpkin seeds", "pumpkin squash seeds dried", ["pepitas"]],
  ["cashew butter", "cashew butter plain"],

  // ── Oils & Fats ─────────────────────────────────────────────
  ["canola oil", "oil canola", [], 0.92],
  ["peanut oil", "oil peanut", [], 0.92],
  ["sunflower oil", "oil sunflower", [], 0.92],
  ["corn oil", "oil corn", [], 0.92],
  ["shortening", "shortening vegetable", [], 0.91],
  ["beef tallow", "beef tallow", [], 0.9],
  ["duck fat", "duck fat", [], 0.92],

  // ── Herbs, Spices & Seasonings ──────────────────────────────
  ["sage", "sage ground"],
  ["tarragon", "tarragon dried"],
  ["marjoram", "marjoram dried"],
  ["nutmeg", "nutmeg ground"],
  ["cloves", "cloves ground"],
  ["allspice", "allspice ground"],
  ["cardamom", "cardamom"],
  ["coriander seed", "coriander seed"],
  ["fennel seed", "fennel seed"],
  ["caraway seed", "caraway seed"],
  ["celery seed", "celery seed"],
  ["mustard seed", "mustard seed yellow"],
  ["nutmeg ground", "nutmeg ground"],
  ["white pepper", "pepper white"],
  ["crushed red pepper", "spices pepper red cayenne", ["red pepper flakes"]],
  ["coriander", "coriander leaf dried"],

  // ── Condiments & Sauces ─────────────────────────────────────
  ["dijon mustard", "mustard dijon", [], 1.0],
  ["hot sauce", "hot pepper sauce", ["pepper sauce"], 1.0],
  ["sriracha", "sriracha sauce", [], 1.1],
  ["bbq sauce", "barbecue sauce", ["barbecue sauce"], 1.2],
  ["teriyaki sauce", "teriyaki sauce", [], 1.15],
  ["ranch dressing", "salad dressing ranch", [], 0.95],
  ["italian dressing", "salad dressing italian", [], 0.95],
  ["caesar dressing", "salad dressing caesar", [], 0.95],
  ["relish", "pickle relish sweet"],
  ["capers", "capers canned"],
  ["black olives", "olives ripe canned"],
  ["green olives", "olives green"],
  ["dill pickle", "pickles cucumber dill"],
  ["sauerkraut", "sauerkraut canned"],
  ["kimchi", "kimchi"],
  ["guacamole", "guacamole"],
  ["marinara sauce", "spaghetti marinara sauce ready-to-serve", [], 1.04],
  ["alfredo sauce", "alfredo sauce", [], 1.05],
  ["applesauce", "applesauce unsweetened", [], 1.05],
  ["cranberry sauce", "cranberry sauce canned"],
  ["distilled vinegar", "distilled vinegar", [], 1.0],
  ["sun-dried tomato", "tomatoes sun-dried"],
  ["roasted red pepper", "peppers sweet red roasted"],
  ["green chiles", "peppers hot chili green canned"],

  // ── Sweeteners & Baking ─────────────────────────────────────
  ["agave nectar", "agave syrup", [], 1.37],
  ["coconut sugar", "coconut sugar", [], 0.85],
  ["chocolate chips", "chocolate chips semisweet"],
  ["dark chocolate", "chocolate dark 70-85% cacao"],
  ["milk chocolate", "candies milk chocolate"],
  ["white chocolate", "candies white chocolate"],
  ["unsweetened chocolate", "baking chocolate unsweetened"],
  ["marshmallow", "marshmallows"],
  ["gelatin", "gelatin dry powder unsweetened"],
  ["graham cracker", "crackers graham"],
  ["rye flour dark", "rye flour dark"],

  // ── Beverages & Broths ──────────────────────────────────────
  ["beer", "alcoholic beverage beer regular", [], 1.0],
  ["orange juice", "orange juice raw unsweetened", [], 1.04],
  ["apple juice", "apple juice unsweetened bottled vitamin", [], 1.04],
  ["lemon juice", "lemon juice raw", [], 1.03],
  ["lime juice", "lime juice raw", [], 1.03],
  ["cranberry juice", "cranberry juice unsweetened", [], 1.04],
  ["tomato juice", "tomato juice canned salt", [], 1.04],
  ["espresso", "espresso restaurant-prepared", [], 1.0],
  ["green tea", "tea green brewed", [], 1.0],
  ["black tea", "tea black brewed", [], 1.0],

  // ── Frozen & Prepared ───────────────────────────────────────
  ["frozen strawberries", "strawberries frozen unsweetened"],
  ["french fries", "potatoes french fried frozen"],
  ["hash browns", "potatoes hashed brown frozen"],
  ["puff pastry", "puff pastry frozen ready-to-bake"],
  ["pie crust", "pie crust standard-type frozen"],
  ["phyllo dough", "phyllo dough"],
  ["coconut cream", "coconut cream canned"],
  ["diced tomatoes", "tomatoes red canned", ["canned tomatoes"], 1.04],
  ["crushed tomatoes", "tomatoes crushed canned", [], 1.04],
];

function fmtNum(n: number): string {
  return Number.isInteger(n) ? String(n) : String(n);
}

function serializeEntry(key: string, entry: IngredientEntry): string {
  const n = entry.nutrition;
  const nl: string[] = [
    `      calories: ${fmtNum(n.calories)},`,
    `      protein: ${fmtNum(n.protein)},`,
    `      carbs: ${fmtNum(n.carbs)},`,
    `      fat: ${fmtNum(n.fat)},`,
  ];
  if (n.fiber !== undefined) nl.push(`      fiber: ${fmtNum(n.fiber)},`);
  if (n.sodium !== undefined) nl.push(`      sodium: ${fmtNum(n.sodium)},`);
  if (n.sugar !== undefined) nl.push(`      sugar: ${fmtNum(n.sugar)},`);

  let s = `  ${JSON.stringify(key)}: {\n    nutrition: {\n${nl.join("\n")}\n    },\n`;
  if (entry.synonyms?.length) {
    s += `    synonyms: [${entry.synonyms.map((x) => JSON.stringify(x)).join(", ")}],\n`;
  }
  if (entry.density !== undefined) s += `    density: ${entry.density},\n`;
  if (entry.unitWeight !== undefined) s += `    unitWeight: ${entry.unitWeight},\n`;
  s += `  },`;
  return s;
}

const FILE_HEADER = `/**
 * Nutrition database — generated from USDA FoodData Central API.
 * Values are per 100g. Sources: USDA Foundation Foods + SR Legacy.
 *
 * To expand (non-destructively): npx tsx scripts/expand-nutrition-db.ts
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
`;

const LOOKUP_FN = `
/**
 * Find an ingredient in the database by name, checking partial matches.
 * Returns the canonical key and entry, or null if not found.
 */
export function lookupIngredient(name: string): { key: string; entry: IngredientEntry } | null {
  const lower = name.toLowerCase().trim();

  // Direct match
  if (INGREDIENTS[lower]) {
    return { key: lower, entry: INGREDIENTS[lower] };
  }

  // Check synonyms
  for (const [key, entry] of Object.entries(INGREDIENTS)) {
    if (entry.synonyms?.some((s) => s.toLowerCase() === lower)) {
      return { key, entry };
    }
  }

  // Partial match
  const partialMatches = Object.entries(INGREDIENTS).filter(([key]) =>
    key.includes(lower) || lower.includes(key)
  );
  if (partialMatches.length > 0) {
    return { key: partialMatches[0][0], entry: partialMatches[0][1] };
  }

  return null;
}
`;

async function main() {
  console.log("\n🧑‍🍳 Nutrition Database Expander (merge-based)\n");
  if (API_KEY === "DEMO_KEY") {
    console.log("⚠️  No USDA_API_KEY found — DEMO_KEY is limited to ~30 req/hour.\n");
  }

  const existingKeys = new Set(Object.keys(EXISTING).map((k) => k.toLowerCase()));
  console.log(`Existing entries: ${existingKeys.size}`);

  // Skip new defs that already exist (never overwrite hand-tuned entries)
  const todo = NEW_INGREDIENTS.filter(([key]) => !existingKeys.has(key.toLowerCase()));
  const skippedDup = NEW_INGREDIENTS.length - todo.length;
  console.log(`New candidates: ${NEW_INGREDIENTS.length} (${skippedDup} already present, ${todo.length} to fetch)\n`);

  const added: { key: string; entry: IngredientEntry; usda: string }[] = [];
  const failed: string[] = [];

  let i = 0;
  for (const [key, query, synonyms, density, unitWeight] of todo) {
    i++;
    process.stdout.write(`  [${String(i).padStart(3)}/${todo.length}] ${key.padEnd(26)} `);

    const foods = await searchFoods(query);
    await new Promise((r) => setTimeout(r, 200));

    const picked = pickFood(foods, query);
    if (!picked) {
      console.log("❌ no usable result");
      failed.push(key);
      continue;
    }

    const nut = picked.nutrients;
    const entry: IngredientEntry = {
      nutrition: {
        calories: nut.calories ?? 0,
        protein: nut.protein ?? 0,
        carbs: nut.carbs ?? 0,
        fat: nut.fat ?? 0,
        ...(nut.fiber !== undefined ? { fiber: nut.fiber } : {}),
        ...(nut.sodium !== undefined ? { sodium: nut.sodium } : {}),
        ...(nut.sugar !== undefined ? { sugar: nut.sugar } : {}),
      },
      ...(synonyms && synonyms.length ? { synonyms } : {}),
      ...(density ? { density } : {}),
      ...(unitWeight ? { unitWeight } : {}),
    };

    console.log(`✅ ${String(entry.nutrition.calories).padStart(4)} kcal  → ${picked.food.description.slice(0, 40)}`);
    added.push({ key, entry, usda: picked.food.description });
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Fetched new: ${added.length}`);
  console.log(`❌ Failed:      ${failed.length}`);
  if (failed.length) console.log(`   ${failed.join(", ")}`);

  if (DRY) {
    console.log(`\n(dry run — file not written)\n`);
    return;
  }
  if (added.length === 0) {
    console.log(`\nNothing new to add; file unchanged.\n`);
    return;
  }

  // ── Merge & write ──
  const existingBlocks = Object.entries(EXISTING).map(([k, e]) => serializeEntry(k, e));
  const newBlocks = added.map(({ key, entry }) => serializeEntry(key, entry));

  const today = new Date().toISOString().slice(0, 10);
  const body =
    FILE_HEADER +
    `\nexport const INGREDIENTS: Record<string, IngredientEntry> = {\n` +
    existingBlocks.join("\n") +
    `\n\n  // ─── Added ${today} via scripts/expand-nutrition-db.ts ───\n` +
    newBlocks.join("\n") +
    `\n};\n` +
    LOOKUP_FN;

  fs.writeFileSync(OUT_PATH, body, "utf8");
  const total = existingKeys.size + added.length;
  console.log(`\n📝 Wrote ${OUT_PATH}`);
  console.log(`   ${existingKeys.size} existing + ${added.length} new = ${total} ingredients\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

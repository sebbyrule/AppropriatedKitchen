/**
 * Local ingredient nutrition database.
 *
 * Values are per 100g of the ingredient unless otherwise noted.
 * Sources: USDA FoodData Central, NCCDB, and standard culinary references.
 *
 * To add an ingredient, add an entry to the INGREDIENTS object.
 * The key is the canonical name (lowercase) used for lookup.
 * Add synonyms to help the parser match variations.
 */

export interface IngredientNutrition {
  /** Calories per 100g */
  calories: number;
  /** Protein in grams per 100g */
  protein: number;
  /** Carbohydrates in grams per 100g */
  carbs: number;
  /** Fat in grams per 100g */
  fat: number;
  /** Fiber in grams per 100g (optional) */
  fiber?: number;
  /** Sodium in mg per 100g (optional) */
  sodium?: number;
  /** Sugar in grams per 100g (optional) */
  sugar?: number;
}

export interface IngredientEntry {
  nutrition: IngredientNutrition;
  /** Alternative names for matching (e.g., "courgette" for "zucchini") */
  synonyms?: string[];
  /** Typical density in g/mL for volume-to-weight conversion (optional) */
  density?: number;
  /** Typical weight of 1 unit in grams (e.g., 1 egg = 50g) */
  unitWeight?: number;
}

type IngredientDB = Record<string, IngredientEntry>;

export const INGREDIENTS: IngredientDB = {
  // ───── VEGETABLES ─────
  "all-purpose flour": { nutrition: { calories: 364, protein: 10.3, carbs: 76.3, fat: 1, fiber: 2.7, sodium: 2 }, density: 1.25 },
  "almond flour": { nutrition: { calories: 579, protein: 21.4, carbs: 21.4, fat: 49.9, fiber: 10.7, sodium: 1 } },
  "artichoke": { nutrition: { calories: 47, protein: 3.3, carbs: 10.5, fat: 0.2, fiber: 5.4, sodium: 94 } },
  "arugula": { nutrition: { calories: 25, protein: 2.6, carbs: 3.7, fat: 0.7, fiber: 1.6, sodium: 27 } },
  "asparagus": { nutrition: { calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, fiber: 2.1, sodium: 2 } },
  "avocado": { nutrition: { calories: 160, protein: 2, carbs: 8.5, fat: 14.7, fiber: 6.7, sodium: 7 } },
  "baking powder": { nutrition: { calories: 53, protein: 0, carbs: 27.8, fat: 0, sodium: 10600 }, density: 0.72 },
  "baking soda": { nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sodium: 27360 }, density: 0.75 },
  "balsamic vinegar": { nutrition: { calories: 88, protein: 0.5, carbs: 17, fat: 0, sodium: 23 }, density: 1.04 },
  "basil": { nutrition: { calories: 44, protein: 4.9, carbs: 5.1, fat: 1.6, fiber: 3.3, sodium: 4 } },
  "bay leaf": { nutrition: { calories: 313, protein: 7.6, carbs: 75, fat: 8.4, fiber: 26.3, sodium: 23 } },
  "bean sprouts": { nutrition: { calories: 30, protein: 3, carbs: 5.9, fat: 0.2, fiber: 1.8, sodium: 6 } },
  "beef": { nutrition: { calories: 250, protein: 26, carbs: 0, fat: 15, sodium: 72 } },
  "beef broth": { nutrition: { calories: 7, protein: 1, carbs: 0.5, fat: 0.2, sodium: 380 }, density: 1.01 },
  "beef, ground": { nutrition: { calories: 250, protein: 26, carbs: 0, fat: 15, sodium: 75 } },
  "beef, stew": { nutrition: { calories: 220, protein: 28, carbs: 0, fat: 12, sodium: 65 } },
  "beef, sirloin": { nutrition: { calories: 206, protein: 26, carbs: 0, fat: 11, sodium: 60 } },
  "beet": { nutrition: { calories: 43, protein: 1.6, carbs: 9.6, fat: 0.2, fiber: 2.8, sodium: 78 } },
  "bell pepper": { nutrition: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, sodium: 4 } },
  "black beans": { nutrition: { calories: 132, protein: 8.9, carbs: 23.7, fat: 0.5, fiber: 8.7, sodium: 2 } },
  "black pepper": { nutrition: { calories: 251, protein: 10.4, carbs: 64, fat: 3.3, fiber: 25.3, sodium: 20 } },
  "blueberry": { nutrition: { calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4, sodium: 1 } },
  "bok choy": { nutrition: { calories: 13, protein: 1.5, carbs: 2.2, fat: 0.2, fiber: 1, sodium: 65 } },
  "bread": { nutrition: { calories: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7, sodium: 400 } },
  "breadcrumbs": { nutrition: { calories: 395, protein: 13.3, carbs: 71.5, fat: 5.3, fiber: 4.5, sodium: 735 } },
  "broccoli": { nutrition: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, sodium: 33 } },
  "brown rice": { nutrition: { calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, sodium: 5 } },
  "brussels sprout": { nutrition: { calories: 43, protein: 3.4, carbs: 9, fat: 0.3, fiber: 3.8, sodium: 25 } },
  "butter": { nutrition: { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, sodium: 643 }, density: 0.96 },
  "buttermilk": { nutrition: { calories: 40, protein: 3.3, carbs: 4.8, fat: 0.9, sodium: 105 }, density: 1.04 },
  "butternut squash": { nutrition: { calories: 45, protein: 1, carbs: 11.7, fat: 0.1, fiber: 2, sodium: 4 } },
  "cabbage": { nutrition: { calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5, sodium: 18 } },
  "carrot": { nutrition: { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, sodium: 69 } },
  "cauliflower": { nutrition: { calories: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, sodium: 30 } },
  "celery": { nutrition: { calories: 16, protein: 0.7, carbs: 3, fat: 0.2, fiber: 1.6, sodium: 80 } },
  "cheddar cheese": { nutrition: { calories: 403, protein: 24.9, carbs: 1.3, fat: 33.1, sodium: 621 } },
  "chicken breast": { nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6, sodium: 74 } },
  "chicken thigh": { nutrition: { calories: 209, protein: 26, carbs: 0, fat: 11, sodium: 82 } },
  "chicken broth": { nutrition: { calories: 4, protein: 0.5, carbs: 0.4, fat: 0.1, sodium: 370 }, density: 1.01 },
  "chickpea": { nutrition: { calories: 139, protein: 7.6, carbs: 22.5, fat: 2.2, fiber: 6.4, sodium: 7 } },
  "chili powder": { nutrition: { calories: 282, protein: 13.5, carbs: 49.7, fat: 14.3, fiber: 24.7, sodium: 68 } },
  "chive": { nutrition: { calories: 30, protein: 3.3, carbs: 4.4, fat: 0.7, fiber: 2.5, sodium: 3 } },
  "cilantro": { nutrition: { calories: 23, protein: 2.1, carbs: 3.7, fat: 0.5, fiber: 2.8, sodium: 46 } },
  "cinnamon": { nutrition: { calories: 247, protein: 4, carbs: 80.6, fat: 1.2, fiber: 53.1, sodium: 10 } },
  "clove garlic": { nutrition: { calories: 149, protein: 6.4, carbs: 33.1, fat: 0.5, fiber: 2.1, sodium: 17 }, unitWeight: 4 },
  "cocoa powder": { nutrition: { calories: 228, protein: 19.6, carbs: 57.9, fat: 13.7, fiber: 33.2, sodium: 21 } },
  "coconut milk": { nutrition: { calories: 230, protein: 2.3, carbs: 5.5, fat: 23.8, fiber: 0, sodium: 15 }, density: 1.03 },
  "coconut oil": { nutrition: { calories: 862, protein: 0, carbs: 0, fat: 100, sodium: 0 }, density: 0.92 },
  "corn": { nutrition: { calories: 96, protein: 3.4, carbs: 21, fat: 1.5, fiber: 2.4, sodium: 15 } },
  "cornstarch": { nutrition: { calories: 381, protein: 0.3, carbs: 91.3, fat: 0.1, fiber: 0.9, sodium: 9 }, density: 0.5 },
  "cottage cheese": { nutrition: { calories: 98, protein: 11.1, carbs: 3.4, fat: 4.3, sodium: 364 } },
  "courgette": { nutrition: { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, sodium: 8 } },
  "cream cheese": { nutrition: { calories: 342, protein: 5.9, carbs: 4.1, fat: 34.2, sodium: 321 } },
  "cream, heavy": { nutrition: { calories: 340, protein: 2.8, carbs: 2.8, fat: 36, sodium: 38 }, density: 1.01 },
  "cucumber": { nutrition: { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, sodium: 2 } },
  "cumin": { nutrition: { calories: 375, protein: 17.8, carbs: 44.2, fat: 22.3, fiber: 10.5, sodium: 168 } },
  "egg": { nutrition: { calories: 155, protein: 13, carbs: 1.1, fat: 11, sodium: 124 }, unitWeight: 50 },
  "egg white": { nutrition: { calories: 52, protein: 11, carbs: 0.7, fat: 0.2, sodium: 166 }, unitWeight: 33 },
  "egg yolk": { nutrition: { calories: 322, protein: 15.9, carbs: 3.6, fat: 26.5, sodium: 48 }, unitWeight: 17 },
  "eggplant": { nutrition: { calories: 25, protein: 1, carbs: 6, fat: 0.2, fiber: 3, sodium: 2 } },
  "feta cheese": { nutrition: { calories: 264, protein: 14.2, carbs: 4.1, fat: 21.3, sodium: 917 } },
  "flour": { nutrition: { calories: 364, protein: 10.3, carbs: 76.3, fat: 1, fiber: 2.7, sodium: 2 }, density: 1.25, synonyms: ["all-purpose flour", "plain flour", "white flour"] },
  "garlic": { nutrition: { calories: 149, protein: 6.4, carbs: 33.1, fat: 0.5, fiber: 2.1, sodium: 17 }, unitWeight: 4 },
  "ginger": { nutrition: { calories: 80, protein: 1.8, carbs: 17.8, fat: 0.8, fiber: 2, sodium: 13 } },
  "green bean": { nutrition: { calories: 31, protein: 1.8, carbs: 7, fat: 0.2, fiber: 2.7, sodium: 6 } },
  "green onion": { nutrition: { calories: 32, protein: 1.8, carbs: 7.3, fat: 0.2, fiber: 2.6, sodium: 16 } },
  "honey": { nutrition: { calories: 304, protein: 0.3, carbs: 82.4, fat: 0, sodium: 4 }, density: 1.42 },
  "jalapeño": { nutrition: { calories: 29, protein: 0.9, carbs: 6.5, fat: 0.4, fiber: 2.8, sodium: 3 } },
  "kale": { nutrition: { calories: 49, protein: 4.3, carbs: 8.8, fat: 0.9, fiber: 3.6, sodium: 38 } },
  "ketchup": { nutrition: { calories: 101, protein: 1, carbs: 27.4, fat: 0.1, sodium: 907 }, density: 1.06 },
  "lamb": { nutrition: { calories: 258, protein: 25.6, carbs: 0, fat: 16.5, sodium: 72 } },
  "leek": { nutrition: { calories: 61, protein: 1.5, carbs: 14.2, fat: 0.3, fiber: 1.8, sodium: 20 } },
  "lemon": { nutrition: { calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3, fiber: 2.8, sodium: 2 } },
  "lemon juice": { nutrition: { calories: 22, protein: 0.4, carbs: 6.9, fat: 0, sodium: 1 }, density: 1.04 },
  "lentil": { nutrition: { calories: 116, protein: 9, carbs: 20.1, fat: 0.4, fiber: 7.9, sodium: 2 } },
  "lettuce": { nutrition: { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3, sodium: 28 } },
  "lime": { nutrition: { calories: 30, protein: 0.7, carbs: 10.5, fat: 0.2, fiber: 2.8, sodium: 2 } },
  "maple syrup": { nutrition: { calories: 260, protein: 0, carbs: 67, fat: 0.1, sodium: 12 }, density: 1.33 },
  "mayonnaise": { nutrition: { calories: 724, protein: 1, carbs: 0.6, fat: 79, sodium: 635 }, density: 0.92 },
  "milk": { nutrition: { calories: 42, protein: 3.4, carbs: 5, fat: 1, sodium: 44 }, density: 1.04 },
  "milk, whole": { nutrition: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, sodium: 43 }, density: 1.04 },
  "mint": { nutrition: { calories: 70, protein: 3.8, carbs: 14.9, fat: 0.9, fiber: 8, sodium: 31 } },
  "mushroom": { nutrition: { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1, sodium: 5 } },
  "mozzarella": { nutrition: { calories: 280, protein: 28, carbs: 3.1, fat: 17.1, sodium: 619 } },
  "mustard": { nutrition: { calories: 66, protein: 3.7, carbs: 5.8, fat: 3.3, sodium: 1107 }, density: 1.01 },
  "nutritional yeast": { nutrition: { calories: 350, protein: 50, carbs: 35, fat: 5, fiber: 20, sodium: 60 } },
  "oat": { nutrition: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6, sodium: 2 } },
  "olive oil": { nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, sodium: 2 }, density: 0.92 },
  "onion": { nutrition: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, sodium: 4 } },
  "orange": { nutrition: { calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fiber: 2.4, sodium: 0 } },
  "oregano": { nutrition: { calories: 265, protein: 9, carbs: 68.9, fat: 4.3, fiber: 42.5, sodium: 25 } },
  "paprika": { nutrition: { calories: 282, protein: 14.1, carbs: 54, fat: 12.9, fiber: 37.4, sodium: 68 } },
  "parmesan": { nutrition: { calories: 431, protein: 38.5, carbs: 3.4, fat: 29.2, sodium: 1529 } },
  "parsley": { nutrition: { calories: 36, protein: 3, carbs: 6.3, fat: 0.8, fiber: 3.3, sodium: 56 } },
  "pasta": { nutrition: { calories: 131, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8, sodium: 1 } },
  "peanut butter": { nutrition: { calories: 588, protein: 25.1, carbs: 20, fat: 50, fiber: 6, sodium: 459 } },
  "peas": { nutrition: { calories: 81, protein: 5.4, carbs: 14.5, fat: 0.4, fiber: 5.1, sodium: 5 } },
  "pecan": { nutrition: { calories: 691, protein: 9.2, carbs: 13.9, fat: 72, fiber: 9.6, sodium: 0 } },
  "pine nut": { nutrition: { calories: 673, protein: 13.7, carbs: 13.1, fat: 68.4, fiber: 3.7, sodium: 2 } },
  "pineapple": { nutrition: { calories: 50, protein: 0.5, carbs: 13.1, fat: 0.1, fiber: 1.4, sodium: 1 } },
  "pork chop": { nutrition: { calories: 231, protein: 25, carbs: 0, fat: 14, sodium: 62 } },
  "pork loin": { nutrition: { calories: 198, protein: 27, carbs: 0, fat: 9, sodium: 56 } },
  "potato": { nutrition: { calories: 77, protein: 2, carbs: 17.5, fat: 0.1, fiber: 2.2, sodium: 6 } },
  "quinoa": { nutrition: { calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8, sodium: 7 } },
  "radish": { nutrition: { calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1, fiber: 1.6, sodium: 39 } },
  "raisin": { nutrition: { calories: 299, protein: 3.1, carbs: 79.2, fat: 0.5, fiber: 3.7, sodium: 11 } },
  "red pepper": { nutrition: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, sodium: 4 } },
  "red pepper flake": { nutrition: { calories: 318, protein: 12, carbs: 56.6, fat: 17.3, fiber: 27.2, sodium: 73 } },
  "rice": { nutrition: { calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fiber: 0.4, sodium: 1 } },
  "rice, white": { nutrition: { calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fiber: 0.4, sodium: 1 } },
  "rosemary": { nutrition: { calories: 131, protein: 3.3, carbs: 20.7, fat: 5.9, fiber: 14.1, sodium: 26 } },
  "salmon": { nutrition: { calories: 208, protein: 20.4, carbs: 0, fat: 13.4, sodium: 59 } },
  "salsa": { nutrition: { calories: 36, protein: 1.5, carbs: 7, fat: 0.2, fiber: 2, sodium: 430 } },
  "salt": { nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sodium: 38758 }, density: 1.2 },
  "scallion": { nutrition: { calories: 32, protein: 1.8, carbs: 7.3, fat: 0.2, fiber: 2.6, sodium: 16 } },
  "sesame oil": { nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, sodium: 0 }, density: 0.92 },
  "shallot": { nutrition: { calories: 72, protein: 2.5, carbs: 16.8, fat: 0.1, fiber: 3.2, sodium: 12 } },
  "shrimp": { nutrition: { calories: 85, protein: 20, carbs: 0, fat: 0.5, sodium: 150 } },
  "soy sauce": { nutrition: { calories: 53, protein: 8.1, carbs: 4.9, fat: 0.6, sodium: 5493 }, density: 1.08 },
  "spinach": { nutrition: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sodium: 79 } },
  "squash": { nutrition: { calories: 45, protein: 1, carbs: 11.7, fat: 0.1, fiber: 2, sodium: 4 } },
  "strawberry": { nutrition: { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, sodium: 1 } },
  "sugar": { nutrition: { calories: 387, protein: 0, carbs: 100, fat: 0, sodium: 1 }, density: 0.85 },
  "sugar, brown": { nutrition: { calories: 380, protein: 0, carbs: 98.1, fat: 0, sodium: 28 }, density: 0.8 },
  "sugar, powdered": { nutrition: { calories: 389, protein: 0, carbs: 99.8, fat: 0, sodium: 1 }, density: 0.56 },
  "sun-dried tomato": { nutrition: { calories: 213, protein: 5.1, carbs: 44.2, fat: 2.5, fiber: 10.3, sodium: 247 } },
  "sweet potato": { nutrition: { calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, fiber: 3, sodium: 55 } },
  "thyme": { nutrition: { calories: 101, protein: 5.6, carbs: 24.5, fat: 1.7, fiber: 14, sodium: 9 } },
  "tofu": { nutrition: { calories: 76, protein: 8.1, carbs: 1.9, fat: 4.8, fiber: 0.3, sodium: 7 } },
  "tomato": { nutrition: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sodium: 5 } },
  "tomato paste": { nutrition: { calories: 82, protein: 4.3, carbs: 18.9, fat: 0.5, fiber: 4.1, sodium: 59 }, density: 1.06 },
  "tomato sauce": { nutrition: { calories: 24, protein: 1.2, carbs: 5.3, fat: 0.3, fiber: 1.5, sodium: 320 }, density: 1.04 },
  "tuna": { nutrition: { calories: 132, protein: 28, carbs: 0, fat: 1.5, sodium: 50 } },
  "turkey": { nutrition: { calories: 189, protein: 29, carbs: 0, fat: 7, sodium: 72 } },
  "turmeric": { nutrition: { calories: 354, protein: 7.8, carbs: 64.9, fat: 9.9, fiber: 21.1, sodium: 38 } },
  "vanilla extract": { nutrition: { calories: 288, protein: 0.1, carbs: 12.7, fat: 0.1, sodium: 9 }, density: 0.88 },
  "vegetable broth": { nutrition: { calories: 4, protein: 0.3, carbs: 0.7, fat: 0.1, sodium: 340 }, density: 1.01 },
  "vegetable oil": { nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, sodium: 0 }, density: 0.92 },
  "vinegar": { nutrition: { calories: 18, protein: 0, carbs: 0.9, fat: 0, sodium: 2 }, density: 1.01 },
  "walnut": { nutrition: { calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2, fiber: 6.7, sodium: 2 } },
  "water": { nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sodium: 0 }, density: 1 },
  "white wine": { nutrition: { calories: 82, protein: 0.1, carbs: 2.6, fat: 0, sodium: 5 }, density: 0.99 },
  "whole wheat flour": { nutrition: { calories: 340, protein: 13.2, carbs: 72, fat: 2.5, fiber: 10.7, sodium: 2 }, density: 1.2 },
  "worcestershire sauce": { nutrition: { calories: 78, protein: 0, carbs: 19.5, fat: 0, sodium: 980 }, density: 1.06 },
  "yeast": { nutrition: { calories: 325, protein: 40, carbs: 41, fat: 5, fiber: 20, sodium: 50 } },
  "yogurt": { nutrition: { calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3, sodium: 47 } },
  "yogurt, greek": { nutrition: { calories: 97, protein: 9, carbs: 3.6, fat: 5, sodium: 47 } },
  "zucchini": { nutrition: { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, sodium: 8 } },
};

/**
 * Find an ingredient in the database by name, checking synonyms.
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

  // Partial match (e.g., "chicken" matches "chicken breast")
  const partialMatches = Object.entries(INGREDIENTS).filter(([key]) =>
    key.includes(lower) || lower.includes(key)
  );
  if (partialMatches.length > 0) {
    return { key: partialMatches[0][0], entry: partialMatches[0][1] };
  }

  return null;
}
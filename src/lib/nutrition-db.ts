/**
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
  "artichoke": {
    nutrition: {
    calories: 73,
    protein: 2,
    carbs: 17.4,
    fat: 0,
    fiber: 1.6,
    sodium: 0,
    sugar: 9.6,
    }
  },
  "arugula": {
    nutrition: {
    calories: 25,
    protein: 2.6,
    carbs: 3.7,
    fat: 0.7,
    fiber: 1.6,
    sodium: 0.03,
    sugar: 2.1,
    }
  },
  "asparagus": {
    nutrition: {
    calories: 20,
    protein: 2.2,
    carbs: 3.9,
    fat: 0.1,
    fiber: 2.1,
    sodium: 0,
    sugar: 1.9,
    }
  },
  "avocado": {
    nutrition: {
    calories: 167,
    protein: 2,
    carbs: 8.6,
    fat: 15.4,
    fiber: 6.8,
    sodium: 0.01,
    sugar: 0.3,
    }
  },
  "bean sprouts": {
    nutrition: {
    calories: 29,
    protein: 4.2,
    carbs: 4.1,
    fat: 0.5,
    sodium: 0.01,
    }
  },
  "broccoli": {
    nutrition: {
    calories: 31,
    protein: 2.6,
    carbs: 6.3,
    fat: 0.3,
    fiber: 2.4,
    sodium: 0.04,
    }
  },
  "butternut squash": {
    nutrition: {
    calories: 45,
    protein: 1,
    carbs: 11.7,
    fat: 0.1,
    fiber: 2,
    sodium: 0,
    sugar: 2.2,
    }
  },
  "cabbage": {
    nutrition: {
    calories: 25,
    protein: 1.3,
    carbs: 5.8,
    fat: 0.1,
    fiber: 2.5,
    sodium: 0.02,
    sugar: 3.2,
    }
  },
  "carrot": {
    nutrition: {
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2,
    fiber: 2.8,
    sodium: 0.07,
    sugar: 4.7,
    }
  },
  "collard greens": {
    nutrition: {
    calories: 32,
    protein: 3,
    carbs: 5.4,
    fat: 0.6,
    fiber: 4,
    sodium: 0.02,
    sugar: 0.5,
    }
  },
  "corn": {
    nutrition: {
    calories: 86,
    protein: 3.2,
    carbs: 19,
    fat: 1.2,
    fiber: 2.7,
    sodium: 0.02,
    sugar: 3.2,
    }
  },
  "cucumber": {
    nutrition: {
    calories: 10,
    protein: 0.6,
    carbs: 2.2,
    fat: 0.2,
    fiber: 0.7,
    sodium: 0,
    sugar: 1.4,
    }
  },
  "eggplant": {
    nutrition: {
    calories: 25,
    protein: 1,
    carbs: 5.9,
    fat: 0.2,
    fiber: 3,
    sodium: 0,
    sugar: 3.5,
    }
  },
  "endive": {
    nutrition: {
    calories: 17,
    protein: 1.3,
    carbs: 3.4,
    fat: 0.2,
    fiber: 3.1,
    sodium: 0.02,
    sugar: 0.3,
    }
  },
  "jalapeño": {
    nutrition: {
    calories: 29,
    protein: 0.9,
    carbs: 6.5,
    fat: 0.4,
    fiber: 2.8,
    sodium: 0,
    sugar: 4.1,
    }
  },
  "kale": {
    nutrition: {
    calories: 35,
    protein: 2.9,
    carbs: 4.4,
    fat: 1.5,
    fiber: 4.1,
    sodium: 0.05,
    sugar: 1,
    }
  },
  "kohlrabi": {
    nutrition: {
    calories: 27,
    protein: 1.7,
    carbs: 6.2,
    fat: 0.1,
    fiber: 3.6,
    sodium: 0.02,
    sugar: 2.6,
    }
  },
  "leek": {
    nutrition: {
    calories: 61,
    protein: 1.5,
    carbs: 14.2,
    fat: 0.3,
    fiber: 1.8,
    sodium: 0.02,
    sugar: 3.9,
    }
  },
  "mushroom": {
    nutrition: {
    calories: 32,
    protein: 1.5,
    carbs: 6.9,
    fat: 0.5,
    fiber: 3.8,
    sodium: 0.01,
    sugar: 1.2,
    }
  },
  "okra": {
    nutrition: {
    calories: 33,
    protein: 1.9,
    carbs: 7.5,
    fat: 0.2,
    fiber: 3.2,
    sodium: 0.01,
    sugar: 1.5,
    }
  },
  "onion": {
    nutrition: {
    calories: 40,
    protein: 1.1,
    carbs: 9.3,
    fat: 0.1,
    fiber: 1.7,
    sodium: 0,
    sugar: 4.2,
    }
  },
  "parsnip": {
    nutrition: {
    calories: 75,
    protein: 1.2,
    carbs: 18,
    fat: 0.3,
    fiber: 4.9,
    sodium: 0.01,
    sugar: 4.8,
    }
  },
  "pea": {
    nutrition: {
    calories: 81,
    protein: 5.4,
    carbs: 14.4,
    fat: 0.4,
    fiber: 5.7,
    sodium: 0.01,
    sugar: 5.7,
    }
  },
  "potato": {
    nutrition: {
    calories: 58,
    protein: 2.6,
    carbs: 12.4,
    fat: 0.1,
    fiber: 2.5,
    sodium: 0.01,
    },
    synonyms: ["potatoes"]
  },
  "pumpkin": {
    nutrition: {
    calories: 26,
    protein: 1,
    carbs: 6.5,
    fat: 0.1,
    fiber: 0.5,
    sodium: 0,
    sugar: 2.8,
    }
  },
  "radish": {
    nutrition: {
    calories: 16,
    protein: 0.7,
    carbs: 3.4,
    fat: 0.1,
    fiber: 1.6,
    sodium: 0.04,
    sugar: 1.9,
    }
  },
  "red cabbage": {
    nutrition: {
    calories: 31,
    protein: 1.4,
    carbs: 7.4,
    fat: 0.2,
    fiber: 2.1,
    sodium: 0.03,
    sugar: 3.8,
    }
  },
  "rhubarb": {
    nutrition: {
    calories: 21,
    protein: 0.9,
    carbs: 4.5,
    fat: 0.2,
    fiber: 1.8,
    sodium: 0,
    sugar: 1.1,
    }
  },
  "shallot": {
    nutrition: {
    calories: 72,
    protein: 2.5,
    carbs: 16.8,
    fat: 0.1,
    fiber: 3.2,
    sodium: 0.01,
    sugar: 7.9,
    }
  },
  "snap pea": {
    nutrition: {
    calories: 81,
    protein: 5.4,
    carbs: 14.4,
    fat: 0.4,
    fiber: 5.7,
    sodium: 0.01,
    sugar: 5.7,
    }
  },
  "spaghetti squash": {
    nutrition: {
    calories: 31,
    protein: 0.6,
    carbs: 6.9,
    fat: 0.6,
    fiber: 1.5,
    sodium: 0.02,
    sugar: 2.8,
    }
  },
  "spinach": {
    nutrition: {
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    sodium: 0.08,
    sugar: 0.4,
    }
  },
  "sweet potato": {
    nutrition: {
    calories: 42,
    protein: 2.5,
    carbs: 8.8,
    fat: 0.5,
    fiber: 5.3,
    sodium: 0.01,
    }
  },
  "summer squash": {
    nutrition: {
    calories: 18,
    protein: 1.2,
    carbs: 3.8,
    fat: 0.2,
    fiber: 1.2,
    sodium: 0,
    sugar: 2.4,
    }
  },
  "tomatillo": {
    nutrition: {
    calories: 32,
    protein: 1,
    carbs: 5.8,
    fat: 1,
    fiber: 1.9,
    sodium: 0,
    sugar: 3.9,
    }
  },
  "tomato": {
    nutrition: {
    calories: 27,
    protein: 0.8,
    carbs: 5.5,
    fat: 0.6,
    fiber: 2.1,
    sodium: 0.01,
    },
    synonyms: ["tomatoes"]
  },
  "watercress": {
    nutrition: {
    calories: 11,
    protein: 2.3,
    carbs: 1.3,
    fat: 0.1,
    fiber: 0.5,
    sodium: 0.04,
    sugar: 0.2,
    }
  },
  "zucchini": {
    nutrition: {
    calories: 21,
    protein: 2.7,
    carbs: 3.1,
    fat: 0.4,
    fiber: 1.1,
    sodium: 0,
    }
  },
  "acorn squash": {
    nutrition: {
    calories: 40,
    protein: 0.8,
    carbs: 10.4,
    fat: 0.1,
    fiber: 1.5,
    sodium: 0,
    }
  },
  "celery root": {
    nutrition: {
    calories: 42,
    protein: 1.5,
    carbs: 9.2,
    fat: 0.3,
    fiber: 1.8,
    sodium: 0.1,
    sugar: 1.6,
    }
  },
  "jicama": {
    nutrition: {
    calories: 38,
    protein: 0.7,
    carbs: 8.8,
    fat: 0.1,
    fiber: 4.9,
    sodium: 0,
    sugar: 1.8,
    }
  },
  "plantain": {
    nutrition: {
    calories: 152,
    protein: 1.3,
    carbs: 36.7,
    fat: 0.1,
    fiber: 2.2,
    sodium: 0,
    sugar: 2.3,
    }
  },
  "snow pea": {
    nutrition: {
    calories: 81,
    protein: 5.4,
    carbs: 14.4,
    fat: 0.4,
    fiber: 5.7,
    sodium: 0.01,
    sugar: 5.7,
    }
  },
  "scallion": {
    nutrition: {
    calories: 32,
    protein: 1.8,
    carbs: 7.3,
    fat: 0.2,
    fiber: 2.6,
    sodium: 0.02,
    sugar: 2.3,
    }
  },
  "apple": {
    nutrition: {
    calories: 25,
    protein: 0.6,
    carbs: 5.7,
    fat: 0.3,
    sodium: 0,
    }
  },
  "apricot": {
    nutrition: {
    calories: 48,
    protein: 1.4,
    carbs: 11.1,
    fat: 0.4,
    fiber: 2,
    sodium: 0,
    sugar: 9.2,
    }
  },
  "banana": {
    nutrition: {
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    fiber: 2.6,
    sodium: 0,
    sugar: 12.2,
    }
  },
  "blackberry": {
    nutrition: {
    calories: 43,
    protein: 1.4,
    carbs: 9.6,
    fat: 0.5,
    fiber: 5.3,
    sodium: 0,
    sugar: 4.9,
    }
  },
  "cantaloupe": {
    nutrition: {
    calories: 34,
    protein: 0.8,
    carbs: 8.2,
    fat: 0.2,
    fiber: 0.8,
    sodium: 0.03,
    }
  },
  "cherry": {
    nutrition: {
    calories: 63,
    protein: 1.1,
    carbs: 16,
    fat: 0.2,
    fiber: 2.1,
    sodium: 0,
    sugar: 12.8,
    }
  },
  "coconut": {
    nutrition: {
    calories: 354,
    protein: 3.3,
    carbs: 15.2,
    fat: 33.5,
    fiber: 9,
    sodium: 0.02,
    sugar: 6.2,
    }
  },
  "cranberry": {
    nutrition: {
    calories: 46,
    protein: 0.5,
    carbs: 12,
    fat: 0.1,
    fiber: 3.6,
    sodium: 0,
    sugar: 4.3,
    }
  },
  "date": {
    nutrition: {
    calories: 277,
    protein: 1.8,
    carbs: 75,
    fat: 0.2,
    fiber: 6.7,
    sodium: 0,
    sugar: 66.5,
    }
  },
  "fig": {
    nutrition: {
    calories: 74,
    protein: 0.8,
    carbs: 19.2,
    fat: 0.3,
    fiber: 2.9,
    sodium: 0,
    sugar: 16.3,
    }
  },
  "kiwi": {
    nutrition: {
    calories: 58,
    protein: 1.1,
    carbs: 14,
    fat: 0.4,
    fiber: 3,
    sodium: 0.01,
    }
  },
  "lemon": {
    nutrition: {
    calories: 22,
    protein: 0.4,
    carbs: 6.9,
    fat: 0.2,
    fiber: 0.3,
    sodium: 0,
    sugar: 2.5,
    }
  },
  "lime": {
    nutrition: {
    calories: 30,
    protein: 0.7,
    carbs: 10.5,
    fat: 0.2,
    fiber: 2.8,
    sodium: 0,
    sugar: 1.7,
    }
  },
  "mango": {
    nutrition: {
    calories: 60,
    protein: 0.8,
    carbs: 15,
    fat: 0.4,
    fiber: 1.6,
    sodium: 0,
    sugar: 13.7,
    }
  },
  "nectarine": {
    nutrition: {
    calories: 44,
    protein: 1.1,
    carbs: 10.6,
    fat: 0.3,
    fiber: 1.7,
    sodium: 0,
    sugar: 7.9,
    }
  },
  "orange": {
    nutrition: {
    calories: 97,
    protein: 1.5,
    carbs: 25,
    fat: 0.2,
    fiber: 10.6,
    sodium: 0,
    }
  },
  "papaya": {
    nutrition: {
    calories: 43,
    protein: 0.5,
    carbs: 10.8,
    fat: 0.3,
    fiber: 1.7,
    sodium: 0.01,
    sugar: 7.8,
    }
  },
  "peach": {
    nutrition: {
    calories: 42,
    protein: 0.9,
    carbs: 10.1,
    fat: 0.3,
    fiber: 1.5,
    sodium: 0.01,
    }
  },
  "pear": {
    nutrition: {
    calories: 57,
    protein: 0.4,
    carbs: 15.2,
    fat: 0.1,
    fiber: 3.1,
    sodium: 0,
    sugar: 9.8,
    }
  },
  "plum": {
    nutrition: {
    calories: 46,
    protein: 0.7,
    carbs: 11.4,
    fat: 0.3,
    fiber: 1.4,
    sodium: 0,
    sugar: 9.9,
    }
  },
  "pomegranate": {
    nutrition: {
    calories: 83,
    protein: 1.7,
    carbs: 18.7,
    fat: 1.2,
    fiber: 4,
    sodium: 0,
    sugar: 13.7,
    }
  },
  "strawberry": {
    nutrition: {
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3,
    fiber: 2,
    sodium: 0,
    sugar: 4.9,
    }
  },
  "tangerine": {
    nutrition: {
    calories: 43,
    protein: 0.5,
    carbs: 10.1,
    fat: 0.2,
    fiber: 0.2,
    sodium: 0,
    sugar: 9.9,
    }
  },
  "watermelon": {
    nutrition: {
    calories: 30,
    protein: 0.6,
    carbs: 7.6,
    fat: 0.2,
    fiber: 0.4,
    sodium: 0,
    sugar: 6.2,
    }
  },
  "clementine": {
    nutrition: {
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fat: 0.2,
    fiber: 1.7,
    sodium: 0,
    sugar: 9.2,
    }
  },
  "beef, ground 80%": {
    nutrition: {
    calories: 254,
    protein: 17.2,
    carbs: 0,
    fat: 20,
    fiber: 0,
    sodium: 0.07,
    sugar: 0,
    }
  },
  "beef, ground 93%": {
    nutrition: {
    calories: 152,
    protein: 20.8,
    carbs: 0,
    fat: 7,
    fiber: 0,
    sodium: 0.07,
    sugar: 0,
    }
  },
  "chicken thigh": {
    nutrition: {
    calories: 440,
    protein: 9.6,
    carbs: 0.8,
    fat: 44.2,
    fiber: 0,
    sodium: 0.05,
    sugar: 0,
    }
  },
  "ground turkey": {
    nutrition: {
    calories: 148,
    protein: 19.7,
    carbs: 0,
    fat: 7.7,
    fiber: 0,
    sodium: 0.06,
    sugar: 0,
    }
  },
  "turkey breast": {
    nutrition: {
    calories: 114,
    protein: 23.7,
    carbs: 0.1,
    fat: 1.5,
    fiber: 0,
    sodium: 0.11,
    sugar: 0.1,
    }
  },
  "pork shoulder": {
    nutrition: {
    calories: 127,
    protein: 22.5,
    carbs: 0,
    fat: 3.4,
    fiber: 0,
    sodium: 0.05,
    sugar: 0,
    }
  },
  "bacon": {
    nutrition: {
    calories: 309,
    protein: 11.7,
    carbs: 5.3,
    fat: 29.5,
    fiber: 2.6,
    sodium: 1.46,
    sugar: 0,
    }
  },
  "ham": {
    nutrition: {
    calories: 165,
    protein: 22,
    carbs: 0.5,
    fat: 7.7,
    fiber: 0,
    sodium: 1.38,
    sugar: 0,
    }
  },
  "lamb chop": {
    nutrition: {
    calories: 282,
    protein: 16.6,
    carbs: 0,
    fat: 23.4,
    fiber: 0,
    sodium: 0.06,
    sugar: 0,
    }
  },
  "veal": {
    nutrition: {
    calories: 197,
    protein: 18.6,
    carbs: 0,
    fat: 13.1,
    fiber: 0,
    sodium: 0.1,
    sugar: 0,
    }
  },
  "duck breast": {
    nutrition: {
    calories: 123,
    protein: 19.8,
    carbs: 0,
    fat: 4.3,
    fiber: 0,
    sodium: 0.06,
    }
  },
  "duck leg": {
    nutrition: {
    calories: 73,
    protein: 16.4,
    carbs: 0,
    fat: 0.3,
    fiber: 0,
    sodium: 0.06,
    sugar: 0,
    }
  },
  "quail": {
    nutrition: {
    calories: 192,
    protein: 19.6,
    carbs: 0,
    fat: 12,
    fiber: 0,
    sodium: 0.05,
    }
  },
  "rabbit": {
    nutrition: {
    calories: 114,
    protein: 21.8,
    carbs: 0,
    fat: 2.3,
    fiber: 0,
    sodium: 0.05,
    }
  },
  "venison": {
    nutrition: {
    calories: 116,
    protein: 21.5,
    carbs: 0,
    fat: 2.7,
    }
  },
  "salmon": {
    nutrition: {
    calories: 179,
    protein: 19.9,
    carbs: 0,
    fat: 10.4,
    fiber: 0,
    sodium: 0.05,
    sugar: 0,
    }
  },
  "tuna": {
    nutrition: {
    calories: 144,
    protein: 23.3,
    carbs: 0,
    fat: 4.9,
    fiber: 0,
    sodium: 0.04,
    sugar: 0,
    }
  },
  "cod": {
    nutrition: {
    calories: 82,
    protein: 17.8,
    carbs: 0,
    fat: 0.7,
    fiber: 0,
    sodium: 0.05,
    sugar: 0,
    }
  },
  "halibut": {
    nutrition: {
    calories: 186,
    protein: 14.4,
    carbs: 0,
    fat: 13.8,
    fiber: 0,
    sodium: 0.08,
    sugar: 0,
    }
  },
  "mackerel": {
    nutrition: {
    calories: 205,
    protein: 18.6,
    carbs: 0,
    fat: 13.9,
    fiber: 0,
    sodium: 0.09,
    sugar: 0,
    }
  },
  "sardine": {
    nutrition: {
    calories: 902,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sodium: 0,
    }
  },
  "trout": {
    nutrition: {
    calories: 148,
    protein: 20.8,
    carbs: 0,
    fat: 6.6,
    fiber: 0,
    sodium: 0.05,
    sugar: 0,
    }
  },
  "tilapia": {
    nutrition: {
    calories: 96,
    protein: 20.1,
    carbs: 0,
    fat: 1.7,
    fiber: 0,
    sodium: 0.05,
    sugar: 0,
    }
  },
  "sea bass": {
    nutrition: {
    calories: 97,
    protein: 18.4,
    carbs: 0,
    fat: 2,
    fiber: 0,
    sodium: 0.07,
    sugar: 0,
    }
  },
  "swordfish": {
    nutrition: {
    calories: 144,
    protein: 19.7,
    carbs: 0,
    fat: 6.7,
    fiber: 0,
    sodium: 0.08,
    sugar: 0,
    }
  },
  "anchovy": {
    nutrition: {
    calories: 131,
    protein: 20.4,
    carbs: 0,
    fat: 4.8,
    fiber: 0,
    sodium: 0.1,
    sugar: 0,
    }
  },
  "herring": {
    nutrition: {
    calories: 158,
    protein: 18,
    carbs: 0,
    fat: 9,
    fiber: 0,
    sodium: 0.09,
    sugar: 0,
    }
  },
  "catfish": {
    nutrition: {
    calories: 119,
    protein: 15.2,
    carbs: 0,
    fat: 5.9,
    fiber: 0,
    sodium: 0.1,
    sugar: 0,
    }
  },
  "lobster": {
    nutrition: {
    calories: 77,
    protein: 16.5,
    carbs: 0,
    fat: 0.8,
    fiber: 0,
    sodium: 0.42,
    sugar: 0,
    }
  },
  "shrimp": {
    nutrition: {
    calories: 85,
    protein: 20.1,
    carbs: 0,
    fat: 0.5,
    sodium: 0.12,
    }
  },
  "mussel": {
    nutrition: {
    calories: 86,
    protein: 11.9,
    carbs: 3.7,
    fat: 2.2,
    fiber: 0,
    sodium: 0.29,
    sugar: 0,
    }
  },
  "octopus": {
    nutrition: {
    calories: 82,
    protein: 14.9,
    carbs: 2.2,
    fat: 1,
    fiber: 0,
    sodium: 0.23,
    sugar: 0,
    }
  },
  "squid": {
    nutrition: {
    calories: 92,
    protein: 15.6,
    carbs: 3.1,
    fat: 1.4,
    fiber: 0,
    sodium: 0.04,
    sugar: 0,
    }
  },
  "crayfish": {
    nutrition: {
    calories: 72,
    protein: 14.8,
    carbs: 0,
    fat: 1,
    fiber: 0,
    sodium: 0.06,
    }
  },
  "yellowfin tuna": {
    nutrition: {
    calories: 109,
    protein: 24.4,
    carbs: 0,
    fat: 0.5,
    fiber: 0,
    sodium: 0.05,
    sugar: 0,
    }
  },
  "milk, whole": {
    nutrition: {
    calories: 60,
    protein: 3.3,
    carbs: 4.6,
    fat: 3.2,
    sodium: 0.04,
    }
  },
  "milk, 2%": {
    nutrition: {
    calories: 112,
    protein: 4.1,
    carbs: 17.6,
    fat: 2.8,
    fiber: 0,
    sodium: 0.09,
    sugar: 4.6,
    }
  },
  "milk, skim": {
    nutrition: {
    calories: 56,
    protein: 5.7,
    carbs: 7.7,
    fat: 0.2,
    fiber: 0,
    sodium: 0.08,
    sugar: 7.7,
    }
  },
  "half and half": {
    nutrition: {
    calories: 131,
    protein: 3.1,
    carbs: 4.3,
    fat: 11.5,
    fiber: 0,
    sodium: 0.06,
    sugar: 4.1,
    }
  },
  "sour cream": {
    nutrition: {
    calories: 198,
    protein: 2.4,
    carbs: 4.6,
    fat: 19.4,
    fiber: 0,
    sodium: 0.03,
    sugar: 3.4,
    }
  },
  "cream cheese": {
    nutrition: {
    calories: 350,
    protein: 6.2,
    carbs: 5.5,
    fat: 34.4,
    fiber: 0,
    sodium: 0.31,
    sugar: 3.8,
    }
  },
  "yogurt, greek": {
    nutrition: {
    calories: 73,
    protein: 10,
    carbs: 3.9,
    fat: 1.9,
    fiber: 0,
    sodium: 0.03,
    sugar: 3.6,
    }
  },
  "cottage cheese": {
    nutrition: {
    calories: 95,
    protein: 10.9,
    carbs: 3,
    fat: 4.2,
    fiber: 0.1,
    sodium: 0.4,
    sugar: 0.4,
    }
  },
  "ricotta cheese": {
    nutrition: {
    calories: 150,
    protein: 7.5,
    carbs: 7.3,
    fat: 10.2,
    fiber: 0,
    sodium: 0.11,
    sugar: 0.3,
    }
  },
  "mozzarella": {
    nutrition: {
    calories: 23,
    protein: 3.2,
    carbs: 2.7,
    fat: 0.6,
    fiber: 1.6,
    sodium: 0,
    sugar: 0.3,
    }
  },
  "cheddar cheese": {
    nutrition: {
    calories: 408,
    protein: 23.3,
    carbs: 2.4,
    fat: 34,
    sodium: 0.65,
    }
  },
  "parmesan": {
    nutrition: {
    calories: 420,
    protein: 28.4,
    carbs: 13.9,
    fat: 27.8,
    fiber: 0,
    sodium: 1.8,
    sugar: 0.1,
    }
  },
  "swiss cheese": {
    nutrition: {
    calories: 393,
    protein: 27,
    carbs: 1.4,
    fat: 31,
    sodium: 0.19,
    }
  },
  "provolone": {
    nutrition: {
    calories: 351,
    protein: 25.6,
    carbs: 2.1,
    fat: 26.6,
    fiber: 0,
    sodium: 0.73,
    sugar: 0.6,
    }
  },
  "gouda": {
    nutrition: {
    calories: 356,
    protein: 24.9,
    carbs: 2.2,
    fat: 27.4,
    fiber: 0,
    sodium: 0.82,
    sugar: 2.2,
    }
  },
  "blue cheese": {
    nutrition: {
    calories: 353,
    protein: 21.4,
    carbs: 2.3,
    fat: 28.7,
    fiber: 0,
    sodium: 1.15,
    sugar: 0.5,
    }
  },
  "feta cheese": {
    nutrition: {
    calories: 265,
    protein: 14.2,
    carbs: 3.9,
    fat: 21.5,
    fiber: 0,
    sodium: 1.14,
    sugar: 0,
    }
  },
  "goat cheese": {
    nutrition: {
    calories: 264,
    protein: 18.5,
    carbs: 0,
    fat: 21.1,
    fiber: 0,
    sodium: 0.46,
    sugar: 0,
    }
  },
  "brie": {
    nutrition: {
    calories: 334,
    protein: 20.8,
    carbs: 0.5,
    fat: 27.7,
    fiber: 0,
    sodium: 0.63,
    sugar: 0.5,
    }
  },
  "camembert": {
    nutrition: {
    calories: 300,
    protein: 19.8,
    carbs: 0.5,
    fat: 24.3,
    fiber: 0,
    sodium: 0.84,
    sugar: 0.5,
    }
  },
  "egg": {
    nutrition: {
    calories: 143,
    protein: 12.6,
    carbs: 0.7,
    fat: 9.5,
    fiber: 0,
    sodium: 0.14,
    sugar: 0.4,
    },
    density: 0,
    unitWeight: 50
  },
  "egg white": {
    nutrition: {
    calories: 52,
    protein: 10.9,
    carbs: 0.7,
    fat: 0.2,
    fiber: 0,
    sodium: 0.17,
    sugar: 0.7,
    },
    density: 0,
    unitWeight: 33
  },
  "butter": {
    nutrition: {
    calories: 717,
    protein: 0.9,
    carbs: 0.1,
    fat: 81.1,
    fiber: 0,
    sodium: 0.64,
    sugar: 0.1,
    }
  },
  "margarine": {
    nutrition: {
    calories: 727,
    protein: 0.3,
    carbs: 0.8,
    fat: 80.3,
    fiber: 0,
    sodium: 0.72,
    sugar: 0,
    }
  },
  "all-purpose flour": {
    nutrition: {
    calories: 366,
    protein: 10.9,
    carbs: 77.3,
    fat: 1.5,
    sodium: 0,
    }
  },
  "bread flour": {
    nutrition: {
    calories: 361,
    protein: 12,
    carbs: 72.5,
    fat: 1.7,
    fiber: 2.4,
    sodium: 0,
    sugar: 0.3,
    }
  },
  "whole wheat flour": {
    nutrition: {
    calories: 370,
    protein: 15.1,
    carbs: 71.2,
    fat: 2.7,
    fiber: 10.6,
    sodium: 0,
    }
  },
  "cornstarch": {
    nutrition: {
    calories: 381,
    protein: 0.3,
    carbs: 91.3,
    fat: 0.1,
    fiber: 0.9,
    sodium: 0.01,
    sugar: 0,
    }
  },
  "wild rice": {
    nutrition: {
    calories: 357,
    protein: 14.7,
    carbs: 74.9,
    fat: 1.1,
    fiber: 6.2,
    sodium: 0.01,
    sugar: 2.5,
    }
  },
  "quinoa": {
    nutrition: {
    calories: 120,
    protein: 4.4,
    carbs: 21.3,
    fat: 1.9,
    fiber: 2.8,
    sodium: 0.01,
    sugar: 0.9,
    }
  },
  "oats": {
    nutrition: {
    calories: 236,
    protein: 9.5,
    carbs: 40.2,
    fat: 4.6,
    fiber: 4.1,
    sodium: 0.41,
    sugar: 6.7,
    }
  },
  "couscous": {
    nutrition: {
    calories: 376,
    protein: 12.8,
    carbs: 77.4,
    fat: 0.6,
    fiber: 5,
    sodium: 0.01,
    }
  },
  "barley": {
    nutrition: {
    calories: 352,
    protein: 9.9,
    carbs: 77.7,
    fat: 1.2,
    fiber: 15.6,
    sodium: 0.01,
    sugar: 0.8,
    }
  },
  "bulgur": {
    nutrition: {
    calories: 342,
    protein: 12.3,
    carbs: 75.9,
    fat: 1.3,
    fiber: 12.5,
    sodium: 0.02,
    sugar: 0.4,
    }
  },
  "millet": {
    nutrition: {
    calories: 378,
    protein: 11,
    carbs: 72.8,
    fat: 4.2,
    fiber: 8.5,
    sodium: 0.01,
    }
  },
  "pasta": {
    nutrition: {
    calories: 371,
    protein: 13,
    carbs: 74.7,
    fat: 1.5,
    fiber: 3.2,
    sodium: 0.01,
    sugar: 2.7,
    }
  },
  "egg noodles": {
    nutrition: {
    calories: 384,
    protein: 14.2,
    carbs: 71.3,
    fat: 4.4,
    fiber: 3.3,
    sodium: 0.02,
    sugar: 1.9,
    }
  },
  "white bread": {
    nutrition: {
    calories: 238,
    protein: 10.7,
    carbs: 43.9,
    fat: 2.2,
    fiber: 9.2,
    sodium: 0.48,
    sugar: 5,
    }
  },
  "whole wheat bread": {
    nutrition: {
    calories: 262,
    protein: 9.8,
    carbs: 55.9,
    fat: 1.7,
    fiber: 6.1,
    sodium: 0.42,
    sugar: 2.9,
    }
  },
  "sourdough bread": {
    nutrition: {
    calories: 272,
    protein: 10.8,
    carbs: 51.9,
    fat: 2.4,
    fiber: 2.2,
    sodium: 0.6,
    sugar: 4.6,
    }
  },
  "rye bread": {
    nutrition: {
    calories: 259,
    protein: 8.5,
    carbs: 48.3,
    fat: 3.3,
    fiber: 5.8,
    sodium: 0.6,
    sugar: 3.9,
    }
  },
  "pita bread": {
    nutrition: {
    calories: 275,
    protein: 9.1,
    carbs: 55.7,
    fat: 1.2,
    fiber: 2.2,
    sodium: 0.54,
    sugar: 1.3,
    }
  },
  "bagel": {
    nutrition: {
    calories: 278,
    protein: 10.6,
    carbs: 53,
    fat: 2.1,
    fiber: 2.3,
    sodium: 0.51,
    }
  },
  "croissant": {
    nutrition: {
    calories: 254,
    protein: 7.4,
    carbs: 37.1,
    fat: 8.7,
    fiber: 2.5,
    sodium: 0.27,
    }
  },
  "black beans": {
    nutrition: {
    calories: 341,
    protein: 21.6,
    carbs: 62.4,
    fat: 1.4,
    fiber: 15.5,
    sodium: 0.01,
    sugar: 2.1,
    }
  },
  "kidney beans": {
    nutrition: {
    calories: 29,
    protein: 4.2,
    carbs: 4.1,
    fat: 0.5,
    sodium: 0.01,
    }
  },
  "chickpea": {
    nutrition: {
    calories: 378,
    protein: 20.5,
    carbs: 63,
    fat: 6,
    fiber: 12.2,
    sodium: 0.02,
    sugar: 10.7,
    }
  },
  "lentil": {
    nutrition: {
    calories: 352,
    protein: 24.6,
    carbs: 63.4,
    fat: 1.1,
    fiber: 10.7,
    sodium: 0.01,
    sugar: 2,
    }
  },
  "red lentils": {
    nutrition: {
    calories: 358,
    protein: 23.9,
    carbs: 63.1,
    fat: 2.2,
    fiber: 10.8,
    sodium: 0.01,
    }
  },
  "split peas": {
    nutrition: {
    calories: 364,
    protein: 23.1,
    carbs: 61.6,
    fat: 3.9,
    fiber: 22.2,
    sodium: 0.01,
    sugar: 3.1,
    }
  },
  "lima beans": {
    nutrition: {
    calories: 113,
    protein: 6.8,
    carbs: 20.2,
    fat: 0.9,
    fiber: 4.9,
    sodium: 0.01,
    sugar: 1.5,
    }
  },
  "fava beans": {
    nutrition: {
    calories: 88,
    protein: 7.9,
    carbs: 17.6,
    fat: 0.7,
    fiber: 7.5,
    sodium: 0.03,
    sugar: 9.2,
    }
  },
  "adzuki beans": {
    nutrition: {
    calories: 329,
    protein: 19.9,
    carbs: 62.9,
    fat: 0.5,
    fiber: 12.7,
    sodium: 0.01,
    }
  },
  "mung beans": {
    nutrition: {
    calories: 347,
    protein: 23.9,
    carbs: 62.6,
    fat: 1.2,
    fiber: 16.3,
    sodium: 0.02,
    sugar: 6.6,
    }
  },
  "edamame": {
    nutrition: {
    calories: 121,
    protein: 11.9,
    carbs: 8.9,
    fat: 5.2,
    fiber: 5.2,
    sodium: 0.01,
    sugar: 2.2,
    }
  },
  "tempeh": {
    nutrition: {
    calories: 192,
    protein: 20.3,
    carbs: 7.6,
    fat: 10.8,
    sodium: 0.01,
    }
  },
  "tofu": {
    nutrition: {
    calories: 85,
    protein: 10.9,
    carbs: 1,
    fat: 4.2,
    fiber: 0.9,
    sodium: 0.03,
    sugar: 0.4,
    }
  },
  "miso paste": {
    nutrition: {
    calories: 198,
    protein: 12.8,
    carbs: 25.4,
    fat: 6,
    fiber: 5.4,
    sodium: 3.73,
    sugar: 6.2,
    }
  },
  "peanut butter": {
    nutrition: {
    calories: 520,
    protein: 25.9,
    carbs: 35.6,
    fat: 34,
    fiber: 5.2,
    sodium: 0.54,
    sugar: 9.3,
    }
  },
  "pine nuts": {
    nutrition: {
    calories: 673,
    protein: 13.7,
    carbs: 13.1,
    fat: 68.4,
    fiber: 3.7,
    sodium: 0,
    sugar: 3.6,
    }
  },
  "macadamia nuts": {
    nutrition: {
    calories: 718,
    protein: 7.9,
    carbs: 13.8,
    fat: 75.8,
    fiber: 8.6,
    sodium: 0.01,
    sugar: 4.6,
    }
  },
  "pistachios": {
    nutrition: {
    calories: 560,
    protein: 20.2,
    carbs: 27.2,
    fat: 45.3,
    fiber: 10.6,
    sodium: 0,
    sugar: 7.7,
    }
  },
  "coconut, shredded": {
    nutrition: {
    calories: 501,
    protein: 2.9,
    carbs: 47.7,
    fat: 35.5,
    fiber: 4.5,
    sodium: 0.26,
    sugar: 43.2,
    }
  },
  "chia seeds": {
    nutrition: {
    calories: 486,
    protein: 16.5,
    carbs: 42.1,
    fat: 30.7,
    fiber: 34.4,
    sodium: 0.02,
    }
  },
  "sesame seeds": {
    nutrition: {
    calories: 573,
    protein: 17.7,
    carbs: 23.4,
    fat: 49.7,
    fiber: 11.8,
    sodium: 0.01,
    sugar: 0.3,
    }
  },
  "sunflower seeds": {
    nutrition: {
    calories: 584,
    protein: 20.8,
    carbs: 20,
    fat: 51.5,
    fiber: 8.6,
    sodium: 0.01,
    sugar: 2.6,
    }
  },
  "poppy seeds": {
    nutrition: {
    calories: 525,
    protein: 18,
    carbs: 28.1,
    fat: 41.6,
    fiber: 19.5,
    sodium: 0.03,
    sugar: 3,
    }
  },
  "tahini": {
    nutrition: {
    calories: 592,
    protein: 17.4,
    carbs: 21.5,
    fat: 53,
    fiber: 4.7,
    sodium: 0.04,
    }
  },
  "olive oil": {
    nutrition: {
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    },
    density: 0.92
  },
  "vegetable oil": {
    nutrition: {
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    },
    density: 0.92
  },
  "coconut oil": {
    nutrition: {
    calories: 892,
    protein: 0,
    carbs: 0,
    fat: 99.1,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    },
    density: 0.92
  },
  "avocado oil": {
    nutrition: {
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sodium: 0,
    }
  },
  "sesame oil": {
    nutrition: {
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    }
  },
  "grapeseed oil": {
    nutrition: {
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    }
  },
  "lard": {
    nutrition: {
    calories: 902,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    },
    density: 0.94
  },
  "ghee": {
    nutrition: {
    calories: 900,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    }
  },
  "basil": {
    nutrition: {
    calories: 23,
    protein: 3.2,
    carbs: 2.7,
    fat: 0.6,
    fiber: 1.6,
    sodium: 0,
    sugar: 0.3,
    }
  },
  "cilantro": {
    nutrition: {
    calories: 23,
    protein: 2.1,
    carbs: 3.7,
    fat: 0.5,
    fiber: 2.8,
    sodium: 0.05,
    sugar: 0.9,
    }
  },
  "parsley": {
    nutrition: {
    calories: 36,
    protein: 3,
    carbs: 6.3,
    fat: 0.8,
    fiber: 3.3,
    sodium: 0.06,
    sugar: 0.9,
    }
  },
  "mint": {
    nutrition: {
    calories: 70,
    protein: 3.8,
    carbs: 14.9,
    fat: 0.9,
    fiber: 8,
    sodium: 0.03,
    }
  },
  "rosemary": {
    nutrition: {
    calories: 131,
    protein: 3.3,
    carbs: 20.7,
    fat: 5.9,
    fiber: 14.1,
    sodium: 0.03,
    }
  },
  "thyme": {
    nutrition: {
    calories: 101,
    protein: 5.6,
    carbs: 24.4,
    fat: 1.7,
    fiber: 14,
    sodium: 0.01,
    }
  },
  "dill": {
    nutrition: {
    calories: 43,
    protein: 3.5,
    carbs: 7,
    fat: 1.1,
    fiber: 2.1,
    sodium: 0.06,
    }
  },
  "chives": {
    nutrition: {
    calories: 30,
    protein: 3.3,
    carbs: 4.4,
    fat: 0.7,
    fiber: 2.5,
    sodium: 0,
    sugar: 1.9,
    }
  },
  "oregano": {
    nutrition: {
    calories: 265,
    protein: 9,
    carbs: 68.9,
    fat: 4.3,
    fiber: 42.5,
    sodium: 0.03,
    sugar: 4.1,
    }
  },
  "cinnamon": {
    nutrition: {
    calories: 247,
    protein: 4,
    carbs: 80.6,
    fat: 1.2,
    fiber: 53.1,
    sodium: 0.01,
    sugar: 2.2,
    }
  },
  "cumin": {
    nutrition: {
    calories: 375,
    protein: 17.8,
    carbs: 44.2,
    fat: 22.3,
    fiber: 10.5,
    sodium: 0.17,
    sugar: 2.3,
    }
  },
  "paprika": {
    nutrition: {
    calories: 282,
    protein: 14.1,
    carbs: 54,
    fat: 12.9,
    fiber: 34.9,
    sodium: 0.07,
    sugar: 10.3,
    }
  },
  "turmeric": {
    nutrition: {
    calories: 312,
    protein: 9.7,
    carbs: 67.1,
    fat: 3.3,
    fiber: 22.7,
    sodium: 0.03,
    sugar: 3.2,
    }
  },
  "chili powder": {
    nutrition: {
    calories: 282,
    protein: 13.5,
    carbs: 49.7,
    fat: 14.3,
    fiber: 34.8,
    sodium: 2.87,
    sugar: 7.2,
    }
  },
  "garlic powder": {
    nutrition: {
    calories: 331,
    protein: 16.6,
    carbs: 72.7,
    fat: 0.7,
    fiber: 9,
    sodium: 0.06,
    sugar: 2.4,
    }
  },
  "onion powder": {
    nutrition: {
    calories: 341,
    protein: 10.4,
    carbs: 79.1,
    fat: 1,
    fiber: 15.2,
    sodium: 0.07,
    sugar: 6.6,
    }
  },
  "black pepper": {
    nutrition: {
    calories: 251,
    protein: 10.4,
    carbs: 64,
    fat: 3.3,
    fiber: 25.3,
    sodium: 0.02,
    sugar: 0.6,
    }
  },
  "cayenne pepper": {
    nutrition: {
    calories: 318,
    protein: 12,
    carbs: 56.6,
    fat: 17.3,
    fiber: 27.2,
    sodium: 0.03,
    sugar: 10.3,
    }
  },
  "bay leaf": {
    nutrition: {
    calories: 313,
    protein: 7.6,
    carbs: 75,
    fat: 8.4,
    fiber: 26.3,
    sodium: 0.02,
    }
  },
  "clove garlic": {
    nutrition: {
    calories: 143,
    protein: 6.6,
    carbs: 28.2,
    fat: 0.4,
    fiber: 2.7,
    },
    synonyms: ["garlic"],
    density: 0,
    unitWeight: 4
  },
  "ginger": {
    nutrition: {
    calories: 80,
    protein: 1.8,
    carbs: 17.8,
    fat: 0.8,
    fiber: 2,
    sodium: 0.01,
    sugar: 1.7,
    }
  },
  "vanilla extract": {
    nutrition: {
    calories: 288,
    protein: 0.1,
    carbs: 12.6,
    fat: 0.1,
    fiber: 0,
    sodium: 0.01,
    sugar: 12.6,
    }
  },
  "salt": {
    nutrition: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sodium: 38.8,
    sugar: 0,
    },
    density: 1.2
  },
  "soy sauce": {
    nutrition: {
    calories: 60,
    protein: 10.5,
    carbs: 5.6,
    fat: 0.1,
    fiber: 0.8,
    sodium: 5.59,
    sugar: 1.7,
    }
  },
  "fish sauce": {
    nutrition: {
    calories: 35,
    protein: 5.1,
    carbs: 3.6,
    fat: 0,
    fiber: 0,
    sodium: 7.85,
    sugar: 3.6,
    }
  },
  "worcestershire sauce": {
    nutrition: {
    calories: 77,
    protein: 0,
    carbs: 19.2,
    fat: 0,
    fiber: 0,
    sodium: 1.3,
    sugar: 10,
    }
  },
  "ketchup": {
    nutrition: {
    calories: 117,
    protein: 1.1,
    carbs: 26.8,
    fat: 0.6,
    sodium: 0.95,
    }
  },
  "mustard": {
    nutrition: {
    calories: 61,
    protein: 4.3,
    carbs: 5.3,
    fat: 3.4,
    fiber: 4.3,
    sodium: 1.1,
    }
  },
  "balsamic vinegar": {
    nutrition: {
    calories: 88,
    protein: 0.5,
    carbs: 17,
    fat: 0,
    sodium: 0.02,
    sugar: 15,
    },
    density: 1.04
  },
  "red wine vinegar": {
    nutrition: {
    calories: 19,
    protein: 0,
    carbs: 0.3,
    fat: 0,
    fiber: 0,
    sodium: 0.01,
    sugar: 0,
    }
  },
  "apple cider vinegar": {
    nutrition: {
    calories: 21,
    protein: 0,
    carbs: 0.9,
    fat: 0,
    fiber: 0,
    sodium: 0.01,
    sugar: 0.4,
    }
  },
  "honey": {
    nutrition: {
    calories: 304,
    protein: 0.3,
    carbs: 82.4,
    fat: 0,
    fiber: 0.2,
    sodium: 0,
    sugar: 82.1,
    },
    density: 1.42
  },
  "maple syrup": {
    nutrition: {
    calories: 260,
    protein: 0,
    carbs: 67,
    fat: 0.1,
    fiber: 0,
    sodium: 0.01,
    sugar: 60.5,
    },
    density: 1.33
  },
  "sugar": {
    nutrition: {
    calories: 385,
    protein: 0,
    carbs: 99.6,
    fat: 0.3,
    sodium: 0,
    },
    density: 0.85
  },
  "sugar, brown": {
    nutrition: {
    calories: 380,
    protein: 0.1,
    carbs: 98.1,
    fat: 0,
    fiber: 0,
    sodium: 0.03,
    sugar: 97,
    },
    density: 0.8
  },
  "sugar, powdered": {
    nutrition: {
    calories: 389,
    protein: 0,
    carbs: 99.8,
    fat: 0,
    fiber: 0,
    sodium: 0,
    sugar: 97.8,
    },
    density: 0.56
  },
  "baking powder": {
    nutrition: {
    calories: 97,
    protein: 0.1,
    carbs: 46.9,
    fat: 0.4,
    fiber: 2.2,
    sodium: 0.09,
    sugar: 0,
    },
    density: 0.72
  },
  "baking soda": {
    nutrition: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sodium: 27.4,
    sugar: 0,
    },
    density: 0.75
  },
  "cocoa powder": {
    nutrition: {
    calories: 228,
    protein: 19.6,
    carbs: 57.9,
    fat: 13.7,
    fiber: 37,
    sodium: 0.02,
    sugar: 1.8,
    }
  },
  "yeast": {
    nutrition: {
    calories: 325,
    protein: 40.4,
    carbs: 41.2,
    fat: 7.6,
    fiber: 26.9,
    sodium: 0.05,
    sugar: 0,
    }
  },
  "chicken broth": {
    nutrition: {
    calories: 185,
    protein: 25.3,
    carbs: 0.9,
    fat: 8.1,
    fiber: 0,
    sodium: 0.48,
    sugar: 0,
    },
    density: 1.01
  },
  "beef broth": {
    nutrition: {
    calories: 170,
    protein: 17.3,
    carbs: 16.1,
    fat: 4,
    fiber: 0,
    sodium: 24,
    sugar: 14.5,
    },
    density: 1.01
  },
  "vegetable broth": {
    nutrition: {
    calories: 6,
    protein: 0.2,
    carbs: 1,
    fat: 0.1,
    fiber: 0,
    sodium: 0.3,
    sugar: 0.6,
    },
    density: 1.01
  },
  "tomato sauce": {
    nutrition: {
    calories: 24,
    protein: 1.2,
    carbs: 5.3,
    fat: 0.3,
    fiber: 1.5,
    sodium: 0.47,
    sugar: 3.6,
    },
    density: 1.04
  },
  "salsa": {
    nutrition: {
    calories: 143,
    protein: 3.1,
    carbs: 11.1,
    fat: 9.5,
    fiber: 0.7,
    sodium: 0.8,
    sugar: 2,
    }
  },
  "coconut milk": {
    nutrition: {
    calories: 357,
    protein: 1.2,
    carbs: 53.2,
    fat: 16.3,
    fiber: 0.2,
    sodium: 0.04,
    sugar: 51.5,
    }
  },
  "corn syrup": {
    nutrition: {
    calories: 283,
    protein: 0,
    carbs: 76.8,
    fat: 0.2,
    fiber: 0,
    sodium: 0.06,
    sugar: 76.8,
    },
    density: 1.37
  },
  "molasses": {
    nutrition: {
    calories: 290,
    protein: 0,
    carbs: 74.7,
    fat: 0.1,
    fiber: 0,
    sodium: 0.04,
    sugar: 74.7,
    },
    density: 1.37
  },
  "milk": {
    nutrition: {
    calories: 60,
    protein: 3.3,
    carbs: 4.6,
    fat: 3.2,
    sodium: 0.04,
    },
    density: 1.04
  },
  "white wine": {
    nutrition: {
    calories: 82,
    protein: 0.1,
    carbs: 2.6,
    fat: 0,
    fiber: 0,
    sodium: 0.01,
    sugar: 1,
    },
    density: 0.99
  },
  "red wine": {
    nutrition: {
    calories: 85,
    protein: 0.1,
    carbs: 2.6,
    fat: 0,
    fiber: 0,
    sodium: 0,
    sugar: 0.6,
    },
    density: 0.99
  },
  "coffee": {
    nutrition: {
    calories: 2,
    protein: 0.3,
    carbs: 0.2,
    fat: 0,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    }
  },
  "frozen peas": {
    nutrition: {
    calories: 53,
    protein: 3.4,
    carbs: 11.2,
    fat: 0.5,
    fiber: 3.4,
    sodium: 0.08,
    }
  },
  "frozen corn": {
    nutrition: {
    calories: 98,
    protein: 3.3,
    carbs: 23.5,
    fat: 0.8,
    fiber: 2.8,
    sodium: 0.01,
    }
  },
  "frozen broccoli": {
    nutrition: {
    calories: 26,
    protein: 2.8,
    carbs: 4.8,
    fat: 0.3,
    fiber: 3,
    sodium: 0.02,
    sugar: 1.4,
    }
  },
  "frozen spinach": {
    nutrition: {
    calories: 24,
    protein: 3.2,
    carbs: 4.1,
    fat: 0.2,
    fiber: 1.9,
    sodium: 0.01,
    }
  },
  "frozen blueberries": {
    nutrition: {
    calories: 64,
    protein: 1.2,
    carbs: 15.7,
    fat: 0.4,
    fiber: 5,
    sodium: 0,
    sugar: 10.7,
    }
  },
  "ice cream": {
    nutrition: {
    calories: 207,
    protein: 3.5,
    carbs: 23.6,
    fat: 11,
    fiber: 0.7,
    sodium: 0.08,
    sugar: 21.2,
    }
  },
  "curry powder": {
    nutrition: {
    calories: 325,
    protein: 14.3,
    carbs: 55.8,
    fat: 14,
    fiber: 53.2,
    sodium: 0.05,
    sugar: 2.8,
    }
  },
  "hoisin sauce": {
    nutrition: {
    calories: 220,
    protein: 3.3,
    carbs: 44.1,
    fat: 3.4,
    fiber: 2.8,
    sodium: 1.62,
    sugar: 27.3,
    }
  },
  "oyster sauce": {
    nutrition: {
    calories: 51,
    protein: 1.4,
    carbs: 10.9,
    fat: 0.3,
    fiber: 0.3,
    sodium: 2.73,
    sugar: 0,
    }
  },
  "hummus": {
    nutrition: {
    calories: 237,
    protein: 7.8,
    carbs: 15,
    fat: 17.8,
    fiber: 5.5,
    sodium: 0.43,
    sugar: 0.6,
    }
  },
  "pesto": {
    nutrition: {
    calories: 372,
    protein: 4.2,
    carbs: 6.9,
    fat: 36.4,
    fiber: 2.1,
    sodium: 1.03,
    sugar: 2.6,
    }
  },
  "breadcrumbs": {
    nutrition: {
    calories: 342,
    protein: 12.3,
    carbs: 75.9,
    fat: 1.3,
    fiber: 12.5,
    sodium: 0.02,
    sugar: 0.4,
    }
  },
  "coconut milk, canned": {
    nutrition: {
    calories: 357,
    protein: 1.2,
    carbs: 53.2,
    fat: 16.3,
    fiber: 0.2,
    sodium: 0.04,
    sugar: 51.5,
    }
  },
  "sesame oil, toasted": {
    nutrition: {
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    }
  },
  "chicken breast, cooked": {
    nutrition: {
    calories: 252,
    protein: 16.4,
    carbs: 17.6,
    fat: 12.9,
    fiber: 0,
    sodium: 0.45,
    sugar: 0,
    }
  },
  "beef, cooked": {
    nutrition: {
    calories: 261,
    protein: 12.6,
    carbs: 1.9,
    fat: 22.2,
    fiber: 0,
    sodium: 1.14,
    sugar: 1.5,
    }
  },
  "kale, raw": {
    nutrition: {
    calories: 35,
    protein: 2.9,
    carbs: 4.4,
    fat: 1.5,
    fiber: 4.1,
    sodium: 0.05,
    sugar: 1,
    }
  },
};

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

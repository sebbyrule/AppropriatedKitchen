export interface Ingredient {
  amount: string;
  name: string;
  notes?: string;
}

export interface Nutrition {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber?: string;
  sodium?: string;
  sugar?: string;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface RecipeFrontmatter {
  title: string;
  slug: string;
  date: string;
  featured: boolean;
  image: string;
  excerpt: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: Difficulty;
  tags: string[];
  ingredients: Ingredient[];
  nutrition: Nutrition;
}

export interface Recipe extends RecipeFrontmatter {
  content: string;
  readingTime: string;
}
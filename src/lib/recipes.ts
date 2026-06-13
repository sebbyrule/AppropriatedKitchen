import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { RecipeFrontmatter, Recipe } from "@/types/recipe";
import { calculateReadingTime } from "@/lib/utils";

const recipesDirectory = path.join(process.cwd(), "content", "recipes");

function isRecipeFrontmatter(data: unknown): data is RecipeFrontmatter {
  const d = data as Record<string, unknown>;
  return (
    typeof d?.title === "string" &&
    typeof d?.slug === "string" &&
    typeof d?.date === "string" &&
    typeof d?.featured === "boolean" &&
    typeof d?.excerpt === "string" &&
    Array.isArray(d?.ingredients)
  );
}

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDirectory)) return [];

  const fileNames = fs.readdirSync(recipesDirectory);

  const recipes = fileNames
    .filter((fn) => fn.endsWith(".mdx") || fn.endsWith(".md"))
    .map((fileName): Recipe | null => {
      const fullPath = path.join(recipesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      if (!isRecipeFrontmatter(data)) {
        console.warn(`Skipping ${fileName}: invalid or missing frontmatter`);
        return null;
      }

      return {
        ...data,
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .filter((r): r is Recipe => r !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | null {
  try {
    // Try .mdx first, then .md
    let fullPath = path.join(recipesDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(recipesDirectory, `${slug}.md`);
      if (!fs.existsSync(fullPath)) return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (!isRecipeFrontmatter(data)) return null;

    return {
      ...data,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}

export function getFeaturedRecipes(): Recipe[] {
  return getAllRecipes().filter((r) => r.featured);
}
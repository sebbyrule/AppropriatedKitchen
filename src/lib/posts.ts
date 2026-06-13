import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostFrontmatter, Post } from "@/types/post";
import { calculateReadingTime } from "@/lib/utils";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function isPostFrontmatter(data: unknown): data is PostFrontmatter {
  const d = data as Record<string, unknown>;
  return (
    typeof d?.title === "string" &&
    typeof d?.slug === "string" &&
    typeof d?.date === "string" &&
    typeof d?.excerpt === "string"
  );
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fn) => fn.endsWith(".md") || fn.endsWith(".mdx"))
    .map((fileName): Post | null => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      if (!isPostFrontmatter(data)) {
        console.warn(`Skipping ${fileName}: invalid or missing frontmatter`);
        return null;
      }

      return {
        ...data,
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  try {
    let fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.mdx`);
      if (!fs.existsSync(fullPath)) return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (!isPostFrontmatter(data)) return null;

    return {
      ...data,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}
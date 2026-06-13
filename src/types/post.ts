export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags?: string[];
  image?: string;
}

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: string;
}
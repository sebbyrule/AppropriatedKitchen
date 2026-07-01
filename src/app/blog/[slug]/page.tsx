import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarDays, Clock } from "lucide-react";
import { BlogContent } from "@/components/blog/BlogContent";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12 space-y-5">
        <p className="eyebrow">Field Notes</p>
        <h1 className="font-serif text-4xl font-light leading-[1.08] sm:text-5xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
          {post.tags && post.tags.length > 0 && (
            <span className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span key={tag} className="text-primary/80">
                  {tag}
                </span>
              ))}
            </span>
          )}
        </div>
        <div className="rule rule-accent !mt-8" />
      </header>

      <BlogContent content={post.content} />
    </article>
  );
}
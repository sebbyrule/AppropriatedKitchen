import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, stories, and behind-the-scenes from the Appropriated Kitchen.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="eyebrow">Field Notes</p>
        <h1 className="mt-3 font-serif text-4xl font-light sm:text-6xl">Blog</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Thoughts, stories, and behind-the-scenes from the kitchen.
        </p>
        <div className="mt-6 rule rule-accent" />
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-y border-border py-24 text-center">
          <h2 className="font-serif text-2xl font-light">No posts yet</h2>
          <p className="mt-2 text-muted-foreground">
            Check back soon for new writing.
          </p>
        </div>
      )}
    </div>
  );
}
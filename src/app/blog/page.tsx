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
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-serif sm:text-5xl">Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Thoughts, stories, and behind-the-scenes from the kitchen.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground">No posts yet</h2>
          <p className="mt-2 text-muted-foreground">
            Check back soon for new content!
          </p>
        </div>
      )}
    </div>
  );
}
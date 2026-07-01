import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/post";

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex h-full flex-col border-t border-border pt-6">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>

        <h3 className="mt-4 font-serif text-2xl font-normal leading-snug transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground/80">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}

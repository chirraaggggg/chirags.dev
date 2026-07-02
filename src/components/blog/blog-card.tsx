import { format, parseISO } from "date-fns";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type BlogCardPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
};

export function BlogCard({
  post,
  className,
}: {
  post: BlogCardPost;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "block rounded-xl border border-edge bg-background p-4 transition-colors hover:bg-muted/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {post.title}
        </h3>
        <time
          className="shrink-0 text-xs text-muted-foreground"
          dateTime={post.date}
        >
          {format(parseISO(post.date), "MMM d, yyyy")}
        </time>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{post.readingTime}</span>
        {post.tags.length > 0 && <span aria-hidden>·</span>}
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-edge bg-muted/30 px-2 py-1 text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

import { cn } from "@/lib/utils";

interface TagPillsProps {
  tags: string[];
  className?: string;
}

export function TagPills({ tags, className }: TagPillsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

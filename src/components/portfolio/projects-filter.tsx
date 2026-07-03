"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Shipped", "In Progress"] as const;

export function ProjectsFilter({ label }: { label: string }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  return (
    <div className="mb-8 flex items-center justify-between">
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/35">
        {label}
      </span>
      <div className="flex gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "rounded-full px-3.5 py-1 text-xs font-medium transition-colors",
              activeFilter === filter
                ? "bg-white text-black"
                : "border border-white/15 text-white/45 hover:border-white/30 hover:text-white/70"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

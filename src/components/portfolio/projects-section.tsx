"use client";

import { useState } from "react";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Shipped", "In Progress"] as const;

interface ProjectsSectionProps {
  projects: Project[];
  label: string;
}

export function ProjectsSection({ projects, label }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/40">
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
                  : "border border-white/20 text-white/50 hover:border-white/40 hover:text-white/70"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.name}>
            <div className="flex items-baseline gap-2">
              <a
                href={project.href}
                target={project.href.startsWith("/") ? undefined : "_blank"}
                rel={
                  project.href.startsWith("/") ? undefined : "noreferrer"
                }
                className="text-sm font-medium text-white transition-opacity hover:opacity-60"
              >
                {project.name}
              </a>
              <span className="text-xs text-white/30">↗</span>
            </div>
            <p className="mt-1 max-w-[600px] text-sm leading-relaxed text-white/50">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

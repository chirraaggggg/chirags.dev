"use client";

import { useState } from "react";

import { RETRO } from "@/config/retro";
import { cn } from "@/lib/utils";

import { TerminalHeading } from "./window";

const TAB_COLORS: Record<string, string> = {
  red: "bg-[#ff5f57]",
  blue: "bg-[#4b7bec]",
  yellow: "bg-[#febc2e]",
  green: "bg-[#28c840]",
};

function ProjectCard({
  category,
  date,
  title,
  href,
  description,
  tech,
  cta,
}: (typeof RETRO.sideQuests.projects)[number]) {
  return (
    <article className="group flex flex-col rounded-lg border-2 border-black/15 bg-white p-5 shadow-[0_3px_0_0_rgba(0,0,0,0.12)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-black/35 hover:shadow-[0_8px_0_0_rgba(0,0,0,0.15)]">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded border border-black/20 bg-black/5 px-2 py-0.5 font-sans text-[10px] font-extrabold tracking-wider text-black/60 uppercase">
          {category}
        </span>
        <span className="font-terminal text-[11px] font-medium text-black/40 whitespace-nowrap">
          {date}
        </span>
      </div>

      <h3 className="mt-3 font-sans text-lg font-extrabold tracking-tight text-black">
        {title}
      </h3>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {tech.map((tag) => (
          <span
            key={tag}
            className="rounded border border-black/15 bg-black/5 px-1.5 py-0.5 font-sans text-[10px] font-bold tracking-wide text-black/55"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-black/65">
        {description}
      </p>

      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        className="mt-5 block rounded-md bg-black px-4 py-2.5 text-center font-sans text-xs font-extrabold tracking-wide text-white shadow-[0_3px_0_0_rgba(0,0,0,0.5)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-none"
      >
        {cta}
      </a>
    </article>
  );
}

export function SideQuests() {
  const [activeTab, setActiveTab] = useState("GITHUB");
  const showProjects = activeTab === "GITHUB";

  return (
    <div className="overflow-hidden rounded-xl border border-black/15 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]">
      <div className="flex">
        {/* Main content */}
        <div className="min-w-0 flex-1 p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <TerminalHeading accent="text-[#ff5f57]">
              {activeTab}
            </TerminalHeading>
            <a
              href="#home"
              className="rounded-md border-2 border-black bg-[#ff5f57] px-3 py-1.5 font-terminal text-[11px] font-bold tracking-wider text-white shadow-[0_2px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
            >
              ESC
            </a>
          </div>

          {showProjects ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {RETRO.sideQuests.projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-black/20 bg-black/[0.02] px-6 text-center">
              <span className="font-sans text-sm font-semibold text-black/60">
                {RETRO.sideQuests.emptyState}
              </span>
              <span className="mt-2 font-hand text-2xl font-semibold text-black/40">
                stay tuned…
              </span>
            </div>
          )}
        </div>

        {/* Right-edge vertical tab rail */}
        <div className="flex shrink-0 flex-col items-center gap-3 border-l border-black/10 bg-black/[0.03] py-6 pr-2.5 pl-1">
          {/* Dots rail suggesting a slider */}
          <span
            className="flex flex-1 flex-col items-center gap-1.5"
            aria-hidden
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "size-1 rounded-full",
                  i === 2 ? "bg-black/60" : "bg-black/20",
                )}
              />
            ))}
          </span>

          {RETRO.sideQuests.tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-md border-2 border-black px-2 py-4 font-terminal text-[11px] font-bold tracking-wider text-white shadow-[0_3px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow,filter] duration-150 hover:-translate-x-0.5 hover:shadow-[0_4px_0_0_rgba(0,0,0,0.9)] active:translate-x-0.5 active:shadow-none",
                  "[writing-mode:vertical-rl] rotate-180",
                  TAB_COLORS[tab.color],
                  isActive &&
                    "ring-2 ring-black ring-offset-2 ring-offset-white",
                )}
              >
                {tab.label}
              </button>
            );
          })}

          <span className="flex-1" aria-hidden />
        </div>
      </div>
    </div>
  );
}

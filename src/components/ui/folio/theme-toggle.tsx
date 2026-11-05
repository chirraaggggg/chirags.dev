"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group inline-flex items-center gap-1.5 font-code text-[11px] tracking-[0.08em] uppercase",
        "text-ink/60 transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none",
        className
      )}
    >
      <span className="text-ink/40 transition-transform duration-300 group-hover:rotate-90">
        [
      </span>
      <span className="inline-flex size-3.5 items-center justify-center">
        {dark ? "◐" : "◑"}
      </span>
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
      <span className="text-ink/40 transition-transform duration-300 group-hover:-rotate-90">
        ]
      </span>
    </button>
  );
}

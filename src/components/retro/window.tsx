import { ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RetroWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Override for the centered title bar text (e.g. bold sans for command headings). */
  titleClassName?: string;
}

/**
 * macOS-style window card: traffic-light dots top-left, centered
 * monospace title bar, light border, soft drop shadow, rounded corners.
 */
export function RetroWindow({
  title,
  children,
  className,
  bodyClassName,
  titleClassName,
}: RetroWindowProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-black/15 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.3)] dark:border-white/15 dark:bg-[#141414] dark:shadow-[0_10px_30px_-12px_rgba(255,255,255,0.06)] dark:hover:border-white/30 dark:hover:shadow-[0_16px_40px_-14px_rgba(255,255,255,0.1)]",
        className,
      )}
    >
      <div className="relative flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/10">
        {/* Traffic lights + matching spacer so the title stays centered */}
        <div className="flex w-14 items-center gap-2">
          <span className="size-3 rounded-full border border-black/10 bg-[#ff5f57]" />
          <span className="size-3 rounded-full border border-black/10 bg-[#febc2e]" />
          <span className="size-3 rounded-full border border-black/10 bg-[#28c840]" />
        </div>
        <span
          className={cn(
            "absolute left-1/2 -translate-x-1/2 truncate font-terminal text-xs font-medium tracking-[0.08em] text-black/60 dark:text-white/60",
            titleClassName,
          )}
        >
          {title}
        </span>
        {/* spacer to balance the traffic lights */}
        <span className="w-14" aria-hidden />
      </div>
      <div className={cn("p-5 sm:p-7", bodyClassName)}>{children}</div>
    </div>
  );
}

/** Bold sans section heading with a single solid-color chevron icon. */
export function TerminalHeading({
  children,
  className,
  accent = "text-[#4b7bec]",
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <h2
      className={cn(
        "flex items-center gap-2.5 font-pixel text-sm uppercase tracking-normal text-[#111] dark:text-[#e8e8e8]",
        className,
      )}
    >
      <ChevronRightIcon
        className={cn("size-5 shrink-0", accent)}
        strokeWidth={3.5}
        aria-hidden
      />
      {children}
    </h2>
  );
}

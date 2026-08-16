"use client";

import { useLenis } from "lenis/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { USER } from "@/features/portfolio/data/user";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";
import { decodeEmail } from "@/utils/string";

type NavVariant = "red" | "yellow" | "blue" | "white";

type NavItem = {
  id: string;
  label: string;
  href?: string;
  variant: NavVariant;
  scrollTo?: "top";
  enterIcon?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { id: "esc", label: "ESC", variant: "red", scrollTo: "top" },
  { id: "home", label: "HOME", href: "#home", variant: "white" },
  { id: "about", label: "ABOUT", href: "#about", variant: "white" },
  {
    id: "side-quests",
    label: "SIDE QUESTS",
    href: "#side-quests",
    variant: "white",
  },
  { id: "links", label: "LINKS", href: "#links", variant: "yellow" },
  {
    id: "contact",
    label: "CONTACT",
    href: `mailto:${decodeEmail(USER.email)}`,
    variant: "blue",
    enterIcon: true,
  },
];

const VARIANT_CLASSES: Record<NavVariant, string> = {
  red: "bg-[#ff5f57] text-white",
  yellow: "bg-[#febc2e] text-black",
  blue: "bg-[#4b7bec] text-white",
  white:
    "bg-white text-black dark:bg-[#2b2b2b] dark:text-[#e8e8e8] dark:border-[#4a4a4a]",
};

const NAV_BUTTON_CLASSES =
  "relative flex items-center gap-1.5 rounded-full border-2 border-black px-2.5 py-1.5 font-sans text-[11px] font-extrabold tracking-wide whitespace-nowrap shadow-[0_3px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgba(0,0,0,0.9)] active:translate-y-0.5 active:shadow-none dark:shadow-[0_3px_0_0_rgba(255,255,255,0.15)] dark:hover:shadow-[0_4px_0_0_rgba(255,255,255,0.15)] sm:px-3 sm:text-xs";

const SCROLL_IDS = ["home", "about", "side-quests", "links"];

/** Sun/moon light–dark toggle styled to match the retro nav buttons. */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();

  const isDark = isClient && resolvedTheme === "dark";

  // Keep the browser chrome (mobile address bar) in sync with the theme.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        "content",
        isDark ? META_THEME_COLORS.dark : META_THEME_COLORS.light,
      );
    }
  }, [isDark]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        isDark ? "Switch to light theme" : "Switch to dark theme"
      }
      className="relative flex h-7 w-[54px] shrink-0 items-center rounded-full border-2 border-black bg-white p-[3px] shadow-[0_3px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgba(0,0,0,0.9)] active:translate-y-0.5 active:shadow-none dark:border-[#3a3a3a] dark:bg-[#1c1c1c] dark:shadow-[0_3px_0_0_rgba(255,255,255,0.15)] dark:hover:shadow-[0_4px_0_0_rgba(255,255,255,0.15)]"
    >
      <span
        aria-hidden
        className={cn(
          "flex size-[18px] items-center justify-center rounded-full transition-transform duration-200 ease-out",
          isDark ? "translate-x-[26px] bg-[#e8e8e8]" : "translate-x-0 bg-black",
        )}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="11"
      height="11"
      fill="currentColor"
      className="text-[#e8e8e8]"
      aria-hidden
    >
      <path d="M8.7 2.1A4.5 4.5 0 1 0 9.9 9.8 4.9 4.9 0 0 1 8.7 2.1Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#1a1a1a]"
      aria-hidden
    >
      <circle cx="6" cy="6" r="2.2" />
      <line x1="6" y1="0.8" x2="6" y2="2" />
      <line x1="6" y1="10" x2="6" y2="11.2" />
      <line x1="0.8" y1="6" x2="2" y2="6" />
      <line x1="10" y1="6" x2="11.2" y2="6" />
      <line x1="2.1" y1="2.1" x2="3" y2="3" />
      <line x1="9" y1="9" x2="9.9" y2="9.9" />
      <line x1="2.1" y1="9.9" x2="3" y2="9" />
      <line x1="9" y1="3" x2="9.9" y2="2.1" />
    </svg>
  );
}

export function RetroNav() {
  const [activeId, setActiveId] = useState<string>("home");
  const lenis = useLenis();

  useEffect(() => {
    const sections = SCROLL_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (item: NavItem) => {
    if (item.scrollTo === "top") {
      lenis?.scrollTo(0, { immediate: false });
      setActiveId("home");
    }
  };

  return (
    <nav
      className="fixed top-3 left-1/2 z-50 max-w-[calc(100vw-1rem)] -translate-x-1/2"
      aria-label="Primary"
    >
      <div className="no-scrollbar flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full border-2 border-black bg-white p-1.5 shadow-[0_4px_0_0_rgba(0,0,0,0.9)] dark:border-[#3a3a3a] dark:bg-[#161616] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.15)]">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.id !== "esc" && item.id !== "contact" && activeId === item.id;

          const activeDot = isActive ? (
            <span
              className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-green-500 ring-2 ring-white dark:ring-[#161616]"
              aria-hidden
            />
          ) : null;

          if (item.scrollTo === "top") {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClick(item)}
                className={cn(
                  NAV_BUTTON_CLASSES,
                  VARIANT_CLASSES[item.variant],
                )}
              >
                {item.label}
                {activeDot}
              </button>
            );
          }

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                const target = item.href?.startsWith("#")
                  ? document.getElementById(item.href.slice(1))
                  : null;
                if (target) {
                  e.preventDefault();
                  lenis?.scrollTo(target, { offset: -80 });
                  setActiveId(item.id);
                }
              }}
              className={cn(NAV_BUTTON_CLASSES, VARIANT_CLASSES[item.variant])}
            >
              {item.label}
              {item.enterIcon && <span aria-hidden>&#8617;</span>}
              {activeDot}
            </a>
          );
        })}

        <ThemeToggle />
      </div>
    </nav>
  );
}

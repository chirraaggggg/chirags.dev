"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

import { USER } from "@/features/portfolio/data/user";
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
  white: "bg-white text-black",
};

const NAV_BUTTON_CLASSES =
  "relative flex items-center gap-1.5 rounded-full border-2 border-black px-2.5 py-1.5 font-sans text-[11px] font-extrabold tracking-wide whitespace-nowrap shadow-[0_3px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgba(0,0,0,0.9)] active:translate-y-0.5 active:shadow-none sm:px-3 sm:text-xs";

const SCROLL_IDS = ["home", "about", "side-quests", "links"];

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
      <div className="no-scrollbar flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full border-2 border-black bg-white p-1.5 shadow-[0_4px_0_0_rgba(0,0,0,0.9)]">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.id !== "esc" && item.id !== "contact" && activeId === item.id;

          const activeDot = isActive ? (
            <span
              className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-green-500 ring-2 ring-white"
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
      </div>
    </nav>
  );
}

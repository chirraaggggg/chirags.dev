"use client";

import { useTheme } from "next-themes";

import { PORTFOLIO_COPY } from "@/config/site";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme ?? PORTFOLIO_COPY.theme.dark;
  const isLight = currentTheme === PORTFOLIO_COPY.theme.light;

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(
          currentTheme === PORTFOLIO_COPY.theme.dark
            ? PORTFOLIO_COPY.theme.light
            : PORTFOLIO_COPY.theme.dark
        )
      }
      className={
        "fixed right-5 top-5 z-50 flex h-7 w-[52px] items-center rounded-full border transition-[background-color,border-color,opacity] duration-200 ease-out hover:opacity-85"
      }
      style={{
        backgroundColor: isLight ? "#e8e8e8" : "#1a1a1a",
        borderColor: isLight ? "#ccc" : "#333",
      }}
      aria-label={`Switch to ${
        currentTheme === PORTFOLIO_COPY.theme.dark
          ? PORTFOLIO_COPY.theme.light
          : PORTFOLIO_COPY.theme.dark
      } theme`}
    >
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-200 ease-out"
        style={{
          backgroundColor: isLight ? "#1a1a1a" : "#e8e8e8",
          transform: isLight ? "translateX(4px)" : "translateX(28px)",
        }}
      >
        {isLight ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      fill="none"
      stroke="#e8e8e8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
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

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      fill="#1a1a1a"
      aria-hidden="true"
    >
      <path d="M8.7 2.1A4.5 4.5 0 1 0 9.9 9.8 4.9 4.9 0 0 1 8.7 2.1Z" />
    </svg>
  );
}

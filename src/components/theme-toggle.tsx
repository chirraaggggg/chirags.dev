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
      className="fixed right-6 top-6 z-50 text-[#666] transition-colors hover:text-(--text)"
      aria-label={`Switch to ${
        currentTheme === PORTFOLIO_COPY.theme.dark
          ? PORTFOLIO_COPY.theme.light
          : PORTFOLIO_COPY.theme.dark
      } theme`}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.2" y1="4.2" x2="6.4" y2="6.4" />
      <line x1="17.6" y1="17.6" x2="19.8" y2="19.8" />
      <line x1="4.2" y1="19.8" x2="6.4" y2="17.6" />
      <line x1="17.6" y1="6.4" x2="19.8" y2="4.2" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <mask id="moon-mask">
          <rect width="24" height="24" fill="white" />
          <circle cx="15" cy="10" r="7" fill="black" />
        </mask>
      </defs>
      <circle cx="11" cy="12" r="7" mask="url(#moon-mask)" fill="none" />
    </svg>
  );
}

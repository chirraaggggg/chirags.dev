"use client";

import { useEffect, useState } from "react";

import { Avatar } from "@/components/minimal/avatar";

/**
 * Breadcrumb header used on every page except the home intro. It starts as an
 * avatar above the title and slides together into a single compact row once
 * the page scrolls.
 */
export function SiteHeader({ title }: { title: string }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="mp-header-spacer" aria-hidden="true" />
      <header className={compact ? "mp-sticky is-compact" : "mp-sticky"}>
        <Avatar />
        <div className="mp-sticky-title">
          <nav className="mp-breadcrumb" aria-label="Current page">
            <h1>{title}</h1>
          </nav>
        </div>
      </header>
    </>
  );
}

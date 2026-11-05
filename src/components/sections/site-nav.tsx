"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ui/folio/theme-toggle";
import { FOLIO, FOLIO_NAV, FOLIO_SECTIONS } from "@/config/folio";
import { SOCIAL_LINKS } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [active, setActive] = useState<string>("work");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    for (const section of FOLIO_SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("folio-scroll-lock", menuOpen);
    return () => document.body.classList.remove("folio-scroll-lock");
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled && "border-b border-dashed border-ink/15 bg-paper/80 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
          {/* Desktop bracket nav */}
          <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
            {FOLIO_NAV.map((item) => {
              const isActive = item.section === active;
              const external = item.label === "CV";
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  className={cn(
                    "group relative inline-flex items-center font-code text-[10px] tracking-[0.14em] uppercase transition-colors",
                    isActive ? "text-ink" : "text-ink/55 hover:text-ink"
                  )}
                >
                  <span className="text-ink/30 transition-colors group-hover:text-ink/60">[</span>
                  <span className="mx-1 inline-block w-2 text-center text-[9px]">
                    {isActive ? "•" : " "}
                  </span>
                  <span className="text-ink/30 transition-colors group-hover:text-ink/60">]</span>
                  <span className="ml-1.5">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Centered mark */}
          <Link
            href="/"
            aria-label="Chirag, home"
            className="group absolute left-1/2 flex -translate-x-1/2 items-baseline gap-1.5"
          >
            <span className="folio-display text-[22px] leading-none tracking-[0.02em] transition-transform duration-300 group-hover:-translate-y-0.5">
              {FOLIO.firstName}
            </span>
            <span className="mb-[2px] size-[5px] rounded-full bg-ink transition-transform duration-500 group-hover:scale-150" />
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("folio:open-command"))}
              aria-label="Open command palette"
              className="hidden items-center gap-1.5 rounded-full border border-dashed border-ink/40 px-2.5 py-1 font-code text-[9px] tracking-[0.14em] text-ink/55 transition-colors hover:border-ink hover:text-ink sm:inline-flex"
            >
              ⌘K
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              className="font-code text-[10px] tracking-[0.14em] text-ink uppercase md:hidden"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-6 pt-28 pb-10 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {FOLIO_NAV.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-3 py-2"
                  >
                    <span className="font-code text-[10px] text-ink/35">
                      0{index + 1}
                    </span>
                    <span className="folio-display text-[13vw] leading-[1.05]">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-code text-[10px] tracking-[0.14em] text-ink/55 uppercase"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
              <p className="folio-italic text-[16px] text-ink/55">
                {FOLIO.location} · {FOLIO.role}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

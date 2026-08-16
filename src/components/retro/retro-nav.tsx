"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { RETRO } from "@/config/retro";
import { USER } from "@/features/portfolio/data/user";
import { cn } from "@/lib/utils";
import { decodeEmail } from "@/utils/string";

const SCROLL_IDS = ["home", "about"];

/** Desktop SIDE QUESTS dropdown — mirrors the reference nav exactly. */
const SIDE_QUESTS_DROPDOWN = [
  { label: "GitHub", tab: "github" },
  { label: "Brands", tab: "brandCollabs" },
  { label: "Bucket List", tab: "bucketList" },
  { label: "Art", tab: "art" },
];

/** Enter icon shown inside the CONTACT key, from the reference site. */
function EnterIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
}

export function RetroNav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("home");
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const isProjectsPage = pathname === "/projects";

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

  // Close the mobile dropdown after navigation.
  useEffect(() => {
    setMobileMoreOpen(false);
  }, [pathname]);

  const keyBase =
    "kbd-key" +
    (isProjectsPage ? "" : activeId === "home" ? " active" : "");

  return (
    <nav className="glass-nav-container" aria-label="Primary">
      <div className="keyboard-base">
        {/* ESC — scroll to top */}
        <div
          className="kbd-key esc-key hide-on-mobile"
          style={{ cursor: "pointer", zIndex: 100 }}
          onClick={() => window.scrollTo({ top: 0 })}
        >
          ESC
        </div>

        {/* HOME */}
        <Link
          href="#home"
          className={cn(
            keyBase,
            "mobile-home-red",
            !isProjectsPage && activeId === "home" && "active",
          )}
          onClick={(e) => {
            e.preventDefault();
            setActiveId("home");
            window.scrollTo({ top: 0 });
          }}
        >
          Home
        </Link>

        {/* ABOUT */}
        <Link
          href="#about"
          className={cn(
            "kbd-key hide-on-mobile",
            !isProjectsPage && activeId === "about" && "active",
          )}
          onClick={(e) => {
            e.preventDefault();
            setActiveId("about");
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          About
        </Link>

        {/* SIDE QUESTS — dropdown */}
        <div className="dropdown-container">
          <Link
            href="/projects"
            className={cn("kbd-key side-quests-btn", isProjectsPage && "active")}
          >
            Side Quests
          </Link>
          <div className="subnav-dropdown-menu">
            {SIDE_QUESTS_DROPDOWN.map((item) => (
              <Link
                key={item.tab}
                href={`/projects?tab=${item.tab}`}
                className="subnav-dropdown-item"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <a
          href="#links"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("links")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="kbd-key arcade-yellow-key hide-on-mobile"
        >
          Links
        </a>

        {/* CONTACT */}
        <a
          href={`mailto:${decodeEmail(USER.email)}`}
          className="kbd-key fn-key hide-on-mobile"
          style={{ gap: 6 }}
        >
          Contact
          <EnterIcon />
        </a>

        {/* Mobile MORE dropdown */}
        <div className="dropdown-container show-on-mobile">
          <button
            type="button"
            className="kbd-key fn-key more-btn"
            style={{ gap: 6 }}
            onClick={() => setMobileMoreOpen((v) => !v)}
            aria-expanded={mobileMoreOpen}
          >
            More
            <EnterIcon />
          </button>
          <div
            className={cn("subnav-dropdown-menu", mobileMoreOpen && "show")}
          >
            <a
              href="#links"
              className="subnav-dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                setMobileMoreOpen(false);
                document
                  .getElementById("links")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Links
            </a>
            <a
              href={`mailto:${decodeEmail(USER.email)}`}
              className="subnav-dropdown-item"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

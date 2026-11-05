"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FOLIO } from "@/config/folio";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
] as const;

export function NavigationDock() {
  const pathname = usePathname();

  return (
    <div className="mp-dock">
      <nav className="mp-dock-surface" aria-label="Main navigation">
        <div className="mp-dock-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mp-nav-link"
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <a className="mp-dock-button" href={`mailto:${FOLIO.email}`}>
          <span>Contact me</span>
        </a>
      </nav>
    </div>
  );
}

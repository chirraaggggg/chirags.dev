"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FOLIO } from "@/config/folio";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
] as const;

export function Dock() {
  const pathname = usePathname();

  return (
    <div className="deshi-dock">
      <nav className="deshi-dock-surface" aria-label="Main navigation">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="deshi-dock-link"
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <a className="deshi-dock-cta" href={`mailto:${FOLIO.email}`}>
          Say hi
        </a>
      </nav>
    </div>
  );
}

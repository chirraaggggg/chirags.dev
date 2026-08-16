import dynamic from "next/dynamic";
import { Github, Linkedin, XIcon } from "lucide-react";
import Link from "next/link";

import { DesktopNav } from "@/components/desktop-nav";
import { Icons } from "@/components/icons";
import { MAIN_NAV } from "@/config/site";
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";
import { cn } from "@/lib/utils";

import { SiteHeaderWrapper } from "./site-header-wrapper";
import { ThemeToggle } from "./theme-toggle";

const MobileNav = dynamic(() =>
  import("@/components/mobile-nav").then((mod) => mod.MobileNav),
);

export function SiteHeader() {
  return (
    <SiteHeaderWrapper
      className={cn(
        "sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2",
        "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]",
        "not-dark:data-[affix=true]:**:data-header-container:after:bg-border",
        "transition-shadow duration-300",
      )}
    >
      <div
        className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl"
        data-header-container
      >
        <div className="flex-1" />

        <DesktopNav items={MAIN_NAV} />

        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((social) => {
            let Icon;
            if (social.title === "X (formerly Twitter)") {
              Icon = XIcon;
            } else if (social.title === "GitHub") {
              Icon = Github;
            } else if (social.title === "LinkedIn") {
              Icon = Linkedin;
            } else if (social.title === "LeetCode") {
              Icon = Icons.leetcode;
            }
            return (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.title}
              >
                {Icon && <Icon className="size-4" />}
              </Link>
            );
          })}
          <span className="mx-2 flex h-4 w-px bg-border" />
          <ThemeToggle />
          <MobileNav className="sm:hidden" items={MAIN_NAV} />
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}

"use client";

import { motion,MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SmoothScroll } from "@/components/smooth-scroll";
import { CommandPalette } from "@/components/ui/folio/command-palette";
import { CustomCursor } from "@/components/ui/folio/custom-cursor";
import { ShipConfetti } from "@/components/ui/folio/ship-confetti";

export function FolioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <div className="folio min-h-svh">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[130] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:font-code focus:text-[10px] focus:text-paper"
          >
            Skip to content
          </a>

          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>

          <CommandPalette />
          <ShipConfetti />
          <CustomCursor />
        </div>
      </SmoothScroll>
    </MotionConfig>
  );
}

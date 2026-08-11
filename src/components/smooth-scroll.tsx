"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Smooth inertial scrolling powered by Lenis, mounted once at the root.
 * `autoRaf` lets Lenis drive its own requestAnimationFrame loop, and `root`
 * binds it to the window scroll so anchor links scroll smoothly too.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}

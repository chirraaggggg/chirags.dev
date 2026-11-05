"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Pulls its child toward the cursor, then springs back. */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

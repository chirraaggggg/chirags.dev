"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Accent cursor that only appears inside `[data-cursor-zone]` areas (the work
 * deck), where the native cursor is hidden. Grows into a labelled disc over
 * cards.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.35 });

  const [zone, setZone] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      const inZone = Boolean(target?.closest("[data-cursor-zone]"));
      setZone(inZone);
      setLabel(
        inZone
          ? (target?.closest<HTMLElement>("[data-cursor-label]")?.dataset.cursorLabel ??
              null)
          : null
      );
    };

    const onLeave = () => {
      setZone(false);
      setLabel(null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <AnimatePresence>
        {zone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="-translate-x-1/2 -translate-y-1/2"
          >
            <div
              className={`flex items-center justify-center rounded-full border border-ink/15 bg-ink text-paper transition-all duration-300 ease-out ${
                label ? "size-20" : "size-5"
              }`}
            >
              <span className="font-code text-[9px] tracking-[0.22em]">{label}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+—/";

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** Scramble continuously until this becomes false. */
  active?: boolean;
};

export function ScrambleText({ text, className, active }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let start = 0;
    const run = (time: number) => {
      if (!start) start = time;
      const progress = Math.min(1, (time - start) / 520);

      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index / text.length < progress) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (progress < 1) {
        frame.current = window.requestAnimationFrame(run);
      }
    };

    frame.current = window.requestAnimationFrame(run);
    return () => window.cancelAnimationFrame(frame.current);
  }, [active, text]);

  return (
    <span className={className} aria-label={text}>
      {active ? display : text}
    </span>
  );
}

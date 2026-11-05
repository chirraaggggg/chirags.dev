"use client";

import { useEffect, useRef } from "react";

import {
  ASCII_PORTRAIT,
  ASCII_PORTRAIT_WIDTH,
} from "@/data/ascii-portrait";
import { cn } from "@/lib/utils";

const GLYPHS = ".:;!*=*#$@";

type Cell = {
  char: string;
  row: number;
  col: number;
  phase: number;
  /** 0..1 brightness from the source image. */
  weight: number;
};

/**
 * The hero portrait. Rendered to a canvas so 1,800+ characters can shimmer,
 * shuffle and react to the cursor without melting React.
 */
export function AsciiPortrait({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -999, y: -999, active: false });
  const glyphs = useRef<Cell[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rows = ASCII_PORTRAIT.length;
    const cols = ASCII_PORTRAIT_WIDTH;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let fontSize = 16;
    let charWidth = 10;
    let rowHeight = 16;
    let ink = "10, 31, 209";
    let dpr = 1;

    const buildGlyphs = () => {
      glyphs.current = [];
      let top = rows;
      let bottom = -1;
      let left = cols;
      let right = -1;

      ASCII_PORTRAIT.forEach((line, row) => {
        for (let col = 0; col < cols; col++) {
          const char = line[col] ?? " ";
          if (char.trim() === "") continue;
          glyphs.current.push({
            char,
            row,
            col,
            phase: Math.random() * Math.PI * 2,
            weight: (GLYPHS.indexOf(char) + 1) / GLYPHS.length,
          });
          top = Math.min(top, row);
          bottom = Math.max(bottom, row);
          left = Math.min(left, col);
          right = Math.max(right, col);
        }
      });

      return { top, bottom, left, right };
    };

    const bounds = buildGlyphs();

    const fontFamily = () => getComputedStyle(wrap).fontFamily;

    const measureInk = () => {
      const raw = getComputedStyle(wrap).color;
      const match = raw.match(/\d+(\.\d+)?/g);
      if (match && match.length >= 3) ink = match.slice(0, 3).join(", ");
    };

    const resize = () => {
      const boundsWidth = wrap.getBoundingClientRect().width;
      const maxWidth = Math.min(boundsWidth, 660);
      const visibleCols = bounds.right - bounds.left + 1;
      fontSize = Math.max(4.5, Math.min(18, maxWidth / (visibleCols * 0.6)));
      charWidth = fontSize * 0.6;
      rowHeight = fontSize * 1.02;
      width = visibleCols * charWidth;
      height = (bounds.bottom - bounds.top + 1) * rowHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px ${fontFamily()}`;
      ctx.textBaseline = "top";
      measureInk();
    };

    resize();

    const draw = (time: number) => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const pointerX = pointer.current.x;
      const pointerY = pointer.current.y;
      const radius = Math.max(80, fontSize * 7);
      const animate = !reduceMotion.matches;
      const seconds = time / 1000;

      for (const cell of glyphs.current) {
        const x = (cell.col - bounds.left) * charWidth;
        const y = (cell.row - bounds.top) * rowHeight;

        let alpha = 0.32 + cell.weight * 0.5;
        let char = cell.char;
        let bob = 0;

        if (animate) {
          // A wave that travels across the portrait, left to right and down.
          const wave = Math.sin(seconds * 2.4 - (cell.col * 0.22 + cell.row * 0.45));
          alpha += 0.26 * wave;
          bob = wave * rowHeight * 0.16;

          // The crest of the wave steps each glyph up one notch of density, so the
          // motion reads clearly without turning the portrait into noise.
          if (wave > 0.5) {
            const density = Math.round(
              Math.min(GLYPHS.length - 1, cell.weight * (GLYPHS.length - 1) + wave * 2)
            );
            char = GLYPHS[density] ?? char;
          }
        }

        if (pointer.current.active) {
          const dx = x + charWidth / 2 - pointerX;
          const dy = y + rowHeight / 2 - pointerY;
          const distance = Math.hypot(dx, dy);
          if (distance < radius) {
            const proximity = 1 - distance / radius;
            alpha += proximity * 0.7;
            if (proximity > 0.55 && cell.char !== " ") {
              char = cell.weight > 0.55 ? "@" : "#";
            }
          }
        }

        ctx.fillStyle = `rgba(${ink}, ${Math.min(1, Math.max(0.1, alpha))})`;
        ctx.fillText(char, x, y + bob);
      }
    };

    let frame = 0;
    const loop = (time: number) => {
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      if (reduceMotion.matches) {
        draw(0);
      } else {
        frame = window.requestAnimationFrame(loop);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };
    const onPointerLeave = () => {
      pointer.current.active = false;
    };

    const onResize = () => {
      resize();
      draw(0);
    };

    const observer = new MutationObserver(() => {
      measureInk();
      if (reduceMotion.matches) draw(0);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(wrap);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerleave", onPointerLeave);
    reduceMotion.addEventListener("change", start);
    start();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      reduceMotion.removeEventListener("change", start);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("relative font-code text-ink select-none", className)}
      aria-hidden="true"
      data-ascii-portrait
    >
      <canvas ref={canvasRef} className="block" />
      <span className="sr-only">
        An ASCII-art drawing of a goldfish.
      </span>
    </div>
  );
}

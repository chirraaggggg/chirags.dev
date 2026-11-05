"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** Logical pixel grid. One unit here is one chunky pixel on screen. */
const COLS = 68;
const ROWS = 52;
const GROUND = 46;

type Bloom = {
  x: number;
  head: number;
  radius: number;
  size: number;
  lean: number;
  phase: number;
};

type Butterfly = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  speed: number;
  flap: number;
  seed: number;
};

const BLOOMS: Bloom[] = [
  { x: 34, head: 19, radius: 4, size: 2, lean: 2.6, phase: 0 },
  { x: 16, head: 30, radius: 2, size: 1, lean: 1.4, phase: 1.7 },
  { x: 54, head: 27, radius: 3, size: 1, lean: 1.8, phase: 3.1 },
  { x: 45, head: 37, radius: 2, size: 1, lean: 1, phase: 4.4 },
];

const BUTTERFLIES: Butterfly[] = [
  { cx: 34, cy: 13, rx: 17, ry: 6, speed: 0.5, flap: 9, seed: 0.4 },
  { cx: 34, cy: 32, rx: 24, ry: 9, speed: 0.36, flap: 7.5, seed: 2.3 },
  { cx: 34, cy: 22, rx: 11, ry: 4, speed: 0.66, flap: 11, seed: 4.1 },
];

const GRASS = [4, 9, 23, 29, 41, 47, 58, 63];
const SPARKLES: Array<[number, number]> = [
  [8, 12],
  [60, 9],
  [24, 6],
  [50, 43],
  [12, 40],
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * The hero scene. A tiny pixel-art garden — four flowers and three butterflies —
 * where the flowers lean toward the cursor and the butterflies scatter away
 * from it. Drawn on a canvas so the pixel grid stays crisp at any width.
 */
export function PixelGarden({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const ink = useRef("10, 31, 209");

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let cell = 4;
    let dpr = 1;

    const measureInk = () => {
      const raw = getComputedStyle(wrap).color;
      const match = raw.match(/\d+(\.\d+)?/g);
      if (match && match.length >= 3) ink.current = match.slice(0, 3).join(", ");
    };

    const resize = () => {
      const bounds = wrap.getBoundingClientRect().width;
      if (!bounds) return;
      cell = bounds / COLS;
      width = bounds;
      height = cell * ROWS;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measureInk();
    };

    const draw = (time: number) => {
      if (!width || !height) return;

      const animate = !reduceMotion.matches;
      const seconds = animate ? time / 1000 : 0;
      const cursor = pointer.current;

      const pixel = (x: number, y: number, w = 1, h = 1) => {
        const px = Math.floor(x * cell);
        const py = Math.floor(y * cell);
        const pw = Math.floor((x + w) * cell) - px;
        const ph = Math.floor((y + h) * cell) - py;
        ctx.fillRect(px, py, Math.max(1, pw), Math.max(1, ph));
      };
      const paint = (alpha: number) => {
        ctx.fillStyle = `rgba(${ink.current}, ${alpha})`;
      };

      ctx.clearRect(0, 0, width, height);

      // Ground, in two rows of dashes.
      paint(0.22);
      for (let x = 2; x < COLS; x += 6) pixel(x, GROUND, 4, 1);
      paint(0.1);
      for (let x = 5; x < COLS; x += 11) pixel(x, GROUND + 2, 2, 1);

      // Grass tufts.
      paint(0.3);
      GRASS.forEach((grassX, index) => {
        const sway = animate ? Math.sin(seconds * 1.6 + index) * 0.6 : 0;
        const blades = 2 + (index % 3);
        for (let blade = 0; blade < blades; blade++) {
          pixel(grassX + Math.round(sway * (blade / blades)), GROUND - 1 - blade);
        }
      });

      // Stems, leaves, blossoms.
      BLOOMS.forEach((bloom, index) => {
        const target = cursor.active ? cursor.x : bloom.x;
        const lean =
          clamp((target - bloom.x) / 24, -1, 1) * bloom.lean +
          (animate ? Math.sin(seconds * 1.1 + bloom.phase) * 0.5 : 0);

        paint(0.4);
        for (let y = bloom.head; y < GROUND; y++) {
          const t = (GROUND - y) / (GROUND - bloom.head);
          pixel(bloom.x + Math.round(lean * t), y);
        }

        const leafY = Math.round(bloom.head + (GROUND - bloom.head) * 0.6);
        const side = index % 2 === 0 ? -1 : 1;
        paint(0.32);
        pixel(bloom.x + side, leafY, 2, 1);
        pixel(bloom.x + side * 3, leafY - 1);
        const other = -side;
        pixel(bloom.x + other, leafY + 5, 2, 1);
        pixel(bloom.x + other * 3, leafY + 6);

        const headX = bloom.x + Math.round(lean);
        paint(0.9);
        for (let petal = 0; petal < 5; petal++) {
          const angle = (petal / 5) * Math.PI * 2 - Math.PI / 2;
          const pulse = animate
            ? Math.sin(seconds * 2.2 + bloom.phase + petal) * 0.45
            : 0;
          const radius = bloom.radius + pulse;
          pixel(
            headX + Math.round(Math.cos(angle) * radius),
            bloom.head + Math.round(Math.sin(angle) * radius),
            bloom.size,
            bloom.size
          );
        }
        paint(1);
        pixel(headX - 1, bloom.head - 1, 2, 2);
      });

      // Butterflies.
      BUTTERFLIES.forEach((fly) => {
        const t = seconds * fly.speed;
        let x = fly.cx + Math.cos(t + fly.seed) * fly.rx;
        let y = fly.cy + Math.sin(t * 1.6 + fly.seed) * fly.ry;

        let flee = 0;
        if (cursor.active) {
          const dx = x - cursor.x;
          const dy = y - cursor.y;
          const distance = Math.hypot(dx, dy) || 0.001;
          if (distance < 15) {
            flee = (15 - distance) / 15;
            x += (dx / distance) * flee * 8;
            y += (dy / distance) * flee * 6;
          }
        }

        const cx = Math.round(x);
        const cy = Math.round(
          y + (animate ? Math.sin(seconds * 2 + fly.seed) * 0.5 : 0)
        );
        const open =
          Math.abs(animate ? Math.sin(seconds * fly.flap + fly.seed) : 0.6) > 0.35;

        paint(0.75 + flee * 0.25);
        pixel(cx, cy - 1, 1, 3);
        const wingHeight = open ? 3 : 1;
        pixel(cx - (open ? 3 : 2), cy - wingHeight + 1, open ? 2 : 1, wingHeight);
        pixel(cx + (open ? 2 : 1), cy - wingHeight + 1, open ? 2 : 1, wingHeight);
        if (open) {
          pixel(cx - 1, cy - 2);
          pixel(cx + 1, cy - 2);
        }
      });

      // A few slow sparkles in the air.
      SPARKLES.forEach(([sparkleX, sparkleY], index) => {
        const twinkle = animate
          ? 0.5 + 0.5 * Math.sin(seconds * 1.4 + index * 1.9)
          : 0.4;
        paint(0.12 + 0.26 * twinkle);
        pixel(sparkleX, sparkleY);
      });
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
      if (!rect.width) return;
      const scale = COLS / rect.width;
      pointer.current = {
        x: (event.clientX - rect.left) * scale,
        y: (event.clientY - rect.top) * scale,
        active: true,
      };
      if (reduceMotion.matches) draw(0);
    };

    const onPointerLeave = () => {
      pointer.current.active = false;
      if (reduceMotion.matches) draw(0);
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

    resize();
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
      data-pixel-garden
    >
      <canvas ref={canvasRef} className="block" />
      <span className="sr-only">
        A pixel-art garden with four flowers and three butterflies. The flowers
        lean toward your cursor and the butterflies flutter away from it.
      </span>
    </div>
  );
}

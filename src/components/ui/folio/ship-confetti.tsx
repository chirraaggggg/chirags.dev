"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  life: number;
};

/**
 * Type "ship" anywhere on the page. Confetti falls, a small label appears.
 * Deliberately quiet — no sound, and skipped entirely with reduced motion.
 */
export function ShipConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const frame = useRef(0);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const palette = ["#0a1fd1", "#5b6bff", "#0a0f3d", "#ffffff", "#b9c1ff"];

    const burst = () => {
      const originX = width / 2;
      const originY = height * 0.32;
      for (let i = 0; i < 110; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 8;
        particles.current.push({
          x: originX + (Math.random() - 0.5) * 80,
          y: originY + (Math.random() - 0.5) * 40,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5,
          size: 3 + Math.random() * 6,
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.3,
          color: palette[Math.floor(Math.random() * palette.length)],
          life: 1,
        });
      }
      setToast(true);
      window.setTimeout(() => setToast(false), 2400);
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      particles.current = particles.current.filter((particle) => particle.life > 0);

      for (const particle of particles.current) {
        particle.vy += 0.16;
        particle.vx *= 0.995;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.spin;
        particle.life -= 0.007;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, particle.life * 1.4));
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
        ctx.restore();
      }

      if (particles.current.length > 0) {
        frame.current = window.requestAnimationFrame(tick);
      } else {
        window.cancelAnimationFrame(frame.current);
      }
    };

    let buffer = "";
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (!/^[a-z]$/i.test(event.key)) return;
      buffer = (buffer + event.key.toLowerCase()).slice(-4);
      if (buffer === "ship") {
        buffer = "";
        burst();
        window.cancelAnimationFrame(frame.current);
        frame.current = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[120]"
      />
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-8 left-1/2 z-[121] -translate-x-1/2 rounded-full border border-ink bg-paper px-4 py-2 font-code text-[10px] tracking-[0.24em] text-ink uppercase shadow-lg transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        Shipped ↗
      </div>
    </>
  );
}

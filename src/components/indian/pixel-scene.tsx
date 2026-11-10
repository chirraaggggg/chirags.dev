"use client";

import { useEffect, useRef, useState } from "react";

import { FOLIO } from "@/config/folio";

/**
 * A small, hand-drawn pixel scene: a gopuram at dusk over the ghats, with a
 * waterline that shimmers, diyas that bob, and stars that blink. Everything is
 * painted into a 180x104 canvas so the browser scales it up as chunky pixels.
 */

const W = 180;
const H = 104;
const HORIZON = 62;

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const SKY: Array<[number, [number, number, number]]> = [
  [0, [19, 14, 38]],
  [0.26, [38, 24, 60]],
  [0.5, [68, 33, 72]],
  [0.72, [116, 48, 68]],
  [0.88, [172, 79, 57]],
  [1, [216, 131, 61]],
];

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function skyAt(t: number): [number, number, number] {
  let i = 0;
  while (i < SKY.length - 2 && t > SKY[i + 1][0]) i += 1;
  const [p0, c0] = SKY[i];
  const [p1, c1] = SKY[i + 1];
  const k = (t - p0) / Math.max(0.0001, p1 - p0);
  return [
    mix(c0[0], c1[0], k),
    mix(c0[1], c1[1], k),
    mix(c0[2], c1[2], k),
  ];
}

/** Ordered dither, so the sky reads as pixel art instead of a smooth ramp. */
function dither(value: number, x: number, y: number, levels = 12) {
  const scaled = (value / 255) * (levels - 1);
  const base = Math.floor(scaled);
  const frac = scaled - base;
  const threshold = (BAYER[y % 4][x % 4] + 0.5) / 16;
  return Math.round((frac > threshold ? base + 1 : base) * (255 / (levels - 1)));
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Star = { x: number; y: number; big: boolean; phase: number };

const rand = seeded(1886);
const STARS: Star[] = Array.from({ length: 34 }, () => ({
  x: Math.floor(rand() * W),
  y: Math.floor(rand() * 44),
  big: rand() > 0.82,
  phase: rand() * Math.PI * 2,
}));

type Diya = { x: number; y: number; phase: number };

const DIYAS: Diya[] = [
  { x: 22, y: 78, phase: 0.4 },
  { x: 47, y: 84, phase: 2.1 },
  { x: 71, y: 76, phase: 4.4 },
  { x: 104, y: 86, phase: 1.2 },
  { x: 129, y: 79, phase: 3.3 },
  { x: 158, y: 88, phase: 5.1 },
];

function paintSky(ctx: CanvasRenderingContext2D) {
  for (let y = 0; y < HORIZON; y += 1) {
    const [r, g, b] = skyAt(y / HORIZON);
    for (let x = 0; x < W; x += 1) {
      ctx.fillStyle = `rgb(${dither(r, x, y)},${dither(g, x, y)},${dither(b, x, y)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function paintMoon(ctx: CanvasRenderingContext2D) {
  const cx = 138;
  const cy = 40;
  const r = 4.6;
  for (let y = -12; y <= 12; y += 1) {
    for (let x = -12; x <= 12; x += 1) {
      const d = Math.hypot(x, y);
      if (d <= r) {
        ctx.fillStyle = "#f7e7c8";
      } else if (d <= r + 1) {
        ctx.fillStyle = "rgba(245, 211, 160, 0.42)";
      } else if (d <= 9) {
        ctx.fillStyle = "rgba(226, 160, 108, 0.09)";
      } else {
        continue;
      }
      ctx.fillRect(cx + x, cy + y, 1, 1);
    }
  }
}

function paintHills(ctx: CanvasRenderingContext2D) {
  for (let x = 0; x < W; x += 1) {
    const far = Math.round(
      HORIZON - 6 - Math.sin(x / 26) * 3 - Math.sin(x / 11 + 1.4) * 1.4,
    );
    ctx.fillStyle = "#2b1c40";
    ctx.fillRect(x, far, 1, HORIZON - far);

    const near = Math.round(
      HORIZON - 2 - Math.sin(x / 17 + 2.2) * 1.6 - Math.sin(x / 7) * 0.7,
    );
    ctx.fillStyle = "#1b1229";
    ctx.fillRect(x, near, 1, HORIZON - near);
  }
}

/** A stepped gopuram: tiers that narrow as they climb, a kalash on top. */
function paintTemple(
  ctx: CanvasRenderingContext2D,
  cx: number,
  baseY: number,
  height: number,
  width: number,
) {
  const tiers = 7;
  const tierH = height / tiers;
  const towerBase = baseY - 5;
  const body = "#140e21";

  for (let i = 0; i < tiers; i += 1) {
    const w = Math.round(width * (1 - (i / tiers) * 0.86));
    const y = Math.round(towerBase - (i + 1) * tierH);
    const h = Math.ceil(tierH);
    const x = Math.round(cx - w / 2);

    // the overhanging ledge of each tier, then the narrower storey under it
    ctx.fillStyle = "#5b3a29";
    ctx.fillRect(x, y, w, 1);
    ctx.fillStyle = body;
    ctx.fillRect(x + 2, y + 1, w - 4, h);
    ctx.fillStyle = "#38283f";
    ctx.fillRect(x + 2, y + 1, 1, h);
  }

  // courtyard wall the tower stands on, with a lit gateway
  const wallW = Math.round(width * 1.3);
  const wallX = Math.round(cx - wallW / 2);
  ctx.fillStyle = body;
  ctx.fillRect(wallX, baseY - 5, wallW, 5);
  ctx.fillStyle = "#6c4530";
  for (let x = wallX + 1; x < wallX + wallW - 1; x += 6) ctx.fillRect(x, baseY - 6, 2, 1);
  ctx.fillStyle = "#d1914f";
  ctx.fillRect(cx - 1, baseY - 3, 3, 3);
  ctx.fillStyle = "#eec08a";
  ctx.fillRect(cx, baseY - 2, 1, 1);

  // finial + a small pennant
  const peak = Math.round(towerBase - height);
  ctx.fillStyle = body;
  ctx.fillRect(cx, peak - 4, 1, 4);
  ctx.fillStyle = "#c99553";
  ctx.fillRect(cx - 1, peak - 5, 3, 1);
  ctx.fillRect(cx + 2, peak - 4, 1, 1);
}

function paintTrees(ctx: CanvasRenderingContext2D) {
  const clumps: Array<[number, number, number, string]> = [
    [10, HORIZON, 9, "#150f21"],
    [24, HORIZON, 7, "#1d1430"],
    [166, HORIZON, 8, "#150f21"],
    [152, HORIZON, 6, "#1d1430"],
  ];

  clumps.forEach(([cx, baseY, r, color]) => {
    ctx.fillStyle = color;
    for (let y = -r; y <= 0; y += 1) {
      const spread = Math.round(Math.sqrt(Math.max(0, r * r - y * y)) * 0.95);
      ctx.fillRect(cx - spread, baseY + y, spread * 2, 1);
    }
    ctx.fillRect(cx - 1, baseY, 2, 5);
  });

  // a couple of warm window lights in the foliage
  ctx.fillStyle = "#e8a866";
  ctx.fillRect(9, HORIZON - 4, 1, 1);
  ctx.fillRect(165, HORIZON - 5, 1, 1);
}

function paintWater(ctx: CanvasRenderingContext2D) {
  const band = 18;
  const skyline = document.createElement("canvas");
  skyline.width = W;
  skyline.height = band;
  skyline.getContext("2d")?.drawImage(
    ctx.canvas,
    0,
    HORIZON - band,
    W,
    band,
    0,
    0,
    W,
    band,
  );

  for (let y = HORIZON; y < H; y += 1) {
    const t = (y - HORIZON) / (H - HORIZON);
    const r = Math.round(mix(58, 12, t));
    const g = Math.round(mix(34, 9, t));
    const b = Math.round(mix(58, 20, t));
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, y, W, 1);
  }

  // mirror the skyline into the water, then sink it back into the dark
  ctx.save();
  ctx.globalAlpha = 0.34;
  ctx.translate(0, HORIZON * 2);
  ctx.scale(1, -1);
  ctx.drawImage(skyline, 0, HORIZON - band);
  ctx.restore();

  const sink = ctx.createLinearGradient(0, HORIZON, 0, H);
  sink.addColorStop(0, "rgba(14, 9, 22, 0.18)");
  sink.addColorStop(0.42, "rgba(14, 9, 22, 0.72)");
  sink.addColorStop(1, "rgba(10, 7, 16, 0.96)");
  ctx.fillStyle = sink;
  ctx.fillRect(0, HORIZON, W, H - HORIZON);

  // ghat steps in the foreground
  for (let i = 0; i < 3; i += 1) {
    const y = H - 3 - i * 3;
    ctx.fillStyle = i % 2 ? "#120c1c" : "#160f22";
    ctx.fillRect(0, y, W, 3);
    ctx.fillStyle = "rgba(233, 165, 100, 0.16)";
    for (let x = 6; x < W; x += 16) ctx.fillRect(x, y, 7, 1);
  }
  ctx.fillStyle = "rgba(240, 176, 104, 0.8)";
  [14, 46, 96, 141, 171].forEach((x) => ctx.fillRect(x, H - 8, 1, 1));
}

function drawShimmer(ctx: CanvasRenderingContext2D, time: number) {
  for (let y = HORIZON + 3; y < H - 8; y += 1) {
    if ((y * 5) % 7 === 0) continue;
    const depth = (y - HORIZON) / (H - HORIZON);
    const warm = 1 - depth * 0.6;
    const speed = 2 + depth * 7;
    const offset = Math.floor(time * speed + y * 1.7);
    const spacing = 19 + Math.round(depth * 16);
    let runStart = -1;

    for (let x = 0; x <= W; x += 1) {
      const on =
        x < W && (x + offset + y * 3) % spacing < 2 + Math.round(warm * 2);
      if (on && runStart < 0) runStart = x;
      if (!on && runStart >= 0) {
        ctx.fillStyle = `rgba(246, 192, 138, ${0.22 * warm})`;
        ctx.fillRect(runStart, y, x - runStart, 1);
        runStart = -1;
      }
    }
  }
}

function drawStars(ctx: CanvasRenderingContext2D, time: number) {
  STARS.forEach((star) => {
    const blink = 0.35 + 0.65 * Math.abs(Math.sin(time * 0.8 + star.phase));
    ctx.fillStyle = `rgba(244, 233, 214, ${blink})`;
    ctx.fillRect(star.x, star.y, 1, 1);
    if (star.big) {
      ctx.fillStyle = `rgba(244, 233, 214, ${blink * 0.45})`;
      ctx.fillRect(star.x - 1, star.y, 3, 1);
      ctx.fillRect(star.x, star.y - 1, 1, 3);
    }
  });
}

function drawDiyas(ctx: CanvasRenderingContext2D, time: number) {
  DIYAS.forEach((diya) => {
    const bob = Math.sin(time * 1.1 + diya.phase) * 1.2;
    const flicker = 0.7 + Math.sin(time * 6.3 + diya.phase) * 0.16;
    const y = Math.round(diya.y + bob);

    ctx.fillStyle = `rgba(224, 138, 60, ${0.12 * flicker})`;
    ctx.fillRect(diya.x - 2, y - 2, 5, 3);
    ctx.fillStyle = `rgba(255, 207, 122, ${0.9 * flicker})`;
    ctx.fillRect(diya.x, y - 2, 1, 2);
    ctx.fillStyle = `rgba(255, 236, 190, ${flicker})`;
    ctx.fillRect(diya.x, y - 1, 1, 1);
    ctx.fillStyle = "rgba(120, 74, 44, 0.9)";
    ctx.fillRect(diya.x - 1, y, 3, 1);
  });
}

function drawBirds(ctx: CanvasRenderingContext2D, time: number) {
  for (let i = 0; i < 2; i += 1) {
    const x = Math.round(((time * (3 + i) + i * 96) % (W + 30)) - 15);
    const y = Math.round(24 + i * 5 + Math.sin(time * 1.4 + i) * 2);
    const flap = Math.sin(time * 5 + i * 2) > 0 ? 0 : 1;
    ctx.fillStyle = "rgba(28, 18, 34, 0.75)";
    ctx.fillRect(x - 2, y + flap, 2, 1);
    ctx.fillRect(x, y, 1, 1);
    ctx.fillRect(x + 1, y + flap, 2, 1);
  }
}

export function PixelScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hour, setHour] = useState<number | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: FOLIO.timeZone,
      hour12: false,
      hour: "2-digit",
    });
    const tick = () => setHour(Number(format.format(new Date())));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const base = document.createElement("canvas");
    base.width = W;
    base.height = H;
    const bctx = base.getContext("2d");
    if (!bctx) return;
    bctx.imageSmoothingEnabled = false;

    paintSky(bctx);
    paintHills(bctx);
    paintMoon(bctx);
    paintTrees(bctx);
    paintTemple(bctx, 88, HORIZON, 36, 34);
    paintTemple(bctx, 54, HORIZON, 22, 20);
    paintTemple(bctx, 122, HORIZON, 17, 15);
    paintWater(bctx);

    const still = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = (time: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(base, 0, 0);
      if (still()) return;
      drawStars(ctx, time);
      drawShimmer(ctx, time);
      drawDiyas(ctx, time);
      drawBirds(ctx, time);
    };

    render(0);

    if (still()) return;

    let raf = 0;
    let visible = true;
    const start = performance.now();

    const loop = (now: number) => {
      render((now - start) / 1000);
      raf = window.requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting;
        if (next === visible) return;
        visible = next;
        if (visible) {
          raf = window.requestAnimationFrame(loop);
        } else {
          window.cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(canvas);
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="deshi-pixel">
      <div className="deshi-pixel-screen">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="deshi-pixel-canvas"
          role="img"
          aria-label="A pixel-art gopuram at dusk above the ghats, with stars, floating diyas and shimmering water."
        />
        <span className="deshi-pixel-scan" aria-hidden="true" />
      </div>

      <div className="deshi-pixelbar" aria-hidden="true">
        <span className="deshi-pixelbar-glyph">◈</span>
        <span className="deshi-pixelbar-track">
          {Array.from({ length: 24 }, (_, i) => (
            <span
              key={i}
              className="deshi-pixelbar-cell"
              data-on={hour === null || i <= hour ? "true" : undefined}
              data-now={hour === i ? "true" : undefined}
            />
          ))}
        </span>
        <span className="deshi-pixelbar-read">
          {hour === null ? "IST" : `${String(hour).padStart(2, "0")} / 24`}
        </span>
      </div>
    </div>
  );
}

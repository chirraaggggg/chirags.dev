"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const TAU = Math.PI * 2;

type Palette = { light: string; mid: string; fin: string; accent: string };

const PALETTES: Record<string, Palette> = {
  golden: { light: "#f6e3b4", mid: "#dda963", fin: "#efc07c", accent: "#e08a49" },
  pink: { light: "#f7e7e3", mid: "#e2b3b8", fin: "#f2c6cb", accent: "#e3889a" },
  wild: { light: "#dee2bd", mid: "#a3ad7e", fin: "#c3cc99", accent: "#7d8b52" },
  copper: { light: "#eac6a4", mid: "#b78257", fin: "#d39b6c", accent: "#ac6c43" },
};

type FishSeed = {
  x: number;
  y: number;
  heading: number;
  length: number;
  depth: number;
  base: number;
  palette: Palette;
};

const FISH_SEEDS: FishSeed[] = [
  { x: 0.3, y: 0.38, heading: 0.4, length: 0.18, depth: 1, base: 0.088, palette: PALETTES.golden },
  { x: 0.68, y: 0.27, heading: 2.5, length: 0.15, depth: 0.85, base: 0.1, palette: PALETTES.wild },
  { x: 0.44, y: 0.74, heading: -0.6, length: 0.2, depth: 0.94, base: 0.078, palette: PALETTES.pink },
  { x: 0.8, y: 0.62, heading: 2.9, length: 0.17, depth: 1.05, base: 0.092, palette: PALETTES.copper },
];

type Pad = {
  x: number;
  y: number;
  r: number;
  rot: number;
  phase: number;
  flower?: "white" | "pink";
};

const PADS: Pad[] = [
  { x: 0.1, y: 0.14, r: 0.062, rot: -0.5, phase: 0.2, flower: "white" },
  { x: 0.89, y: 0.15, r: 0.072, rot: 2.2, phase: 1.6, flower: "pink" },
  { x: 0.02, y: 0.6, r: 0.05, rot: 1.1, phase: 3 },
  { x: 0.17, y: 0.92, r: 0.08, rot: -1.2, phase: 4.1, flower: "white" },
  { x: 0.75, y: 0.88, r: 0.058, rot: 0.6, phase: 5 },
  { x: 0.99, y: 0.48, r: 0.045, rot: 2.7, phase: 2.2, flower: "pink" },
  { x: 0.6, y: 0.04, r: 0.042, rot: -2, phase: 4.6 },
  { x: 0.36, y: 0.03, r: 0.038, rot: 1.8, phase: 0.8 },
];

type Fish = FishSeed & {
  tx: number;
  ty: number;
  speed: number;
  startle: number;
  think: number;
  phase: number;
};

type Drop = { x: number; y: number; vx: number; vy: number; life: number; full: number; r: number };
type Ring = { x: number; y: number; age: number; life: number; r: number };

type View = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  s: number;
  t: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const PLANT_CLUSTERS = [
  { x: 0.03, y: 1.02, h: 0.5, leaves: 6, phase: 0.4 },
  { x: 0.12, y: 1.03, h: 0.34, leaves: 4, phase: 2.1 },
  { x: 0.93, y: 1.02, h: 0.44, leaves: 5, phase: 3.7 },
  { x: 0.62, y: 1.04, h: 0.26, leaves: 3, phase: 5.2 },
  { x: 0.99, y: 0.72, h: 0.3, leaves: 3, phase: 1.3 },
] as const;

const STONES: Array<[number, number, number, number, number]> = [
  // x, y, radius x, radius y, alpha — a sandy bed read from above
  [0.14, 0.93, 0.03, 0.014, 0.22],
  [0.23, 0.96, 0.018, 0.01, 0.18],
  [0.32, 0.91, 0.024, 0.011, 0.16],
  [0.44, 0.95, 0.035, 0.016, 0.14],
  [0.55, 0.9, 0.016, 0.008, 0.2],
  [0.63, 0.96, 0.026, 0.012, 0.16],
  [0.76, 0.92, 0.032, 0.015, 0.18],
  [0.86, 0.96, 0.02, 0.01, 0.22],
  [0.5, 0.86, 0.012, 0.006, 0.16],
];

const CAUSTIC_W = 240;
const CAUSTIC_H = 160;
let causticCanvas: HTMLCanvasElement | null = null;
let causticBuffer: ImageData | null = null;
let causticTick = 0;

/** Zero-crossings of a few summed waves read as a net of shifting light. */
const drawCaustics = (v: View) => {
  const { ctx, w, h, t } = v;
  if (!causticCanvas) {
    causticCanvas = document.createElement("canvas");
    causticCanvas.width = CAUSTIC_W;
    causticCanvas.height = CAUSTIC_H;
    const buffer = causticCanvas.getContext("2d");
    causticBuffer = buffer ? buffer.createImageData(CAUSTIC_W, CAUSTIC_H) : null;
  }
  const buffer = causticCanvas.getContext("2d");
  if (!buffer || !causticBuffer) return;
  // The field drifts slowly; 30fps is plenty and buys a finer grid.
  if (causticTick++ % 2 === 1) {
    ctx.drawImage(causticCanvas, 0, 0, w, h);
    return;
  }

  const px = causticBuffer.data;
  for (let y = 0; y < CAUSTIC_H; y++) {
    const fy = (y / CAUSTIC_H) * 7.2;
    for (let x = 0; x < CAUSTIC_W; x++) {
      const fx = (x / CAUSTIC_W) * 10.4;
      const n =
        Math.sin(fx * 1.6 + t * 0.5) +
        Math.sin(fy * 2.2 - t * 0.42) +
        Math.sin((fx + fy) * 1.05 + t * 0.33) +
        Math.sin((fx - fy) * 1.35 - t * 0.27);
      const c = Math.max(0, 1 - Math.abs(n) * 2.3);
      const flicker = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(fx * 0.6 - fy * 0.8 + t * 0.42));
      const i = (y * CAUSTIC_W + x) * 4;
      px[i] = 208;
      px[i + 1] = 236;
      px[i + 2] = 160;
      px[i + 3] = Math.pow(c, 3) * 255 * flicker;
    }
  }
  buffer.putImageData(causticBuffer, 0, 0);
  ctx.drawImage(causticCanvas, 0, 0, w, h);
};

const drawWater = (v: View, dark: boolean) => {
  const { ctx, w, h, s, t } = v;

  const base = ctx.createLinearGradient(0, 0, w * 0.35, h);
  base.addColorStop(0, dark ? "#2e4027" : "#4c6336");
  base.addColorStop(0.45, dark ? "#1a2812" : "#31482a");
  base.addColorStop(1, dark ? "#0c1712" : "#1a2b14");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  // Dappled shade from the trees above.
  const dapples: Array<[number, number, number, number]> = [
    [0.2, 0.18, 0.42, 0.14],
    [0.72, 0.3, 0.5, 0.1],
    [0.45, 0.8, 0.55, 0.08],
    [0.05, 0.72, 0.34, 0.07],
  ];
  for (const [x, y, r, alpha] of dapples) {
    const grad = ctx.createRadialGradient(x * w, y * h, 0, x * w, y * h, r * s);
    grad.addColorStop(0, `rgba(168, 206, 118, ${alpha})`);
    grad.addColorStop(1, "rgba(168, 206, 118, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  // The light net in the water.
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.6;
  ctx.imageSmoothingEnabled = true;
  drawCaustics(v);
  ctx.restore();

  // Slow broad light drifting across the surface.
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const sweep = ctx.createLinearGradient(0, 0, w, h);
  const shift = (Math.sin(t * 0.11) + 1) / 2;
  sweep.addColorStop(clamp(shift - 0.2, 0, 1), "rgba(214, 236, 170, 0)");
  sweep.addColorStop(clamp(shift, 0, 1), "rgba(214, 236, 170, 0.06)");
  sweep.addColorStop(clamp(shift + 0.25, 0, 1), "rgba(214, 236, 170, 0)");
  ctx.fillStyle = sweep;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
};

const drawBed = (v: View) => {
  const { ctx, w, h } = v;
  const sand = ctx.createLinearGradient(0, h * 0.72, 0, h);
  sand.addColorStop(0, "rgba(166, 162, 118, 0)");
  sand.addColorStop(1, "rgba(166, 162, 118, 0.2)");
  ctx.fillStyle = sand;
  ctx.fillRect(0, h * 0.72, w, h * 0.28);

  for (const [x, y, rx, ry, alpha] of STONES) {
    ctx.fillStyle = `rgba(206, 202, 160, ${alpha})`;
    ctx.beginPath();
    ctx.ellipse(x * w, y * h, rx * w, ry * h, 0, 0, TAU);
    ctx.fill();
  }
};

const drawPlants = (v: View) => {
  const { ctx, w, h, s, t } = v;
  for (const cluster of PLANT_CLUSTERS) {
    const baseX = cluster.x * w;
    const baseY = cluster.y * h;
    const height = cluster.h * s;
    for (let leaf = 0; leaf < cluster.leaves; leaf++) {
      const spread = (leaf / Math.max(1, cluster.leaves - 1) - 0.5) * 2;
      const sway = Math.sin(t * 0.7 + cluster.phase + leaf * 0.8) * height * 0.07;
      const tipX = baseX + spread * height * 0.42 + sway;
      const tipY = baseY - height * (0.6 + 0.4 * Math.cos(spread * 1.1));
      const grad = ctx.createLinearGradient(baseX, baseY, tipX, tipY);
      grad.addColorStop(0, "rgba(54, 76, 38, 0.9)");
      grad.addColorStop(1, "rgba(126, 152, 82, 0.16)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.quadraticCurveTo(
        baseX + spread * height * 0.12 + sway * 0.6,
        baseY - height * 0.52,
        tipX,
        tipY
      );
      ctx.quadraticCurveTo(
        baseX + spread * height * 0.3 + height * 0.07,
        baseY - height * 0.46,
        baseX,
        baseY
      );
      ctx.fill();
    }
  }
};

const drawLily = (v: View, r: number, kind: "white" | "pink", phase: number) => {
  const { ctx, t } = v;
  const open = 1 + Math.sin(t * 0.5 + phase) * 0.03;
  ctx.save();
  ctx.rotate(Math.sin(t * 0.22 + phase) * 0.08);
  ctx.scale(open, open);

  const base = kind === "white" ? "#fbf9ec" : "#fbe4ea";
  const edge = kind === "white" ? "#e8dac6" : "#eeb4c6";
  for (let layer = 0; layer < 2; layer++) {
    const petals = layer === 0 ? 8 : 6;
    const length = r * (layer === 0 ? 1 : 0.62);
    const width = length * 0.4;
    for (let i = 0; i < petals; i++) {
      ctx.save();
      ctx.rotate((i / petals) * TAU + layer * 0.45);
      ctx.translate(length * 0.58, 0);
      const grad = ctx.createLinearGradient(-length * 0.4, 0, length * 0.5, 0);
      grad.addColorStop(0, base);
      grad.addColorStop(1, edge);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, length * 0.5, width, 0, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = "rgba(150, 120, 96, 0.22)";
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.restore();
    }
  }

  const center = ctx.createRadialGradient(0, -r * 0.05, r * 0.02, 0, 0, r * 0.3);
  center.addColorStop(0, "#f5d982");
  center.addColorStop(1, "rgba(210, 164, 68, 0.9)");
  ctx.fillStyle = center;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.26, 0, TAU);
  ctx.fill();
  ctx.restore();
};

const drawPad = (v: View, pad: Pad) => {
  const { ctx, w, h, t } = v;
  const r = pad.r * w;
  const x = pad.x * w + Math.sin(t * 0.3 + pad.phase) * r * 0.05;
  const y = pad.y * h + Math.sin(t * 0.6 + pad.phase) * r * 0.06;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(pad.rot + Math.sin(t * 0.4 + pad.phase) * 0.03);

  // Shade the pad casts onto the water.
  const shade = ctx.createRadialGradient(0, r * 0.2, r * 0.15, 0, r * 0.2, r * 1.05);
  shade.addColorStop(0, "rgba(6, 16, 8, 0.16)");
  shade.addColorStop(1, "rgba(6, 16, 8, 0)");
  ctx.fillStyle = shade;
  ctx.beginPath();
  ctx.ellipse(0, r * 0.2, r * 1.0, r * 0.68, 0, 0, TAU);
  ctx.fill();

  const body = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
  const tone = Math.sin(pad.phase * 1.7) * 9;
  body.addColorStop(0, `rgba(${158 + tone}, ${184 + tone * 0.4}, 108, 0.96)`);
  body.addColorStop(0.62, `rgba(${116 + tone}, ${146 + tone * 0.4}, 76, 0.97)`);
  body.addColorStop(1, `rgba(${72 + tone * 0.5}, 100, 48, 0.98)`);
  ctx.beginPath();
  const gap = 0.14;
  for (let a = gap; a <= TAU - gap; a += 0.1) {
    const edge = r * (1 + Math.sin(a * 5 + pad.phase) * 0.02);
    const px = Math.cos(a) * edge;
    const py = Math.sin(a) * edge;
    if (a === gap) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fillStyle = body;
  ctx.fill();
  ctx.strokeStyle = "rgba(32, 48, 24, 0.45)";
  ctx.lineWidth = Math.max(0.8, r * 0.035);
  ctx.stroke();
  ctx.strokeStyle = "rgba(206, 230, 158, 0.28)";
  ctx.lineWidth = Math.max(0.5, r * 0.015);
  ctx.stroke();

  ctx.strokeStyle = "rgba(214, 234, 172, 0.18)";
  ctx.lineWidth = Math.max(0.4, r * 0.013);
  for (let vein = 0; vein < 7; vein++) {
    const angle = 0.5 + (vein / 7) * (TAU - 1);
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * r * 0.18, Math.sin(angle) * r * 0.18);
    ctx.lineTo(Math.cos(angle) * r * 0.92, Math.sin(angle) * r * 0.92);
    ctx.stroke();
  }

  if (pad.flower) drawLily(v, r * 0.42, pad.flower, pad.phase);
  ctx.restore();
};

const drawFish = (v: View, fish: Fish) => {
  const { ctx, w, h, s } = v;
  const L = fish.length * s * fish.depth;
  const half = L * 0.19;
  const wag = Math.sin(fish.phase) * L * 0.05;

  ctx.save();
  ctx.translate(fish.x * w, fish.y * h);
  ctx.rotate(fish.heading);
  ctx.globalAlpha = 0.58 + fish.depth * 0.16;

  // Soft shadow on the bed below.
  ctx.fillStyle = "rgba(8, 16, 6, 0.16)";
  ctx.beginPath();
  ctx.ellipse(L * 0.02, L * 0.1, L * 0.34, L * 0.11, 0, 0, TAU);
  ctx.fill();

  // Forked tail fin, swishing behind the body.
  ctx.fillStyle = fish.palette.fin;
  ctx.beginPath();
  ctx.moveTo(-L * 0.36, 0);
  ctx.quadraticCurveTo(-L * 0.52, -half * 0.5, -L * 0.72, -half * 1.5 + wag * 0.4);
  ctx.quadraticCurveTo(-L * 0.64, -half * 0.2, -L * 0.57, wag * 0.2);
  ctx.quadraticCurveTo(-L * 0.64, half * 0.2, -L * 0.72, half * 1.5 + wag * 0.4);
  ctx.quadraticCurveTo(-L * 0.52, half * 0.5, -L * 0.36, 0);
  ctx.fill();

  // Pectoral fins.
  ctx.globalAlpha *= 0.6;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(L * 0.17, side * half * 0.72, L * 0.1, half * 0.26, side * 0.9, 0, TAU);
    ctx.fill();
  }

  // Body, lit from above.
  ctx.globalAlpha = 0.5 + fish.depth * 0.18;
  const body = ctx.createRadialGradient(L * 0.08, -half * 0.25, L * 0.02, 0, 0, L * 0.58);
  body.addColorStop(0, fish.palette.light);
  body.addColorStop(0.55, fish.palette.mid);
  body.addColorStop(1, fish.palette.accent);
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.moveTo(L * 0.5, 0);
  ctx.bezierCurveTo(L * 0.3, -half, 0, -half * 0.98, -L * 0.36, -half * 0.34);
  ctx.quadraticCurveTo(-L * 0.44, 0, -L * 0.36, half * 0.34);
  ctx.bezierCurveTo(0, half * 0.98, L * 0.3, half, L * 0.5, 0);
  ctx.fill();
  ctx.strokeStyle = "rgba(58, 46, 30, 0.22)";
  ctx.lineWidth = Math.max(0.5, L * 0.01);
  ctx.stroke();

  // Pale spine highlight.
  ctx.fillStyle = "rgba(255, 252, 235, 0.16)";
  ctx.beginPath();
  ctx.ellipse(L * 0.04, 0, L * 0.22, half * 0.32, 0, 0, TAU);
  ctx.fill();

  // A hint of a gill cover.
  ctx.strokeStyle = "rgba(94, 68, 40, 0.28)";
  ctx.lineWidth = Math.max(0.5, L * 0.012);
  ctx.globalAlpha *= 0.8;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(L * 0.22, side * half * 0.25);
    ctx.quadraticCurveTo(L * 0.15, side * half * 0.6, L * 0.2, side * half * 0.8);
    ctx.stroke();
  }

  // Eyes.
  ctx.globalAlpha = 0.95;
  ctx.fillStyle = "#2b2119";
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(L * 0.34, side * half * 0.44, Math.max(0.8, L * 0.032), 0, TAU);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(L * 0.35, side * half * 0.44 - L * 0.01, Math.max(0.4, L * 0.012), 0, TAU);
    ctx.fill();
  }

  ctx.restore();
};

const drawDuckweed = (v: View) => {
  const { ctx, w, h, t } = v;
  for (let i = 0; i < 46; i++) {
    const x = ((i * 0.619 + Math.sin(i * 2.7) * 0.09 + t * 0.004 * (1 + (i % 3))) % 1) * w;
    const y = ((i * 0.383 + Math.cos(i * 1.9) * 0.08 + Math.sin(t * 0.2 + i) * 0.004) % 1) * h;
    ctx.fillStyle = i % 6 === 0 ? "rgba(214, 238, 166, 0.4)" : "rgba(196, 224, 146, 0.24)";
    ctx.beginPath();
    ctx.arc(x, y, i % 6 === 0 ? 1.3 : 0.75, 0, TAU);
    ctx.fill();
  }
};

const drawSplash = (v: View, drops: Drop[], rings: Ring[]) => {
  const { ctx, s } = v;
  ctx.save();
  for (const ring of rings) {
    if (ring.age < 0) continue;
    const p = clamp(ring.age / ring.life, 0, 1);
    const radius = ring.r + p * s * 0.18;
    ctx.strokeStyle = `rgba(236, 250, 210, ${0.5 * (1 - p)})`;
    ctx.lineWidth = 1.6 * (1 - p) + 0.4;
    ctx.beginPath();
    ctx.ellipse(ring.x, ring.y, radius, radius * 0.44, 0, 0, TAU);
    ctx.stroke();
  }
  for (const drop of drops) {
    const life = clamp(drop.life / drop.full, 0, 1);
    ctx.fillStyle = `rgba(240, 252, 214, ${0.8 * life})`;
    ctx.beginPath();
    ctx.arc(drop.x, drop.y, drop.r, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
};

export function Pond({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fishes: Fish[] = FISH_SEEDS.map((seed, index) => ({
      ...seed,
      tx: clamp(seed.x + (index % 2 ? 0.22 : -0.22), 0.16, 0.84),
      ty: clamp(seed.y + (index % 3 === 0 ? 0.2 : -0.16), 0.16, 0.84),
      speed: seed.base,
      startle: 0,
      think: 1.5 + index * 1.3,
      phase: index * 1.7,
    }));
    const drops: Drop[] = [];
    const rings: Ring[] = [];

    let w = 0;
    let h = 0;
    let s = 0;
    let dpr = 1;
    let clock = 0;
    let running = false;
    let raf = 0;
    let last = 0;
    let inView = true;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width) return;
      w = rect.width;
      h = Math.round(w / 1.5);
      s = Math.min(w, h);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce.matches) render();
    };

    const spawnSplash = (x: number, y: number, strength: number) => {
      rings.push({ x, y, age: 0, life: 1.1, r: 2 });
      rings.push({ x, y, age: -0.14, life: 1.2, r: 1 });
      const count = Math.round(9 + 9 * strength);
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.7;
        const speed = (55 + Math.random() * 120) * (0.65 + strength * 0.5);
        const life = 0.5 + Math.random() * 0.55;
        drops.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life,
          full: life,
          r: 0.7 + Math.random() * 1.7,
        });
      }
    };

    const updateFish = (dt: number) => {
      for (const fish of fishes) {
        fish.think -= dt;
        const dx = fish.tx - fish.x;
        const dy = (fish.ty - fish.y) * (h / w);
        if (fish.think <= 0 || Math.hypot(dx, dy) < 0.07) {
          fish.tx = 0.14 + Math.random() * 0.72;
          fish.ty = 0.14 + Math.random() * 0.7;
          fish.think = 2.4 + Math.random() * 5.2;
        }

        const desired = Math.atan2(dy, dx);
        let turn = desired - fish.heading;
        while (turn > Math.PI) turn -= TAU;
        while (turn < -Math.PI) turn += TAU;
        const rate = (1.1 + fish.startle * 4.2) * dt;
        fish.heading += clamp(turn, -rate, rate);

        fish.startle = Math.max(0, fish.startle - dt * 0.7);
        const target = fish.base * (1 + fish.startle * 4.4);
        fish.speed += (target - fish.speed) * Math.min(1, dt * 4.5);

        fish.x += (Math.cos(fish.heading) * fish.speed * dt * s) / w;
        fish.y += (Math.sin(fish.heading) * fish.speed * dt * s) / h;
        fish.x = clamp(fish.x, 0.05, 0.95);
        fish.y = clamp(fish.y, 0.06, 0.94);
        fish.phase += dt * (5 + fish.speed * 55);
      }
    };

    const update = (dt: number) => {
      clock += dt;
      updateFish(dt);

      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i];
        drop.vy += 560 * dt;
        drop.x += drop.vx * dt;
        drop.y += drop.vy * dt;
        drop.life -= dt;
        if (drop.life <= 0 || drop.y > h + 8) drops.splice(i, 1);
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.age += dt;
        if (ring.age > ring.life) rings.splice(i, 1);
      }
    };

    const render = () => {
      if (!w || !h) return;
      const view: View = { ctx, w, h, s, t: clock };
      drawWater(view, document.documentElement.classList.contains("dark"));
      drawBed(view);
      drawPlants(view);
      for (const fish of fishes) drawFish(view, fish);
      for (const pad of PADS) drawPad(view, pad);
      drawDuckweed(view);

      const vignette = ctx.createRadialGradient(w / 2, h / 2, s * 0.22, w / 2, h / 2, s * 0.88);
      vignette.addColorStop(0, "rgba(4, 12, 6, 0)");
      vignette.addColorStop(1, "rgba(4, 12, 6, 0.32)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      drawSplash(view, drops, rings);
    };

    const frame = (time: number) => {
      if (!running) return;
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 1 / 60;
      last = time;
      update(dt);
      render();
      raf = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduce.matches) {
        render();
        return;
      }
      if (!inView || running) return;
      running = true;
      last = 0;
      raf = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (reduce.matches) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      const nx = px / rect.width;
      const ny = py / rect.height;
      spawnSplash(px, py, 0.8);

      for (const fish of fishes) {
        const dx = fish.x - nx;
        const dy = (fish.y - ny) * (h / w);
        const distance = Math.hypot(dx, dy);
        const hit = distance < Math.max(0.06, fish.length * 0.65);
        const strength = hit ? 1 : clamp(0.9 - distance * 1.5, 0.3, 0.9);
        fish.startle = Math.max(fish.startle, strength);
        if (distance > 0.001) {
          fish.tx = clamp(fish.x + (dx / distance) * 0.4, 0.1, 0.9);
          fish.ty = clamp(fish.y + (dy / distance) * 0.4, 0.1, 0.9);
        }
        fish.think = 1.6;
        if (hit) spawnSplash(fish.x * w, fish.y * h, 0.45);
      }
      start();
    };

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(wrap);

    const inViewObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        if (inView) start();
        else stop();
      },
      { threshold: 0.15 }
    );
    inViewObserver.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onReduceChange = () => {
      stop();
      clock = 0;
      start();
    };

    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", onReduceChange);
    canvas.addEventListener("pointerdown", onPointerDown);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      inViewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onReduceChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <div className="overflow-hidden rounded-[26px] [mask-image:radial-gradient(ellipse_96%_96%_at_50%_50%,#000_58%,transparent_100%)]">
        <canvas ref={canvasRef} className="block w-full touch-manipulation" aria-hidden="true" />
      </div>
      <div className="mt-3 flex items-center justify-between font-code text-[9px] tracking-[0.18em] text-ink/35 uppercase">
        <span>↳ tap the water</span>
        <span className="hidden sm:inline">fig. 01 — the pond</span>
      </div>
      <span className="sr-only">
        A small pond with four fish drifting between lily pads. Tap the water or a
        fish and rings spread out, droplets spray, and the fish dart away.
      </span>
    </div>
  );
}

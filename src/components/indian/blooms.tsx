/**
 * Hand-drawn floral motifs for the garden theme.
 *
 * Paints live in a single <BloomDefs /> rendered once per page, so every
 * blossom references the same gradients instead of duplicating gradient ids
 * across dozens of inline SVGs.
 */

export function BloomDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <linearGradient id="bl-rose" x1="0.15" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#f7c2cc" />
          <stop offset="0.5" stopColor="#dd8b9d" />
          <stop offset="1" stopColor="#a83e5b" />
        </linearGradient>

        <linearGradient id="bl-blush" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#fdece2" />
          <stop offset="0.55" stopColor="#f3cdbd" />
          <stop offset="1" stopColor="#dd9f92" />
        </linearGradient>

        <linearGradient id="bl-marigold" x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#ffd489" />
          <stop offset="0.5" stopColor="#f2ab45" />
          <stop offset="1" stopColor="#cf6f18" />
        </linearGradient>

        <linearGradient id="bl-cream" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#ebd6b2" />
        </linearGradient>

        <linearGradient id="bl-indigo" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#b9c0e2" />
          <stop offset="0.55" stopColor="#8d97c9" />
          <stop offset="1" stopColor="#465184" />
        </linearGradient>

        <linearGradient id="bl-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#94b98d" />
          <stop offset="0.5" stopColor="#5a8b5f" />
          <stop offset="1" stopColor="#2f5740" />
        </linearGradient>

        <linearGradient id="bl-stem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6f9468" />
          <stop offset="1" stopColor="#3c6245" />
        </linearGradient>

        <radialGradient id="bl-sun" cx="0.4" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#fff4d2" />
          <stop offset="0.55" stopColor="#f6c96f" />
          <stop offset="1" stopColor="#d99026" />
        </radialGradient>

        <radialGradient id="bl-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f6cf8a" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#f0b882" stopOpacity="0.18" />
          <stop offset="1" stopColor="#f0b882" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const STAMENS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  return {
    x: 60 + Math.cos(angle) * 12.5,
    y: 62 + Math.sin(angle) * 12.5,
    r: i % 2 === 0 ? 1.7 : 1.1,
  };
});

/** Five-petal blossom with a layered inner ring — the signature flower. */
export function Blossom({
  className,
  size = 96,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M60 62C46 52 42.5 30 60 11c17.5 19 14 41 0 51Z"
          transform={`rotate(${angle} 60 62)`}
          fill="url(#bl-rose)"
          opacity="0.94"
        />
      ))}
      {[36, 108, 180, 252, 324].map((angle) => (
        <path
          key={angle}
          d="M60 62C51 55 48 40 60 29c12 11 9 26 0 33Z"
          transform={`rotate(${angle} 60 62)`}
          fill="url(#bl-blush)"
          opacity="0.92"
        />
      ))}
      <circle cx="60" cy="62" r="8.4" fill="url(#bl-sun)" />
      {STAMENS.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          fill="#c37c1f"
          opacity="0.85"
        />
      ))}
    </svg>
  );
}

/** Ruffled marigold — small petals in three rings for depth. */
export function Marigold({
  className,
  size = 80,
}: {
  className?: string;
  size?: number;
}) {
  const rings = [
    { count: 14, radius: 31, rx: 6.4, ry: 10.5, fill: "url(#bl-marigold)", opacity: 0.95 },
    { count: 11, radius: 22, rx: 5.8, ry: 9, fill: "#f5b251", opacity: 0.95 },
    { count: 8, radius: 13, rx: 5, ry: 7.4, fill: "#ffd591", opacity: 0.95 },
  ];

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {rings.map((ring) =>
        Array.from({ length: ring.count }, (_, i) => {
          const angle = (360 / ring.count) * i;
          return (
            <ellipse
              key={`${ring.radius}-${i}`}
              cx="60"
              cy={60 - ring.radius}
              rx={ring.rx}
              ry={ring.ry}
              fill={ring.fill}
              opacity={ring.opacity}
              transform={`rotate(${angle} 60 60)`}
            />
          );
        }),
      )}
      <circle cx="60" cy="60" r="6" fill="#c9741c" opacity="0.9" />
      <circle cx="60" cy="60" r="3" fill="#8a4a10" opacity="0.55" />
    </svg>
  );
}

/** Front-facing lotus with gold line work — used as a section sigil. */
export function Lotus({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 120 88"
      width={size}
      height={(size * 88) / 120}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#a9782c" strokeWidth="0.9" fill="none" opacity="0.75">
        <path d="M60 78C40 80 24 70 16 56c14-4 30 2 44 22Z" fill="url(#bl-blush)" />
        <path d="M60 78c20 2 36-8 44-22-14-4-30 2-44 22Z" fill="url(#bl-blush)" />
        <path d="M60 78C44 62 36 40 60 12c24 28 16 50 0 66Z" fill="url(#bl-cream)" />
        <path d="M60 78C48 64 44 46 52 30c10 8 14 30 8 48Z" fill="url(#bl-rose)" opacity="0.75" />
        <path d="M60 78c12-14 16-32 8-48-10 8-14 30-8 48Z" fill="url(#bl-rose)" opacity="0.75" />
        <path d="M24 62c12 10 24 14 36 16M96 62c-12 10-24 14-36 16" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Curved stem with leaves, drawn as a single scalable sprig. */
export function LeafSprig({
  className,
  size = 120,
  flip = false,
}: {
  className?: string;
  size?: number;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 200"
      width={size}
      height={(size * 200) / 120}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M18 196C26 150 50 118 92 92c12-8 18-16 22-26"
        fill="none"
        stroke="url(#bl-stem)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {[
        { x: 22, y: 172, r: -58, s: 1 },
        { x: 34, y: 146, r: 24, s: 0.92 },
        { x: 52, y: 124, r: -54, s: 0.86 },
        { x: 70, y: 110, r: 22, s: 0.78 },
        { x: 88, y: 96, r: -50, s: 0.68 },
      ].map((leaf) => (
        <g key={`${leaf.x}-${leaf.y}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}>
          <path
            d="M0 0C14-9 30-7 40 3 28 13 12 12 0 0Z"
            fill="url(#bl-leaf)"
            opacity="0.95"
          />
          <path d="M2 1C14 0 26 1 36 3" stroke="#e8f0dd" strokeWidth="0.7" opacity="0.45" fill="none" />
        </g>
      ))}
    </svg>
  );
}

/** Small paisley bud used as a quiet accent between sections. */
export function Paisley({ className, size = 26 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 40 56"
      width={size}
      height={(size * 56) / 40}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 2C9 12 4 24 8 36c4 12 20 16 26 4 5-10-2-20-12-20-6 0-9 4-8 9 1 4 6 5 8 2"
        fill="none"
        stroke="#a9782c"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M20 2C11 11 7 22 10 33" fill="none" stroke="#b8506a" strokeWidth="0.8" opacity="0.55" />
      <circle cx="18" cy="28" r="1.6" fill="#a9782c" opacity="0.7" />
    </svg>
  );
}

/** Row of tiny leaves + dots — a botanical rule for section headers. */
export function FloralRule({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 14"
      width="160"
      height="14"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 7h48M108 7h48" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <path d="M62 7c4-4 8-4 12 0-4 4-8 4-12 0Z" fill="currentColor" opacity="0.7" />
      <path d="M98 7c-4-4-8-4-12 0 4 4 8 4 12 0Z" fill="currentColor" opacity="0.7" />
      <circle cx="80" cy="7" r="2.1" fill="url(#bl-sun)" />
    </svg>
  );
}

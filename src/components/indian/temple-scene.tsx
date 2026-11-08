type Tree = [x: number, base: number, size: number, fill: string];

const TREES_LEFT: Tree[] = [
  [18, 96, 16, "#1d3f2c"],
  [30, 90, 12, "#245034"],
  [40, 98, 14, "#17352a"],
  [52, 88, 10, "#2b5c3a"],
  [60, 98, 12, "#1d3f2c"],
  [70, 102, 14, "#17352a"],
];

const TREES_RIGHT: Tree[] = [
  [132, 100, 13, "#17352a"],
  [144, 92, 11, "#1d3f2c"],
  [154, 100, 14, "#245034"],
  [166, 90, 12, "#17352a"],
  [178, 98, 15, "#1d3f2c"],
  [190, 94, 11, "#2b5c3a"],
];

/** Blocky stepped canopy — reads as pixel art rather than a smooth blob. */
function TreeSprig({
  x,
  base,
  size,
  fill,
}: {
  x: number;
  base: number;
  size: number;
  fill: string;
}) {
  const units = Math.round(size / 4);

  return (
    <g>
      <rect x={x - 1} y={base - size * 0.45} width="2" height={size * 0.45} fill="#2c2318" />
      {Array.from({ length: units }, (_, i) => {
        const w = size - i * 4;
        const y = base - size * 0.45 - (i + 1) * 4;
        return (
          <g key={i}>
            <rect x={x - w / 2} y={y} width={w} height="4.6" fill={fill} />
            <rect x={x - w / 2} y={y} width="2.4" height="4.6" fill="#3f7d4c" opacity="0.6" />
          </g>
        );
      })}
    </g>
  );
}

const SKY: Array<[number, number, string]> = [
  [0, 14, "#2a1330"],
  [14, 24, "#481b45"],
  [24, 32, "#732854"],
  [32, 39, "#a24264"],
  [39, 45, "#c75d6a"],
  [45, 51, "#e07f63"],
  [51, 57, "#f2a268"],
  [57, 63, "#fdc584"],
];

const STEPS = [
  [86, 96, 28, "#a9714a"],
  [80, 100, 40, "#8a5c3a"],
  [72, 103, 56, "#6d472c"],
] as const;

const TIERS = [
  [42, 84, "#a9714a"],
  [38, 77, "#b57c50"],
  [34, 70, "#c08a5b"],
  [30, 63, "#ca9666"],
  [25, 56, "#d5a373"],
  [20, 50, "#e0b184"],
] as const;

function Clouds() {
  return (
    <g fill="#f7d2bc">
      <rect x="14" y="38" width="50" height="6" />
      <rect x="20" y="33" width="18" height="5" />
      <rect x="42" y="29" width="14" height="9" />
      <rect x="32" y="35" width="12" height="3" />
      <rect x="124" y="35" width="46" height="6" />
      <rect x="130" y="30" width="17" height="5" />
      <rect x="152" y="32" width="12" height="3" />
      <g fill="#e0a3a0" opacity="0.65">
        <rect x="14" y="44" width="50" height="3" />
        <rect x="124" y="41" width="46" height="3" />
      </g>
    </g>
  );
}

function Temple() {
  return (
    <g>
      {/* plinth */}
      <rect x="78" y="92" width="44" height="5" fill="#8f5c3a" />
      <rect x="80" y="90" width="40" height="2" fill="#b98a5c" />

      {/* shikhara — tapering tiers */}
      {TIERS.map(([w, y, fill]) => (
        <g key={y}>
          <rect x={100 - w / 2} y={y} width={w} height="8" fill={fill} />
          <rect x={100 - w / 2} y={y} width={w} height="1.6" fill="#eaae7d" />
          <rect x={100 - w / 2} y={y + 6.4} width={w} height="1.6" fill="#7c4f33" />
        </g>
      ))}

      {/* amalaka, kalash and flag */}
      <rect x="93" y="45" width="14" height="4" fill="#b57c50" />
      <rect x="95" y="42" width="10" height="3" fill="#e0b184" />
      <circle cx="100" cy="39" r="2.4" fill="#f6d78f" />
      <rect x="99.2" y="32" width="1.6" height="6" fill="#f2d08a" />
      <path d="M101 32h9l-9 4z" fill="#e0607f" />

      {/* doorway with warm light */}
      <rect x="94" y="80" width="12" height="12" fill="#3a2418" />
      <rect x="96.5" y="83" width="7" height="9" fill="#f0a83c" opacity="0.85" />
      <rect x="91" y="86" width="18" height="3" fill="#7c4f33" opacity="0.55" />
    </g>
  );
}

/** A small pixel-art mandir at sunset, centred under the intro. */
export function TempleScene() {
  return (
    <figure className="deshi-diorama">
      <span className="deshi-diorama-glow" aria-hidden="true" />
      <div className="deshi-diorama-art">
        <svg viewBox="0 0 200 120" role="img" aria-label="A stone temple among trees at sunset, reflected in a pond.">
          <defs>
            <pattern id="deshi-scan" width="4" height="2" patternUnits="userSpaceOnUse">
              <rect width="4" height="1" fill="#0a0810" opacity="0.22" />
            </pattern>
            <linearGradient id="deshi-pond" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2b3a52" />
              <stop offset="1" stopColor="#121c2c" />
            </linearGradient>
          </defs>

          <g shapeRendering="crispEdges">
            {SKY.map(([from, to, fill]) => (
              <rect key={from} x="0" y={from} width="200" height={to - from} fill={fill} />
            ))}

            {/* sun and its halo */}
            <circle cx="146" cy="48" r="16" fill="#ffd98a" opacity="0.12" />
            <circle cx="146" cy="48" r="12" fill="#ffd98a" opacity="0.22" />
            <circle cx="146" cy="48" r="8" fill="#ffe6a8" />

            <Clouds />

            {/* distant hills */}
            <path d="M0 62h22l8-5 9 5h20l7-4 8 4h36l9-6 8 6h34l10-5 9 5h20v14H0z" fill="#223f33" />
            <path d="M0 68h200v8H0z" fill="#1c362c" opacity="0.85" />

            <Temple />

            {/* treeline */}
            {[...TREES_LEFT, ...TREES_RIGHT].map(([x, base, size, fill]) => (
              <TreeSprig key={`${x}-${base}`} x={x} base={base} size={size} fill={fill} />
            ))}

            {/* ghat steps */}
            {STEPS.map(([x, y, w, fill]) => (
              <rect key={y} x={x} y={y} width={w} height="5" fill={fill} />
            ))}

            {/* waterline */}
            <rect x="0" y="105" width="200" height="2.4" fill="#4a3524" />
            <rect x="0" y="107" width="200" height="13" fill="url(#deshi-pond)" />
            <g opacity="0.45">
              <rect x="86" y="109" width="28" height="2" fill="#e8825f" />
              <rect x="90" y="112" width="20" height="2" fill="#c75d6a" />
              <rect x="82" y="116" width="36" height="1.6" fill="#f2a268" />
              <rect x="16" y="111" width="26" height="1.6" fill="#3f6b5a" />
              <rect x="152" y="112" width="30" height="1.6" fill="#3f6b5a" />
              <rect x="58" y="117" width="18" height="1.4" fill="#2b3a52" />
            </g>

            {/* fireflies */}
            <g fill="#ffe6a8">
              <circle cx="66" cy="76" r="0.9" opacity="0.9" />
              <circle cx="122" cy="82" r="0.8" opacity="0.8" />
              <circle cx="107" cy="64" r="0.7" opacity="0.7" />
              <circle cx="78" cy="88" r="0.8" opacity="0.75" />
              <circle cx="132" cy="70" r="0.7" opacity="0.65" />
            </g>

            <rect width="200" height="120" fill="url(#deshi-scan)" />
          </g>
        </svg>
      </div>
      <figcaption className="deshi-diorama-caption">somewhere in the hills</figcaption>
    </figure>
  );
}

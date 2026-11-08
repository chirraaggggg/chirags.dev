const ROSE = "#e0607f";
const INDIGO = "#7b87d8";
const GOLD = "#e8c98a";
const LEAF = "#63a86e";
const MARIGOLD = "#f3a83c";

const DOTS = Array.from({ length: 36 }, (_, i) => i * 10);
const EIGHT = [0, 45, 90, 135, 180, 225, 270, 315];
const TWELVE = Array.from({ length: 12 }, (_, i) => i * 30);

function Petal({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return (
    <path
      d="M0 -94c14 12 16 26 0 40-16-14-14-28 0-40Z"
      fill={color}
      opacity={opacity}
      stroke={GOLD}
      strokeOpacity="0.55"
      strokeWidth="1.4"
    />
  );
}

const DIYAS: Array<[x: number, y: number]> = [
  [0, -132],
  [132, 0],
  [0, 132],
  [-132, 0],
];

function Diya({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="-6" r="9" fill={MARIGOLD} opacity="0.16" />
      <path d="M-8 0h16l-3 6H-5Z" fill={MARIGOLD} />
      <path d="M0 -14c4 5 3 9 0 13-3-4-4-8 0-13Z" fill={GOLD} />
      <ellipse cx="0" cy="7" rx="7" ry="1.4" fill={GOLD} opacity="0.25" />
    </g>
  );
}

/** Rangoli mandala used as the sign-off before the address block. */
export function Rangoli() {
  return (
    <div className="deshi-rangoli" aria-hidden="true">
      <svg className="deshi-rangoli-art" viewBox="-160 -160 320 320" fill="none">
        <g className="deshi-rangoli-spin">
          {DOTS.map((angle) => (
            <circle
              key={angle}
              cx="0"
              cy="-132"
              r="1.7"
              fill={GOLD}
              opacity="0.55"
              transform={`rotate(${angle})`}
            />
          ))}

          <circle r="112" stroke={GOLD} strokeOpacity="0.28" strokeDasharray="1 6" />
          <circle r="78" stroke={GOLD} strokeOpacity="0.22" />

          {EIGHT.map((angle, i) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <Petal color={i % 2 ? ROSE : INDIGO} opacity={0.92} />
              <path d="M0 -50c6 6 6 14 0 20-6-6-6-14 0-20Z" fill={i % 2 ? INDIGO : LEAF} opacity="0.9" />
              <circle cx="0" cy="-104" r="4.4" fill={MARIGOLD} />
              <circle cx="0" cy="-104" r="1.8" fill="#fdf3dd" />
            </g>
          ))}

          {TWELVE.map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <path d="M0 -36c5 5 5 11 0 16-5-5-5-11 0-16Z" fill={GOLD} opacity="0.85" />
              <circle cx="0" cy="-64" r="2.4" fill={ROSE} opacity="0.8" />
            </g>
          ))}

          <circle r="26" fill="none" stroke={GOLD} strokeOpacity="0.5" />
          <circle r="12" fill={MARIGOLD} opacity="0.9" />
          <circle r="5" fill="#3a1220" />
        </g>

        {DIYAS.map(([x, y]) => (
          <Diya key={`${x}-${y}`} x={x} y={y} />
        ))}
      </svg>
    </div>
  );
}

function PetalRing({
  count,
  radius,
  rx,
  ry,
  fill,
  opacity = 0.92,
  offset = 0,
}: {
  count: number;
  radius: number;
  rx: number;
  ry: number;
  fill: string;
  opacity?: number;
  offset?: number;
}) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <ellipse
          key={i}
          cx="200"
          cy={200 - radius}
          rx={rx}
          ry={ry}
          fill={fill}
          opacity={opacity}
          transform={`rotate(${(360 / count) * i + offset} 200 200)`}
        />
      ))}
    </g>
  );
}

/** A lit rangoli — concentric flower rings, dotted circle and four diyas. */
export function Rangoli({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="A glowing rangoli: concentric flower patterns in rose, marigold and gold, ringed by dots and four small lamps."
    >
      <defs>
        <radialGradient id="rg-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f6c078" stopOpacity="0.3" />
          <stop offset="0.55" stopColor="#e7909a" stopOpacity="0.12" />
          <stop offset="1" stopColor="#e7909a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rg-rose" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#f7c7d2" />
          <stop offset="0.55" stopColor="#e790a6" />
          <stop offset="1" stopColor="#b8506a" />
        </linearGradient>
        <linearGradient id="rg-marigold" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#ffd899" />
          <stop offset="0.55" stopColor="#f2a844" />
          <stop offset="1" stopColor="#c9721c" />
        </linearGradient>
        <radialGradient id="rg-core" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fff3d2" />
          <stop offset="0.6" stopColor="#f6c168" />
          <stop offset="1" stopColor="#d99026" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="196" fill="url(#rg-glow)" />

      <g className="rangoli-spin">
        {Array.from({ length: 40 }, (_, i) => {
          const a = (i / 40) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={200 + Math.cos(a) * 186}
              cy={200 + Math.sin(a) * 186}
              r={i % 5 === 0 ? 2 : 1.2}
              fill="#f2c98d"
              opacity={i % 5 === 0 ? 0.85 : 0.45}
            />
          );
        })}

        <PetalRing count={20} radius={166} rx={8.5} ry={24} fill="url(#rg-rose)" opacity={0.9} />
        <PetalRing count={16} radius={128} rx={8} ry={21} fill="url(#rg-marigold)" opacity={0.92} offset={11} />
        <PetalRing count={12} radius={94} rx={7} ry={17} fill="#f6d7a0" opacity={0.85} />
        <PetalRing count={10} radius={66} rx={7.5} ry={15} fill="url(#rg-rose)" opacity={0.95} offset={18} />

        <circle cx="200" cy="200" r="34" fill="none" stroke="#f2c98d" strokeWidth="0.9" opacity="0.6" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <circle
              key={`d${i}`}
              cx={200 + Math.cos(a) * 24}
              cy={200 + Math.sin(a) * 24}
              r="2.4"
              fill="#f7d9a0"
              opacity="0.8"
            />
          );
        })}
        <circle cx="200" cy="200" r="17" fill="url(#rg-core)" />
        <circle cx="200" cy="200" r="7" fill="#c9721c" opacity="0.55" />
      </g>

      {[
        { x: 200, y: 14, r: 0 },
        { x: 386, y: 200, r: 90 },
        { x: 200, y: 386, r: 180 },
        { x: 14, y: 200, r: 270 },
      ].map((lamp) => (
        <g key={`${lamp.x}-${lamp.y}`} transform={`translate(${lamp.x} ${lamp.y}) rotate(${lamp.r})`}>
          <circle className="ghat-glow" r="16" fill="url(#rg-glow)" />
          <path d="M-8 6c0-3 4-5 8-5s8 2 8 5c-2 2-5 3-8 3s-6-1-8-3Z" fill="#b4633a" />
          <g className="ghat-flame">
            <path d="M0 0c2.2-3 2.8-6 0.6-9-2.8 3-4.2 6-2.4 9 0.6 1.4 1.4 1.4 2 0Z" fill="#ffe3a3" />
          </g>
        </g>
      ))}
    </svg>
  );
}

const TILE = [
  "<svg xmlns='http://www.w3.org/2000/svg' width='48' height='62' viewBox='0 0 48 62'>",
  "<path d='M0 7Q12 13 24 7T48 7' fill='none' stroke='%23c08a34' stroke-width='1.3'/>",
  "<path d='M13 10q-7 5-9 14 9-2 10-9z' fill='%233e7c4c'/>",
  "<path d='M17 10q7 5 9 14-9-2-10-9z' fill='%2359a267'/>",
  "<g transform='translate(24 30)'>",
  "<circle cx='6' cy='0' r='4.2' fill='%23f3a83c'/><circle cx='-6' cy='0' r='4.2' fill='%23e8902c'/>",
  "<circle cx='3' cy='5.2' r='4.2' fill='%23f3a83c'/><circle cx='-3' cy='-5.2' r='4.2' fill='%23e8902c'/>",
  "<circle cx='3' cy='-5.2' r='4.2' fill='%23f3a83c'/><circle cx='-3' cy='5.2' r='4.2' fill='%23e8902c'/>",
  "<circle cx='0' cy='0' r='3.4' fill='%23f8cf72'/>",
  "</g></svg>",
].join("");

const SIDE_FLOWERS = [26, 74, 122, 170, 218, 266, 314, 360] as const;

function SideStrand() {
  return (
    <svg viewBox="0 0 72 400" width="72" height="400" fill="none" aria-hidden="true">
      <path
        d="M36 0c-7 40 9 58 4 96s-8 42-2 80 8 50 2 88-4 44 0 70"
        stroke="#c08a34"
        strokeWidth="1.2"
        opacity="0.85"
      />
      {SIDE_FLOWERS.map((y, i) => (
        <g key={y} transform={`translate(${i % 2 ? 30 : 42} ${y})`}>
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <circle
              key={angle}
              cx={6 * Math.cos((angle * Math.PI) / 180)}
              cy={6 * Math.sin((angle * Math.PI) / 180)}
              r="4"
              fill={i % 2 ? "#f3a83c" : "#e8902c"}
            />
          ))}
          <circle r="3.2" fill="#f8cf72" />
        </g>
      ))}
      {[52, 150, 246, 342].map((y, i) => (
        <path
          key={y}
          d="M0 0q-9 5-11 16 10-2 11-10z"
          fill="#4b8f57"
          transform={`translate(${i % 2 ? 32 : 40} ${y})${i % 2 ? " scale(-1 1)" : ""}`}
        />
      ))}
      <g transform="translate(36 376)">
        <path d="M0 0q-6 4-7 12 6-3 7-8z" fill="#4b8f57" />
        <path d="M0 0q6 4 7 12-6-3-7-8z" fill="#3e7c4c" />
        <circle cy="13" r="2.4" fill="#f3a83c" />
      </g>
    </svg>
  );
}

/** Marigold garland across the top, with two strands hanging down the sides. */
export function Toran() {
  return (
    <div className="deshi-toran" aria-hidden="true">
      <div
        className="deshi-toran-top deshi-toran-sway"
        style={{ backgroundImage: `url("data:image/svg+xml,${TILE}")` }}
      />
      <div className="deshi-toran-side deshi-toran-side--left deshi-toran-sway-alt">
        <SideStrand />
      </div>
      <div className="deshi-toran-side deshi-toran-side--right deshi-toran-sway">
        <SideStrand />
      </div>
    </div>
  );
}

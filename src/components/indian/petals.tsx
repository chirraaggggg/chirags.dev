import type { CSSProperties } from "react";

const PETALS = [
  { left: "6%", delay: 0, duration: 26, size: 15, tone: "#e790a6", drift: 60 },
  { left: "14%", delay: 7, duration: 31, size: 11, tone: "#f2a844", drift: -40 },
  { left: "23%", delay: 3, duration: 24, size: 13, tone: "#f7c274", drift: 48 },
  { left: "31%", delay: 12, duration: 34, size: 9, tone: "#c98aa0", drift: -56 },
  { left: "39%", delay: 5, duration: 29, size: 14, tone: "#e790a6", drift: 36 },
  { left: "47%", delay: 16, duration: 33, size: 10, tone: "#f2a844", drift: -44 },
  { left: "55%", delay: 2, duration: 27, size: 12, tone: "#f7c274", drift: 52 },
  { left: "63%", delay: 10, duration: 32, size: 16, tone: "#e790a6", drift: -36 },
  { left: "71%", delay: 19, duration: 25, size: 9, tone: "#c98aa0", drift: 40 },
  { left: "79%", delay: 6, duration: 30, size: 13, tone: "#f2a844", drift: -52 },
  { left: "87%", delay: 14, duration: 28, size: 11, tone: "#f7c274", drift: 44 },
  { left: "94%", delay: 9, duration: 35, size: 14, tone: "#e790a6", drift: -34 },
] as const;

/** Petals drifting down the page, behind the content. */
export function Petals() {
  return (
    <div className="deshi-petals" aria-hidden="true">
      {PETALS.map((petal, i) => (
        <span
          key={i}
          className="deshi-petal"
          style={
            {
              left: petal.left,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              "--petal-drift": `${petal.drift}px`,
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 24 30" width={petal.size} height={petal.size * 1.25} focusable="false">
            <path
              d="M12 1C18 8 22.5 15 12 29 1.5 15 6 8 12 1Z"
              fill={petal.tone}
              opacity="0.85"
            />
            <path d="M12 4c3 5 4.5 11 1.5 18" stroke="#fff3e0" strokeWidth="0.6" opacity="0.35" fill="none" />
          </svg>
        </span>
      ))}
    </div>
  );
}

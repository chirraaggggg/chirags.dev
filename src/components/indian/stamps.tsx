import type { ReactNode } from "react";

type StampProps = {
  children: ReactNode;
  size?: "sm" | "lg";
  tone?: "indigo" | "maroon" | "teal";
  label?: string;
};

const TONES = {
  indigo: { bg: "#1f2551", motif: "#e8b94e" },
  maroon: { bg: "#4a1430", motif: "#f0c063" },
  teal: { bg: "#123c3a", motif: "#f2c45c" },
} as const;

function StampFrame({ children, size, tone = "indigo", label }: StampProps) {
  const colors = TONES[tone];

  return (
    <div
      className={`deshi-stamp${size === "sm" ? " deshi-stamp--sm" : size === "lg" ? " deshi-stamp--lg" : ""}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <div className="deshi-stamp-inner" style={{ background: colors.bg }}>
        <svg viewBox="0 0 44 50" fill="none">
          <rect x="3" y="3" width="38" height="44" stroke={colors.motif} strokeOpacity="0.45" />
          <g fill={colors.motif}>{children}</g>
        </svg>
      </div>
    </div>
  );
}

export function StampLotus() {
  return (
    <StampFrame label="Lotus stamp">
      <path d="M22 15c3 4 4 8 0 12-4-4-3-8 0-12Z" opacity="0.95" />
      <path d="M22 27c-8 0-13-5-14-10 5-1 10 2 11 6 1-4 1-7 3-10 2 3 2 6 3 10 1-4 6-7 11-6-1 5-6 10-14 10Z" opacity="0.7" />
      <rect x="8" y="30" width="28" height="1.6" opacity="0.5" />
      <rect x="12" y="34" width="20" height="1.2" opacity="0.3" />
    </StampFrame>
  );
}

export function StampSun() {
  return (
    <StampFrame tone="maroon" label="Sun stamp">
      <circle cx="22" cy="24" r="7" />
      <g opacity="0.75">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="21"
            y="8"
            width="2"
            height="6"
            transform={`rotate(${angle} 22 24)`}
          />
        ))}
      </g>
      <circle cx="22" cy="24" r="11" fill="none" stroke={TONES.maroon.motif} strokeOpacity="0.4" />
      <rect x="7" y="36" width="30" height="1.4" opacity="0.5" />
    </StampFrame>
  );
}

export function StampTemple() {
  return (
    <StampFrame tone="teal" label="Temple stamp">
      <rect x="16" y="19" width="12" height="3" opacity="0.9" />
      <rect x="13" y="24" width="18" height="3" opacity="0.8" />
      <rect x="10" y="29" width="24" height="3" opacity="0.7" />
      <rect x="7" y="34" width="30" height="3" opacity="0.6" />
      <rect x="21" y="12" width="2" height="6" />
      <circle cx="22" cy="11" r="2" />
      <rect x="20" y="37" width="4" height="6" fill={TONES.teal.bg} opacity="0.9" />
    </StampFrame>
  );
}

export function StampMandala() {
  return (
    <StampFrame label="Mandala stamp">
      <circle cx="22" cy="24" r="11" fill="none" stroke={TONES.indigo.motif} strokeOpacity="0.65" />
      <circle cx="22" cy="24" r="6" fill="none" stroke={TONES.indigo.motif} strokeOpacity="0.5" />
      <circle cx="22" cy="24" r="2" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <circle
          key={angle}
          cx="22"
          cy="12"
          r="1.6"
          transform={`rotate(${angle} 22 24)`}
          opacity="0.85"
        />
      ))}
      {[30, 90, 150, 210, 270, 330].map((angle) => (
        <rect
          key={angle}
          x="21.4"
          y="5"
          width="1.2"
          height="4"
          transform={`rotate(${angle} 22 24)`}
          opacity="0.6"
        />
      ))}
    </StampFrame>
  );
}

export function StampPaisley() {
  return (
    <StampFrame tone="maroon" label="Paisley stamp">
      <path
        d="M22 12c7 0 11 5 11 10s-5 9-9 9-7-3-7-6 3-6 6-6 4 2 4 4-2 3-3 3"
        fill="none"
        stroke={TONES.maroon.motif}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.95"
      />
      <g opacity="0.7">
        <circle cx="16" cy="38" r="1.1" />
        <circle cx="21" cy="39" r="1.1" />
        <circle cx="26" cy="38" r="1.1" />
      </g>
    </StampFrame>
  );
}

export function StampPair() {
  return (
    <div className="deshi-stamp--pair">
      <div className="deshi-stamp-tilt-a">
        <StampFrame size="sm" label="Lotus stamp">
          <path d="M22 16c2.6 3.4 3.4 7 0 10-3.4-3-2.6-6.6 0-10Z" />
          <path d="M22 27c-7 0-11-4-12-9 4-1 9 2 10 6 1-3 1-6 2-9 1 3 1 6 2 9 1-4 6-7 10-6-1 5-5 9-12 9Z" opacity="0.7" />
        </StampFrame>
      </div>
      <div className="deshi-stamp-tilt-b">
        <StampFrame size="lg" label="Chirag Sharma stamp">
          <text
            x="22"
            y="27"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={TONES.indigo.motif}
            fontFamily="Georgia, serif"
          >
            CS
          </text>
          <text
            x="22"
            y="38"
            textAnchor="middle"
            fontSize="4.2"
            fill={TONES.indigo.motif}
            opacity="0.8"
            letterSpacing="0.6"
            fontFamily="var(--font-devanagari), serif"
          >
            भारत
          </text>
        </StampFrame>
      </div>
    </div>
  );
}

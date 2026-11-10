type Variant = "work" | "experience" | "about" | "notes";

type Colorway = {
  face: string;
  deep: string;
  ink: string;
  number: string;
};

const COLORWAYS: Record<Variant, Colorway> = {
  work: { face: "#2f3f7d", deep: "#1d2a58", ink: "#f3e8cf", number: "01" },
  experience: { face: "#b1542c", deep: "#85391d", ink: "#fbeacd", number: "02" },
  about: { face: "#8d3752", deep: "#672840", ink: "#f9e6d2", number: "03" },
  notes: { face: "#2f6459", deep: "#1f4a43", ink: "#eaf2e4", number: "04" },
};

const CREAM = "#f4e9d6";

/** Lotus in three strokes — the mark for a body of work. */
function WorkMark() {
  return (
    <g strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 88c-8-11-8-26 0-36 8 10 8 25 0 36Z" />
      <path d="M60 88c-11-5-18-16-18-27 10 2 16 12 18 27Z" />
      <path d="M60 88c11-5 18-16 18-27-10 2-16 12-18 27Z" />
      <path d="M34 94h52" opacity="0.55" />
    </g>
  );
}

/** Shikhara and doorway — the years walked so far. */
function ExperienceMark() {
  return (
    <g strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="49" r="2.4" />
      <path d="M60 52v7" />
      <path d="M60 59 47 85h26Z" />
      <path d="M57 85V75a3 3 0 0 1 6 0v10" />
      <path d="M40 85h40" />
      <path d="M44 92h32" opacity="0.5" />
    </g>
  );
}

/** A lit diya — the person behind the page. */
function AboutMark() {
  return (
    <g strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 52c4 5 6 9 6 12a6 6 0 0 1-12 0c0-3 2-7 6-12Z" fill="currentColor" fillOpacity="0.22" />
      <path d="M42 74h36c0 9-8 15-18 15s-18-6-18-15Z" />
      <path d="M35 74h50" opacity="0.55" />
      <path d="M53 93h14" opacity="0.5" />
    </g>
  );
}

/** An open folio — notes written and kept. */
function NotesMark() {
  return (
    <g strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 56c9-4 18-3 28 4v29c-10-7-19-8-28-4Z" />
      <path d="M88 56c-9-4-18-3-28 4v29c10-7 19-8 28-4Z" />
      <path d="M60 60v29" opacity="0.6" />
      <g opacity="0.45">
        <path d="M39 66c5-1 10 0 15 3M39 73c5-1 10 0 15 3" />
        <path d="M81 66c-5-1-10 0-15 3M81 73c-5-1-10 0-15 3" />
      </g>
    </g>
  );
}

const MARKS: Record<Variant, () => React.JSX.Element> = {
  work: WorkMark,
  experience: ExperienceMark,
  about: AboutMark,
  notes: NotesMark,
};

/** The little punched holes around the coloured field of a postage stamp. */
function perforation() {
  const teeth: Array<{ cx: number; cy: number }> = [];
  const step = 7;
  for (let x = 8; x <= 112; x += step) {
    teeth.push({ cx: x, cy: 8 });
    teeth.push({ cx: x, cy: 132 });
  }
  for (let y = 8; y <= 132; y += step) {
    teeth.push({ cx: 8, cy: y });
    teeth.push({ cx: 112, cy: y });
  }
  return teeth;
}

const TEETH = perforation();

/**
 * A coloured postage stamp: cream margin, punched edges, one line-drawn motif
 * and a small serial in the corner. Four of these carry the page's sections.
 */
export function DoorwayArt({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const Mark = MARKS[variant];
  const colorway = COLORWAYS[variant];

  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`dw-face-${variant}`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={colorway.face} />
          <stop offset="1" stopColor={colorway.deep} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="120" height="140" rx="2.5" fill={CREAM} />
      <rect
        x="8"
        y="8"
        width="104"
        height="124"
        rx="1.5"
        fill={`url(#dw-face-${variant})`}
      />
      {TEETH.map((tooth, index) => (
        <circle key={index} cx={tooth.cx} cy={tooth.cy} r="2.7" fill={CREAM} />
      ))}
      <rect
        x="14.5"
        y="14.5"
        width="91"
        height="111"
        rx="1"
        fill="none"
        stroke={CREAM}
        strokeWidth="0.6"
        strokeDasharray="2.4 2.6"
        opacity="0.4"
      />

      <text
        x="19"
        y="26"
        fill={CREAM}
        fillOpacity="0.72"
        fontFamily="ui-monospace, monospace"
        fontSize="7.5"
        letterSpacing="0.5"
      >
        {colorway.number}
      </text>

      <g
        stroke={colorway.ink}
        color={colorway.ink}
        opacity="0.94"
      >
        <Mark />
      </g>
    </svg>
  );
}

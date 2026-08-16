/**
 * Fixed blueprint / graph-paper background — pixel-for-pixel match of
 * itspgiri.com's `.grid-bg`:
 *
 * - Two faded technical-drawing SVG tiles (600×600) anchored at the top-right
 *   and bottom-left, with 1.5px lines, compass arcs and 45°/60° labels.
 * - A `::before` graph-paper overlay with 10px minor / 40px major lines.
 * - An inline SVG with a 40px cell pattern plus ~42 scattered "filled" cells
 *   (fill rgba(0,0,0,.04), stroke rgba(0,0,0,.08)) — same distribution as the
 *   reference site.
 * - A <900px media query swaps in the darker SVG variants (no labels) and a
 *   40px linear-gradient grid, exactly like the reference site.
 *
 * Pure decoration (aria-hidden). All texture lives in one CSS class so the
 * browser only repaints a single element on scroll.
 */

// Scattered filled cells (39×39 rects on the 40px pattern grid). These exact
// coordinates are lifted from the reference site's DOM so the distribution
// matches 1:1.
const FILLED_CELLS: Array<[number, number]> = [
  [161, 161], [201, 41], [321, 81], [201, 121], [201, 201], [81, 241],
  [281, 321], [441, 161], [1401, 81], [1681, 201], [1121, 321], [1561, 161],
  [1801, 361], [1281, 41], [41, 601], [161, 801], [481, 721], [321, 1001],
  [561, 881], [121, 1121], [1201, 641], [1601, 881], [1401, 1041], [1801, 721],
  [1001, 1121], [1521, 561], [241, 1601], [601, 1401], [881, 1801], [401, 401],
  [801, 401], [721, 201], [961, 1201], [1761, 1521], [1121, 1921], [1361, 2081],
  [481, 2201], [1681, 2321], [201, 2401], [1001, 2601], [41, 1801], [321, 1681],
];

export function BlueprintBackground() {
  return (
    <div aria-hidden className="retro-grid-bg">
      <svg
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          height: "100%",
          width: "100%",
          fill: "rgba(0,0,0,0.04)",
          stroke: "rgba(0,0,0,0.08)",
        }}
      >
        <defs>
          <pattern
            id="_R_3b_"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path d="M.5 40V.5H40" fill="none" strokeDasharray="0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#_R_3b_)" />
        <svg x="-1" y="-1" style={{ overflow: "visible" }}>
          {FILLED_CELLS.map(([x, y]) => (
            <rect key={`${x}-${y}`} strokeWidth="0" width="39" height="39" x={x} y={y} />
          ))}
        </svg>
      </svg>
    </div>
  );
}

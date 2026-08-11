// Filled blueprint cells rendered as one inline SVG data-URI background
// (1600x1000 design space, sliced to cover) instead of many positioned divs.
const CELLS_SVG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
  <g fill="rgba(0,0,0,0.06)" stroke="rgba(0,0,0,0.10)" stroke-width="1">
    <rect x="128" y="140" width="72" height="72" />
    <rect x="1312" y="220" width="56" height="56" />
    <rect x="224" y="380" width="40" height="40" />
    <rect x="1408" y="520" width="64" height="64" />
    <rect x="96" y="640" width="48" height="48" />
    <rect x="1248" y="760" width="80" height="80" />
    <rect x="384" y="880" width="44" height="44" />
  </g>
</svg>
`)}`;

const ANGLE_MARKERS = [
  { label: "45°", top: "6%", right: "18%", rotate: "-24deg" },
  { label: "60°", top: "30%", right: "5%", rotate: "18deg" },
  { label: "90°", bottom: "12%", right: "14%", rotate: "-12deg" },
];

/**
 * Fixed blueprint / graph-paper background. All texture is painted with a
 * single CSS background-image (two gradient layers + one SVG layer), so the
 * browser only repaints one element on scroll. Angle-degree markers are the
 * only DOM nodes. Pure decoration (aria-hidden).
 */
export function BlueprintBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        backgroundImage: `${CELLS_SVG}, linear-gradient(to right, rgba(0,0,0,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.09) 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
        backgroundSize: "cover, 140px 140px, 140px 140px, 28px 28px, 28px 28px",
      }}
    >
      {ANGLE_MARKERS.map((marker, i) => (
        <span
          key={i}
          className="absolute font-terminal text-xs font-medium tracking-[0.08em] text-black/25 select-none"
          style={{
            top: marker.top,
            right: marker.right,
            bottom: marker.bottom,
            transform: marker.rotate,
          }}
        >
          {marker.label}
        </span>
      ))}
    </div>
  );
}

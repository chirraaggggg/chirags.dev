/**
 * Fixed blueprint / graph-paper background — pixel-for-pixel match of
 * itspgiri.com's `.grid-bg`:
 *
 * - Two faded technical-drawing SVG tiles (600×600) anchored at the top-right
 *   and bottom-left, with 1.5px lines, compass arcs and 45°/60° labels.
 * - A `::before` graph-paper overlay with 10px minor / 40px major lines.
 * - A <900px media query swaps in the darker SVG variants (no labels),
 *   exactly like the reference site.
 *
 * Pure decoration (aria-hidden). All texture lives in one CSS class so the
 * browser only repaints a single element on scroll.
 */
export function BlueprintBackground() {
  return <div aria-hidden className="retro-grid-bg" />;
}

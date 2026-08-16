import type { ReactNode } from "react";

/**
 * macOS-style terminal window from itspgiri.com:
 * gray gradient frame, header bar with traffic-light dots (2px black ring,
 * inset highlight), centered Press Start 2P title, white body with 1px border.
 */
export function TerminalWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="terminal-window">
      <div className="terminal-header-bar">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-title">
          <span style={{ color: "#555" }}>&gt;_</span> {title}
        </div>
      </div>
      {children}
    </div>
  );
}

/**
 * Bold Press Start 2P section heading with a colored `>` chevron,
 * matching `.terminal-section-title` on the reference site.
 */
export function TerminalSectionTitle({
  children,
  chevronColor,
}: {
  children: ReactNode;
  chevronColor: string;
}) {
  return (
    <h2 className="terminal-section-title">
      <span style={{ color: chevronColor }}>&gt;</span>
      {children}
    </h2>
  );
}

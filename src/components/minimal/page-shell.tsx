import type { ReactNode } from "react";

import { NavigationDock } from "@/components/minimal/navigation-dock";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mp">
      <a className="mp-skip" href="#main">
        Skip to content
      </a>
      <main id="main" className="mp-page mp-column mp-column-appear">
        {children}
      </main>
      <NavigationDock />
    </div>
  );
}

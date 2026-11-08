import type { ReactNode } from "react";

import { Dock } from "@/components/indian/dock";
import { Petals } from "@/components/indian/petals";
import { Toran } from "@/components/indian/toran";

export function PageShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="deshi">
      <a className="deshi-skip" href="#main">
        Skip to content
      </a>
      <Toran />
      <Petals />
      <main id="main" className={wide ? "deshi-page deshi-page--work" : "deshi-page"}>
        {children}
      </main>
      <Dock />
    </div>
  );
}

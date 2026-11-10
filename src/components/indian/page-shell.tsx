import type { ReactNode } from "react";

import { BloomDefs } from "@/components/indian/blooms";
import { BottomBar } from "@/components/indian/bottom-bar";
import { Petals } from "@/components/indian/petals";

export function PageShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="deshi">
      <BloomDefs />
      <div className="deshi-grain" aria-hidden="true" />
      <Petals />
      <a className="deshi-skip" href="#main">
        Skip to content
      </a>
      <BottomBar />
      <main
        id="main"
        className={wide ? "deshi-page deshi-page--wide" : "deshi-page"}
      >
        {children}
      </main>
    </div>
  );
}

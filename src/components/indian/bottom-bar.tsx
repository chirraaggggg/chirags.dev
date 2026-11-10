"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { FOLIO } from "@/config/folio";

const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone: FOLIO.timeZone,
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export function BottomBar() {
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const dock = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const tick = () => setTime(clock.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      dock.current?.style.setProperty(
        "--dock-progress",
        `${(ratio * 100).toFixed(2)}%`,
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        measure();
        const delta = y - last;
        if (Math.abs(delta) < 8) return;
        setHidden(delta > 0 && y > 180);
        last = y;
      });
    };

    measure();

    const onResize = () => {
      if (window.scrollY <= 180) setHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <nav
      ref={dock}
      className="deshi-dock"
      aria-label="Main navigation"
      data-hidden={hidden ? "true" : undefined}
    >
      <div className="deshi-dock-inner">
        <span className="deshi-dock-progress" aria-hidden="true" />
        <Link
          className="deshi-dock-link"
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          Home
        </Link>
        <Link
          className="deshi-dock-link"
          href="/work"
          aria-current={pathname === "/work" ? "page" : undefined}
        >
          Work
        </Link>
        <Link
          className="deshi-dock-link"
          href="/about"
          aria-current={pathname === "/about" ? "page" : undefined}
        >
          About
        </Link>

        <a className="deshi-dock-say" href={`mailto:${FOLIO.email}`}>
          Say hi
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <span className="deshi-dock-rule deshi-dock-rule--clock" aria-hidden="true" />

        <span className="deshi-dock-clock">
          <time suppressHydrationWarning dateTime={new Date().toISOString()}>
            {time ?? "--:--:--"}
          </time>
          <em>IST</em>
        </span>
      </div>
    </nav>
  );
}

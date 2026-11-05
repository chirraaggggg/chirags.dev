"use client";

import { useEffect, useState } from "react";

import { FOLIO } from "@/config/folio";

function useClock(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
        .format(new Date())
        .toUpperCase();

    const initial = window.setTimeout(() => setTime(format()), 0);
    const interval = window.setInterval(() => setTime(format()), 1000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, [timeZone]);

  return time;
}

export function SiteFooter() {
  const clock = useClock(FOLIO.timeZone);

  return (
    <footer className="mx-auto w-full max-w-[1180px] px-5 pb-8 sm:px-8">
      <div className="folio-hairline flex flex-col gap-3 pt-4 font-code text-[9px] tracking-[0.14em] text-ink/40 uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>{FOLIO.footerCredit}</p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${FOLIO.email}`}
            className="transition-colors hover:text-ink"
          >
            Email
          </a>
          <a
            href={FOLIO.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <span className="hidden h-3 w-px bg-ink/15 sm:inline-block" />
          <span aria-label={`Local time in ${FOLIO.location}`} className="text-ink/60">
            {clock ?? "--:--:-- --"} <span className="text-ink/35">in {FOLIO.timeZoneLabel}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

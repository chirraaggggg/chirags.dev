import { ChevronDownIcon } from "lucide-react";

import { RETRO } from "@/config/retro";

import { RetroWindow, TerminalHeading } from "./window";

interface TimelineEntryProps {
  role: string;
  org: string;
  focus: string;
  dates: string;
  isLast?: boolean;
  education?: boolean;
}

function TimelineEntry({
  role,
  org,
  focus,
  dates,
  isLast,
  education,
}: TimelineEntryProps) {
  return (
    <li className="relative flex gap-5 pb-10 pl-0 last:pb-0">
      {/* Dot + connecting line */}
      <div className="relative flex flex-col items-center">
        <span
          className={
            education
              ? "mt-1 size-3.5 rounded-full border-2 border-black bg-[#febc2e] shadow-[0_0_0_3px_rgba(254,188,46,0.3)]"
              : "mt-1 size-3.5 rounded-full border-2 border-black bg-white"
          }
          aria-hidden
        />
        {!isLast && <span className="w-px flex-1 bg-black/15" aria-hidden />}
      </div>

      {/* Entry body */}
      <div className="flex flex-1 flex-col gap-1 pb-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-sans text-lg font-bold text-black">{role}</h3>
          <span className="flex items-center gap-1.5 font-terminal text-xs font-medium tracking-[0.08em] text-black/50 whitespace-nowrap">
            {dates}
            <ChevronDownIcon className="size-3.5" aria-hidden />
          </span>
        </div>
        <p className="font-sans text-sm font-medium text-black/60">
          {org}
          {focus && (
            <>
              {" "}
              <span aria-hidden>•</span>{" "}
              <span className="text-black/45">{focus}</span>
            </>
          )}
        </p>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <RetroWindow
      title={RETRO.experience.heading}
      titleClassName="font-sans text-sm font-extrabold tracking-wide"
      bodyClassName="p-7 sm:p-12"
    >
      <ul>
        {RETRO.experience.items.map((item, i) => (
          <TimelineEntry
            key={`${item.role}-${item.org}`}
            {...item}
            isLast={i === RETRO.experience.items.length - 1}
          />
        ))}
      </ul>

      {/* Education */}
      <div className="mt-12 border-t border-dashed border-black/15 pt-12">
        <TerminalHeading accent="text-[#febc2e]">
          {RETRO.experience.education.heading}
        </TerminalHeading>
        <ul className="mt-9">
          {RETRO.experience.education.items.map((item, i) => (
            <TimelineEntry
              key={`${item.role}-${item.org}`}
              {...item}
              isLast={i === RETRO.experience.education.items.length - 1}
              education
            />
          ))}
        </ul>
      </div>

      {/* Full-width CTA */}
      <a
        href={RETRO.experience.cta.href}
        className="mt-10 block w-full rounded-lg border-2 border-black bg-black px-6 py-4 text-center font-sans text-sm font-extrabold tracking-wide text-white shadow-[0_4px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgba(0,0,0,0.9)] active:translate-y-1 active:shadow-none"
      >
        {RETRO.experience.cta.label}
      </a>
    </RetroWindow>
  );
}

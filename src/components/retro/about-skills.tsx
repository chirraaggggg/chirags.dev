import { RETRO } from "@/config/retro";

import { RetroWindow, TerminalHeading } from "./window";

function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-black/80 bg-white px-4 py-2 font-terminal text-xs font-medium tracking-wide text-black/85 transition-colors duration-150 hover:bg-black/[0.04] dark:border-white/40 dark:bg-[#1c1c1c] dark:text-white/85 dark:hover:bg-white/10">
      {label}
    </span>
  );
}

export function AboutSkills() {
  return (
    <RetroWindow title={RETRO.windowTitle} bodyClassName="p-7 sm:p-12">
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        {/* Left: WHOAMI */}
        <div>
          <TerminalHeading accent="text-[#4b7bec]">
            {RETRO.about.whoamiHeading}
          </TerminalHeading>
          <div className="mt-7 space-y-6">
            {RETRO.about.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="font-sans text-[17px] leading-[1.75] font-normal text-black/70 dark:text-white/70"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right: LS -L ./SKILLS */}
        <div>
          <TerminalHeading accent="text-[#28c840]">
            {RETRO.about.skillsHeading}
          </TerminalHeading>
          <div className="mt-7 space-y-10">
            {Object.entries(RETRO.about.skills).map(([group, skills]) => (
              <div key={group}>
                <h3 className="font-terminal text-[11px] font-medium tracking-[0.2em] text-black/45 uppercase dark:text-white/45">
                  {group}
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <SkillPill key={skill} label={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RetroWindow>
  );
}

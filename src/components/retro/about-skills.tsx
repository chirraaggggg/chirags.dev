import { RETRO } from "@/config/retro";

import { TerminalSectionTitle } from "./window";

export function AboutSkills() {
  return (
    <div className="terminal-body about-grid">
      {/* WHOAMI */}
      <div className="bio-col">
        <TerminalSectionTitle chevronColor={RETRO.about.whoami.chevronColor}>
          {RETRO.about.whoami.label}
        </TerminalSectionTitle>
        {RETRO.about.paragraphs.map((paragraph, i) => (
          <p key={i} className="bio-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* LS -L ./SKILLS */}
      <div className="tech-col">
        <TerminalSectionTitle chevronColor={RETRO.about.skills.chevronColor}>
          {RETRO.about.skills.label}
        </TerminalSectionTitle>
        {RETRO.about.skills.groups.map((group) => (
          <div key={group.category} className="tech-group">
            <h3 className="terminal-category">{group.category}</h3>
            <div className="tech-tags">
              {group.pills.map((pill) => (
                <span key={pill} className="terminal-pill">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

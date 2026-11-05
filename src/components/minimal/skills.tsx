import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Braces,
  Database,
  Figma,
  Layers,
  Sparkles,
  Terminal,
  Wind,
} from "lucide-react";

import { FOLIO_SKILLS, type FolioSkill } from "@/config/folio";

const ICONS: Record<FolioSkill["icon"], LucideIcon> = {
  typescript: Braces,
  next: Layers,
  react: Atom,
  python: Terminal,
  postgres: Database,
  tailwind: Wind,
  figma: Figma,
  claude: Sparkles,
};

export function Skills() {
  return (
    <ul className="mp-skill-grid">
      {FOLIO_SKILLS.map((skill, index) => {
        const Icon = ICONS[skill.icon];
        return (
          <li key={skill.label}>
            <div className="mp-skill-card-top">
              <span className="mp-skill-index">0{index + 1}</span>
              <span className="mp-skill-icon" aria-hidden="true">
                <Icon />
              </span>
            </div>
            <span className="mp-skill-label">{skill.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

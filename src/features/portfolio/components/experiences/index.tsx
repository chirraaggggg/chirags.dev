import React from "react";

import { EXPERIENCES } from "../../data/experiences";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

export function Experiences() {
  return (
    <div className="border-2 border-border rounded-lg p-4">
      <Panel id="experience" className="border-x-0">
        <PanelHeader>
          <PanelTitle>Experience</PanelTitle>
        </PanelHeader>

        <div className="pr-2 pl-4">
          {EXPERIENCES.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

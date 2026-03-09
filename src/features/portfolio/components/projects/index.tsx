import { CollapsibleList } from "@/components/collapsible-list";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { ProjectItem } from "./project-item";

export function Projects() {
  return (
    <div className="border-2 border-border rounded-lg p-4">
      <Panel id="projects" className="border-x-0">
        <PanelHeader>
          <PanelTitle>
            Projects
            <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
          </PanelTitle>
        </PanelHeader>

        <CollapsibleList
          items={PROJECTS}
          max={4}
          renderItem={(item) => <ProjectItem project={item} />}
        />
      </Panel>
    </div>
  );
}

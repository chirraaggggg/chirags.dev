import { Markdown } from "@/components/markdown";
import { ProseMono } from "@/components/ui/typography";
import { USER } from "@/features/portfolio/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  return (
    <div className="border-2 border-border rounded-lg p-4">
      <Panel id="about" className="border-x-0">
        <PanelHeader>
          <PanelTitle>About</PanelTitle>
        </PanelHeader>

        <PanelContent>
          <ProseMono>
            <Markdown>{USER.about}</Markdown>
          </ProseMono>
        </PanelContent>
      </Panel>
    </div>
  );
}

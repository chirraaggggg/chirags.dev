import { Github, Linkedin, XIcon } from "lucide-react";

import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function SocialLinksSection() {
  return (
    <div className="border-2 border-border rounded-lg p-4">
      <Panel className="border-x-0">
        <PanelHeader>
          <PanelTitle>Connect</PanelTitle>
        </PanelHeader>

        <PanelContent className="flex gap-3 pt-2">
          {SOCIAL_LINKS.map((social) => {
            let Icon;
            if (social.title === "X (formerly Twitter)") {
              Icon = XIcon;
            } else if (social.title === "GitHub") {
              Icon = Github;
            } else if (social.title === "LinkedIn") {
              Icon = Linkedin;
            }

            return (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener"
                aria-label={social.title}
                className="transition-opacity hover:opacity-75 p-2 rounded-lg border border-zinc-700 dark:border-zinc-600"
              >
                {Icon && <Icon className="size-5" />}
              </a>
            );
          })}
        </PanelContent>
      </Panel>
    </div>
  );
}

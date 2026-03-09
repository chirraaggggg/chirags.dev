import { GlobeIcon, MapPinIcon } from "lucide-react";

import { USER } from "@/features/portfolio/data/user";
import { urlToName } from "@/utils/url";

import { Panel, PanelContent } from "../panel";
import { CurrentLocalTimeItem } from "./current-local-time-item";
import { EmailItem } from "./email-item";
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";
import { JobItem } from "./job-item";

export function Overview() {
  return (
    <div className="border-2 border-dashed border-border rounded-lg p-4">
      <Panel className="border-x-0">
        <h2 className="sr-only">Overview</h2>

        <PanelContent className="space-y-2.5">
          {USER.jobs.map((job, index) => {
            return (
              <JobItem
                key={index}
                title={job.title}
                company={job.company}
                website={job.website}
              />
            );
          })}

          <div className="grid gap-x-12 gap-y-2.5 sm:grid-cols-2">
            <IntroItem>
              <IntroItemIcon>
                <MapPinIcon />
              </IntroItemIcon>
              <IntroItemContent>
                <IntroItemLink
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
                  aria-label={`Location: ${USER.address}`}
                >
                  {USER.address}
                </IntroItemLink>
              </IntroItemContent>
            </IntroItem>

            <div />

            <CurrentLocalTimeItem timeZone={USER.timeZone} />

            <div />

            <EmailItem email={USER.email} />

            <div />

            <IntroItem>
              <IntroItemIcon>
                <GlobeIcon />
              </IntroItemIcon>
              <IntroItemContent>
                <IntroItemLink
                  href={USER.website}
                  aria-label={`Personal website: ${urlToName(USER.website)}`}
                >
                  {urlToName(USER.website)}
                </IntroItemLink>
              </IntroItemContent>
            </IntroItem>
          </div>
        </PanelContent>
      </Panel>
    </div>
  );
}

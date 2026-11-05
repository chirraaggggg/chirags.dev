import type { Metadata } from "next";

import { Avatar } from "@/components/minimal/avatar";
import { ExperienceList } from "@/components/minimal/experience-list";
import { PageShell } from "@/components/minimal/page-shell";
import { Socials } from "@/components/minimal/socials";
import { FOLIO, FOLIO_INTRO } from "@/config/folio";
import { SITE_INFO } from "@/config/site";

export const metadata: Metadata = {
  title: "Chirag Sharma — Solo founder, full-stack + AI",
  description:
    "Portfolio of Chirag Sharma, a solo founder and full-stack + AI engineer in Gurugram.",
  alternates: { canonical: SITE_INFO.url },
  openGraph: {
    title: "Chirag Sharma — Solo founder, full-stack + AI",
    description:
      "A solo founder and full-stack engineer building thoughtful products end to end.",
    url: SITE_INFO.url,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <PageShell>
      <header className="mp-intro">
        <Avatar />
        <div className="mp-intro-title">
          <h1>
            {FOLIO.fullName} <span>/ {FOLIO.firstName}</span>
          </h1>
        </div>
        <div className="mp-copy">
          {FOLIO_INTRO.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <section className="mp-section" aria-labelledby="experience-heading">
        <div className="mp-section-heading">
          <h2 id="experience-heading">Experience</h2>
        </div>
        <ExperienceList />
      </section>

      <Socials />
    </PageShell>
  );
}

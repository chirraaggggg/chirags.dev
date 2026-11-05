import type { Metadata } from "next";

import { ExperienceList } from "@/components/minimal/experience-list";
import { PageShell } from "@/components/minimal/page-shell";
import { SiteHeader } from "@/components/minimal/site-header";
import { Socials } from "@/components/minimal/socials";
import { FOLIO_INTRO } from "@/config/folio";
import { SITE_INFO } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Chirag Sharma — a solo founder and full-stack engineer building AI products end to end.",
  alternates: { canonical: `${SITE_INFO.url}/about` },
  openGraph: {
    title: "About · Chirag Sharma",
    description:
      "Experience, tools and the way I approach design and engineering, from Chirag Sharma.",
    url: `${SITE_INFO.url}/about`,
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <SiteHeader title="About" />

      <div className="mp-about-intro">
        <div className="mp-copy">
          {FOLIO_INTRO.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

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

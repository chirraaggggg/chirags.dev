import { ExperienceList } from "@/components/minimal/experience-list";
import { PageShell } from "@/components/minimal/page-shell";
import { SiteHeader } from "@/components/minimal/site-header";
import { Socials } from "@/components/minimal/socials";
import { FOLIO_INTRO } from "@/config/folio";

export function AboutPageContent() {
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

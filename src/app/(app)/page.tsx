import type { Metadata } from "next";

import { Approach } from "@/components/minimal/approach";
import { Avatar } from "@/components/minimal/avatar";
import { PageShell } from "@/components/minimal/page-shell";
import { Skills } from "@/components/minimal/skills";
import { Socials } from "@/components/minimal/socials";
import { ProjectBadge, ProjectMockup } from "@/components/work/project-art";
import { FOLIO, FOLIO_INTRO } from "@/config/folio";
import { SITE_INFO } from "@/config/site";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Chirag Sharma — Solo founder, full-stack + AI",
  description:
    "Portfolio of Chirag Sharma, a solo founder and full-stack + AI engineer in Gurugram. Building Vuno, LaunchPad and small sharp products end to end.",
  alternates: { canonical: SITE_INFO.url },
  openGraph: {
    title: "Chirag Sharma — Solo founder, full-stack + AI",
    description:
      "Building Vuno, LaunchPad and small sharp products end to end. Work, recent activities and a postcard.",
    url: SITE_INFO.url,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FOLIO.fullName,
  url: SITE_INFO.url,
  email: `mailto:${FOLIO.email}`,
  jobTitle: "Solo founder & full-stack engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurugram",
    addressCountry: "IN",
  },
  sameAs: [FOLIO.githubUrl, FOLIO.linkedinUrl, FOLIO.xUrl],
  knowsAbout: ["AI products", "Design engineering", "Next.js", "TypeScript"],
};

export default function HomePage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      <section className="mp-section" aria-labelledby="works-heading">
        <div className="mp-section-heading">
          <h2 id="works-heading">Featured Works</h2>
          <span className="mp-heading-note">2025 — 2026</span>
        </div>
        <ul className="mp-project-grid">
          {PROJECTS.map((project) => {
            const content = (
              <>
                <div className="mp-project-card-preview">
                  <ProjectMockup project={project} />
                </div>
                <div className="mp-project-card-body">
                  <div className="mp-project-card-meta">
                    <span className="mp-project-badge">
                      <ProjectBadge kind={project.badge} />
                    </span>
                    <span>{project.date}</span>
                    <span className="mp-project-card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <h3>{project.name}</h3>
                  <p className="mp-secondary">{project.tagline}</p>
                  <div className="mp-project-tags">
                    {project.stack.slice(0, 3).map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
              </>
            );

            return (
              <li key={project.slug}>
                {project.href ? (
                  <a
                    className="mp-project-card"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <article className="mp-project-card">{content}</article>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mp-section" aria-labelledby="skills-heading">
        <div className="mp-section-heading">
          <h2 id="skills-heading">Skills &amp; Tools</h2>
        </div>
        <Skills />
      </section>

      <section className="mp-section" aria-labelledby="approach-heading">
        <div className="mp-section-heading">
          <h2 id="approach-heading">How I approach a problem</h2>
        </div>
        <Approach />
      </section>

      <Socials />
    </PageShell>
  );
}

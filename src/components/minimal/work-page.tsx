import { Approach } from "@/components/minimal/approach";
import { PageShell } from "@/components/minimal/page-shell";
import { SiteHeader } from "@/components/minimal/site-header";
import { Skills } from "@/components/minimal/skills";
import { Socials } from "@/components/minimal/socials";
import { ProjectBadge, ProjectMockup } from "@/components/work/project-art";
import { PROJECTS } from "@/data/projects";

function ProjectCardContent({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  return (
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
}

export function WorkPageContent() {
  return (
    <PageShell>
      <SiteHeader title="Work" />

      <section className="mp-section" aria-labelledby="works-heading">
        <div className="mp-section-heading">
          <h2 id="works-heading">Featured Works</h2>
          <span className="mp-heading-note">2025 — 2026</span>
        </div>
        <ul className="mp-project-grid">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              {project.href ? (
                <a
                  className="mp-project-card"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ProjectCardContent project={project} />
                </a>
              ) : (
                <article className="mp-project-card">
                  <ProjectCardContent project={project} />
                </article>
              )}
            </li>
          ))}
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

import { Approach } from "@/components/minimal/approach";
import { PageShell } from "@/components/minimal/page-shell";
import { SiteHeader } from "@/components/minimal/site-header";
import { Socials } from "@/components/minimal/socials";
import { PROJECTS } from "@/data/projects";

function ProjectRow({ project }: { project: (typeof PROJECTS)[number] }) {
  const content = (
    <>
      <div className="mp-work-item-main">
        <h3>{project.name}</h3>
        <p className="mp-secondary">{project.tagline}</p>
        <div className="mp-project-tags">
          {project.stack.slice(0, 3).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>
      <div className="mp-work-item-meta">
        <span>{project.date}</span>
        <span className="mp-work-item-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </>
  );

  return project.href ? (
    <a className="mp-work-item" href={project.href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <div className="mp-work-item">{content}</div>
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
        <ul className="mp-work-list">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
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

import { SectionHead } from "@/components/indian/section-head";
import { PROJECTS } from "@/data/projects";

const GLYPHS: Record<string, string> = {
  maillayer: "💌",
  gitwhisper: "🌿",
  repotutor: "🧭",
  chess: "♟️",
  vuno: "✨",
};

export function ProjectsSection({ limit }: { limit?: number }) {
  const projects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <section className="deshi-section" aria-labelledby="projects-heading">
      <SectionHead id="projects-heading" title="More projects" glyph="lotus" />
      <ul className="deshi-list">
        {projects.map((project) => {
          const body = (
            <>
              <div className="deshi-row-title">
                <span className="deshi-emoji" aria-hidden="true">
                  {GLYPHS[project.slug] ?? "✦"}
                </span>
                {project.name}
                <span className="deshi-row-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
              <p className="deshi-row-body">{project.tagline}</p>
              <div className="deshi-row-meta">
                <span>{project.year}</span>
                {project.stack.slice(0, 3).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </>
          );

          return (
            <li key={project.slug}>
              {project.href ? (
                <a
                  className="deshi-row"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {body}
                </a>
              ) : (
                <div className="deshi-row">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

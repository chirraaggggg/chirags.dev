import Link from "next/link";

import { ContactSection } from "@/components/indian/contact-section";
import { PageShell } from "@/components/indian/page-shell";
import { SectionHead } from "@/components/indian/section-head";
import { FOLIO_APPROACH } from "@/config/folio";
import { PROJECTS } from "@/data/projects";

const GLYPHS: Record<string, string> = {
  maillayer: "💌",
  gitwhisper: "🌿",
  repotutor: "🧭",
  chess: "♟️",
  vuno: "✨",
};

function Chevron() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function WorkPageContent() {
  return (
    <PageShell wide>
      <header className="deshi-work-hero">
        <Link className="deshi-back" href="/">
          <span aria-hidden="true">←</span> Home
        </Link>
        <h1>Work</h1>
        <p>
          Things I&rsquo;ve designed, built and shipped — mostly on my own, mostly
          from a laptop in Gurugram. Every project here started as a small
          annoyance I wanted gone.
        </p>
      </header>

      <section className="deshi-work-section" aria-labelledby="work-projects">
        <SectionHead
          id="work-projects"
          title="Projects"
          glyph="lotus"
          note={`${PROJECTS.length} selected`}
        />
        <div className="deshi-list">
          {PROJECTS.map((project) => (
            <article key={project.slug} className="deshi-row">
              <div className="deshi-row-title">
                <span className="deshi-emoji" aria-hidden="true">
                  {GLYPHS[project.slug] ?? "✦"}
                </span>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
                <span className="deshi-row-arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="deshi-stop-period">{project.date}</span>
              </div>
              {project.story.map((paragraph) => (
                <p key={paragraph} className="deshi-row-body">
                  {paragraph}
                </p>
              ))}
              <div className="deshi-row-meta">
                <span>{project.role}</span>
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="deshi-work-section" aria-labelledby="work-approach">
        <SectionHead
          id="work-approach"
          title="How I work"
          glyph="mandala"
          note="the boring part"
        />
        <div className="deshi-approach">
          {FOLIO_APPROACH.map((step, index) => (
            <details key={step.title} className="deshi-accordion">
              <summary>
                <span className="deshi-accordion-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.title}
                <Chevron />
              </summary>
              <p>{step.body}</p>
            </details>
          ))}
        </div>
      </section>

      <ContactSection />
    </PageShell>
  );
}

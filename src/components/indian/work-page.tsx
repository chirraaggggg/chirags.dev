import Link from "next/link";

import { ArrowUpRight } from "@/components/indian/arrow";
import { ContactSection } from "@/components/indian/contact-section";
import { PageShell } from "@/components/indian/page-shell";
import { Rangoli } from "@/components/indian/rangoli";
import { Reveal } from "@/components/indian/reveal";
import { SectionHead } from "@/components/indian/section-head";
import { FOLIO_APPROACH } from "@/config/folio";
import { PROJECTS } from "@/data/projects";

function Chevron() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="deshi-chevron"
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

      <section
        className="deshi-section"
        aria-labelledby="work-projects"
      >
        <SectionHead
          id="work-projects"
          index="01"
          title="Projects"
          note={`${PROJECTS.length} selected`}
        />

        <div className="deshi-work-list">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.03}>
              <article className="deshi-work-item">
                <div className="deshi-work-item-head">
                  <span className="deshi-project-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noreferrer">
                        {project.name}
                        <ArrowUpRight className="deshi-work-item-arrow" />
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <span className="deshi-project-year">{project.date}</span>
                </div>

                <div className="deshi-work-item-body">
                  {project.story.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <p className="deshi-work-item-meta">
                  <span>{project.role}</span>
                  <span aria-hidden="true">/</span>
                  <span>{project.stack.join(" · ")}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="deshi-section" aria-labelledby="work-approach">
        <SectionHead
          id="work-approach"
          index="02"
          title="How I work"
          note="The boring part, honestly"
        />

        <div className="deshi-approach">
          {FOLIO_APPROACH.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.04}>
              <details className="deshi-accordion">
                <summary>
                  <span className="deshi-accordion-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="deshi-accordion-title">{step.title}</span>
                  <Chevron />
                </summary>
                <div className="deshi-accordion-body">
                  {step.body.split("\n").map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="deshi-rangoli-wrap" aria-hidden="true">
        <Rangoli className="deshi-rangoli" />
      </div>

      <ContactSection />
    </PageShell>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

import { ProjectBadge } from "@/components/work/project-art";
import type { Project } from "@/data/projects";
import { PROJECTS } from "@/data/projects";

type CaseStudyProps = {
  project: Project | null;
  onClose: () => void;
  onSelect: (slug: string) => void;
};

export function CaseStudy({ project, onClose, onSelect }: CaseStudyProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("folio-scroll-lock");
    window.setTimeout(() => closeRef.current?.focus(), 80);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("folio-scroll-lock");
    };
  }, [onClose, project]);

  const next =
    project &&
    PROJECTS[(PROJECTS.findIndex((item) => item.slug === project.slug) + 1) % PROJECTS.length];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study"
          className="fixed inset-0 z-[95] overflow-y-auto overscroll-contain bg-paper"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
        >
          <motion.article
            layoutId={`project-${project.slug}`}
            transition={{ type: "spring", stiffness: 210, damping: 26 }}
            className="relative mx-auto min-h-full w-full max-w-[960px] bg-paper px-5 pt-20 pb-16 sm:px-10"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="fixed top-5 right-5 z-10 flex items-center gap-2 rounded-full border border-ink/25 bg-paper/90 px-3 py-1.5 font-code text-[10px] tracking-[0.14em] text-ink uppercase backdrop-blur transition-colors hover:bg-ink hover:text-paper sm:top-8 sm:right-8"
            >
              Close <span className="text-[13px] leading-none">✕</span>
            </button>

            <div className="flex items-center gap-2 font-code text-[9px] tracking-[0.18em] text-ink/45 uppercase">
              <span className="flex size-7 items-center justify-center rounded-full border border-ink/25">
                <ProjectBadge kind={project.badge} className="size-3.5" />
              </span>
              {project.company} <span className="text-ink/20">/</span> {project.date}
            </div>

            <h2 className="folio-display mt-6 text-[clamp(3rem,11vw,7.5rem)]">{project.name}</h2>
            <p className="folio-italic mt-3 max-w-2xl text-[clamp(1.2rem,2.6vw,1.7rem)] leading-snug text-ink/75">
              {project.tagline}
            </p>

            <div className="mt-10 grid gap-8 border-y border-dashed border-ink/20 py-6 sm:grid-cols-3">
              <div>
                <p className="folio-eyebrow text-ink/40">Role</p>
                <p className="mt-2 text-[13px] text-ink/75">{project.role}</p>
              </div>
              <div>
                <p className="folio-eyebrow text-ink/40">Year</p>
                <p className="mt-2 text-[13px] text-ink/75">{project.year}</p>
              </div>
              <div>
                <p className="folio-eyebrow text-ink/40">Stack</p>
                <p className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-ink/20 px-2 py-0.5 font-code text-[9px] tracking-wide text-ink/60"
                    >
                      {tech}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-10 sm:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-5">
                {project.story.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? "text-[16px] leading-relaxed text-ink/80 first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-serif first-letter:text-[52px] first-letter:leading-[0.75] first-letter:uppercase"
                        : "text-[14px] leading-relaxed text-ink/65"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <aside className="space-y-6">
                <div>
                  <p className="folio-eyebrow text-ink/40">What I built</p>
                  <ul className="mt-3 space-y-2">
                    {project.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex gap-2 text-[12px] leading-snug text-ink/65"
                      >
                        <span className="text-ink/35">—</span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-code text-[10px] tracking-[0.14em] text-ink uppercase"
                  >
                    Visit {project.name}
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                )}
              </aside>
            </div>

            {next && (
              <button
                type="button"
                onClick={() => onSelect(next.slug)}
                className="group mt-16 flex w-full items-end justify-between border-t border-dashed border-ink/20 pt-6 text-left"
              >
                <span>
                  <span className="folio-eyebrow block text-ink/40">Next project</span>
                  <span className="folio-display mt-2 block text-[clamp(2rem,6vw,3.5rem)] leading-none">
                    {next.name}
                  </span>
                </span>
                <span className="folio-italic text-[15px] text-ink/50 transition-transform duration-300 group-hover:translate-x-1">
                  view →
                </span>
              </button>
            )}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

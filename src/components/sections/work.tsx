"use client";

import {
  motion,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CaseStudy } from "@/components/work/case-study";
import { ProjectBadge, ProjectMockup } from "@/components/work/project-art";
import { type Project,PROJECTS } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [fanned, setFanned] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "center 0.35"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setFanned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail;
      if (PROJECTS.some((project) => project.slug === slug)) setActiveSlug(slug);
    };
    window.addEventListener("folio:open-project", onOpen);
    return () => window.removeEventListener("folio:open-project", onOpen);
  }, []);

  const activeProject = PROJECTS.find((project) => project.slug === activeSlug) ?? null;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative scroll-mt-24 pb-20 sm:pb-28"
      aria-label="Selected work"
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="folio-hairline flex items-center justify-between pt-5 font-code text-[9px] tracking-[0.2em] text-ink/40 uppercase sm:text-[10px]">
          <span>(01) Selected work</span>
          <span>2024 — 2026</span>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="folio-display text-[clamp(3.2rem,10vw,7.6rem)]"
          >
            Work
          </motion.h2>
          <div className="flex items-end justify-between gap-8 md:flex-col md:items-end md:gap-2">
            <p className="folio-italic max-w-[280px] text-[clamp(1.15rem,3vw,1.5rem)] leading-snug text-ink/65 md:text-right">
              Five products, built end to end — mostly alone.
            </p>
            <p className="hidden font-code text-[9px] tracking-[0.16em] text-ink/35 uppercase md:block">
              Hover to lift · click to read
            </p>
          </div>
        </div>

        <div
          data-cursor-zone
          className="folio-cursor-active relative mt-10 flex flex-col gap-5 md:mt-2 md:block md:h-[560px]"
        >
          {PROJECTS.map((project, index) => (
            <DeckCard
              key={project.slug}
              project={project}
              index={index}
              center={(PROJECTS.length - 1) / 2}
              progress={progress}
              fanned={fanned}
              onOpen={() => setActiveSlug(project.slug)}
              dimmed={activeSlug !== null}
            />
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden justify-between px-1 font-code text-[9px] tracking-[0.16em] text-ink/30 uppercase md:flex">
            <span>N° 01 — 0{PROJECTS.length}</span>
            <span>Scroll to unfurl ↓</span>
          </div>
        </div>

        <p className="mt-6 font-code text-[9px] tracking-[0.16em] text-ink/35 uppercase md:hidden">
          Tap a card to read the case study
        </p>
      </div>

      <CaseStudy
        project={activeProject}
        onClose={() => setActiveSlug(null)}
        onSelect={(slug) => setActiveSlug(slug)}
      />
    </section>
  );
}

type DeckCardProps = {
  project: Project;
  index: number;
  center: number;
  progress: MotionValue<number>;
  fanned: boolean;
  dimmed: boolean;
  onOpen: () => void;
};

function DeckCard({
  project,
  index,
  center,
  progress,
  fanned,
  dimmed,
  onOpen,
}: DeckCardProps) {
  const [hovered, setHovered] = useState(false);
  const offset = index - center;
  const fanAngle = offset * 4;
  const spread = fanned ? 104 : 0;

  const x = useTransform(progress, [0, 1], [offset * spread * 0.55, offset * spread]);
  const y = useTransform(progress, [0, 1], [90 + Math.abs(offset) * 10, 0]);
  const opacity = useTransform(progress, [0, 0.55], [0, 1]);

  return (
    <motion.div
      style={{
        x: fanned ? x : 0,
        y: fanned ? y : 0,
        opacity,
        zIndex: hovered ? 40 : 10 + index,
      }}
      className={cn(
        "relative mx-auto w-full max-w-[400px] md:absolute md:top-1/2 md:left-1/2 md:mx-0 md:w-[360px] md:-translate-x-1/2 md:-translate-y-1/2",
        dimmed && "pointer-events-none"
      )}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        animate={{
          rotate: fanned && !hovered ? fanAngle : 0,
          y: hovered && fanned ? -18 : 0,
          scale: hovered ? 1.04 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.6 }}
        aria-label={`Open ${project.name} case study`}
        className={cn(
          "folio-card folio-grain group relative flex h-[430px] w-full cursor-pointer flex-col overflow-hidden p-5 text-left sm:h-[500px]",
          "shadow-[var(--folio-shadow-card)] transition-shadow duration-500 hover:shadow-[var(--folio-shadow-lift)]"
        )}
      >
        <div className="relative z-[2] flex items-start justify-between gap-3">
          <div>
            <h3 className="font-grotesk text-[12px] font-semibold tracking-[0.14em] uppercase">
              {project.name}
            </h3>
            <p className="mt-1 font-code text-[8px] tracking-[0.14em] text-ink/40 uppercase">
              {project.company}
            </p>
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ProjectBadge kind={project.badge} />
          </span>
        </div>

        <div className="folio-mock-fade relative z-[2] mt-4 h-[190px] shrink-0 sm:h-[210px]">
          <ProjectMockup project={project} />
        </div>

        <div className="relative z-[2] mt-auto pt-4">
          <p className="flex items-center gap-2 font-code text-[8.5px] tracking-[0.12em] text-ink/45 uppercase">
            <span className="text-ink/70">{project.company}</span>
            <span className="size-0.5 rounded-full bg-ink/30" />
            {project.date}
          </p>

          <ul className="mt-3 space-y-1">
            {project.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex gap-2 text-[11.5px] leading-[1.5] text-ink/60"
              >
                <span className="text-ink/30">—</span>
                {capability}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-dashed border-ink/15 pt-3">
            <span className="font-code text-[8px] tracking-[0.16em] text-ink/35 uppercase">
              Case study
            </span>
            <span className="font-code text-[10px] text-ink/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-x-5 top-[72px] z-[1] h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent"
        />
      </motion.button>
    </motion.div>
  );
}

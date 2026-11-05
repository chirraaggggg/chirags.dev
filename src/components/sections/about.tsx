"use client";

import { motion } from "motion/react";

import { FOLIO } from "@/config/folio";

const rows = [
  { label: "Now", value: "Building Vuno & LaunchPad" },
  { label: "Based", value: FOLIO.location },
  { label: "Focus", value: "AI products, design engineering" },
  { label: "Open to", value: "Small, sharp collaborations" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 pb-20 sm:pb-28"
      aria-label="About"
    >
      <div className="folio-hairline mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 pt-5 font-code text-[9px] tracking-[0.2em] text-ink/40 uppercase sm:px-8 sm:text-[10px]">
        <span>(03) About</span>
        <span>{FOLIO.location}</span>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-[1180px] gap-8 px-5 sm:mt-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="folio-display text-[clamp(3rem,9vw,6.4rem)]"
          >
            About
          </motion.h2>
          <p className="folio-italic mt-5 max-w-[560px] text-[clamp(1.35rem,3.4vw,2.1rem)] leading-[1.25] text-ink/85">
            {FOLIO.about.statement}
          </p>

          <div className="mt-7 max-w-[540px] space-y-4">
            {FOLIO.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-[13.5px] leading-relaxed text-ink/60">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-7 flex max-w-[540px] flex-wrap gap-1.5">
            {FOLIO.about.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-dashed border-ink/30 px-2.5 py-1 font-code text-[9px] tracking-[0.06em] text-ink/55 uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:pt-4">
          <div className="folio-card folio-grain relative overflow-hidden p-6">
            <div className="relative z-[2] flex items-center justify-between border-b border-dashed border-ink/20 pb-3">
              <span className="folio-eyebrow text-ink/45">Current state</span>
              <span className="flex items-center gap-1.5 font-code text-[9px] tracking-[0.12em] text-ink/55 uppercase">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-ink" />
                </span>
                Available
              </span>
            </div>

            <dl className="relative z-[2]">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-dashed border-ink/15 py-3 last:border-0"
                >
                  <dt className="font-code text-[9px] tracking-[0.14em] text-ink/35 uppercase">
                    {row.label}
                  </dt>
                  <dd className="text-right text-[12.5px] text-ink/70">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="relative z-[2] mt-4 flex items-center justify-between rounded-[12px] bg-paper-sunken px-3 py-2.5">
              <span className="folio-italic text-[15px] text-ink/60">
                Last shipped: Vuno 1.4
              </span>
              <span className="font-code text-[9px] text-ink/40">↗</span>
            </div>
          </div>

          <p className="mt-4 text-center font-code text-[8.5px] tracking-[0.18em] text-ink/25 uppercase">
            Fig. 02 — the operating system
          </p>
        </div>
      </div>
    </section>
  );
}

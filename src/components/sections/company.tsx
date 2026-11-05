"use client";

import { motion } from "motion/react";

import { HangingCard } from "@/components/ui/folio/hanging-card";
import { COLLABORATORS } from "@/data/collaborators";

export function Company() {
  return (
    <section
      id="company"
      className="relative scroll-mt-24 pb-20 sm:pb-28"
      aria-label="In good company"
    >
      <div className="folio-hairline mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 pt-5 font-code text-[9px] tracking-[0.2em] text-ink/40 uppercase sm:px-8 sm:text-[10px]">
        <span>(04) In good company</span>
        <span>{COLLABORATORS.length} people on call</span>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[1180px] px-5 sm:mt-10 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="folio-display text-[clamp(3rem,9vw,6.4rem)]"
          >
            Company
          </motion.h2>
          <p className="folio-italic max-w-[330px] text-[clamp(1.1rem,2.6vw,1.5rem)] leading-snug text-ink/60 md:text-right">
            Solo by default, never by accident. The people I call when a product
            needs a second brain.
          </p>
        </div>

        <div className="relative mt-12 sm:mt-16">
          {/* The rod the cards hang from. */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-ink/25" />

          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {COLLABORATORS.map((person, index) => (
              <HangingCard key={person.slug} person={person} index={index} />
            ))}
          </div>

          <p className="mt-2 flex flex-wrap items-center gap-3 font-code text-[8.5px] tracking-[0.18em] text-ink/30 uppercase">
            <span className="h-px w-8 bg-ink/20" />
            Hover to swing a wire · flip a card for the story
          </p>
        </div>
      </div>
    </section>
  );
}

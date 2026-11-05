"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { Magnetic } from "@/components/ui/folio/magnetic";
import { Pond } from "@/components/ui/folio/pond";
import { Typewriter } from "@/components/ui/folio/typewriter";
import { FOLIO } from "@/config/folio";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-12"
    >
      {/* faint paper wash behind the pond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_45%,color-mix(in_oklab,var(--folio-ink)_6%,transparent),transparent_72%)]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-[1180px] flex-col px-5 sm:px-8"
      >
        <motion.div
          variants={item}
          className="flex items-center justify-between gap-4 border-b border-dashed border-ink/15 pb-3 font-code text-[9px] tracking-[0.2em] text-ink/45 uppercase sm:text-[10px]"
        >
          <span className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-ink" />
            Portfolio / 2026
          </span>
          <span className="hidden sm:inline">Full-stack + AI · solo</span>
          <span>{FOLIO.location}</span>
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-7 lg:mt-14 lg:flex-row lg:justify-center lg:gap-12">
          <motion.h1
            variants={item}
            className="folio-display order-1 shrink-0 text-center text-[clamp(1.9rem,3.2vw,2.75rem)] leading-none whitespace-nowrap"
          >
            {FOLIO.firstName} <span className="text-ink/35">is</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="order-2 w-full max-w-[360px] lg:max-w-[430px]"
          >
            <Pond className="w-full" />
          </motion.div>

          <motion.div
            variants={item}
            className="folio-italic order-3 shrink-0 text-center text-[clamp(1.7rem,3vw,2.6rem)] leading-none lg:text-left"
          >
            <Typewriter words={[...FOLIO.typewriter]} />
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-4 sm:mt-14"
        >
          <p className="max-w-[540px] text-center text-[14px] leading-relaxed text-pretty text-ink/60 sm:text-[15px]">
            <span className="folio-italic text-[17px] text-ink">
              Solo founder, full-stack + AI.
            </span>{" "}
            {FOLIO.bio}
          </p>

          <Magnetic>
            <Link
              href={FOLIO.currentProject.href}
              target="_blank"
              rel="noreferrer"
              className="folio-dashed-pill group inline-flex items-center gap-2 bg-paper/60 px-4 py-2 font-code text-[10px] tracking-[0.08em] text-ink uppercase transition-colors hover:bg-ink hover:text-paper"
            >
              <span className="text-ink/45 transition-colors group-hover:text-paper/60">
                Recently:
              </span>
              building {FOLIO.currentProject.name}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mx-auto mt-12 flex w-full max-w-[1180px] items-center justify-between px-5 font-code text-[9px] tracking-[0.2em] text-ink/35 uppercase sm:px-8"
      >
        <span>Scroll to unfurl</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-8 bg-ink/25" />
          Work · Company · Contact
        </span>
      </motion.div>
    </section>
  );
}

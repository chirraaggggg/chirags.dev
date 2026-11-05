"use client";

import { motion } from "motion/react";

import {
  ACTIVITIES,
  type Activity,
  formatActivityDate,
} from "@/data/activities";

const KIND_GLYPH: Record<Activity["kind"], string> = {
  doc: "¶",
  code: "</>",
  event: "◷",
  flag: "⚑",
};

export function Activities() {
  return (
    <section
      id="activities"
      className="relative scroll-mt-24 pb-20 sm:pb-28"
      aria-label="Recent activities"
    >
      <div className="folio-hairline mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 pt-5 font-code text-[9px] tracking-[0.2em] text-ink/40 uppercase sm:px-8 sm:text-[10px]">
        <span>(02) Recent activities</span>
        <span>{ACTIVITIES.length} entries</span>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-[1180px] gap-10 px-5 sm:mt-10 sm:px-8 lg:grid-cols-[0.9fr_1.6fr] lg:gap-14">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="folio-display text-[clamp(2.6rem,8vw,4.8rem)]"
          >
            Recent
            <br />
            activities
          </motion.h2>
          <p className="folio-italic mt-4 max-w-[260px] text-[16px] leading-relaxed text-ink/55">
            Talks, launches, judging and the occasional open-source detour.
          </p>
          <div className="mt-6 hidden items-center gap-2 font-code text-[9px] tracking-[0.16em] text-ink/30 uppercase lg:flex">
            <span className="h-px w-10 bg-ink/20" />
            Reverse chronological
          </div>
        </div>

        <ol className="border-t border-dashed border-ink/20">
          {ACTIVITIES.map((activity, index) => (
            <motion.li
              key={activity.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ActivityRow activity={activity} />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  const Tag = activity.href ? "a" : "div";

  return (
    <Tag
      {...(activity.href
        ? { href: activity.href, target: "_blank", rel: "noreferrer" }
        : {})}
      className="group flex flex-col gap-2 border-b border-dashed border-ink/20 py-4 transition-transform duration-300 hover:translate-x-1 sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/20 font-code text-[9px] text-ink/50 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
        {KIND_GLYPH[activity.kind]}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[13.5px] leading-snug text-ink/85 transition-colors group-hover:text-ink">
            {activity.title}
          </h3>
          <span className="rounded-full border border-ink/25 px-1.5 py-px font-code text-[8px] tracking-[0.1em] text-ink/50 uppercase">
            {activity.role}
          </span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {activity.tags.map((tag) => (
            <span
              key={tag}
              className="font-code text-[8px] tracking-[0.1em] text-ink/35 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <time
          dateTime={activity.date}
          className="font-code text-[9px] tracking-[0.12em] text-ink/40 uppercase"
        >
          {formatActivityDate(activity.date)}
        </time>
        <span className="flex size-6 items-center justify-center rounded-full border border-ink/15 font-code text-[9px] text-ink/40 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
          ↗
        </span>
      </div>
    </Tag>
  );
}

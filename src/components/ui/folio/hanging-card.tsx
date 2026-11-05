"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useState } from "react";

import type { Collaborator } from "@/data/collaborators";
import { cn } from "@/lib/utils";

const HOVER_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * A profile card suspended from a wire. The column sways on its own, the card
 * tilts toward the cursor with a holographic sheen, and clicking flips it over
 * to reveal the story and what we shipped together.
 */
export function HangingCard({
  person,
  index,
}: {
  person: Collaborator;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  const swing = useSpring(0, { stiffness: 55, damping: 8, mass: 0.9 });
  const tiltX = useSpring(0, { stiffness: 170, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 170, damping: 18 });

  // The reflection drifts opposite the tilt, like light on a glossy print.
  const sheenX = useTransform(tiltY, [-10, 10], [-26, 26]);
  const sheenY = useTransform(tiltX, [-10, 10], [22, -22]);

  const reset = () => {
    swing.set(0);
    tiltX.set(0);
    tiltY.set(0);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia(HOVER_QUERY).matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    swing.set(px * 10);
    tiltX.set(py * -12);
    tiltY.set(px * 16);
  };

  return (
    <div
      className="folio-hang-sway flex w-[216px] shrink-0 snap-center flex-col items-center sm:w-full"
      style={{ animationDelay: `${index * -1.6}s` }}
    >
      <div className="flex w-full flex-col items-center [perspective:1100px]">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full border border-ink/40 bg-paper"
        />
        <span
          aria-hidden="true"
          className="w-px bg-ink/25"
          style={{ height: person.wire }}
        />

        <motion.div
          onPointerMove={onPointerMove}
          onPointerLeave={reset}
          style={{
            rotate: swing,
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full origin-top"
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 170, damping: 22, mass: 0.7 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-[340px] w-full"
          >
            <div
              inert={flipped}
              className={cn(
                "absolute inset-0 [backface-visibility:hidden]",
                flipped && "pointer-events-none"
              )}
            >
              <button
                type="button"
                onClick={() => setFlipped(true)}
                aria-label={`Read about ${person.name}`}
                className="folio-card folio-grain group relative flex h-full w-full flex-col overflow-hidden p-3.5 text-left transition-shadow duration-500 hover:shadow-[var(--folio-shadow-lift)]"
              >
                <motion.span
                  aria-hidden="true"
                  style={{ x: sheenX, y: sheenY }}
                  className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(48%_46%_at_50%_42%,color-mix(in_oklab,var(--folio-ink)_16%,transparent),transparent_70%)]"
                />

                <div className="relative z-[2] flex items-center justify-between font-code text-[8px] tracking-[0.16em] text-ink/40 uppercase">
                  <span>
                    {String(index + 1).padStart(2, "0")} / bench
                  </span>
                  <span>{person.since}</span>
                </div>

                <div className="relative z-[2] mt-3 flex h-[94px] items-center justify-center overflow-hidden rounded-[10px] border border-dashed border-ink/25 bg-paper-sunken">
                  <span
                    aria-hidden="true"
                    className="folio-scanlines absolute inset-0 opacity-50"
                  />
                  <span className="folio-display relative text-[2.5rem] leading-none text-ink/30">
                    {person.initials}
                  </span>
                  <span className="absolute right-2 bottom-1.5 font-code text-[7px] tracking-[0.16em] text-ink/25 uppercase">
                    fig.
                  </span>
                </div>

                <h3 className="relative z-[2] mt-3 font-grotesk text-[11.5px] font-semibold tracking-[0.12em] uppercase">
                  {person.name}
                </h3>
                <p className="relative z-[2] mt-1 font-code text-[8px] tracking-[0.12em] text-ink/45 uppercase">
                  {person.role}
                </p>
                <p className="relative z-[2] mt-0.5 font-code text-[8px] tracking-[0.1em] text-ink/30 uppercase">
                  {person.location}
                </p>

                <div className="relative z-[2] mt-auto flex items-center justify-between border-t border-dashed border-ink/20 pt-2.5 font-code text-[8px] tracking-[0.14em] text-ink/35 uppercase">
                  <span>Flip for the story</span>
                  <span className="text-[10px] text-ink/50 transition-transform duration-500 group-hover:rotate-180">
                    ↻
                  </span>
                </div>
              </button>
            </div>

            <div
              inert={!flipped}
              className={cn(
                "absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]",
                !flipped && "pointer-events-none"
              )}
            >
              <div className="folio-card folio-grain relative flex h-full w-full flex-col overflow-hidden bg-paper-sunken p-3.5 text-left">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-code text-[8px] tracking-[0.16em] text-ink/40 uppercase">
                    {person.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFlipped(false)}
                    aria-label={`Show ${person.name}'s card`}
                    className="flex size-5 shrink-0 items-center justify-center rounded-full border border-ink/25 font-code text-[9px] text-ink/50 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    ✕
                  </button>
                </div>

                <p className="folio-italic mt-2 text-[13.5px] leading-[1.45] text-ink/75">
                  {person.bio}
                </p>

                <div className="mt-auto pt-3">
                  <p className="font-code text-[7.5px] tracking-[0.18em] text-ink/30 uppercase">
                    Shipped with
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {person.projects.map((project) => (
                      <li key={project.label}>
                        {project.href ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-ink/60 transition-colors hover:text-ink"
                          >
                            <span className="folio-link">{project.label}</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-ink/45">
                            {project.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-2 border-t border-dashed border-ink/20 pt-2 font-code text-[7.5px] tracking-[0.14em] text-ink/30 uppercase">
                    {person.role} · since {person.since}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

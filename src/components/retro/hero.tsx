import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react";

import { RETRO } from "@/config/retro";
import { USER } from "@/features/portfolio/data/user";
import { cn } from "@/lib/utils";
import { decodeEmail } from "@/utils/string";

const LIVE_ON_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/chirraaggggg",
    Icon: GithubIcon,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/chiragiscoding",
    Icon: TwitterIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chirags920/",
    Icon: LinkedinIcon,
  },
  { label: "Email", href: `mailto:${decodeEmail(USER.email)}`, Icon: MailIcon },
];

function StickyNote({
  label,
  color,
  className,
  delay,
}: {
  label: string;
  color: string;
  className?: string;
  /** Animation delay before the note pops in (ms). */
  delay?: number;
}) {
  return (
    <span
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        "inline-block animate-pop-in-tag rounded-sm border-2 border-black px-3 py-2 font-sans text-[11px] font-extrabold tracking-wide text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.9)] select-none sm:text-xs",
        color,
        className,
      )}
    >
      {label}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 px-4 pt-32 pb-16 sm:px-6"
    >
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Handwritten intro */}
        <p className="font-hand text-3xl font-semibold text-black/80 sm:text-4xl">
          {RETRO.hero.script}
        </p>

        {/* Display name — pixel/blocky Press Start 2P, like the reference site */}
        <div className="relative z-10 mt-3 inline-block">
          {/* Sticky note badges hugging the name (top-left / top-right / bottom-left) */}
          <StickyNote
            label={RETRO.hero.badgeBlue}
            color="bg-[#4b7bec]"
            delay={200}
            className="absolute -top-7 -left-3 -rotate-6 sm:-top-12 sm:-left-16"
          />
          <StickyNote
            label={RETRO.hero.badgeRed}
            color="bg-[#ff5f57]"
            delay={500}
            className="absolute -top-3 -right-2 rotate-[12deg] sm:-top-5 sm:-right-32"
          />
          <StickyNote
            label={RETRO.hero.badgeYellow}
            color="bg-[#febc2e] text-black"
            delay={800}
            className="absolute -bottom-9 -left-2 rotate-5 sm:-bottom-12 sm:-left-9"
          />

          <h1 className="font-pixel text-[clamp(2.5rem,10vw,4.5rem)] leading-[1.1] font-bold tracking-[-3px] text-[#111] [text-shadow:6px_6px_#e0e0e0]">
            {RETRO.hero.firstName}
          </h1>
        </div>

        {/* Tagline */}
        <p className="mt-8 max-w-2xl font-sans text-[17px] leading-[1.7] font-medium text-black/70">
          {RETRO.hero.tagline}
        </p>

        {/* LIVE ON */}
        <div className="mt-8 flex items-center gap-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-green-600" />
          </span>
          <span className="font-terminal text-xs font-bold tracking-[0.2em] text-black/70">
            {RETRO.hero.liveOn}
          </span>
          <span aria-hidden className="h-px w-6 bg-black/30" />
          <div className="flex items-center gap-2">
            {LIVE_ON_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noreferrer noopener" : undefined
                }
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-[0_3px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgba(0,0,0,0.9)] active:translate-y-0.5 active:shadow-none"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={RETRO.hero.talkTo.href}
            className="rounded-lg border-2 border-black bg-black px-6 py-3 font-sans text-sm font-extrabold tracking-wide text-white shadow-[4px_4px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow,background-color] duration-150 hover:-translate-y-0.5 hover:bg-black/85 hover:shadow-[5px_5px_0_0_rgba(0,0,0,0.9)] active:translate-y-1 active:shadow-none"
          >
            {RETRO.hero.talkTo.label}
          </a>
          <a
            href={RETRO.hero.resources.href}
            className="rounded-lg border-2 border-black bg-[#28c840] px-6 py-3 font-sans text-sm font-extrabold tracking-wide text-black shadow-[4px_4px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[#2fdc49] hover:shadow-[5px_5px_0_0_rgba(0,0,0,0.9)] active:translate-y-1 active:shadow-none"
          >
            {RETRO.hero.resources.label}
          </a>
        </div>
      </div>
    </section>
  );
}

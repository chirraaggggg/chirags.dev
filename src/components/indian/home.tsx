import Link from "next/link";

import { DoorwayArt } from "@/components/indian/doorway";
import { Reveal } from "@/components/indian/reveal";
import { FOLIO } from "@/config/folio";
import { PROJECTS } from "@/data/projects";

const CHANNELS = [
  { label: "Email", href: `mailto:${FOLIO.email}` },
  { label: "LinkedIn", href: FOLIO.linkedinUrl },
  { label: "X (Twitter)", href: FOLIO.xUrl },
  { label: "GitHub", href: FOLIO.githubUrl },
] as const;

const DOORS = [
  {
    label: "Selected work",
    meta: `${PROJECTS.length} projects`,
    href: "/work",
    variant: "work",
  },
  {
    label: "Experience",
    meta: "2025 — now",
    href: "/experience",
    variant: "experience",
  },
  {
    label: "About me",
    meta: "Design + code",
    href: "/about",
    variant: "about",
  },
  {
    label: "Notes",
    meta: "Occasional",
    href: "/blog",
    variant: "notes",
  },
] as const;

export function Home() {
  return (
    <div className="deshi-landing">
      <Reveal>
        <p className="deshi-namaste" aria-hidden="true">
          नमस्ते
        </p>
        <h1 className="deshi-hi">
          I&rsquo;m Chirag{" "}
          <span className="deshi-wave" aria-hidden="true">
            🙏
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="deshi-intro">
          <p>
            A solo founder and design engineer in Gurugram, India. I build
            small, sharp products end to end — the interface, the agent
            runtime, the pricing page, the support inbox at 1am.
          </p>
          <p>
            Currently building{" "}
            <a href={FOLIO.currentProject.href} target="_blank" rel="noreferrer">
              {FOLIO.currentProject.name}
            </a>
            , an AI web design agent, and LaunchPad, a weekly board for people
            shipping SaaS alone. Computer science at VIT.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="deshi-reach">
          The inbox is open — or find me on the usual channels.
        </p>
        <ul className="deshi-channels">
          {CHANNELS.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
              >
                {channel.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.2}>
        <nav className="deshi-doors" aria-label="Sections of this site">
          {DOORS.map((door, index) => (
            <Link
              key={door.label}
              className="deshi-door"
              href={door.href}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="deshi-door-art">
                <DoorwayArt variant={door.variant} className="deshi-door-svg" />
              </span>
              <span className="deshi-door-label">{door.label}</span>
              <span className="deshi-door-meta">{door.meta}</span>
            </Link>
          ))}
        </nav>
      </Reveal>
    </div>
  );
}

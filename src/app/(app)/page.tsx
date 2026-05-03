import Link from "next/link";
import type { ReactNode } from "react";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import {
  ABOUT_PARAGRAPHS,
  EXPERIENCE_ITEMS,
  HEADER_COPY,
  PORTFOLIO_COPY,
  PROJECT_ITEMS,
  SITE_INFO,
  SOCIAL_LINKS,
  STACK_ITEMS,
  UTILITY_LINKS,
  type UtilityLink,
} from "@/config/site";
import { GithubHeatmap } from "@/features/github/GithubHeatmap";
import type { SocialLink } from "@/types/portfolio";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <main className="mx-auto w-full max-w-[640px] px-6 pb-24 pt-20 text-left lg:px-0">
        <Section>
          <header className="pb-6">
            <p className="text-[0.7rem] uppercase tracking-[0.14em] text-(--text-muted)">
              {PORTFOLIO_COPY.sections.headerKicker}
            </p>

            <h1
              className="mt-6 italic leading-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.8rem, 6vw, 4rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--heading)",
              }}
            >
              {HEADER_COPY.name}
            </h1>

            <p className="mt-6 text-[0.8rem] text-(--text-muted)">
              {[HEADER_COPY.role, HEADER_COPY.location].join(" · ")}
            </p>
            <p className="mt-2 text-[0.8rem] text-(--text-muted)">
              {HEADER_COPY.status}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.8rem]">
              {[...SOCIAL_LINKS, ...UTILITY_LINKS].map((link) => (
                <SocialLinkItem key={link.href} link={link} />
              ))}
            </div>
          </header>
        </Section>

        <Section title={PORTFOLIO_COPY.sections.about}>
          <div className="max-w-[580px] space-y-4 text-[0.875rem] leading-[1.85] text-(--text)">
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>

        <Section title={PORTFOLIO_COPY.sections.experience}>
          <div className="space-y-7 text-[0.875rem] leading-6">
            {EXPERIENCE_ITEMS.map((experience) => (
              <div
                key={`${experience.period}-${experience.role}-${experience.company}`}
                className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-8"
              >
                <p className="pt-0.5 text-[0.7rem] uppercase tracking-[0.1em] text-(--text-muted)">
                  {experience.period}
                </p>
                <p className="text-(--text)">
                  {experience.role} · {experience.company}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={PORTFOLIO_COPY.sections.projects}>
          <div className="space-y-7 text-[0.875rem] leading-6">
            {PROJECT_ITEMS.map((project) => (
              <div
                key={project.name}
                className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-8"
              >
                <p className="pt-0.5 text-[0.7rem] uppercase tracking-[0.1em] text-(--text-muted)">
                  {project.tags.join(" · ")}
                </p>
                <div>
                  <Link
                    href={project.href}
                    target={project.href.startsWith("/") ? undefined : "_blank"}
                    rel={project.href.startsWith("/") ? undefined : "noreferrer"}
                    className="text-(--text) underline underline-offset-[3px] transition-opacity hover:opacity-70"
                  >
                    {project.name}
                  </Link>
                  <p className="mt-1 text-[0.82rem] leading-[1.6] text-(--text-muted)">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title={PORTFOLIO_COPY.sections.stack}>
          <p className="text-[0.875rem] leading-7 text-(--text-muted)">
            {STACK_ITEMS.join(", ")}
          </p>
        </Section>

        <Section title={PORTFOLIO_COPY.sections.github}>
          <GithubHeatmap />
        </Section>
      </main>
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date("2023-10-20").toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: HEADER_COPY.name,
      identifier: "chiragsharma",
      image: SITE_INFO.ogImage,
    },
  };
}

function Section({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <section className="border-b border-(--border)/50 pb-8 pt-8 first:pt-0 last:border-b-0">
      {title ? (
        <h2 className="mb-8 text-[0.7rem] uppercase tracking-[0.14em] text-(--text-muted)">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

function SocialLinkItem({
  link,
}: {
  link: SocialLink | UtilityLink;
}) {
  const icon = getLinkIcon(link.icon);
  const shouldOpenInNewTab = link.href.startsWith("http") || link.icon === "resume";

  return (
    <Link
      href={link.href}
      target={shouldOpenInNewTab ? "_blank" : undefined}
      rel={shouldOpenInNewTab ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-2 text-(--text-muted) hover:text-(--text)"
      aria-label={link.label}
    >
      {icon}
      <span className="underline-offset-4 transition-colors group-hover:underline">
        {link.label}
      </span>
    </Link>
  );
}

function getLinkIcon(icon: SocialLink["icon"] | UtilityLink["icon"]) {
  const className = "size-4 shrink-0";

  switch (icon) {
    case "github":
      return (
        <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
          <path d="M8 .5a7.5 7.5 0 0 0-2.37 14.61c.37.07.5-.16.5-.35v-1.23c-2.04.45-2.47-.87-2.47-.87-.33-.84-.8-1.06-.8-1.06-.66-.45.05-.44.05-.44.73.05 1.12.75 1.12.75.65 1.11 1.72.79 2.14.6.07-.48.26-.8.47-.99-1.63-.18-3.34-.82-3.34-3.65 0-.81.29-1.48.75-2-.08-.19-.33-.95.07-1.98 0 0 .61-.19 2 .75a6.9 6.9 0 0 1 3.64 0c1.39-.94 2-.75 2-.75.4 1.03.15 1.79.07 1.98.46.52.75 1.19.75 2 0 2.84-1.72 3.47-3.36 3.65.27.23.52.69.52 1.4v2.06c0 .19.13.42.5.35A7.5 7.5 0 0 0 8 .5Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
          <path d="M12.6 1.5h2.45l-5.35 6.12 6.3 8.38H11l-3.87-5.08-4.44 5.08H.24l5.73-6.55L0 1.5h5.12l3.49 4.63 4-4.63Zm-.86 13.02h1.36L4.38 2.9H2.92l8.82 11.62Z" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
          <path d="M2.5 3.5h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
          <path d="m2.75 4.25 5.25 4.25 5.25-4.25" />
        </svg>
      );
    case "resume":
      return (
        <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
          <path d="M5 2.5h4.25L12.5 5.75V13.5H5Z" />
          <path d="M9.25 2.5v3.25H12.5" />
        </svg>
      );
    case "site":
      return (
        <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
          <path d="M2.75 8h10.5" />
          <path d="M8 2.75c2 1.53 3.25 3.5 3.25 5.25S10 11.72 8 13.25c-2-1.53-3.25-3.5-3.25-5.25S6 4.28 8 2.75Z" />
          <path d="M2.75 8c0-2.21 2.36-4 5.25-4s5.25 1.79 5.25 4-2.36 4-5.25 4-5.25-1.79-5.25-4Z" />
        </svg>
      );
  }

  return null;
}

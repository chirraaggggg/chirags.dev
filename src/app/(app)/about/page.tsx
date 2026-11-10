import type { Metadata } from "next";
import Link from "next/link";

import { ContactSection } from "@/components/indian/contact-section";
import { PageShell } from "@/components/indian/page-shell";
import { SectionHead } from "@/components/indian/section-head";
import { FOLIO } from "@/config/folio";
import { SITE_INFO } from "@/config/site";

export const metadata: Metadata = {
  title: "About · Chirag Sharma",
  description:
    "About Chirag Sharma — a solo founder and design engineer in Gurugram building products end to end.",
  alternates: { canonical: `${SITE_INFO.url}/about` },
};

export default function AboutPage() {
  return (
    <PageShell>
      <header className="deshi-work-hero">
        <Link className="deshi-back" href="/">
          <span aria-hidden="true">←</span> Home
        </Link>
        <h1>About</h1>
        <p>{FOLIO.about.statement}</p>
      </header>

      <section className="deshi-about" aria-label="A short introduction">
        <div className="deshi-about-copy">
          {FOLIO.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <dl className="deshi-facts">
            <div>
              <dt>Base</dt>
              <dd>{FOLIO.location}</dd>
            </div>
            <div>
              <dt>Now</dt>
              <dd>Founding {FOLIO.currentProject.name}</dd>
            </div>
            <div>
              <dt>Study</dt>
              <dd>Computer science, VIT</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="deshi-section" aria-labelledby="about-stack">
        <SectionHead
          id="about-stack"
          index="01"
          title="Tools I reach for"
          note="Day to day"
        />
        <ul className="deshi-stack">
          {FOLIO.about.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </section>

      <ContactSection index="02" />
    </PageShell>
  );
}

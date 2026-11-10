import type { Metadata } from "next";
import Link from "next/link";

import { CareerSection } from "@/components/indian/career-section";
import { ContactSection } from "@/components/indian/contact-section";
import { PageShell } from "@/components/indian/page-shell";
import { SITE_INFO } from "@/config/site";

export const metadata: Metadata = {
  title: "Experience · Chirag Sharma",
  description:
    "Where Chirag Sharma has worked — Vuno, LaunchPad, freelance product work and an internship at Ethnus.",
  alternates: { canonical: `${SITE_INFO.url}/experience` },
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <header className="deshi-work-hero">
        <Link className="deshi-back" href="/">
          <span aria-hidden="true">←</span> Home
        </Link>
        <h1>Experience</h1>
        <p>
          The short list: two products of my own, a stretch of freelance work,
          and one internship that taught me how software ships with a team.
        </p>
      </header>

      <CareerSection />
      <ContactSection index="02" />
    </PageShell>
  );
}

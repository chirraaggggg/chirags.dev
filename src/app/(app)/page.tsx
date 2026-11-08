import type { Metadata } from "next";

import { CareerSection } from "@/components/indian/career-section";
import { ContactSection } from "@/components/indian/contact-section";
import { Hero } from "@/components/indian/hero";
import { PageShell } from "@/components/indian/page-shell";
import { ProjectsSection } from "@/components/indian/projects-section";
import { TempleScene } from "@/components/indian/temple-scene";
import { SITE_INFO } from "@/config/site";

export const metadata: Metadata = {
  title: "Chirag Sharma — Solo founder, design engineer",
  description:
    "Portfolio of Chirag Sharma, a solo founder and design engineer in Gurugram, India — building products end to end.",
  alternates: { canonical: SITE_INFO.url },
  openGraph: {
    title: "Chirag Sharma — Solo founder, design engineer",
    description:
      "A solo founder and design engineer from India building thoughtful products end to end.",
    url: SITE_INFO.url,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <TempleScene />
      <ProjectsSection />
      <CareerSection />
      <ContactSection />
    </PageShell>
  );
}

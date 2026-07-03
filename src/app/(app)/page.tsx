import type { WithContext, ProfilePage as PageSchema } from "schema-dts";

import {
  ABOUT_PARAGRAPHS,
  EXPERIENCE_ITEMS,
  HEADER_COPY,
  PORTFOLIO_COPY,
  PROJECT_ITEMS,
  SITE_INFO,
} from "@/config/site";
import { Header } from "@/components/portfolio/header";
import { AboutSection } from "@/components/portfolio/about-section";
import { TimelineSection } from "@/components/portfolio/timeline-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";


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

const timelineItems = EXPERIENCE_ITEMS.map((exp) => ({
  role: exp.role,
  company: exp.company,
  period: exp.period,
  description:
    exp.type === "intern"
      ? "Developed and maintained full-stack web applications using React, Node.js, and MongoDB. Gained hands-on experience across the entire tech stack in an agile environment."
      : "Building custom web applications for clients across various industries. Providing end-to-end development from concept to deployment with modern JavaScript technologies.",
}));

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <main className="mx-auto max-w-[640px] px-6 pb-32 pt-24 lg:px-0 xl:max-w-[700px]">
        <Header name={HEADER_COPY.name} />

        <div className="my-24 border-b border-white/10" />

        <AboutSection paragraphs={ABOUT_PARAGRAPHS} />

        <div className="my-24 border-b border-white/10" />

        <TimelineSection
          items={timelineItems}
          label={PORTFOLIO_COPY.sections.experience}
        />

        <div className="my-24 border-b border-white/10" />

        <ProjectsSection
          projects={PROJECT_ITEMS}
          label={PORTFOLIO_COPY.sections.projects}
        />
      </main>
    </>
  );
}

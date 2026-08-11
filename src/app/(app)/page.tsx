import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { AboutSkills } from "@/components/retro/about-skills";
import { BlueprintBackground } from "@/components/retro/blueprint-background";
import { Experience } from "@/components/retro/experience";
import { RetroFooter } from "@/components/retro/footer";
import { Hero } from "@/components/retro/hero";
import { RetroNav } from "@/components/retro/retro-nav";
import { SideQuests } from "@/components/retro/side-quests";
import { HEADER_COPY, SITE_INFO } from "@/config/site";

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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <BlueprintBackground />
      <RetroNav />

      <main className="relative">
        <Hero />

        <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 sm:px-6">
          <section id="about" className="scroll-mt-28">
            <AboutSkills />
          </section>

          <section id="experience" className="scroll-mt-28">
            <Experience />
          </section>

          <section id="side-quests" className="scroll-mt-28">
            <SideQuests />
          </section>
        </div>

        <RetroFooter />
      </main>
    </>
  );
}

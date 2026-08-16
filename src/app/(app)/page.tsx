import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { AboutSkills } from "@/components/retro/about-skills";
import { BlueprintBackground } from "@/components/retro/blueprint-background";
import { Experience } from "@/components/retro/experience";
import { RetroFooter } from "@/components/retro/footer";
import { Hero } from "@/components/retro/hero";
import { RetroNav } from "@/components/retro/retro-nav";
import { TerminalWindow } from "@/components/retro/window";
import { RETRO } from "@/config/retro";
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
    <div className="retro-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <BlueprintBackground />
      <RetroNav />

      <main>
        <Hero />

        <section id="about" className="about-section">
          <div>
            <div id="about-terminal">
              <TerminalWindow title={RETRO.windowTitle}>
                <AboutSkills />
                <Experience />
              </TerminalWindow>
            </div>
          </div>
        </section>
      </main>

      <RetroFooter />
    </div>
  );
}

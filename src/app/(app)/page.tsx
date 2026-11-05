import type { Metadata } from "next";

import { AboutPageContent } from "@/components/minimal/about-page";
import { SITE_INFO } from "@/config/site";

export const metadata: Metadata = {
  title: "About · Chirag Sharma",
  description:
    "About Chirag Sharma — a solo founder and full-stack engineer building AI products end to end.",
  alternates: { canonical: SITE_INFO.url },
  openGraph: {
    title: "About · Chirag Sharma",
    description:
      "Experience, tools and the way I approach design and engineering, from Chirag Sharma.",
    url: SITE_INFO.url,
    type: "profile",
  },
};

export default function HomePage() {
  return <AboutPageContent />;
}

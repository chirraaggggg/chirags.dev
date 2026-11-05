import type { Metadata } from "next";

import { WorkPageContent } from "@/components/minimal/work-page";
import { SITE_INFO } from "@/config/site";

export const metadata: Metadata = {
  title: "Work · Chirag Sharma",
  description:
    "Selected products, projects, skills and problem-solving approach from Chirag Sharma.",
  alternates: { canonical: `${SITE_INFO.url}/work` },
  openGraph: {
    title: "Work · Chirag Sharma",
    description: "Selected products, projects and experiments from Chirag Sharma.",
    url: `${SITE_INFO.url}/work`,
    type: "website",
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}

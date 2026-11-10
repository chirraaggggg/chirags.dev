import type { Metadata } from "next";

import { Home } from "@/components/indian/home";
import { PageShell } from "@/components/indian/page-shell";
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
      <Home />
    </PageShell>
  );
}

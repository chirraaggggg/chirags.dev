export type ActivityRole = "Speaker" | "Hosting" | "Contributor" | "Launch";

export type Activity = {
  slug: string;
  title: string;
  role: ActivityRole;
  tags: string[];
  /** ISO date used for the mono label and sorting. */
  date: string;
  href?: string;
  /** Small document glyph label: talk, code, event, launch. */
  kind: "doc" | "code" | "event" | "flag";
};

/** ✏️ Edit this list to update the Recent Activities table. */
export const ACTIVITIES: Activity[] = [
  {
    slug: "vuno-open-source",
    title: "Open-sourced the Vuno agent runtime",
    role: "Contributor",
    tags: ["TypeScript", "Open source", "AI"],
    date: "2026-09-18",
    href: "https://github.com/chirraaggggg",
    kind: "code",
  },
  {
    slug: "launchpad-week-one",
    title: "LaunchPad · week one shipped 41 products",
    role: "Launch",
    tags: ["SaaS", "Community"],
    date: "2026-06-02",
    href: "https://launchpad.dev",
    kind: "flag",
  },
  {
    slug: "foss-meetup",
    title: "Shipping an AI agent without a team",
    role: "Speaker",
    tags: ["Talk", "AI", "Shipping"],
    date: "2026-04-11",
    kind: "doc",
  },
  {
    slug: "ashoka-hackathon",
    title: "Judged 40 prototypes at Ashoka Hackathon",
    role: "Hosting",
    tags: ["Hackathon", "Judge"],
    date: "2026-02-21",
    kind: "event",
  },
  {
    slug: "vit-seminar",
    title: "Repo-readable codebases · VIT CSE seminar",
    role: "Speaker",
    tags: ["Talk", "Engineering"],
    date: "2025-11-08",
    kind: "doc",
  },
  {
    slug: "repotutor-release",
    title: "RepoTutor v1 · first public release",
    role: "Launch",
    tags: ["Product", "Dev tools"],
    date: "2025-10-14",
    href: "https://repotutor.app",
    kind: "flag",
  },
];

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

/** "2026-09-18" → "SEP 18, 2026" — formatted in UTC so SSR and client agree. */
export function formatActivityDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[(month ?? 1) - 1]} ${String(day).padStart(2, "0")}, ${year}`;
}

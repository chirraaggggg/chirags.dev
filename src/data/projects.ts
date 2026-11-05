export type ProjectMockup = "agent" | "ranking" | "repo" | "ledger" | "orbit";

export type Project = {
  /** Stable id — also used as the shared-element layoutId. */
  slug: string;
  /** Small-caps label in the card's top-left corner. */
  name: string;
  /** Product or company name, shown beside the date. */
  company: string;
  /** Mono date label, e.g. "MAR 2026". */
  date: string;
  /** One-line pitch used in the case study and the command palette. */
  tagline: string;
  /** 3–4 short capability lines at the bottom of the card. */
  capabilities: string[];
  /** Badge glyph rendered in the card's round icon. */
  badge: "spark" | "rocket" | "branch" | "ledger" | "orbit";
  /** Which generated mockup to draw in the middle of the card. */
  mockup: ProjectMockup;
  href?: string;
  /** Case study body. Plain paragraphs, no markdown. */
  story: string[];
  role: string;
  stack: string[];
  /** Optional accent for tiny details inside the generated mockup. */
  year: string;
};

/**
 * ✏️ Add a project here — the Work deck, command palette, case-study modal and
 * SEO metadata all read from this file. Keep 5–7 entries for the best fanned
 * silhouette; the deck adapts to any number.
 */
export const PROJECTS: Project[] = [
  {
    slug: "vuno",
    name: "Vuno",
    company: "Vuno Labs",
    date: "MAR 2026",
    year: "2026",
    tagline:
      "An AI web design agent that turns a prompt into production-ready HTML and UI.",
    capabilities: [
      "0→1 product design",
      "Prompt → shippable HTML",
      "Agent tool-calling",
      "Design system in code",
    ],
    badge: "spark",
    mockup: "agent",
    href: "https://vuno.design",
    role: "Founder & design engineer",
    stack: ["Next.js", "TypeScript", "Claude", "Tailwind"],
    story: [
      "Vuno started as a question I kept asking while freelancing: why does going from an idea to a real interface still take a week of setup? The first version was a prompt box and a live iframe — nothing else.",
      "The hard part was never generation, it was taste. I built a small design system the agent has to compose from, then let it iterate against a rendered screenshot until the result survives a real viewport. That loop is the product.",
      "Today Vuno ships multi-page sites with responsive layouts, accessible components and assets wired in. I designed the interface, wrote the agent runtime and still review every new pattern it learns.",
    ],
  },
  {
    slug: "launchpad",
    name: "LaunchPad",
    company: "LaunchPad",
    date: "JAN 2026",
    year: "2026",
    tagline:
      "A weekly launch and ranking platform for small SaaS products.",
    capabilities: [
      "Weekly ranking engine",
      "Founder profiles",
      "Launch-day analytics",
      "Community moderation",
    ],
    badge: "rocket",
    mockup: "ranking",
    href: "https://launchpad.dev",
    role: "Founder",
    stack: ["Next.js", "Postgres", "Drizzle", "Stripe"],
    story: [
      "LaunchPad is a deliberately small answer to launch directories that reward networking more than shipping. Every product gets one week on the board, ranked by real visitor interest rather than upvotes alone.",
      "I built the ranking model, the submission flow and the moderation tooling. The goal was a board a solo founder could launch on at 2am without waiting for an editor.",
      "It now runs itself: weekly windows, automatic archiving and a digest that goes out every Monday.",
    ],
  },
  {
    slug: "repotutor",
    name: "RepoTutor",
    company: "RepoTutor",
    date: "OCT 2025",
    year: "2025",
    tagline: "Drop in a GitHub repository, get a guided tour of how it works.",
    capabilities: [
      "Repo ingestion & indexing",
      "Architecture summaries",
      "Ask-the-codebase chat",
      "Reading paths per file",
    ],
    badge: "branch",
    mockup: "repo",
    href: "https://repotutor.app",
    role: "Designer & engineer",
    stack: ["Next.js", "Python", "pgvector", "Tree-sitter"],
    story: [
      "I learn codebases by getting lost in them, so RepoTutor is the tool I wanted: paste a repo URL, get a map of the modules, the entry points and the two or three files that actually matter.",
      "It parses the repository with Tree-sitter, builds a symbol graph and embeds the pieces worth reading. The chat answers cite the exact file and line, so you can verify instead of trusting.",
      "The interface is intentionally boring — a file tree, a summary panel and a chat. The interesting work is all in retrieval quality.",
    ],
  },
  {
    slug: "ledger",
    name: "Ledger",
    company: "Self-initiated",
    date: "JUN 2025",
    year: "2025",
    tagline:
      "Invoices and runway for solo founders who hate accounting software.",
    capabilities: [
      "One-page invoicing",
      "Runway forecasting",
      "Multi-currency totals",
      "No account, no setup",
    ],
    badge: "ledger",
    mockup: "ledger",
    role: "Design & build",
    stack: ["SvelteKit", "SQLite", "Stripe"],
    story: [
      "A weekend project that refused to stay a weekend: a single page that shows what you invoiced, what you collected and how many months of runway are left.",
      "Everything is local-first. There is no onboarding, no chart of accounts, no accountant mode — just the four numbers a solo founder actually checks.",
    ],
  },
  {
    slug: "orbit",
    name: "Orbit",
    company: "Experiment",
    date: "FEB 2025",
    year: "2025",
    tagline: "A quiet personal CRM for people you keep meaning to reply to.",
    capabilities: [
      "Relationship timelines",
      "Nudge reminders",
      "Local-first storage",
      "Keyboard-only flow",
    ],
    badge: "orbit",
    mockup: "orbit",
    role: "Concept & prototype",
    stack: ["React", "IndexedDB", "Framer Motion"],
    story: [
      "Orbit is a sketch of a CRM that feels like a notebook. Each person gets a timeline of the last thing you talked about, and the only metric is whether you replied.",
      "It never shipped as a product — the prototype is part of the Play collection now — but the interaction model ended up in the contact section of this site.",
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

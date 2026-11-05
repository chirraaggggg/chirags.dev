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
    slug: "maillayer",
    name: "MailLayer",
    company: "Self-initiated",
    date: "2026",
    year: "2026",
    tagline: "A focused workspace for writing, organizing and sending better email.",
    capabilities: [
      "Inbox workflows",
      "Fast composition",
      "Clean information design",
      "Keyboard-first actions",
    ],
    badge: "spark",
    mockup: "agent",
    role: "Design & build",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    story: [
      "MailLayer explores a calmer email workflow built around writing and follow-through instead of an endless stream of notifications.",
    ],
  },
  {
    slug: "gitwhisper",
    name: "GitWhisper",
    company: "Self-initiated",
    date: "2026",
    year: "2026",
    tagline: "A quieter way to understand changes, commits and codebase history.",
    capabilities: [
      "Commit summaries",
      "Repository context",
      "Natural-language search",
      "Developer workflows",
    ],
    badge: "rocket",
    mockup: "repo",
    role: "Concept & prototype",
    stack: ["TypeScript", "GitHub API", "AI"],
    story: [
      "GitWhisper turns noisy repository history into useful context, helping developers understand why a change happened before they touch it.",
    ],
  },
  {
    slug: "repotutor",
    name: "RepoTutor",
    company: "RepoTutor",
    date: "2026",
    year: "2026",
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
    slug: "chess",
    name: "Chess",
    company: "Experiment",
    date: "2025",
    year: "2025",
    tagline: "A focused chess experience for playing, reviewing and learning.",
    capabilities: [
      "Playable board",
      "Move history",
      "Position review",
      "Responsive interaction",
    ],
    badge: "ledger",
    mockup: "ledger",
    role: "Design & prototype",
    stack: ["React", "TypeScript", "Motion"],
    story: [
      "Chess is a small interaction study focused on making the board, move history and review state feel clear at every screen size.",
    ],
  },
  {
    slug: "vuno",
    name: "Vuno",
    company: "Vuno Labs",
    date: "2026",
    year: "2026",
    tagline: "An AI web design agent that turns a prompt into production-ready HTML and UI.",
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
    stack: ["Next.js", "TypeScript", "Claude"],
    story: [
      "Vuno is an AI web design agent that turns a product idea into responsive, production-ready interfaces.",
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export type Collaborator = {
  slug: string;
  name: string;
  /** Two-letter monogram drawn in the card's portrait tile. */
  initials: string;
  role: string;
  location: string;
  /** Year we started building together. */
  since: string;
  bio: string;
  projects: Array<{ label: string; href?: string }>;
  /** Wire length in px — what makes the cards hang at different heights. */
  wire: number;
};

/**
 * ✏️ The people I build with. The hanging cards on the home page read from
 * this list — flip one to reveal the story behind it.
 */
export const COLLABORATORS: Collaborator[] = [
  {
    slug: "aanya-rao",
    name: "Aanya Rao",
    initials: "AR",
    role: "Product designer",
    location: "Bengaluru",
    since: "2025",
    bio: "Drew the first Vuno design system on a train to Bengaluru, then argued every radius down to 10px. Most of what makes Vuno feel calm is hers.",
    projects: [{ label: "Vuno", href: "https://vuno.design" }],
    wire: 58,
  },
  {
    slug: "kabir-sethi",
    name: "Kabir Sethi",
    initials: "KS",
    role: "Backend & infra",
    location: "Gurugram",
    since: "2025",
    bio: "Keeps LaunchPad's weekly windows honest — the ranking job, the archive, and the Monday digest that has not missed a send yet.",
    projects: [{ label: "LaunchPad", href: "https://launchpad.dev" }],
    wire: 96,
  },
  {
    slug: "meera-nair",
    name: "Meera Nair",
    initials: "MN",
    role: "ML engineer",
    location: "Kochi",
    since: "2024",
    bio: "Built RepoTutor's retrieval layer: symbol graphs, chunking, and the citation format that made the chat worth trusting.",
    projects: [{ label: "RepoTutor", href: "https://repotutor.app" }],
    wire: 40,
  },
  {
    slug: "ronit-bhasin",
    name: "Ronit Bhasin",
    initials: "RB",
    role: "Type & motion",
    location: "New Delhi",
    since: "2026",
    bio: "Set the type scale on this site and refuses to let anything ease linearly. Also the reason the work deck fans the way it does.",
    projects: [{ label: "This site" }],
    wire: 74,
  },
];

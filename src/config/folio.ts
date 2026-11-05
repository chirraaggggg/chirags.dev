export type FolioNavItem = {
  label: string;
  href: string;
  /** Scroll target for the bracket active dot. */
  section?: string;
};

export const FOLIO = {
  firstName: "Chirag",
  fullName: "Chirag Sharma",
  /** Portrait shown in the square avatar tile. */
  avatar: "/chirag-portrait.png",
  role: "Solo founder · Full-stack + AI",
  location: "Gurugram, India",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "GURUGRAM",
  email: "iamchirag182@gmail.com",
  github: "chirraaggggg",
  githubUrl: "https://github.com/chirraaggggg",
  linkedinUrl: "https://www.linkedin.com/in/sharmachirag17/",
  xUrl: "https://x.com/chiragdotxyz",
  bio: "Shipping SaaS products end to end — design, code, launch. CSE @ VIT.",
  currentProject: {
    name: "Vuno",
    href: "https://vuno.design",
  },
  typewriter: ["BUILDING", "SHIPPING", "DEBUGGING", "LAUNCHING", "TINKERING"],
  about: {
    statement:
      "I build small, sharp products end to end — the agent runtime, the interface, the pricing page, the support inbox at 1am.",
    paragraphs: [
      "Currently building Vuno, an AI web design agent, and LaunchPad, a weekly board for people shipping SaaS alone. Before that: freelance full-stack work and an internship at Ethnus.",
      "Computer Science at VIT. Most comfortable in TypeScript, Python and a terminal, happiest when a design decision and an engineering decision are the same decision.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Python",
      "Postgres",
      "Tailwind",
      "Claude",
      "Framer Motion",
      "Node",
      "Figma",
    ],
  },
  footerCredit: "© 2026, built by me and Claude Code",
} as const;

export const FOLIO_INTRO: string[] = [
  "I’m a solo founder and full-stack engineer who turns messy problems into products people actually use.",
  "I approach every product like a real business: grounded in user needs, shaped by clear strategy, and refined through details that make the interface feel effortless and the code hold up.",
];

export type FolioExperience = {
  company: string;
  role: string;
  period: string;
  href?: string;
};

export const FOLIO_EXPERIENCE: FolioExperience[] = [
  {
    company: "Vuno",
    role: "Founder & design engineer",
    period: "3/26 – Present",
    href: "https://vuno.design",
  },
  { company: "LaunchPad", role: "Founder", period: "1/26 – Present" },
  { company: "Freelance", role: "Full-stack developer", period: "7/25 – Present" },
  { company: "Ethnus", role: "Full-stack developer intern", period: "5/25 – 7/25" },
];

export type FolioSkill = {
  label: string;
  icon:
    | "typescript"
    | "next"
    | "react"
    | "python"
    | "postgres"
    | "tailwind"
    | "figma"
    | "claude";
};

export const FOLIO_SKILLS: FolioSkill[] = [
  { label: "TypeScript", icon: "typescript" },
  { label: "Next.js", icon: "next" },
  { label: "React", icon: "react" },
  { label: "Python", icon: "python" },
  { label: "Postgres", icon: "postgres" },
  { label: "Tailwind CSS", icon: "tailwind" },
  { label: "Figma", icon: "figma" },
  { label: "Claude", icon: "claude" },
];

export const FOLIO_APPROACH: Array<{ title: string; body: string }> = [
  {
    title: "Understand the problem",
    body: "I read the brief closely and use AI to surface the questions, edge cases and angles before I commit to anything.\nThe goal is to walk into the first conversation with clarity, not assumptions.",
  },
  {
    title: "Align & define",
    body: "I synthesise goals, constraints and user needs into one framed problem, then set scope and success criteria.\nNothing gets designed until the direction is clear.",
  },
  {
    title: "Set the direction",
    body: "I explore a couple of visual and technical directions, then filter them against the product’s personality and what the stack can actually ship.\nThe direction has to be distinctive and buildable.",
  },
  {
    title: "Build in the open",
    body: "I design in the browser, ship in small increments and write the decisions down as I go, so the interface and the code explain themselves.",
  },
  {
    title: "Execute with intention",
    body: "Once the direction is locked I push on the details: type, motion, accessibility, performance.\nMost of the feel of a product lives in that last pass.",
  },
];

export const FOLIO_NAV: FolioNavItem[] = [
  { label: "Work", href: "/#work", section: "work" },
  { label: "CV", href: "https://www.linkedin.com/in/sharmachirag17/" },
];

export const FOLIO_SECTIONS = [
  { id: "work", label: "Work" },
  { id: "activities", label: "Recent activities" },
  { id: "company", label: "In good company" },
  { id: "contact", label: "Contact" },
] as const;

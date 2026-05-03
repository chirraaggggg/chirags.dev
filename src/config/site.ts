import type { NavItem } from "@/types/nav";
import type { Experience, Project, SocialLink, StackItem } from "@/types/portfolio";

export type UtilityLink = {
  label: string;
  href: string;
  icon: "resume" | "site";
};

export const SITE_INFO = {
  name: "Chirag Sharma",
  url: process.env.APP_URL || "https://chirags.dev",
  ogImage: "/images/og-image.png",
  description:
    "Design-minded software engineer and data science enthusiast building clean, user-centric products with modern JavaScript and ML.",
  keywords: [
    "Chirag Sharma",
    "chirags.dev",
    "software developer",
    "React",
    "Next.js",
    "TypeScript",
    "MERN",
    "MLOps",
    "OpenCV",
  ],
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#000000",
} as const;

export const MAIN_NAV: NavItem[] = [];

export const GITHUB_USERNAME = "chirraaggggg";
export const SOURCE_CODE_GITHUB_REPO = "chirraaggggg/chiragsharma.dev";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/chirraaggggg/chiragsharma.dev";

export const SPONSORSHIP_URL = "https://github.com/sponsors/chiragsharma";

export const UTM_PARAMS = {
  utm_source: "chirags.dev",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};

export const HEADER_COPY = {
  name: "Chirag Sharma",
  role: "Software Developer",
  location: "Gurugram, Haryana, India",
  status: "Available — open to freelance projects and collaborations",
} as const;

export const HEADER_LABELS = {
  name: "Name:",
  role: "Role:",
  location: "Location:",
  status: "Status:",
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/chirraaggggg",
    icon: "github",
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: "twitter",
  },
  {
    label: "Email",
    href: "mailto:iamchrag182@gmail.com",
    icon: "email",
  },
];

export const UTILITY_LINKS: UtilityLink[] = [
  {
    label: "resume ↗",
    href: "/resume.pdf",
    icon: "resume",
  },
];

export const ABOUT_PARAGRAPHS = [
  "Design-minded software engineer and data science enthusiast, focused on building clean, user-centric products with modern JavaScript and ML. Skilled in React, Next.js, TypeScript, and the MERN stack; comfortable moving from model training and data pipelines to polished front-end experiences.",
  "Passionate about exploring new technologies, refining UI details, and turning ideas into thoughtful personal projects and experiments.",
  "Active open-source contributor, continuously learning, solving DSA, and sharing progress across GitHub and social platforms.",
] as const;

export const EXPERIENCE_ITEMS: Experience[] = [
  {
    period: "05.2025 — 07.2025",
    role: "Full Stack Developer Intern",
    company: "Ethnus",
    type: "intern",
  },
  {
    period: "07.2025 — Present",
    role: "Full Stack Developer",
    company: "Freelance",
    type: "freelance",
  },
];

export const PROJECT_ITEMS: Project[] = [
  {
    tags: ["AI", "ML", "NEXT.JS"],
    name: "Alpha Eraser",
    href: "https://neat-bg.vercel.app",
    description:
      "AI-powered background removal web app. Drag-and-drop upload, transparent or custom color export, GPU-accelerated processing. Built with React, Next.js, TypeScript (frontend) and Python, FastAPI, OpenCV (backend).",
  },
  {
    tags: ["NOTES", "NEXT.JS"],
    name: "Slate",
    href: "https://slate-notes.vercel.app",
    description:
      "Minimal note-taking app focused on speed, clarity, and distraction-free writing.",
  },
  {
    tags: ["MLOPS", "PYTHON"],
    name: "Vehicle Insurance MLOps",
    href: "https://github.com/chiragsharma/vehicle-insurance-mlops",
    description:
      "End-to-end MLOps pipeline for vehicle insurance risk prediction with data ingestion, training, deployment, and monitoring.",
  },
];

export const STACK_ITEMS: StackItem[] = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Python",
  "FastAPI",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "MERN",
  "OpenCV",
  "deep learning",
  "MLOps",
  "DSA",
];

export const PORTFOLIO_COPY = {
  sections: {
    headerKicker: "Portfolio",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    stack: "Stack",
    github: "GitHub contributions",
  },
  github: {
    loading: "Loading GitHub contributions",
    error: "GitHub contributions unavailable",
    captionTemplate: "{count} contributions in {year} · GitHub",
    legendLess: "Less",
    legendMore: "More",
  },
  theme: {
    light: "light",
    dark: "dark",
  },
} as const;

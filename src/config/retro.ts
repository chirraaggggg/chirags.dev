import {
  ABOUT_PARAGRAPHS,
  EXPERIENCE_ITEMS,
  PROJECT_ITEMS,
  SITE_INFO,
} from "@/config/site";
import { USER } from "@/features/portfolio/data/user";
import { decodeEmail } from "@/utils/string";

// ---------------------------------------------------------------------------
// ✏️ EDIT ME: Replace the education placeholder below with your real details.
// ---------------------------------------------------------------------------

// Project category keyed by title so reordering PROJECT_ITEMS never silently
// reassigns categories.
const RETRO_CATEGORIES: Record<string, string> = {
  "Alpha Eraser": "AI PROJECT",
  Slate: "UTILITY",
  "Vehicle Insurance MLOps": "MLOPS",
};

export const RETRO = {
  hero: {
    script: "Hi, I am",
    firstName: USER.firstName.toUpperCase(),
    badgeBlue: "SOFTWARE DEV",
    badgeRed: "FULL-STACK",
    badgeYellow: "DSA GRINDER",
    tagline:
      "Design-minded software engineer & data science enthusiast building clean, user-centric products with modern JavaScript and ML.",
    liveOn: "LIVE ON",
    talkTo: {
      label: "LET'S TALK →",
      href: `mailto:${decodeEmail(USER.email)}`,
    },
    resources: {
      label: "RESOURCES →",
      href: "/resume.pdf",
    },
  },

  windowTitle: `> ${USER.firstName.toLowerCase()}.sh`,

  about: {
    whoamiHeading: "WHOAMI",
    paragraphs: [...ABOUT_PARAGRAPHS],
    skillsHeading: "LS -L ./SKILLS",
    // Curated groups derived from STACK_ITEMS + TECH_STACK
    skills: {
      LANGUAGES: ["JavaScript", "TypeScript", "Python", "C++"],
      "FRAMEWORKS & LIBRARIES": [
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "FastAPI",
        "Tailwind CSS",
        "Three.js",
      ],
      "TOOLS & PLATFORMS": [
        "MongoDB",
        "PostgreSQL",
        "Git",
        "Docker",
        "OpenCV",
        "scikit-learn",
        "MLOps",
      ],
    },
  },

  experience: {
    heading: "> CAT ./EXPERIENCE.LOG",
    items: EXPERIENCE_ITEMS.map((item) => ({
      role: item.role,
      org: item.company,
      focus:
        item.type === "intern"
          ? "MERN stack · agile team"
          : "End-to-end product development",
      dates: item.period,
    })),
    education: {
      heading: "LS ./EDUCATION",
      // ✏️ Replace this placeholder with your real education details.
      items: [
        {
          role: "B.Tech · Computer Science",
          org: "Your University",
          focus: "CS core · data science electives",
          dates: "20XX — 20XX",
        },
      ],
    },
    cta: {
      label: "SIDE QUESTS →",
      href: "#side-quests",
    },
  },

  sideQuests: {
    tabs: [
      { id: "GITHUB", label: "GITHUB", color: "red" },
      { id: "COLLABS", label: "COLLABS", color: "blue" },
      { id: "ART", label: "ART", color: "yellow" },
      { id: "BUCKET LIST", label: "BUCKET LIST", color: "green" },
    ],
    emptyState: "// nothing here yet — check back soon",
    projects: PROJECT_ITEMS.map((project) => ({
      category: RETRO_CATEGORIES[project.name] ?? "PROJECT",
      date: "2025",
      title: project.name,
      href: project.href,
      description: project.description,
      tech: project.tags,
      // Live demos link out to the deployed app; repos get the SOURCE REPO CTA.
      cta: project.href.includes("github.com")
        ? "SOURCE REPO →"
        : "LIVE DEMO →",
    })),
  },

  footer: {
    credit: `Created and designed by ${USER.firstName} ${USER.lastName}`,
    rights: `© ${new Date().getFullYear()} ${USER.firstName} ${USER.lastName}. All rights reserved.`,
  },

  siteUrl: SITE_INFO.url,
} as const;

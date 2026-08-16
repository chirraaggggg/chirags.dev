import {
  ABOUT_PARAGRAPHS,
  EXPERIENCE_ITEMS,
  PROJECT_ITEMS,
  SITE_INFO,
} from "@/config/site";
import { USER } from "@/features/portfolio/data/user";
import { decodeEmail } from "@/utils/string";

// ---------------------------------------------------------------------------
// ✏️ EDIT ME: Swap any copy below — the layout is a 1:1 match of itspgiri.com,
// only the text differs. Keep the same shape so the visuals stay identical.
// ---------------------------------------------------------------------------

const RETRO_CATEGORIES: Record<string, string> = {
  "Alpha Eraser": "AI PROJECT",
  Slate: "UTILITY PROJECT",
  "Vehicle Insurance MLOps": "MLOPS",
};

export const RETRO = {
  hero: {
    script: "Hi, I am",
    // Shown in the blocky Press Start 2P heading (mixed case, like the ref).
    firstName: USER.firstName,
    tags: {
      blue: "Software Engineer",
      red: "Content Creator",
      yellow: "Dopamine Chaser",
    },
    // Tagline under the name. `colored` renders as the multi-color logo word
    // (blue/red/yellow/blue/green/red letters) exactly like the reference.
    description: {
      line1: "Building infrastructure to manage the product",
      line2: "lifecycle for",
      colored: "Google",
      line3: "in Platform & Devices.",
    },
    liveOn: "LIVE ON",
    // Circular status dot + LIVE ON + these icons, tucked under the name.
    liveOnLinks: [
      {
        label: "Instagram",
        href: "https://instagram.com/chirraaggggg",
        Icon: "instagram",
      },
      {
        label: "YouTube",
        href: "https://youtube.com/@chirraaggggg",
        Icon: "youtube",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/chirags920/",
        Icon: "linkedin",
      },
    ],
    talkTo: {
      label: "LET'S TALK",
      href: `mailto:${decodeEmail(USER.email)}`,
    },
    resources: {
      label: "RESOURCES",
      href: "#links",
    },
  },

  // Centered title bar text (the `>_ ` prompt is rendered by the window).
  windowTitle: `${USER.firstName.toLowerCase()}.sh`,

  about: {
    whoami: {
      chevronColor: "#3b82f6",
      label: "WHOAMI",
    },
    paragraphs: [...ABOUT_PARAGRAPHS],
    skills: {
      chevronColor: "#22c55e",
      label: "LS -L ./SKILLS",
      groups: [
        { category: "Languages", pills: ["JavaScript", "TypeScript", "Python", "C++", "Java"] },
        { category: "Cloud & DevOps", pills: ["GCP", "Docker", "Jenkins", "K8s", "Azure"] },
        {
          category: "Frameworks & Tools",
          pills: ["React", "Next.js", "Node.js", "REST APIs", "MongoDB"],
        },
      ],
    },
  },

  experience: {
    chevronColor: "#f59e0b",
    heading: "CAT ./EXPERIENCE.LOG",
    items: EXPERIENCE_ITEMS.map((item) => ({
      role: item.role,
      company: item.company,
      focus: item.type === "intern" ? "MERN stack · agile team" : "End-to-end product development",
      dates: item.period,
      bullets: [
        "Built and shipped production features end-to-end, from design to deployment.",
        "Collaborated with cross-functional teams to deliver reliable, user-facing software.",
      ],
    })),
    education: {
      role: "B.Tech in Computer Science Engineering",
      company: "Vellore Institute of Technology, Bhopal",
      focus: "Specialisation in Cyber Security and Digital Forensics",
      dates: "Aug 2019 – Aug 2023",
      bullets: [
        "Cisco, Campus Ambassador — launched the company's presence at VIT; executed professional development and networking events.",
        "TickVIT, Founder and Technical Lead — built a cloud-based ticket system to streamline student support.",
        "CyVIT (annual CyberSecurity student festival), Technical Head — led the technical aspects of the festival.",
      ],
    },
    cta: {
      label: "SIDE QUESTS",
      href: "/projects",
    },
  },

  // /projects — the ring-binder page with right-edge tabs.
  sideQuests: {
    landing: {
      title: "SIDE QUESTS",
      description:
        "A collection of my tech projects, brand collabs, digital art, and bucket list.",
    },
    tabs: [
      {
        id: "github",
        label: "GITHUB",
        chevronColor: "#990000",
        gradient: "linear-gradient(90deg, #ff4d4d 0%, #d60000 100%)",
        borderTop: "#990000",
        borderLeft: "#ff9999",
        borderRight: "#7a0000",
      },
      {
        id: "brandCollabs",
        label: "COLLABS",
        chevronColor: "#1e3a8a",
        gradient: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
        borderTop: "#1e3a8a",
        borderLeft: "#93c5fd",
        borderRight: "#172554",
      },
      {
        id: "art",
        label: "ART",
        chevronColor: "#b37400",
        gradient: "linear-gradient(90deg, #ffe135 0%, #ea9c00 100%)",
        borderTop: "#b37400",
        borderLeft: "#fff1a8",
        borderRight: "#78350f",
      },
      {
        id: "bucketList",
        label: "BUCKET LIST",
        chevronColor: "#14532d",
        gradient: "linear-gradient(90deg, #22c55e 0%, #15803d 100%)",
        borderTop: "#14532d",
        borderLeft: "#86efac",
        borderRight: "#166534",
      },
    ],
    github: {
      description: "",
      projects: PROJECT_ITEMS.map((project) => ({
        category: RETRO_CATEGORIES[project.name] ?? "PROJECT",
        date: "2025",
        title: project.name,
        href: project.href,
        description: project.description,
        tech: project.tags,
        cta: "SOURCE REPO>",
      })),
    },
    collabs: {
      description: "Some of the amazing brands I've had the pleasure of partnering with.",
      items: [
        { name: "Brand One", href: "#" },
        { name: "Brand Two", href: "#" },
        { name: "Brand Three", href: "#" },
        { name: "Brand Four", href: "#" },
      ],
    },
    art: {
      items: [
        { title: "Untitled #1", href: "#" },
        { title: "Untitled #2", href: "#" },
        { title: "Untitled #3", href: "#" },
      ],
    },
    bucketList: {
      description: "just a small bucket list of dreams",
      items: [
        { label: "Travel to 30 countries", done: false },
        { label: "Learn to play the guitar", done: false },
        { label: "Run a marathon", done: false },
        { label: "Ship an open-source hit", done: false },
      ],
    },
  },

  footer: {
    credit: `Created and designed by ${USER.firstName} ${USER.lastName}`,
    rights: "All rights reserved ©",
    socials: [
      { label: "Email", href: `mailto:${decodeEmail(USER.email)}`, Icon: "email" },
      {
        label: "Instagram",
        href: "https://instagram.com/chirraaggggg",
        Icon: "instagram",
      },
      {
        label: "YouTube",
        href: "https://youtube.com/@chirraaggggg",
        Icon: "youtube",
      },
      {
        label: "Twitter",
        href: "https://x.com/chiragiscoding",
        Icon: "twitter",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/chirags920/",
        Icon: "linkedin",
      },
    ],
  },

  siteUrl: SITE_INFO.url,
} as const;

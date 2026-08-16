import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "Chirag",
  lastName: "Sharma",
  displayName: "Hi, I'm chirag sharma 👋",
  username: "chiragsharma",
  gender: "male",
  pronouns: "he/him",
  bio: "I ama software engineer from Gurugram",
  flipSentences: [
    "Turning ideas into shipped products.",
    "Shipping clean interfaces and smart system.",
    "Coding, learning, and sharing in public.",
  ],
  address: "Gurugram, Haryana, India",
  phoneNumber: "KzkxOTIwNTgzMjA5Mw==", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "YnVzaW5lc3N3aXRoY2hpcmFnc2hhcm1hQGdtYWlsLmNvbQ==", // base64 encoded
  website: "https://chirags.dev",
  jobTitle: "Software Developer",
  jobs: [] as Array<{ title: string; company: string; website: string }>,
  //   about: `
  // Hello, World! I am Chánh Đại — a Design Engineer passionate about creating high-performance, user-centric software solutions with intuitive and engaging designs.

  // With 5+ years of experience, I specialize in building high-quality web and mobile applications using Next.js, React, TypeScript, and modern front-end technologies. Beyond work, I love exploring new technologies and turning ideas into reality through personal projects.

  // One of my key projects, [ZaDark](https://zadark.com), launched in 2022, enhances the Zalo experience on PC and Web, surpassing 80k+ downloads on [SourceForge](https://sourceforge.net/projects/zadark) and reaching 20k+ active users on the [Chrome Web Store](https://chromewebstore.google.com/detail/llfhpkkeljlgnjgkholeppfnepmjppob) (as of Sep 2025).

  // I'm also the creator of [React Wheel Picker](https://react-wheel-picker.chanhdai.com) — iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support. It has earned 4k+ weekly downloads on [npm](https://www.npmjs.com/package/@ncdai/react-wheel-picker) and was selected for [▲Vercel OSS Program](https://vercel.com/blog/summer-2025-oss-program#react-wheel-picker) summer 2025 cohort.

  // Let's connect and collaborate!
  //   `,
  about: `
Design‑minded software engineer and data science enthusiast, focused on building clean, user‑centric products with modern JavaScript and ML.
Skilled in React, Next.js, TypeScript, and the MERN stack; comfortable moving from model training and data pipelines to polished front‑end experiences.

Passionate about exploring new technologies, refining UI details, and turning ideas into thoughtful personal projects and experiments.

Creator of end‑to‑end ML and web projects, including an e‑commerce app (Shoplane) and medical/ML prototypes showcased on [chirags.dev](https://chirags.dev).

Active open‑source and community contributor, continuously learning, solving DSA, and sharing progress across GitHub and social platforms.
`,
  avatar: "/images/avatar.jpg",
  ogImage: "/images/og-image.png",
  namePronunciationUrl: "/audio/chirag-sharma.mp3",
  timeZone: "Asia/Kolkata",
  keywords: [
    "chiragsharma",
    "chirag sharma",
    "chirags.dev",
    "design engineer",
    "software engineer",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
} satisfies User;

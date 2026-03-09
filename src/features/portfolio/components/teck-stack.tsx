"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/base/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

// Icon source mapping - using skillicons for main tech, devicon for data science
const ICON_SOURCE_MAP: Record<
  string,
  { source: "skillicons" | "devicon"; icon: string }
> = {
  cpp: { source: "skillicons", icon: "cpp" },
  python: { source: "skillicons", icon: "python" },
  js: { source: "skillicons", icon: "javascript" },
  typescript: { source: "skillicons", icon: "typescript" },
  react: { source: "skillicons", icon: "react" },
  nextjs: { source: "skillicons", icon: "nextjs" },
  figma: { source: "skillicons", icon: "figma" },
  postgresql: { source: "skillicons", icon: "postgresql" },
  pandas: { source: "devicon", icon: "pandas" },
  numpy: { source: "devicon", icon: "numpy" },
  matplotlib: { source: "devicon", icon: "matplotlib" },
  seaborn: { source: "devicon", icon: "python" },
  scikitlearn: { source: "devicon", icon: "scikitlearn" },
  threejs: { source: "skillicons", icon: "threejs" },
  framermotion: { source: "devicon", icon: "framer" },
  tailwindcss: { source: "skillicons", icon: "tailwindcss" },
};

function TechIcon({ tech }: { tech: (typeof TECH_STACK)[0] }) {
  const [imageError, setImageError] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const iconConfig = ICON_SOURCE_MAP[tech.key];

  if (!iconConfig) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded bg-muted text-xs font-semibold text-muted-foreground">
        {tech.title.split(" ")[0].slice(0, 2).toUpperCase()}
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded bg-muted animate-pulse" />
    );
  }

  let iconUrl = "";
  const isDark = resolvedTheme === "dark";
  const theme = isDark ? "dark" : "light";

  if (tech.key === "seaborn") {
    // Use appropriate URL for Seaborn based on theme
    iconUrl = isDark
      ? "https://seaborn.pydata.org/_static/logo-wide-lightbg.png"
      : "https://seaborn.pydata.org/_static/logo-wide-lightbg.png";
  } else if (tech.key === "framermotion") {
    // Use Devicon for Framer Motion (works in both themes)
    iconUrl =
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg";
  } else {
    // Use theme-specific URLs for skillicons, devicon doesn't need theme switching
    iconUrl =
      iconConfig.source === "devicon"
        ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconConfig.icon}/${iconConfig.icon}-original.svg`
        : `https://skillicons.dev/icons?i=${iconConfig.icon}&theme=${theme}`;
  }

  if (imageError) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded bg-muted text-xs font-semibold text-muted-foreground">
        {tech.title.split(" ")[0].slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={iconUrl}
      alt={`${tech.title} icon`}
      width={32}
      height={32}
      className="w-8 h-8 object-contain"
      loading="lazy"
      onError={() => setImageError(true)}
    />
  );
}

export function TeckStack() {
  return (
    <div className="border-2 border-dashed border-border rounded-lg p-4">
      <Panel id="stack" className="border-x-0">
        <PanelHeader>
          <PanelTitle>Stack</PanelTitle>
        </PanelHeader>

        <PanelContent className={cn("bg-zinc-950/0.75 dark:bg-white/0.75")}>
          <TooltipProvider>
            <ul className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 select-none">
              {TECH_STACK.map((tech) => {
                return (
                  <li key={tech.key} className="flex justify-center">
                    <TooltipRoot>
                      <TooltipTrigger
                        render={
                          <a
                            href={tech.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={tech.title}
                          />
                        }
                      >
                        <div className="flex items-center justify-center hover:scale-110 transition-transform">
                          <TechIcon tech={tech} />
                        </div>
                      </TooltipTrigger>

                      <TooltipContent>
                        <p>{tech.title}</p>
                      </TooltipContent>
                    </TooltipRoot>
                  </li>
                );
              })}
            </ul>
          </TooltipProvider>
        </PanelContent>
      </Panel>
    </div>
  );
}

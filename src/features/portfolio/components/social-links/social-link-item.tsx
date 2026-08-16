import { Github, Linkedin, XIcon } from "lucide-react";

import { Icons } from "@/components/icons";
import type { SocialLink } from "@/features/portfolio/types/social-links";

export function SocialLinkItem({ title, href }: SocialLink) {
  let Icon;
  if (title === "X (formerly Twitter)") {
    Icon = XIcon;
  } else if (title === "GitHub") {
    Icon = Github;
  } else if (title === "LinkedIn") {
    Icon = Linkedin;
  } else if (title === "LeetCode") {
    Icon = Icons.leetcode;
  }

  return (
    <a
      className="transition-opacity hover:opacity-75 p-2 rounded-lg border border-zinc-700 dark:border-zinc-600"
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={title}
    >
      {Icon && <Icon className="size-5" />}
    </a>
  );
}

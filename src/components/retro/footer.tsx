import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react";

import { RETRO } from "@/config/retro";
import { USER } from "@/features/portfolio/data/user";
import { decodeEmail } from "@/utils/string";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/chirraaggggg",
    Icon: GithubIcon,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/chiragiscoding",
    Icon: TwitterIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chirags920/",
    Icon: LinkedinIcon,
  },
  { label: "Email", href: `mailto:${decodeEmail(USER.email)}`, Icon: MailIcon },
];

export function RetroFooter() {
  return (
    <footer id="links" className="scroll-mt-24 px-4 pt-16 pb-10 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <p className="font-terminal text-sm font-semibold text-black/70 dark:text-white/70">
          {RETRO.footer.credit}
        </p>

        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-[0_3px_0_0_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgba(0,0,0,0.9)] active:translate-y-0.5 active:shadow-none dark:border-[#3a3a3a] dark:bg-[#161616] dark:text-[#e8e8e8] dark:shadow-[0_3px_0_0_rgba(255,255,255,0.15)] dark:hover:shadow-[0_4px_0_0_rgba(255,255,255,0.15)]"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>

        <p className="font-terminal text-xs text-black/40 dark:text-white/40">
          {RETRO.footer.rights}
        </p>
      </div>
    </footer>
  );
}

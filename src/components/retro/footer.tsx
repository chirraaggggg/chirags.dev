import {
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

import { RETRO } from "@/config/retro";

const ICONS: Record<string, typeof MailIcon> = {
  email: MailIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
};

export function RetroFooter() {
  return (
    <footer id="links" className="site-footer">
      <div style={{ marginBottom: 2 }}>{RETRO.footer.credit}</div>
      <div style={{ marginBottom: 0 }}>{RETRO.footer.rights}</div>
      <div style={{ display: "flex", gap: 0, alignItems: "center" }}>
        {RETRO.footer.socials.map(({ label, href, Icon }) => {
          const IconComp = ICONS[Icon];
          return (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="social-icon"
              aria-label={label}
            >
              <IconComp width={18} height={18} />
            </a>
          );
        })}
      </div>
    </footer>
  );
}

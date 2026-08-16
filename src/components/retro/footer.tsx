import {
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";

import { Icons } from "@/components/icons";
import { RETRO } from "@/config/retro";

type SocialIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const ICONS: Record<string, SocialIcon> = {
  email: MailIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  leetcode: Icons.leetcode,
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

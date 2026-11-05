import { FOLIO } from "@/config/folio";

const LINKS = [
  { label: "GitHub", href: FOLIO.githubUrl },
  { label: "LinkedIn", href: FOLIO.linkedinUrl },
  { label: "X", href: FOLIO.xUrl },
  { label: "Email", href: `mailto:${FOLIO.email}` },
];

export function Socials() {
  return (
    <footer id="contact" className="mp-section mp-socials">
      <h2>Contact</h2>
      <div className="mp-contact-row">
        <div className="mp-social-links">
          {LINKS.map((link) => (
            <a
              key={link.label}
              className="mp-social-link"
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a className="mp-contact-link" href={`mailto:${FOLIO.email}`}>
          Contact me
        </a>
      </div>
    </footer>
  );
}

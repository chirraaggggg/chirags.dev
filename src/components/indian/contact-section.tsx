import { Rangoli } from "@/components/indian/rangoli";
import { StampPair } from "@/components/indian/stamps";
import { FOLIO } from "@/config/folio";

const ROWS = [
  { label: "Email", value: FOLIO.email, href: `mailto:${FOLIO.email}` },
  { label: "X", value: "@chiragdotxyz", href: FOLIO.xUrl },
  { label: "GitHub", value: FOLIO.github, href: FOLIO.githubUrl },
  { label: "LinkedIn", value: "in/sharmachirag17", href: FOLIO.linkedinUrl },
] as const;

export function ContactSection() {
  return (
    <footer id="contact">
      <Rangoli />

      <section className="deshi-contact" aria-label="Contact">
        <dl className="deshi-contact-list">
          {ROWS.map((row) => (
            <div key={row.label} className="deshi-contact-row">
              <dt>{row.label}</dt>
              <dd>
                <a
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {row.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
        <div className="deshi-contact-stamps">
          <StampPair />
        </div>
      </section>

      <div className="deshi-footer">
        <span>{FOLIO.footerCredit}</span>
        <span>
          {FOLIO.location} · <a href="/work">Work ↗</a>
        </span>
      </div>
    </footer>
  );
}

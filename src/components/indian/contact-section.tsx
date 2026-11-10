import { ArrowUpRight } from "@/components/indian/arrow";
import { Reveal } from "@/components/indian/reveal";
import { SectionHead } from "@/components/indian/section-head";
import { ToTop } from "@/components/indian/to-top";
import { FOLIO } from "@/config/folio";

const ROWS = [
  { label: "X", value: "@chiragdotxyz", href: FOLIO.xUrl },
  { label: "GitHub", value: FOLIO.github, href: FOLIO.githubUrl },
  { label: "LinkedIn", value: "in/sharmachirag17", href: FOLIO.linkedinUrl },
] as const;

export function ContactSection({ index = "03" }: { index?: string }) {
  return (
    <footer id="contact" className="deshi-contact" aria-labelledby="contact-heading">
      <SectionHead
        id="contact-heading"
        index={index}
        title="Say hello"
        note="Gurugram · IST"
      />

      <Reveal>
        <p className="deshi-contact-lede">
          Have a product in mind, a half-formed idea, or just want to compare
          notes on building alone? The inbox is open.
        </p>
        <a className="deshi-mail" href={`mailto:${FOLIO.email}`}>
          {FOLIO.email}
          <ArrowUpRight />
        </a>
      </Reveal>

      <Reveal delay={0.06}>
        <ul className="deshi-contact-links">
          {ROWS.map((row, i) => (
            <li key={row.label}>
              <a href={row.href} target="_blank" rel="noreferrer">
                <span className="deshi-contact-idx">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="deshi-contact-label">{row.label}</span>
                <span className="deshi-contact-value">{row.value}</span>
                <ArrowUpRight />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="deshi-colophon">
        <span>{FOLIO.footerCredit}</span>
        <span className="deshi-colophon-end">
          {FOLIO.location}
          <ToTop />
        </span>
      </div>
    </footer>
  );
}

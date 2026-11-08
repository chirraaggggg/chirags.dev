import { SectionHead } from "@/components/indian/section-head";
import { FOLIO_EXPERIENCE } from "@/config/folio";

export function CareerSection() {
  return (
    <section className="deshi-section" aria-labelledby="career-heading">
      <SectionHead id="career-heading" title="Career" glyph="temple" />
      <ol className="deshi-timeline">
        {FOLIO_EXPERIENCE.map((job) => (
          <li key={job.company} className="deshi-stop">
            <div className="deshi-stop-head">
              <h3>
                {job.href ? (
                  <a href={job.href} target="_blank" rel="noreferrer">
                    {job.company}
                    <span className="deshi-row-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <span className="deshi-stop-period">{job.period}</span>
            </div>
            <p className="deshi-stop-role">{job.role}</p>
            <p className="deshi-stop-body">{job.summary}</p>
            {job.highlights ? (
              <ul className="deshi-stop-list">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

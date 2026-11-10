import { ArrowUpRight } from "@/components/indian/arrow";
import { Reveal } from "@/components/indian/reveal";
import { SectionHead } from "@/components/indian/section-head";
import { FOLIO_EXPERIENCE } from "@/config/folio";

export function CareerSection() {
  return (
    <section className="deshi-section" aria-labelledby="career-heading">
      <SectionHead
        id="career-heading"
        index="01"
        title="Where I've been"
        note="2025 — now"
      />

      <ol className="deshi-timeline">
        {FOLIO_EXPERIENCE.map((job, index) => (
          <li key={job.company} className="deshi-stop">
            <Reveal delay={index * 0.05}>
              <div className="deshi-stop-inner">
                <div className="deshi-stop-head">
                  <h3>
                    {job.href ? (
                      <a href={job.href} target="_blank" rel="noreferrer">
                        {job.company}
                        <ArrowUpRight className="deshi-stop-arrow" />
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
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

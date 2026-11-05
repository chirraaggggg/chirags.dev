import { FOLIO_EXPERIENCE } from "@/config/folio";

export function ExperienceList() {
  return (
    <ul className="mp-entry-list">
      {FOLIO_EXPERIENCE.map((entry) => (
        <li key={`${entry.company}-${entry.period}`}>
          <div className="mp-entry">
            <div>
              <h3>
                {entry.href ? (
                  <a href={entry.href} target="_blank" rel="noreferrer">
                    {entry.company}
                  </a>
                ) : (
                  entry.company
                )}
              </h3>
              <p className="mp-secondary">{entry.role}</p>
            </div>
            <p className="mp-dates mp-secondary">{entry.period}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

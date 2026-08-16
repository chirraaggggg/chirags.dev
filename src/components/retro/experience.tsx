import { RETRO } from "@/config/retro";

import { TerminalSectionTitle } from "./window";

interface SubRole {
  role: string;
  dates: string;
  bullets: readonly string[];
}

interface TimelineItem {
  role: string;
  company: string;
  focus?: string;
  dates: string;
  bullets?: readonly string[];
  subRoles?: SubRole[];
  isEducation?: boolean;
}

function ArcadeBullets({
  bullets,
  single,
  subRole,
}: {
  bullets: readonly string[];
  single?: boolean;
  subRole?: boolean;
}) {
  return (
    <ul
      className={`arcade-bullets ${single ? "single-bullet" : ""}`}
      style={subRole ? { marginTop: 8 } : undefined}
    >
      {bullets.map((bullet, i) => (
        <li key={i}>{bullet}</li>
      ))}
    </ul>
  );
}
function TimelineCard({ item }: { item: TimelineItem }) {
  const isSingle = (item.bullets?.length ?? 0) === 1 && !item.subRoles;

  return (
    <details className="exp-card-arcade group">
      <summary className="arcade-summary">
        <div className="arcade-header-left">
          <div>
            <h3 className="arcade-role">{item.role}</h3>
            <h4 className="arcade-company">
              {item.company}
              {item.focus ? (
                <>
                  {" "}
                  <span aria-hidden>•</span> {item.focus}
                </>
              ) : null}
            </h4>
          </div>
        </div>
        <div className="arcade-header-right">
          <div className="arcade-badge">{item.dates}</div>
          <div className="arcade-chevron">▼</div>
        </div>
      </summary>
      <div className="arcade-body" style={{ paddingTop: 8 }}>
        {item.subRoles ? (
          item.subRoles.map((sub, i) => (
            <div
              key={sub.role}
              className="arcade-subrole-group"
              style={{
                marginBottom: i === item.subRoles!.length - 1 ? 0 : 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#666",
                    margin: 0,
                  }}
                >
                  {sub.role}
                </h3>
                <span
                  className="arcade-badge"
                  style={{ color: "#aaa", fontSize: 9 }}
                >
                  {sub.dates}
                </span>
              </div>
              <ArcadeBullets bullets={sub.bullets} subRole />
            </div>
          ))
        ) : (
          <ArcadeBullets bullets={item.bullets ?? []} single={isSingle} />
        )}
      </div>
    </details>
  );
}

export function Experience() {
  const items: TimelineItem[] = [
    ...RETRO.experience.items.map((item) => ({ ...item })),
    { ...RETRO.experience.education, isEducation: true },
  ];

  return (
    <>
      <div className="terminal-divider" />
      <div className="terminal-body">
        <TerminalSectionTitle
          chevronColor={RETRO.experience.chevronColor}
        >
          {RETRO.experience.heading}
        </TerminalSectionTitle>
        <div className="journey-container">
          <div className="arcade-timeline-container">
            {items.map((item, i) => (
              <div
                key={`${item.role}-${item.company}`}
                className="arcade-timeline-item"
              >
                <div className="arcade-timeline-node badge-mono-solid" />
                <TimelineCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <div
          className="timeline-btn-wrapper"
          style={{ marginTop: 16, paddingBottom: 0, textAlign: "center" }}
        >
          <a href={RETRO.experience.cta.href} className="btn btn-black">
            {RETRO.experience.cta.label}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: 10 }}
              aria-hidden
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}

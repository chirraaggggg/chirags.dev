import { FOLIO_APPROACH } from "@/config/folio";

function Chevron() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Approach() {
  return (
    <div className="mp-approach">
      {FOLIO_APPROACH.map((step) => (
        <details key={step.title} className="mp-accordion">
          <summary>
            <span>{step.title}</span>
            <Chevron />
          </summary>
          <p>{step.body}</p>
        </details>
      ))}
    </div>
  );
}

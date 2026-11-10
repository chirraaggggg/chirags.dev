import { Lotus } from "@/components/indian/blooms";

export function SectionHead({
  id,
  index,
  title,
  note,
}: {
  id: string;
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <header className="deshi-section-head">
      <p className="deshi-kicker">
        <Lotus size={22} />
        <span className="deshi-index">{index}</span>
        {note ? <span className="deshi-note">{note}</span> : null}
      </p>
      <div className="deshi-section-title">
        <h2 id={id}>{title}</h2>
        <span className="deshi-hair" aria-hidden="true" />
      </div>
    </header>
  );
}

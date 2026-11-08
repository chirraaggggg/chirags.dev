import {
  StampLotus,
  StampMandala,
  StampPaisley,
  StampSun,
  StampTemple,
} from "@/components/indian/stamps";

const STAMPS = {
  lotus: StampLotus,
  sun: StampSun,
  temple: StampTemple,
  mandala: StampMandala,
  paisley: StampPaisley,
} as const;

export function SectionHead({
  id,
  title,
  glyph = "lotus",
  note,
}: {
  id: string;
  title: string;
  glyph?: keyof typeof STAMPS;
  note?: string;
}) {
  const Stamp = STAMPS[glyph];

  return (
    <div className="deshi-section-head">
      <Stamp />
      <h2 id={id}>{title}</h2>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

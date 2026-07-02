interface TimelineItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface TimelineSectionProps {
  items: TimelineItem[];
  label: string;
}

export function TimelineSection({ items, label }: TimelineSectionProps) {
  return (
    <section>
      <span className="mb-8 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
        {label}
      </span>
      <div className="space-y-8">
        {items.map((item) => (
          <div key={`${item.role}-${item.company}`}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-medium text-white">
                {item.role}{" "}
                <span className="text-white/40">@ {item.company}</span>
              </p>
              <span className="shrink-0 text-xs text-white/30">
                {item.period}
              </span>
            </div>
            <p className="mt-1 max-w-[600px] text-sm leading-relaxed text-white/50">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

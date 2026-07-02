interface AboutSectionProps {
  paragraphs: readonly string[];
}

export function AboutSection({ paragraphs }: AboutSectionProps) {
  return (
    <div className="max-w-[700px] space-y-5 text-base leading-relaxed text-white/70">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

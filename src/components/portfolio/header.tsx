import { TagPills } from "@/components/portfolio/tag-pills";

const TAGS = ["Full-Stack Developer", "AI Engineer", "Indie Hacker"];

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  return (
    <header className="relative">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[clamp(2.5rem,5vw,3rem)] font-bold leading-none tracking-tight text-white">
            {name}
          </h1>
          <TagPills tags={TAGS} className="mt-4" />
        </div>
        <a
          href="/chat"
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Chat →
        </a>
      </div>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/60 transition-colors hover:border-white/40 hover:text-white/80"
      >
        View Resume →
      </a>
    </header>
  );
}

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectBadge({
  kind,
  className,
}: {
  kind: Project["badge"];
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4", className)}
      {...common}
    >
      {kind === "spark" && (
        <>
          <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
          <path d="m6.5 6.5 2.8 2.8M14.7 14.7l2.8 2.8M17.5 6.5l-2.8 2.8M9.3 14.7l-2.8 2.8" />
          <circle cx="12" cy="12" r="1.8" />
        </>
      )}
      {kind === "rocket" && (
        <>
          <path d="M13.5 5.5c3-3 6-1.5 6-1.5s1.5 3-1.5 6l-5 5-4-4 4.5-5.5Z" />
          <path d="m9 10-4 1 2.5 2.5M14 15l-1 4-2.5-2.5" />
          <path d="m6 18-1.5 1.5" />
        </>
      )}
      {kind === "branch" && (
        <>
          <circle cx="7" cy="6" r="2" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="9" r="2" />
          <path d="M7 8v8M9 8c4 0 6-1 6-3" />
        </>
      )}
      {kind === "ledger" && (
        <>
          <rect x="4.5" y="4" width="15" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h4" />
        </>
      )}
      {kind === "orbit" && (
        <>
          <circle cx="12" cy="12" r="3" />
          <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(-24 12 12)" />
          <circle cx="18.6" cy="7.6" r="1.2" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

/* -------------------------------------------------------------------------
 * Generated product previews. No screenshots to keep in sync — each project
 * gets a small abstract UI drawn from the same tokens.
 * ---------------------------------------------------------------------- */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[12px] border border-ink/10 bg-paper-sunken">
      <div className="absolute inset-x-0 top-0 flex h-6 items-center gap-1 border-b border-ink/10 px-2">
        <span className="size-1 rounded-full bg-ink/25" />
        <span className="size-1 rounded-full bg-ink/15" />
        <span className="ml-2 h-1 w-16 rounded-full bg-ink/10" />
      </div>
      <div className="absolute inset-x-0 top-6 bottom-0 p-3">{children}</div>
    </div>
  );
}

function Line({ w = "w-full", className }: { w?: string; className?: string }) {
  return <span className={cn("block h-1 rounded-full bg-ink/15", w, className)} />;
}

export function ProjectMockup({ project }: { project: Project }) {
  if (project.mockup === "agent") {
    return (
      <Frame>
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-ink/20 bg-paper px-2 py-1.5">
            <ProjectBadge kind="spark" className="size-3 shrink-0" />
            <span className="truncate font-code text-[7px] tracking-tight text-ink/60">
              a pricing page for a developer tool
            </span>
            <span className="ml-auto font-code text-[7px] text-ink/35">↵</span>
          </div>
          <div className="grid flex-1 grid-cols-[1.15fr_0.85fr] gap-1.5">
            <div className="flex flex-col justify-between rounded-md border border-ink/10 bg-paper p-2">
              <div className="space-y-1">
                <span className="block font-serif text-[13px] leading-none">Ship faster</span>
                <Line w="w-4/5" />
                <Line w="w-3/5" />
              </div>
              <div className="flex gap-1">
                <span className="rounded-full bg-ink px-1.5 py-0.5 font-code text-[5px] text-paper">
                  Start
                </span>
                <span className="rounded-full border border-ink/25 px-1.5 py-0.5 font-code text-[5px] text-ink/60">
                  Docs
                </span>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-1.5">
              <div className="rounded-md border border-ink/10 bg-paper p-1.5">
                <Line w="w-1/2" />
                <div className="mt-1.5 h-3 w-6 rounded-sm bg-ink/15" />
              </div>
              <div className="rounded-md border border-ink/10 bg-paper p-1.5">
                <div className="flex gap-0.5">
                  {[3, 5, 4, 7, 6, 9].map((height, index) => (
                    <span
                      key={index}
                      className="w-1 rounded-sm bg-ink/25"
                      style={{ height: height * 1.4 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 font-code text-[6px] tracking-wide text-ink/40 uppercase">
            <span className="size-1 animate-pulse rounded-full bg-ink" />
            generating · 42 components
          </div>
        </div>
      </Frame>
    );
  }

  if (project.mockup === "ranking") {
    return (
      <Frame>
        <div className="flex h-full flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-serif text-[13px] leading-none">This week</span>
            <span className="font-code text-[6px] tracking-wide text-ink/40 uppercase">
              41 launches
            </span>
          </div>
          {[
            { name: "Harmony", score: 92 },
            { name: "Parcel", score: 78 },
            { name: "Vuno", score: 64 },
            { name: "Sift", score: 51 },
            { name: "Mono", score: 39 },
          ].map((row, index) => (
            <div key={row.name} className="flex items-center gap-2">
              <span className="w-2 font-code text-[6px] text-ink/35">{index + 1}</span>
              <span className="size-3.5 rounded-sm bg-ink/15" />
              <span className="w-12 truncate text-[7px] text-ink/70">{row.name}</span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                <span
                  className="block h-full rounded-full bg-ink/50"
                  style={{ width: `${row.score}%` }}
                />
              </span>
              <span className="font-code text-[6px] text-ink/40">{row.score}</span>
            </div>
          ))}
          <div className="mt-auto flex items-center justify-between rounded-md border border-dashed border-ink/25 px-2 py-1">
            <span className="font-code text-[6px] tracking-wide text-ink/45 uppercase">
              Closes in 2d 04h
            </span>
            <span className="font-code text-[6px] text-ink/60">Submit →</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (project.mockup === "repo") {
    return (
      <Frame>
        <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-1.5">
          <div className="space-y-1 rounded-md border border-ink/10 bg-paper p-1.5">
            {["src/", " agent.ts", " server/", " db.ts", " ui/"].map((file, index) => (
              <div
                key={file}
                className={cn(
                  "truncate font-code text-[6px]",
                  index === 1 ? "text-ink" : "text-ink/45"
                )}
              >
                {file}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex-1 space-y-1 rounded-md border border-ink/10 bg-paper p-1.5">
              {[0.9, 0.65, 0.8, 0.5, 0.7, 0.35].map((width, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="w-1 font-code text-[5px] text-ink/25">{index + 1}</span>
                  <span
                    className="h-[3px] rounded-full bg-ink/20"
                    style={{ width: `${width * 100}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="rounded-md bg-ink px-2 py-1.5 text-paper">
              <p className="text-[6px] leading-snug">
                Entry point is <span className="font-code">agent.ts</span>; it calls the
                planner in <span className="font-code">server/plan.ts</span>.
              </p>
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  if (project.mockup === "ledger") {
    return (
      <Frame>
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-end justify-between">
            <div>
              <span className="block font-code text-[6px] tracking-wide text-ink/40 uppercase">
                Runway
              </span>
              <span className="font-serif text-[20px] leading-none">11.4</span>
              <span className="ml-1 font-code text-[6px] text-ink/40">months</span>
            </div>
            <div className="text-right">
              <span className="block font-code text-[6px] tracking-wide text-ink/40 uppercase">
                Outstanding
              </span>
              <span className="font-code text-[10px]">$18,400</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            {[
              ["Northwind", "PAID"],
              ["Kite Studio", "SENT"],
              ["Mono Labs", "SENT"],
              ["Personal", "DRAFT"],
            ].map(([name, status]) => (
              <div
                key={name}
                className="flex items-center justify-between border-b border-dashed border-ink/15 pb-1"
              >
                <span className="text-[7px] text-ink/65">{name}</span>
                <span className="font-code text-[5px] tracking-wide text-ink/40">{status}</span>
              </div>
            ))}
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-ink/10">
            <span className="block h-full w-[68%] rounded-full bg-ink/50" />
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame>
      <div className="relative h-full overflow-hidden">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="absolute rounded-full border border-ink/25"
            style={{
              width: 26 + index * 18,
              height: 26 + index * 18,
              left: `${12 + index * 12}%`,
              top: `${10 + index * 9}%`,
            }}
          />
        ))}
        <div className="absolute right-1 bottom-1 left-1 space-y-1 rounded-md border border-ink/10 bg-paper/90 p-1.5 backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-ink/20" />
            <div className="flex-1">
              <Line w="w-10" />
              <Line w="w-6" className="mt-0.5" />
            </div>
            <span className="font-code text-[5px] text-ink/40">2d ago</span>
          </div>
          <p className="folio-italic text-[7px] text-ink/55">Reply to the intro from Mira.</p>
        </div>
      </div>
    </Frame>
  );
}

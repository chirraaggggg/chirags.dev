"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useEffect, useState } from "react";

import { FOLIO, FOLIO_SECTIONS } from "@/config/folio";
import { PROJECTS } from "@/data/projects";
import { cn } from "@/lib/utils";

const itemClass =
  "flex cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-left text-[13px] text-ink/75 outline-none data-[selected=true]:bg-ink data-[selected=true]:text-paper";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("folio:open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("folio:open-command", onOpen);
    };
  }, []);

  const run = (action: () => void) => {
    setOpen(false);
    // Let the dialog close before scrolling / navigating.
    window.setTimeout(action, 120);
  };

  const goTo = (id: string) => {
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(FOLIO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${FOLIO.email}`;
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-ink/20 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed top-[12vh] left-1/2 z-[101] w-[min(560px,calc(100%-2rem))] -translate-x-1/2 overflow-hidden rounded-[18px] border border-ink/10 bg-paper-raised shadow-[0_40px_80px_-32px_rgba(10,31,209,0.35)] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          <DialogPrimitive.Title className="sr-only">Command palette</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Jump to a section, open a project or copy an email address.
          </DialogPrimitive.Description>

          <Command label="Command palette" loop>
            <div className="flex items-center gap-2 border-b border-dashed border-ink/15 px-4">
              <span className="font-code text-[10px] tracking-[0.18em] text-ink/40 uppercase">
                ⌘K
              </span>
              <Command.Input
                autoFocus
                placeholder="Jump somewhere…"
                className="h-12 w-full bg-transparent font-grotesk text-[14px] text-ink placeholder:text-ink/35 focus:outline-none"
              />
            </div>
            <Command.List className="max-h-[52vh] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-8 text-center folio-italic text-[15px] text-ink/50">
                Nothing here. Try “work” or “email”.
              </Command.Empty>

              <Command.Group
                heading="Sections"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-code [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-ink/35 [&_[cmdk-group-heading]]:uppercase"
              >
                {FOLIO_SECTIONS.map((section) => (
                  <Command.Item
                    key={section.id}
                    value={`${section.label} ${section.id}`}
                    onSelect={() => run(() => goTo(section.id))}
                    className={itemClass}
                  >
                    <span>{section.label}</span>
                    <span className="font-code text-[9px] tracking-[0.14em] text-ink/35 uppercase">
                      Section
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group
                heading="Projects"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-code [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-ink/35 [&_[cmdk-group-heading]]:uppercase"
              >
                {PROJECTS.slice(0, 5).map((project) => (
                  <Command.Item
                    key={project.slug}
                    value={`${project.name} ${project.company} ${project.tagline}`}
                    onSelect={() =>
                      run(() => {
                        window.dispatchEvent(
                          new CustomEvent("folio:open-project", {
                            detail: project.slug,
                          })
                        );
                        goTo("work");
                      })
                    }
                    className={itemClass}
                  >
                    <span>{project.name}</span>
                    <span className="font-code text-[9px] tracking-[0.14em] text-ink/35 uppercase">
                      {project.date}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group
                heading="Actions"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-code [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-ink/35 [&_[cmdk-group-heading]]:uppercase"
              >
                <Command.Item
                  value="Copy email contact"
                  onSelect={() => run(copyEmail)}
                  className={itemClass}
                >
                  <span>{copied ? "Copied to clipboard" : "Copy email"}</span>
                  <span className="font-code text-[9px] tracking-[0.14em] text-ink/35 uppercase">
                    {FOLIO.email}
                  </span>
                </Command.Item>
                <Command.Item
                  value="Toggle theme dark light"
                  onSelect={() =>
                    run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
                  }
                  className={itemClass}
                >
                  <span>Toggle theme</span>
                  <span className="font-code text-[9px] tracking-[0.14em] text-ink/35 uppercase">
                    {resolvedTheme === "dark" ? "Light" : "Dark"}
                  </span>
                </Command.Item>
                {[
                  { label: "GitHub", href: FOLIO.githubUrl },
                  { label: "LinkedIn", href: FOLIO.linkedinUrl },
                  { label: "X / Twitter", href: FOLIO.xUrl },
                ].map((link) => (
                  <Command.Item
                    key={link.label}
                    value={`Open ${link.label}`}
                    onSelect={() => run(() => window.open(link.href, "_blank"))}
                    className={itemClass}
                  >
                    <span>Open {link.label}</span>
                    <span className="font-code text-[9px] tracking-[0.14em] text-ink/35 uppercase">
                      ↗
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>

          <div className="flex items-center justify-between border-t border-dashed border-ink/15 px-4 py-2.5 font-code text-[9px] tracking-[0.16em] text-ink/35 uppercase">
            <span>↑↓ navigate · ↵ open</span>
            <span className={cn(copied && "text-ink")}>esc close</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const openCommandPalette = () =>
  window.dispatchEvent(new Event("folio:open-command"));

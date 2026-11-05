"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

type TypewriterProps = {
  words: string[];
  className?: string;
  /** ms per character while typing / deleting. */
  speed?: number;
  hold?: number;
};

export function Typewriter({
  words,
  className,
  speed = 72,
  hold = 1600,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (words.length === 0 || prefersReduced) return;

    const word = words[wordIndex % words.length];

    if (!deleting && text === word) {
      const timeout = window.setTimeout(() => setDeleting(true), hold);
      return () => window.clearTimeout(timeout);
    }

    if (deleting && text === "") {
      const timeout = window.setTimeout(() => {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
      }, speed * 2);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(
      () => {
        setText((current) =>
          deleting ? word.slice(0, current.length - 1) : word.slice(0, current.length + 1)
        );
      },
      deleting ? speed * 0.45 : speed
    );

    return () => window.clearTimeout(timeout);
  }, [deleting, hold, prefersReduced, speed, text, wordIndex, words]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span aria-live="polite" className="sr-only">
        {words[wordIndex % words.length]}
      </span>
      <span aria-hidden="true">{prefersReduced ? words[0] : text}</span>
      <span aria-hidden="true" className="folio-caret ml-1 inline-block">
        _
      </span>
    </span>
  );
}

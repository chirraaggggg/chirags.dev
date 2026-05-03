"use client";

import { useEffect, useState } from "react";

import type { GitHubContributionsResponse } from "@/types/portfolio";

export function useContributions() {
  const [data, setData] = useState<GitHubContributionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadContributions() {
      try {
        const response = await fetch("/api/github", {
          signal: abortController.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load GitHub contributions.");
        }

        const json = (await response.json()) as GitHubContributionsResponse;
        setData(json);
      } catch (thrownError) {
        if (abortController.signal.aborted) {
          return;
        }

        const message =
          thrownError instanceof Error
            ? thrownError.message
            : "Failed to load GitHub contributions.";

        setError(message);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadContributions();

    return () => abortController.abort();
  }, []);

  return {
    data,
    error,
    isLoading,
  };
}
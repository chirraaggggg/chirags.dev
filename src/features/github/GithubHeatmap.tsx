"use client";

import { useTheme } from "next-themes";
import { useMemo } from "react";

import { PORTFOLIO_COPY, SITE_INFO } from "@/config/site";
import type { GitHubContributionWeek } from "@/types/portfolio";

import { useContributions } from "./useContributions";

const CELL_SIZE = 10;
const CELL_GAP = 3;
const VISIBLE_COLUMNS = 52;
const VISIBLE_ROWS = 7;

const DARK_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const LIGHT_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

export function GithubHeatmap() {
  const { resolvedTheme } = useTheme();
  const { data, error, isLoading } = useContributions();

  const weeks = useMemo(() => {
    const filledWeeks = normalizeWeeks(data?.weeks ?? []);

    if (filledWeeks.length > VISIBLE_COLUMNS) {
      return filledWeeks.slice(-VISIBLE_COLUMNS);
    }

    return filledWeeks;
  }, [data?.weeks]);

  const colors =
    resolvedTheme === PORTFOLIO_COPY.theme.light ? LIGHT_COLORS : DARK_COLORS;
  const totalContributions = data?.totalContributions ?? 0;
  const year = data?.year ?? new Date().getUTCFullYear() - 1;
  const width = VISIBLE_COLUMNS * CELL_SIZE + (VISIBLE_COLUMNS - 1) * CELL_GAP;
  const height = VISIBLE_ROWS * CELL_SIZE + (VISIBLE_ROWS - 1) * CELL_GAP;

  if (error && !data) {
    return (
      <p className="text-[0.78rem] text-(--text-muted)">
        {PORTFOLIO_COPY.github.error}
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={`GitHub contributions heatmap for ${SITE_INFO.name}`}
          className="block max-w-none"
        >
          {weeks.map((week, weekIndex) =>
            week.contributionDays.map((day, dayIndex) => {
              const fill =
                day.contributionCount === 0
                  ? colors[0]
                  : getColor(day.contributionCount, colors);

              return (
                <rect
                  key={`${day.date}-${weekIndex}-${dayIndex}`}
                  x={weekIndex * (CELL_SIZE + CELL_GAP)}
                  y={dayIndex * (CELL_SIZE + CELL_GAP)}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  fill={fill}
                  rx={0}
                  ry={0}
                />
              );
            })
          )}
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-[0.78rem] text-(--text-muted)">
        <p className="leading-6">
          {PORTFOLIO_COPY.github.captionTemplate
            .replace("{count}", String(totalContributions))
            .replace("{year}", String(year))}
        </p>

        <div className="flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.24em]">
          <span>{PORTFOLIO_COPY.github.legendLess}</span>
          <div className="flex items-center gap-1">
            {colors.map((color) => (
              <svg
                key={color}
                viewBox="0 0 10 10"
                width="10"
                height="10"
                aria-hidden="true"
                className="block"
              >
                <rect x="0" y="0" width="10" height="10" fill={color} />
              </svg>
            ))}
          </div>
          <span>{PORTFOLIO_COPY.github.legendMore}</span>
        </div>
      </div>

      {isLoading ? (
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-(--text-muted)">
          {PORTFOLIO_COPY.github.loading}
        </p>
      ) : null}
    </div>
  );
}

function normalizeWeeks(weeks: GitHubContributionWeek[]) {
  if (weeks.length === VISIBLE_COLUMNS) {
    return weeks;
  }

  if (weeks.length > VISIBLE_COLUMNS) {
    return weeks.slice(-VISIBLE_COLUMNS);
  }

  const padding = Array.from({ length: VISIBLE_COLUMNS - weeks.length }, () => ({
    contributionDays: Array.from({ length: VISIBLE_ROWS }, () => ({
      date: "",
      contributionCount: 0,
      color: "#000000",
      contributionLevel: "NONE" as const,
    })),
  }));

  return [...padding, ...weeks];
}

function getColor(count: number, colors: string[]) {
  if (count <= 3) return colors[1];
  if (count <= 6) return colors[2];
  if (count <= 9) return colors[3];
  return colors[4];
}
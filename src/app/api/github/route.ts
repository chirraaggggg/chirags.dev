import { NextResponse } from "next/server";

import { GITHUB_USERNAME } from "@/config/site";

export const dynamic = "force-dynamic";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "Missing GITHUB_TOKEN." }, { status: 500 });
  }

  const { year, from, to } = getPreviousCalendarYearRange();

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GitHubContributions($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    contributionLevel
                    color
                    date
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        login: GITHUB_USERNAME,
        from,
        to,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "GitHub API request failed." },
      { status: response.status }
    );
  }

  const payload = (await response.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number;
            weeks: GitHubContributionWeek[];
          };
        };
      };
    };
    errors?: Array<{ message: string }>;
  };

  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return NextResponse.json(
      {
        error:
          payload.errors?.[0]?.message ?? "Unable to read GitHub contributions.",
      },
      { status: 500 }
    );
  }

  const responseBody: GitHubContributionsResponse = {
    totalContributions: calendar.totalContributions,
    year,
    weeks: trimWeeks(calendar.weeks),
  };

  return NextResponse.json(responseBody);
}

type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
};

type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
};

type GitHubContributionsResponse = {
  totalContributions: number;
  year: number;
  weeks: GitHubContributionWeek[];
};

function getPreviousCalendarYearRange() {
  const year = new Date().getUTCFullYear() - 1;

  return {
    year,
    from: `${year}-01-01T00:00:00Z`,
    to: `${year + 1}-01-01T00:00:00Z`,
  };
}

function trimWeeks(weeks: GitHubContributionWeek[]) {
  if (weeks.length <= 52) {
    return weeks;
  }

  return weeks.slice(-52);
}
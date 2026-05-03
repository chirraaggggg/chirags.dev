export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "twitter" | "email";
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  type: "intern" | "freelance";
}

export interface Project {
  tags: string[];
  name: string;
  href: string;
  description: string;
}

export type StackItem = string;

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionsResponse {
  totalContributions: number;
  year: number;
  weeks: GitHubContributionWeek[];
}
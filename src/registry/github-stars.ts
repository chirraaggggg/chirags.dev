import React from "react";

export function GitHubStars({
  repo,
  stargazersCount,
  ...props
}: {
  repo: string;
  stargazersCount: number;
} & React.ComponentProps<"div">) {
  return React.createElement(
    "div",
    props,
    React.createElement("a", {
      href: `https://github.com/${repo}`,
      target: "_blank",
      rel: "noopener noreferrer",
      children: `${repo} (${stargazersCount})`,
    })
  );
}

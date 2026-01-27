import React from "react";

interface FlipSentencesProps {
  children: string[];
  className?: string;
  as?: any;
  variants?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  onIndexChange?: (index: number) => void;
}

export const FlipSentences = ({
  children,
  className,
  as: Component,
  variants,
  initial,
  animate,
  exit,
  transition,
  onIndexChange,
}: FlipSentencesProps) => {
  if (!Component) {
    return React.createElement("span", { className }, children?.[0]);
  }

  return React.createElement(
    Component,
    {
      className,
      variants,
      initial,
      animate,
      exit,
      transition,
    },
    children?.[0]
  );
};


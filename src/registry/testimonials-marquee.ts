// Testimonials marquee component exports
// These are placeholder exports for MDX components
import React from "react";

export type Testimonial = {
  authorAvatar: string;
  authorName: string;
  authorTagline: string;
  url: string;
  quote: string;
};

export const Testimonial = ({ children }: { children: React.ReactNode }) => {
  return React.createElement("div", { className: "testimonial" }, children);
};

export const TestimonialAuthor = ({ children }: { children: React.ReactNode }) => {
  return React.createElement("div", { className: "testimonial-author" }, children);
};

export const TestimonialAuthorName = ({ children }: { children: React.ReactNode }) => {
  return React.createElement("div", { className: "testimonial-author-name" }, children);
};

export const TestimonialAuthorTagline = ({ children }: { children: React.ReactNode }) => {
  return React.createElement("div", { className: "testimonial-author-tagline" }, children);
};

export const TestimonialAvatar = ({ children }: { children: React.ReactNode }) => {
  return React.createElement("div", { className: "testimonial-avatar" }, children);
};

export const TestimonialAvatarImg = ({ src, alt }: { src: string; alt: string }) => {
  return React.createElement("img", {
    src,
    alt,
    className: "testimonial-avatar-img",
  });
};

export const TestimonialAvatarRing = ({ children }: { children: React.ReactNode }) => {
  return React.createElement("div", { className: "testimonial-avatar-ring" }, children);
};

export const TestimonialQuote = ({ children }: { children: React.ReactNode }) => {
  return React.createElement("blockquote", { className: "testimonial-quote" }, children);
};

export const TestimonialVerifiedBadge = (props: React.ComponentProps<"div">) => {
  return React.createElement("div", {
    ...props,
    className: "testimonial-verified-badge",
  });
};

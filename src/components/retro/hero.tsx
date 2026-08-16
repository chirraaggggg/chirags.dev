import {
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";

import { Icons } from "@/components/icons";
import { RETRO } from "@/config/retro";

type LiveOnIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const LIVE_ON_ICONS: Record<string, LiveOnIcon> = {
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
  leetcode: Icons.leetcode,
};

/** White pixel cursor that sits beside the tags, exactly like the reference. */
function CustomCursor() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 3L21 11L13.5 13.5L11 21L4.5 3Z"
        fill="#ffffff"
        stroke="#111"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Google" rendered with its brand colors, letter by letter. */
function GoogleLogo({ word }: { word: string }) {
  const colors = ["g-blue", "g-red", "g-yellow", "g-blue", "g-green", "g-red"];
  return (
    <span className="google-logo">
      {word.split("").map((char, i) => (
        <span key={i} className={colors[i % colors.length]}>
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const name = RETRO.hero.firstName;

  return (
    <section id="home" className="hero">
      <div className="hero-center">
        {/* Handwritten intro */}
        <div className="greeting-inline">{RETRO.hero.script}</div>

        <div className="name-wrapper">
          {/* Blue tag + cursor */}
          <div className="floating-tag tag-blue">
            <span className="desktop-only">{RETRO.hero.tags.blue}</span>
            <span className="show-on-mobile">{RETRO.hero.tags.blue}</span>
            <div className="custom-cursor-img desktop-only">
              <CustomCursor />
            </div>
          </div>
          <div className="hero-visual" />

          {/* Red tag */}
          <div className="floating-tag tag-red">
            <span className="desktop-only">{RETRO.hero.tags.red}</span>
            <span className="show-on-mobile">Creator</span>
          </div>

          {/* Yellow tag */}
          <div className="floating-tag tag-yellow">
            <span className="desktop-only">{RETRO.hero.tags.yellow}</span>
            <span className="show-on-mobile">Explorer</span>
          </div>

          <div className="name-container">
            <h1 className="chunky-name">
              <span className="desktop-only">
                {name.split("").map((char, i) => (
                  <span
                    key={i}
                    className="typewriter-char"
                    style={{ animationDelay: `${0.5 + i * 0.15}s` }}
                  >
                    {char}
                  </span>
                ))}
                <span className="blinking-cursor">_</span>
              </span>
              <span className="mobile-only">{name}</span>
            </h1>
          </div>

          {/* LIVE ON corner */}
          <div className="subtitle-group live-on-corner" style={{ gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span className="status-dot" />
              <span className="subtitle">{RETRO.hero.liveOn}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              {RETRO.hero.liveOnLinks.map(({ label, href, Icon }) => {
                const IconComp = LIVE_ON_ICONS[Icon];
                return (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="social-icon"
                    aria-label={label}
                  >
                    <IconComp width={28} height={28} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="description">
          <span>
            {RETRO.hero.description.line1}
            <br />
            {RETRO.hero.description.line2}{" "}
            <GoogleLogo word={RETRO.hero.description.colored} />{" "}
            {RETRO.hero.description.line3}
          </span>
        </p>

        <div className="buttons">
          <a
            href={RETRO.hero.talkTo.href}
            className="btn btn-black desktop-contact-btn"
          >
            {RETRO.hero.talkTo.label}
          </a>
          <a href="/contact" className="btn btn-black mobile-contact-btn">
            {RETRO.hero.talkTo.label}
          </a>
          <a href={RETRO.hero.resources.href} className="btn btn-green">
            {RETRO.hero.resources.label}
          </a>
        </div>

        {/* Hidden easter-egg spawn spot, matches reference */}
        <div
          id="pacman-spawn-spot"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "2px dashed rgba(255, 215, 0, 0.5)",
            margin: "30px auto 0 auto",
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.5s",
          }}
        >
          <span
            style={{
              fontSize: 8,
              color: "rgba(255, 215, 0, 0.8)",
              fontFamily: "var(--font-pixel-2p)",
              letterSpacing: 1,
            }}
          >
            SPAWN
          </span>
        </div>
      </div>
    </section>
  );
}

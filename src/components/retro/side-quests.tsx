"use client";

import Link from "next/link";
import { useState } from "react";

import { RETRO } from "@/config/retro";

type TabId = "github" | "brandCollabs" | "art" | "bucketList";

const TECH_COLORS = [
  "#fde047",
  "#d1d5db",
  "#fef08a",
  "#bfdbfe",
  "#f3f4f6",
  "#bbf7d0",
];

/** Keyboard-style ESC button that returns to the homepage. */
function EscButton() {
  return (
    <Link
      href="/"
      style={{
        background: "linear-gradient(#fdfdfd 0%, #ececec 100%)",
        color: "#111",
        borderWidth: "1px 1px 3px",
        borderStyle: "solid",
        borderColor: "#fff #d4d4d4 #a8a8a8",
        borderRadius: 6,
        padding: "8px 12px",
        fontFamily: "var(--font-pixel-2p)",
        fontSize: "var(--font-xxs)",
        letterSpacing: 1,
        cursor: "pointer",
        boxShadow: "inset 0 1px 2px #fff, 0 2px 3px rgba(0,0,0,0.15)",
        transition: "0.1s",
        textDecoration: "none",
        textTransform: "uppercase",
      }}
    >
      ESC
    </Link>
  );
}

/** Tab content header: colored `>` + title + ESC button. */
function TabHeader({
  title,
  chevronColor,
}: {
  title: string;
  chevronColor: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
        gap: 12,
      }}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 8 }}>
        <span
          style={{
            color: chevronColor,
            fontFamily: "var(--font-pixel-2p)",
            fontSize: "clamp(13px, 4vw, 18px)",
            paddingTop: 6,
            lineHeight: 1.4,
          }}
        >
          &gt;
        </span>
        <h2
          style={{
            fontFamily: "var(--font-pixel-2p)",
            fontSize: "clamp(13px, 4vw, 18px)",
            color: "#0f172a",
            margin: 0,
            position: "relative",
            zIndex: 1,
            lineHeight: 1.4,
            paddingTop: 6,
            wordSpacing: -8,
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          {title}
        </h2>
      </div>
      <EscButton />
    </div>
  );
}

/** GitHub tab — project cards. */
function GitHubTab() {
  return (
    <>
      <TabHeader
        title="GITHUB"
        chevronColor={
          RETRO.sideQuests.tabs.find((t) => t.id === "github")!.chevronColor
        }
      />
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
          paddingBottom: 30,
        }}
      >
        {RETRO.sideQuests.github.projects.map((project, i) => (
          <div
            key={project.title}
            style={{
              background: "#fff",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              padding: 24,
              width: "100%",
              maxWidth: 350,
              boxShadow:
                "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: "var(--font-xxs)",
                  fontWeight: 700,
                  fontFamily: "var(--font-inter)",
                  background: "#f1f5f9",
                  color: "#475569",
                  padding: "4px 8px",
                  borderRadius: 4,
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  fontSize: "var(--font-xs)",
                  fontWeight: 600,
                  fontFamily: "var(--font-inter)",
                  color: "#94a3b8",
                }}
              >
                {project.date}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-pixel-2p)",
                fontSize: "var(--font-md)",
                marginBottom: 12,
                color: "#1e293b",
                lineHeight: 1.4,
              }}
            >
              {project.title}
            </h3>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {project.tech.map((tag) => (
                <div
                  key={tag}
                  style={{
                    border: "1px solid rgba(0,0,0,0.1)",
                    padding: "6px 10px",
                    fontSize: "var(--font-xxs)",
                    fontWeight: 600,
                    background: TECH_COLORS[(i + project.tech.indexOf(tag)) % TECH_COLORS.length],
                    color: "#111",
                    borderRadius: 4,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "var(--font-sm)",
                fontWeight: 500,
                lineHeight: 1.6,
                marginBottom: 20,
                color: "#475569",
              }}
            >
              {project.description}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                marginTop: "auto",
              }}
            >
              <a
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                style={{
                  background: "#0f172a",
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: 6,
                  fontFamily: "var(--font-pixel-2p)",
                  fontSize: "var(--font-xxs)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "transform 0.1s",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 32,
                }}
              >
                {project.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** COLLABS tab — square 1:1 brand cards. */
function CollabsTab() {
  return (
    <>
      <TabHeader
        title="COLLABS"
        chevronColor={
          RETRO.sideQuests.tabs.find((t) => t.id === "brandCollabs")!
            .chevronColor
        }
      />
      <div style={{ marginBottom: 24, textAlign: "left", fontFamily: "var(--font-inter)" }}>
        <p
          style={{
            color: "#64748b",
            fontSize: "var(--font-md)",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {RETRO.sideQuests.collabs.description}
        </p>
      </div>
      <div className="collabs-grid">
        {RETRO.sideQuests.collabs.items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="collab-card"
            style={{
              background: "#fff",
              border: "1px solid #cbd5e1",
              borderRadius: 12,
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-pixel-2p)",
                fontSize: "var(--font-xxs)",
                color: "#475569",
                letterSpacing: 1,
                textAlign: "center",
                padding: 8,
                lineHeight: 1.6,
              }}
            >
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </>
  );
}

/** ART tab — polaroid-style cards. */
function ArtTab() {
  return (
    <>
      <TabHeader
        title="ART"
        chevronColor={RETRO.sideQuests.tabs.find((t) => t.id === "art")!.chevronColor}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 32,
          paddingBottom: 30,
        }}
      >
        {RETRO.sideQuests.art.items.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#fff",
              padding: "12px 12px 24px",
              border: "1px solid #cbd5e1",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              transform: "rotate(1deg)",
              width: 240,
              textDecoration: "none",
              position: "relative",
              display: "block",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%) rotate(-1deg)",
                width: 80,
                height: 22,
                background: "rgba(253, 224, 71, 0.7)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-pixel-2p)",
                  fontSize: "var(--font-xxs)",
                  color: "#64748b",
                  letterSpacing: 1,
                  textAlign: "center",
                  padding: 8,
                  lineHeight: 1.6,
                }}
              >
                {item.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

/** BUCKET LIST tab — checkbox rows. */
function BucketListTab() {
  return (
    <>
      <TabHeader
        title="BUCKET LIST"
        chevronColor={
          RETRO.sideQuests.tabs.find((t) => t.id === "bucketList")!.chevronColor
        }
      />
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          className="bucket-list-desc-container"
          style={{ textAlign: "left", fontFamily: "var(--font-montserrat)" }}
        >
          <p
            style={{
              color: "#64748b",
              fontSize: "var(--font-md)",
              margin: 0,
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            {RETRO.sideQuests.bucketList.description}
          </p>
        </div>
        {RETRO.sideQuests.bucketList.items.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              padding: "12px 0",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                border: "2px solid #94a3b8",
                borderRadius: 6,
                background: item.done ? "#22c55e" : "#fff",
                flexShrink: 0,
                marginTop: 2,
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "var(--font-sm)",
                fontWeight: 600,
                color: item.done ? "#94a3b8" : "#334155",
                textDecoration: item.done ? "line-through" : "none",
                lineHeight: 1.6,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export function SideQuests({ initialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState<TabId | null>(
    initialTab === "github" ||
      initialTab === "brandCollabs" ||
      initialTab === "art" ||
      initialTab === "bucketList"
      ? initialTab
      : null,
  );

  const tabs = RETRO.sideQuests.tabs;

  return (
    <main className="projects-main">
      <div style={{ position: "relative", width: "100%" }}>
        <div
          className="binder-wrapper"
          style={{
            background: "linear-gradient(180deg, #d8d8d8 0%, #b8b8b8 100%)",
            borderRadius: 14,
            border: "1px solid #777",
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,0,0,0.2), 0 24px 48px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.15)",
            display: "flex",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Spine */}
          <div
            className="binder-spine"
            style={{
              alignSelf: "stretch",
              minHeight: "100%",
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 50%, rgba(255,255,255,0.2) 100%)",
              borderRadius: 8,
              boxShadow: "inset 2px 0 5px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="binder-ring"
                style={{
                  background: "linear-gradient(180deg, #e2e8f0, #94a3b8)",
                  borderRadius: 4,
                  boxShadow: "inset 0 1px 2px #fff, 0 2px 4px rgba(0,0,0,0.3)",
                }}
              />
            ))}
          </div>

          {/* Inner scroll area */}
          <div
            className="hide-scrollbar binder-inner-scroll"
            style={{
              flex: 1,
              minWidth: 0,
              background: "#fdfdfd",
              borderRadius: 8,
              border: "1px solid #d4d4d4",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05), 0 1px 2px #fff",
              scrollbarWidth: "none",
              position: "relative",
            }}
          >
            {/* 24px grid-paper overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                backgroundImage:
                  "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding:
                  "clamp(12px, 4vw, 40px) clamp(10px, 4vw, 40px) 60px clamp(16px, 6vw, 60px)",
                minHeight: "100%",
              }}
            >
              {activeTab === null ? (
                /* Landing card */
                <div
                  style={{
                    height: "100%",
                    minHeight: 450,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div className="binder-inner-card">
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
                        borderRadius: 20,
                        boxShadow:
                          "inset 0 2px 4px #fff, inset 0 -2px 4px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 32,
                        position: "relative",
                      }}
                    >
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#64748b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 16,
                          right: 16,
                          width: 6,
                          height: 6,
                          background: "#10b981",
                          borderRadius: "50%",
                          boxShadow: "0 0 8px #10b981",
                        }}
                      />
                    </div>
                    <h1
                      style={{
                        fontFamily: "var(--font-pixel-2p)",
                        fontSize: "var(--font-xl)",
                        color: "#0f172a",
                        marginBottom: 24,
                        lineHeight: 1.3,
                        textShadow: "3px 3px 0px #e2e8f0",
                        letterSpacing: -2,
                      }}
                    >
                      {RETRO.sideQuests.landing.title.split(" ").map((word, i, arr) => (
                        <span key={i}>
                          {word}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </h1>
                    <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                      {tabs.map((tab) => (
                        <div
                          key={tab.id}
                          style={{
                            width: 28,
                            height: 4,
                            borderRadius: 2,
                            background: tab.gradient,
                            boxShadow:
                              "inset 0 1px 1px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.15)",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        lineHeight: 1.6,
                        margin: "0 auto",
                        fontSize: "var(--font-md)",
                        fontWeight: 500,
                        color: "#64748b",
                        maxWidth: 300,
                      }}
                    >
                      {RETRO.sideQuests.landing.description}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {activeTab === "github" && <GitHubTab />}
                  {activeTab === "brandCollabs" && <CollabsTab />}
                  {activeTab === "art" && <ArtTab />}
                  {activeTab === "bucketList" && <BucketListTab />}
                </>
              )}
            </div>
          </div>

          {/* Right-edge vertical tabs */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 50,
              transform: "translateX(100%)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              zIndex: -1,
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className="binder-tab"
                style={{
                  background: tab.gradient,
                  color: "#fff",
                  borderTop: `1px solid ${tab.borderTop}`,
                  borderBottom: `1px solid ${tab.borderTop}`,
                  borderLeft: `1px solid ${tab.borderLeft}`,
                  borderRight: `5px solid ${tab.borderRight}`,
                  borderRadius: "0 6px 6px 0",
                  padding: "16px 12px",
                  fontFamily: "var(--font-pixel-2p)",
                  fontSize: "var(--font-xs)",
                  letterSpacing: 1,
                  cursor: "pointer",
                  writingMode: "vertical-rl",
                  boxShadow:
                    "inset 1px 0 2px rgba(255,255,255,0.4), 3px 0 5px rgba(0,0,0,0.2)",
                  marginLeft: 0,
                  transition: "all 0.05s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textShadow: "1px 1px 0px rgba(0,0,0,0.2)",
                }}
                onClick={() => setActiveTab(tab.id as TabId)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

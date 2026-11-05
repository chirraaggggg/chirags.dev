import { ImageResponse } from "next/og";

import { FOLIO } from "@/config/folio";

export const alt = "Chirag Sharma — solo founder, full-stack and AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafbfd",
          color: "#0a1fd1",
          padding: "64px 72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontFamily: "ui-monospace, monospace",
            borderBottom: "1px dashed rgba(10,31,209,0.3)",
            paddingBottom: 18,
          }}
        >
          <span>Portfolio / 2026</span>
          <span>Gurugram, IN</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              fontSize: 168,
              lineHeight: 0.86,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            Chirag is
          </div>
          <div style={{ fontSize: 132, fontStyle: "italic", lineHeight: 1 }}>
            building.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px dashed rgba(10,31,209,0.3)",
            paddingTop: 20,
            fontSize: 24,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>{FOLIO.role}</span>
          <span>chirags.dev</span>
        </div>
      </div>
    ),
    size
  );
}

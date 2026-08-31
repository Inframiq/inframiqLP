import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Inframiq — 24/7 Customer Support & Intelligent Software";

// The 3D monogram, read off disk at render time and inlined as a data URI —
// the light-on-dark version, since this card sits on a near-black field.
const markSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "inframiq-mark-dark.png")
).toString("base64")}`;

// Root-level convention — applies to every route that doesn't define its
// own opengraph-image, so every page gets a real preview image on social
// shares instead of a blank card (previously true of the whole site).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#050505",
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(79,141,255,0.25), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={64} height={103} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            inframIQ
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#c4c9d4",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          24/7 customer support, plus the security and business software Inframiq engineers to run it.
        </div>
      </div>
    ),
    { ...size }
  );
}

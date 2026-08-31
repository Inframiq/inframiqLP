import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Inframiq — 24/7 Customer Support & Intelligent Software";

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
          <svg width="60" height="84" viewBox="0 0 74 104" fill="none">
            <circle cx="11" cy="10" r="8.5" fill="#ffffff" />
            <path
              d="M11 18 L11 50 C11 64 17 74 28 74 C40 74 45 66 42 54"
              stroke="#ffffff"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25 47 C25 34 26 26 36 26 C48 26 58 30 58 44 L58 74 C58 84 59 89 61 91"
              stroke="#ffffff"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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

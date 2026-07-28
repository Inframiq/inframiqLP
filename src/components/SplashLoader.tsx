"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger, svg } from "animejs";

// A 12-line faceted diamond — outer ring, inner ring, then the spokes
// connecting them, in that DOM order so the staggered draw reads
// outward-to-inward rather than in an arbitrary sequence.
const OUTER_RING = ["M100,14 L186,100", "M186,100 L100,186", "M100,186 L14,100", "M14,100 L100,14"];
const INNER_RING = ["M100,58 L142,100", "M142,100 L100,142", "M100,142 L58,100", "M58,100 L100,58"];
const SPOKES = ["M100,14 L100,58", "M186,100 L142,100", "M100,186 L100,142", "M14,100 L58,100"];

export default function SplashLoader({ onComplete }: { onComplete: () => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!svgRef.current || !wrapperRef.current || !dotRef.current) return;

    const paths = Array.from(svgRef.current.querySelectorAll<SVGPathElement>(".loader-path"));
    const drawables = svg.createDrawable(paths);

    const timeline = createTimeline({
      defaults: { ease: "inOutQuad" },
      onComplete,
    })
      .add(drawables, {
        draw: ["0 0", "0 1"],
        duration: 850,
        delay: stagger(55),
      })
      .add(
        dotRef.current,
        { opacity: [0, 1], scale: [0, 1], duration: 400 },
        "-=250"
      )
      .add(
        wrapperRef.current,
        { opacity: [1, 0], scale: [1, 1.04], duration: 550, ease: "inOutQuart" },
        "+=280"
      );

    return () => {
      timeline.pause();
    };
  }, [onComplete]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <svg ref={svgRef} viewBox="0 0 200 200" width={180} height={180} fill="none">
        {OUTER_RING.map((d, i) => (
          <path
            key={`outer-${i}`}
            className="loader-path"
            d={d}
            fill="none"
            stroke="var(--text-1)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        ))}
        {INNER_RING.map((d, i) => (
          <path
            key={`inner-${i}`}
            className="loader-path"
            d={d}
            fill="none"
            stroke="var(--text-3)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        ))}
        {SPOKES.map((d, i) => (
          <path
            key={`spoke-${i}`}
            className="loader-path"
            d={d}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        ))}
        <circle ref={dotRef} cx={100} cy={100} r={4.5} fill="var(--accent)" opacity={0} />
      </svg>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

// Replaces the static .schematic-grid overlay: three slow-drifting accent
// blobs (the "aurora mesh") plus a flickering, chunky pixel-grain canvas
// blended on top via mix-blend-mode: overlay — the gritty/old-CRT texture
// that keeps the color drift from reading as a smooth modern SaaS gradient.
// Drop-in for the same spot: absolute, inset-0, pointer-events-none.
export default function AuroraGrain({ className = "" }: { className?: string } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CELL = 2;
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.ceil(rect.width / CELL));
      canvas.height = Math.max(1, Math.ceil(rect.height / CELL));
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      if (!reduced) {
        timeoutId = setTimeout(() => {
          rafId = requestAnimationFrame(draw);
        }, 90);
      }
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={`aurora-grain ${className}`} aria-hidden>
      <span className="aurora-blob aurora-blob-1" />
      <span className="aurora-blob aurora-blob-2" />
      <span className="aurora-blob aurora-blob-3" />
      <canvas ref={canvasRef} className="aurora-grain-canvas" />
    </div>
  );
}

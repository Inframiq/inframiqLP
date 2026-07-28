"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, splitText } from "animejs";

type Tag = "h1" | "h2" | "h3" | "span";

interface KineticTextProps {
  text: string;
  as?: Tag;
  className?: string;
  /** ms between each character's animation start. Smaller reads faster/more
   *  urgent, larger reads more deliberate/luxurious. */
  staggerMs?: number;
  /** Set false to hold the split characters in their pre-animation state
   *  (still, hidden) until this flips true — e.g. so a hero heading doesn't
   *  run its reveal invisibly behind a splash overlay and just be "already
   *  done" the instant the overlay lifts. Defaults to true: split and
   *  animate immediately on mount, same as if there were nothing gating it. */
  play?: boolean;
}

// Animates every character of `text` into place — a rise-up + 3D tilt-flat +
// fade, staggered character by character. Splitting happens once on mount
// (and again if `text` changes); the animation itself only fires once `play`
// is true, so a caller can hold it back without causing a flash of plain,
// fully-visible text in between.
//
// Plays once per mount/`play`-flip — it does not replay on scroll-into-view.
// That's a deliberate scope line: "animate once" and "animate every time
// it re-enters the viewport" are different behaviors (the latter needs an
// IntersectionObserver gate), don't expect this to do both.
export default function KineticText({ text, as = "span", className = "", staggerMs = 18, play = true }: KineticTextProps) {
  const ref = useRef<HTMLElement>(null);
  const splitterRef = useRef<ReturnType<typeof splitText> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // words: true alongside chars: true — splitting by chars alone lets the
    // browser break a line in the middle of a word; the word-level wrapper
    // keeps normal word-boundary wrapping while chars underneath still
    // animate individually.
    const splitter = splitText(el, { chars: true, words: true });
    for (const char of splitter.chars) {
      char.style.opacity = "0";
      char.style.transform = "translateY(1.1em) rotateX(-70deg)";
    }
    splitterRef.current = splitter;

    return () => {
      splitter.revert();
      splitterRef.current = null;
    };
  }, [text]);

  useEffect(() => {
    if (!play) return;
    const splitter = splitterRef.current;
    if (!splitter) return;

    const animation = animate(splitter.chars, {
      y: ["1.1em", 0],
      rotateX: [-70, 0],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(staggerMs),
      ease: "outQuint",
    });

    return () => {
      animation.pause();
    };
  }, [play, staggerMs, text]);

  // Cast needed because `as` is a runtime-chosen tag ("h1" | "h2" | "h3" |
  // "span") — JSX can't narrow the ref/props type for a dynamic intrinsic
  // element, and every one of those tags is HTMLElement-compatible anyway.
  const Tag = as as "span";
  return (
    <Tag ref={ref as React.Ref<HTMLSpanElement>} className={className} style={{ perspective: 600 }}>
      {text}
    </Tag>
  );
}

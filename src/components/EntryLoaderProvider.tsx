"use client";

import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";
import SplashLoader from "@/components/SplashLoader";

const SESSION_KEY = "entry-played";

// Lets content that mounts *underneath* the splash (e.g. a hero headline's
// KineticText) know once it has actually been revealed, so it can hold its
// own reveal animation until then instead of running it invisibly behind
// the opaque overlay and being "done and waiting" by the time it's shown.
// Defaults to true so anything reading this outside the provider (or before
// it mounts) just plays immediately, same as if there were no splash at all.
const EntryRevealedContext = createContext(true);
export function useEntryRevealed() {
  return useContext(EntryRevealedContext);
}

// Whether this visit should play the splash lives in sessionStorage, not
// React state — useSyncExternalStore reads it the same way ThemeToggle reads
// the theme: getServerSnapshot always answers "yes, play it" so SSR and the
// first client render agree (no hydration mismatch), and React re-syncs to
// the real answer itself right after mount if a prior tab already set the
// flag. That's what lets this avoid a setState call inside an effect body.
function subscribe() {
  return () => {};
}
function getSnapshot(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return true;
  }
}
function getServerSnapshot(): boolean {
  return true;
}

export default function EntryLoaderProvider({ children }: { children: React.ReactNode }) {
  const shouldPlay = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!shouldPlay) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldPlay]);

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable — the loader will just replay next visit.
    }
    document.body.style.overflow = "";
    setIsLoading(false);
  }, []);

  const showLoader = shouldPlay && isLoading;
  const contentHidden = shouldPlay && isLoading;

  return (
    <EntryRevealedContext.Provider value={!contentHidden}>
      {showLoader && <SplashLoader onComplete={handleComplete} />}
      {/* `top` + `position: relative`, not `transform`, drives the rise-in —
          a `transform` here would make this div the containing block for
          the fixed-position Navbar underneath it, breaking its positioning
          for the length of the transition. */}
      <div
        style={{
          position: "relative",
          top: contentHidden ? 12 : 0,
          opacity: contentHidden ? 0 : 1,
          transition: "opacity 600ms ease-out, top 600ms ease-out",
        }}
      >
        {children}
      </div>
    </EntryRevealedContext.Provider>
  );
}

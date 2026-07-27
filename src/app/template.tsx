"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Next.js creates a brand-new instance of template.tsx on every navigation
// (unlike layout.tsx, which persists), so this component itself already
// remounts fresh per route — the initial->animate sequence below runs on
// its own each time without needing AnimatePresence.

// Mirrors the navbar's left-to-right order, so moving to a route further
// right slides the incoming page in from the right (like pushing forward),
// and moving left slides in from the left (like popping back) — the same
// spatial logic as iOS push/pop navigation.
const ROUTE_ORDER = ["/", "/products", "/services", "/about"];

function routeIndex(pathname: string): number {
  const exact = ROUTE_ORDER.indexOf(pathname);
  if (exact !== -1) return exact;
  const prefix = ROUTE_ORDER.findIndex((r) => r !== "/" && pathname.startsWith(r));
  return prefix !== -1 ? prefix : ROUTE_ORDER.length;
}

// A module-level binding (not React state) so it survives template.tsx's
// per-navigation remounts — the module stays loaded across client-side
// navigations even though this component's own state doesn't.
let previousPathname: string | null = null;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fromIndex = routeIndex(previousPathname ?? pathname);
  const toIndex = routeIndex(pathname);
  const direction = toIndex >= fromIndex ? 1 : -1;

  // Recorded after render (not during) so reading the module variable above
  // stays a pure read for this render; the next navigation's fresh Template
  // instance sees the updated value once this effect has committed.
  useEffect(() => {
    previousPathname = pathname;
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: direction * 56 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

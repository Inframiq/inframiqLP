"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Briefcase, Users, Mail } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home",     href: "/",         icon: Home     },
  { label: "Products", href: "/products", icon: Package  },
  { label: "Services", href: "/services", icon: Briefcase},
  { label: "About",    href: "/about",    icon: Users    },
  { label: "Contact",  href: "/#demo",    icon: Mail     },
];

// A live HH:MM clock, standing in for the "system clock" corner of a real
// menu bar — quiet proof the desk is live, not a static screenshot.
function MenuBarClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-3)] tabular-nums">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full status-pulse" style={{ backgroundColor: "var(--success)" }} />
        <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
      </span>
      {time ?? "--:--"}
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;
    const id = href.slice(2);
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* The menu bar — a real light OS menu bar sitting atop the desk,
          rather than a marketing header. Sits flush until scroll gives it
          a hairline + shadow to separate from the page beneath it. */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-xl ${
          scrolled
            ? "bg-[var(--menubar-bg-scrolled)] border-[var(--border)] shadow-[0_1px_0_rgba(15,23,42,0.04)]"
            : "bg-[var(--menubar-bg)] border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[52px]">
            <Link href="/" className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-[6px] flex items-center justify-center font-mono text-[9px] font-semibold text-white"
                style={{ background: "linear-gradient(155deg, var(--accent), var(--accent-strong))" }}
                aria-hidden
              >
                iQ
              </span>
              <span className="font-mono text-[13px] tracking-[0.02em] leading-none text-[var(--text-1)] select-none">
                inframiq
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleHashLink(e, link.href)}
                    className={`relative px-3.5 py-1.5 rounded-md font-mono text-[12px] tracking-[0.02em] transition-colors duration-150 ${
                      active
                        ? "text-[var(--text-1)]"
                        : "text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--surface-2)]"
                    }`}
                  >
                    {link.label.toLowerCase()}
                    {active && (
                      <motion.span
                        layoutId="navActiveDot"
                        className="absolute inset-0 -z-10 rounded-md bg-[var(--surface-2)] border border-[var(--border)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <MenuBarClock />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--mobile-nav-bg)] backdrop-blur-md border-t border-[var(--border)]">
        <div className="flex items-center justify-around px-1 pt-2 pb-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleHashLink(e, link.href)}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-150 ${
                  active ? "text-[var(--text-1)]" : "text-[var(--text-3)] hover:text-[var(--text-2)]"
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2 : 1.5} />
                <span className="font-mono text-[9px] tracking-wide">{link.label.toLowerCase()}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

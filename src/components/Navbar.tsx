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
                inframIQ
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleHashLink(e, link.href)}
                    className={`text-[14px] transition-colors duration-200 ${
                      active
                        ? "font-medium text-[var(--text-1)]"
                        : "text-[var(--text-2)] hover:text-[var(--text-1)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
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
                className={`flex flex-col items-center gap-1 px-3 py-1.5 transition-colors duration-200 ${
                  active ? "text-[var(--text-1)]" : "text-[var(--text-3)] hover:text-[var(--text-2)]"
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2 : 1.5} className="transition-[stroke-width] duration-300" />
                <span className={`text-[10px] ${active ? "font-medium" : ""}`}>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Briefcase, Users, Mail } from "lucide-react";

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
      {/* Top header — desktop. Sits quietly until scroll gives it a
          reason to separate from the page. */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b backdrop-blur-xl ${
          scrolled
            ? "bg-[rgba(10,10,12,0.55)] border-[var(--border)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[64px]">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" aria-hidden />
              <span className="font-mono text-[13px] tracking-[0.02em] leading-none text-[var(--text-1)] select-none">
                infram<span className="text-[var(--accent)]">IQ</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleHashLink(e, link.href)}
                    className={`relative px-4 py-2 font-mono text-[12px] tracking-[0.02em] transition-colors duration-150 ${
                      active
                        ? "text-[var(--text-1)]"
                        : "text-[var(--text-3)] hover:text-[var(--text-2)]"
                    }`}
                  >
                    {link.label.toLowerCase()}
                    {active && (
                      <motion.span
                        layoutId="navActiveDot"
                        className="absolute left-1/2 -bottom-[1px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[var(--accent)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--bg)]/95 backdrop-blur-md border-t border-[var(--border)]">
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

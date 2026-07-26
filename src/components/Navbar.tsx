"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Briefcase, Users, Mail } from "lucide-react";

const navLinks = [
  { label: "Home",         href: "/",           icon: Home     },
  { label: "Products",     href: "/products",   icon: Package  },
  { label: "Services",     href: "/services",   icon: Briefcase},
  { label: "About",        href: "/about",      icon: Users    },
  { label: "Contact",      href: "/#demo",      icon: Mail     },
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
      {/* Top header — desktop */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-[var(--bg)]/75 backdrop-blur-md border-[var(--border)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-brand text-[20px] font-semibold tracking-[-0.01em] leading-none text-[var(--text-1)] select-none">
infram<span className="font-mono text-[0.8em] text-[var(--accent)]">IQ</span>
              </span>
            </Link>

            {/* Desktop nav — active state reads as a small underline dot
                rather than a filled pill, a quieter way to mark position */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleHashLink(e, link.href)}
                    className={`relative px-3.5 py-1.5 text-[13.5px] transition-colors duration-150 ${
                      active
                        ? "text-[var(--text-1)]"
                        : "text-[var(--text-2)] hover:text-[var(--text-1)]"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="navActiveDot"
                        className="absolute left-1/2 -bottom-[3px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[var(--accent)]"
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
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-150 ${
                  active
                    ? "text-[var(--text-1)] bg-[var(--surface)]"
                    : "text-[var(--text-3)] hover:text-[var(--text-2)]"
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2 : 1.5} />
                <span className="text-[9.5px] font-medium tracking-wide">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

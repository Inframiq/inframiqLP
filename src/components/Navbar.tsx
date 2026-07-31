"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Briefcase, Users, Mail } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const CTA_HREF = "/#demo";

const navLinks = [
  { label: "Home",     href: "/",         icon: Home     },
  { label: "Products", href: "/products", icon: Package  },
  { label: "Services", href: "/services", icon: Briefcase},
  { label: "About",    href: "/about",    icon: Users    },
  { label: "Contact",  href: "/contact",  icon: Mail     },
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
      {/* The menu bar — a floating pill sitting just above the desk, rather
          than a flush marketing header. Always carries its own shadow/border
          so it reads as a physical bar resting on the page beneath it;
          scroll only deepens that shadow slightly. */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-4 inset-x-3 sm:inset-x-5 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-[calc(100%-2.5rem)] lg:max-w-[1360px] z-50"
      >
        <div
          className={`flex items-center justify-between h-[62px] pl-6 pr-3 rounded-full border backdrop-blur-xl bg-[var(--surface)] border-[var(--border)] transition-shadow duration-300 ${
            scrolled ? "shadow-[0_16px_40px_-16px_rgba(15,23,42,0.22)]" : "shadow-[0_10px_30px_-14px_rgba(15,23,42,0.14)]"
          }`}
        >
          <Link href="/" className="flex items-center">
            <span className="font-brand text-[19px] font-bold tracking-tight leading-none text-[var(--text-1)] select-none">
              inframIQ
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
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

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href={CTA_HREF}
              onClick={(e) => handleHashLink(e, CTA_HREF)}
              className="hidden sm:inline-flex items-center h-11 px-6 rounded-full bg-[var(--text-1)] text-[var(--bg)] text-[14px] font-medium hover:opacity-85 active:scale-[0.97] transition-all duration-150"
            >
              Request Demo
            </Link>
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

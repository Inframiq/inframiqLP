"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Package, Shield, Users, Mail } from "lucide-react";

const navLinks = [
  { label: "Home",         href: "/",           icon: Home    },
  { label: "Products",     href: "/products",   icon: Package },
  { label: "Capabilities", href: "/#solutions", icon: Shield  },
  { label: "About",        href: "/about",      icon: Users   },
  { label: "Contact",      href: "/#contact",   icon: Mail    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 border-b ${
          scrolled ? "bg-[#0c0c0c] border-white/[0.05]" : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-[19px] font-semibold tracking-tight text-[#f0f0f0] select-none">
                inframi<span className="text-[#5b8def]">Q</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleHashLink(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-md text-[13.5px] transition-colors duration-150 ${
                    isActive(link.href)
                      ? "text-white bg-white/[0.06]"
                      : "text-[#8a8a8a] hover:text-[#d0d0d0] hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0c0c0c]/95 backdrop-blur-md border-t border-white/[0.07]">
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
                    ? "text-white bg-white/[0.07]"
                    : "text-[#505050] hover:text-[#909090]"
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

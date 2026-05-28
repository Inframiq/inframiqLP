"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/#solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  // Smooth-scroll when already on the homepage; navigate + scroll from other pages
  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;
    const id = href.slice(2);

    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setMenuOpen(false);
    } else {
      // Let Next.js navigate to home; browser will anchor-jump after load
      // We don't preventDefault here — standard Next Link handles it
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0c0c0c]/92 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">

            {/* Logo placeholder */}
            <Link href="/" className="flex items-center">
              <div className="h-7 px-3 rounded border border-white/[0.14] bg-white/[0.04] flex items-center justify-center">
                <span className="text-[11px] font-medium text-white/40 tracking-[0.14em] uppercase select-none">
                  Logo
                </span>
              </div>
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

            {/* CTA */}
            <div className="hidden md:block">
              <Link
                href="/#demo"
                onClick={(e) => handleHashLink(e, "/#demo")}
                className="inline-flex items-center gap-1.5 h-8 px-4 rounded-md bg-white text-[#0c0c0c] text-[13px] font-medium hover:bg-[#e8e8e8] transition-all duration-150 shadow-[0_0_18px_rgba(255,255,255,0.07)]"
              >
                Request a Demo
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 text-[#8a8a8a] hover:text-white transition-colors"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-[#0c0c0c] pt-[60px] px-6"
          >
            <nav className="flex flex-col pt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleHashLink(e, link.href)}
                    className={`block py-3.5 text-[15px] border-b border-white/[0.06] transition-colors ${
                      isActive(link.href) ? "text-white" : "text-[#8a8a8a] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <Link
                  href="/#demo"
                  onClick={(e) => handleHashLink(e, "/#demo")}
                  className="flex items-center justify-center h-11 rounded-lg bg-white text-[#0c0c0c] text-[14px] font-medium hover:bg-[#e8e8e8] transition-all shadow-[0_0_22px_rgba(255,255,255,0.07)]"
                >
                  Request a Demo
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

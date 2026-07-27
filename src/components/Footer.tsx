"use client";

import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/#demo" },
];

// The dock — the desk metaphor's quiet floor. A real taskbar reads flat and
// minimal, not another dark "closing" section, so it stays on the same
// light surface as the rest of the page.
export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-raised)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="w-5 h-5 rounded-[6px] flex items-center justify-center font-mono text-[9px] font-semibold text-white"
            style={{ background: "linear-gradient(155deg, var(--accent), var(--accent-strong))" }}
            aria-hidden
          >
            iQ
          </span>
          <span className="font-mono text-[12.5px] text-[var(--text-2)]">inframiq</span>
        </Link>

        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-[12px] text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors duration-150"
            >
              {link.label.toLowerCase()}
            </Link>
          ))}
        </nav>

        <p className="font-mono text-[11px] text-[var(--text-3)]">
          © {new Date().getFullYear()} Inframiq Technologies, Inc.
        </p>
      </div>
    </footer>
  );
}

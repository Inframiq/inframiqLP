"use client";

import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/#demo" },
];

export default function Footer() {
  return (
    <footer className="section-anchor border-t border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-mono text-[13px] text-[var(--text-1)]">
          infram<span className="text-[var(--accent-strong)]">IQ</span>
        </Link>

        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-[12px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-150"
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

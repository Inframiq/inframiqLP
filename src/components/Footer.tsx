"use client";

import Link from "next/link";

// Only real, working destinations — no "#" placeholders. A footer full of
// dead links is exactly the kind of thing that reads as unfinished on a
// site meant to project a mature, premium product.
const footerNav = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
  ],
  Products: [
    { label: "Mail Shield", href: "/products" },
    { label: "Simulyn", href: "/products" },
    { label: "All Products", href: "/products" },
  ],
  Contact: [
    { label: "Request a Demo", href: "/#demo" },
    { label: "support@inframiq.com", href: "mailto:support@inframiq.com" },
  ],
};

export default function Footer() {
  return (
    <footer id="contact" className="section-anchor">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Top: Brand + nav */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex mb-5">
              <span className="font-brand text-[20px] font-semibold tracking-[-0.01em] text-[var(--text-1)] select-none">
infram<span className="font-mono text-[0.8em] text-[var(--accent)]">IQ</span>
              </span>
            </Link>
            <p className="text-[13px] text-[var(--text-3)] leading-[1.7] max-w-[220px]">
              Precision-engineered products for security, business, and everyday life.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([category, links]) => (
            <div key={category}>
              <p className="font-mono text-[11px] tracking-[0.02em] text-[var(--text-3)] mb-4">
                {category.toLowerCase()}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[var(--text-3)]">
            © {new Date().getFullYear()} Inframiq Technologies, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

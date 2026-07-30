"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motionVariants";

const navigateLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#demo" },
];

function UnderlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-[14px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-150"
    >
      {children}
      <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-[var(--text-1)] transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

// The dock — the desk metaphor's quiet floor. A real taskbar reads flat and
// minimal, not another dark "closing" section, so it stays on the same
// light surface as the rest of the page.
export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-raised)]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={revealContainer}
        className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          <motion.div variants={revealItem} className="max-w-sm">
            <p className="font-brand text-[20px] font-bold tracking-tight text-[var(--text-1)] mb-4">inframIQ</p>
            <p className="text-[14px] text-[var(--text-2)] leading-relaxed">
              Real 24/7 support operations, alongside the security and business software Inframiq engineers to run them.
            </p>
          </motion.div>

          <motion.div variants={revealItem} className="flex gap-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--text-3)] mb-4">Navigate</p>
              <ul className="space-y-3">
                {navigateLinks.map((link) => (
                  <li key={link.label}>
                    <UnderlineLink href={link.href}>{link.label}</UnderlineLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--text-3)] mb-4">Contact</p>
              <UnderlineLink href="mailto:support@inframiq.com">support@inframiq.com</UnderlineLink>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--text-3)] mb-4">Follow</p>
              <a
                href="https://www.linkedin.com/company/inframiqsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block text-[14px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-150"
              >
                LinkedIn
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-[var(--text-1)] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[13px] text-[var(--text-3)]">© {new Date().getFullYear()} Inframiq Technologies, Inc.</p>
          <p className="text-[12px] text-[var(--text-3)]">
            Site last updated {new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}
          </p>
          <p className="font-mono text-[13px] text-[var(--text-3)]">Still online. Still true.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerNav = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Products: [
    { label: "Mail Shield", href: "/products" },
    { label: "All Products", href: "/products" },
    { label: "Changelog", href: "#" },
    { label: "Status", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Security", href: "#" },
    { label: "Compliance", href: "#" },
    { label: "API Reference", href: "#" },
  ],
  Contact: [
    { label: "Enterprise Sales", href: "#" },
    { label: "Support", href: "#" },
    { label: "inframiqsolutions@gmail.com", href: "mailto:inframiqsolutions@gmail.com" },
  ],
};

const socials = [
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Top: Brand + nav */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex mb-5">
              <span className="text-[19px] font-semibold tracking-tight text-[#f0f0f0] select-none">
                inframi<span className="text-[#5b8def]">Q</span>
              </span>
            </Link>
            <p className="text-[13px] text-[#555] leading-[1.7] mb-5 max-w-[200px]">
              Intelligent security infrastructure for modern enterprises.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="h-7 px-2.5 rounded border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-[11px] text-[#505050] hover:text-[#9a9a9a] hover:border-white/[0.12] transition-all duration-150"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([category, links]) => (
            <div key={category}>
              <p className="text-[11px] font-semibold text-[#404040] uppercase tracking-[0.14em] mb-4">
                {category}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#565656] hover:text-[#a0a0a0] transition-colors duration-150"
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
        <div className="py-5 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#3a3a3a]">
            © {new Date().getFullYear()} Inframiq Technologies, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[12px] text-[#3a3a3a] hover:text-[#6a6a6a] transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Target, User } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { team } from "@/lib/team";
import { values } from "@/lib/values";

const timeline = [
  { year: "Founded", event: "Inframiq established with a focus on building intelligent, well-engineered products." },
  { year: "First Product", event: "Mail Shield launched — addressing phishing and domain impersonation at scale." },
  { year: "Today", event: "Expanding into a growing portfolio of products — spanning enterprise security to everyday life — engineered with the same uncompromising rigor." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const MARQUEE_SPEED_PX_PER_SEC = 45;

export default function AboutContent() {
  const marqueeWrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const secondGroupRef = useRef<HTMLDivElement | null>(null);

  // The loop runs as a plain CSS animation (compositor thread) rather than a
  // per-frame JS/rAF transform, so it can't be starved by main-thread work
  // elsewhere on the page (React re-renders, other Framer Motion animations)
  // — that main-thread contention was the source of the stutter. JS here
  // only measures the exact pixel distance for a seamless loop point and
  // toggles play/pause; it never touches the transform itself.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const wrapper = marqueeWrapperRef.current;
    if (!track || !wrapper) return;

    function measure() {
      if (secondGroupRef.current && track) {
        const distance = secondGroupRef.current.offsetLeft;
        track.style.setProperty("--marquee-distance", `${distance}px`);
        track.style.setProperty(
          "--marquee-duration",
          `${(distance / MARQUEE_SPEED_PX_PER_SEC).toFixed(2)}s`
        );
      }
    }
    measure();
    window.addEventListener("resize", measure);

    let hovered = false;
    let visible = false;
    function updatePlayState() {
      if (track) track.style.animationPlayState = hovered || !visible ? "paused" : "running";
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        updatePlayState();
      },
      { threshold: 0.15 }
    );
    observer.observe(wrapper);

    function onEnter() {
      hovered = true;
      updatePlayState();
    }
    function onLeave() {
      hovered = false;
      updatePlayState();
    }
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--bg)] pt-[110px] pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, transparent 30%, var(--bg) 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-[12px] text-[var(--text-3)]">
              <Link href="/" className="hover:text-[var(--text-2)] transition-colors">
                Inframiq
              </Link>
              <span>/</span>
              <span className="text-[var(--text-2)]">About</span>
            </div>

            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-5">about inframiq</p>

            <h1 className="font-brand text-[42px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.08] text-[var(--text-1)] mb-6 max-w-2xl">
              Built for people
              <br />
              <span className="text-[var(--text-3)]">who expect things to just work.</span>
            </h1>

            <p className="text-[16px] text-[var(--text-2)] leading-[1.8] max-w-xl">
              Inframiq engineers intelligent software with uncompromising
              precision — from enterprise-grade security infrastructure to the
              refined, everyday tools businesses and individuals rely on.
              Different products. One exacting standard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission — two equal columns split by a single vertical
          rule, matching the type scale used for every other pillar/value
          on this page (icon + mono tag, then standard body copy) rather
          than a one-off oversized serif quote. */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 md:divide-x divide-[var(--border)]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55 }}
              className="md:pr-10 pb-10 md:pb-0"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Eye size={16} className="text-[var(--accent)]" strokeWidth={1.75} />
                <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)]">
                  vision
                </p>
              </div>
              <p className="text-[14.5px] text-[var(--text-2)] leading-[1.8]">
                To become a globally trusted technology and business operations
                partner, empowering organizations through innovative digital
                products, intelligent customer support, and reliable
                operational excellence that drives long-term business growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="md:pl-10 pt-10 md:pt-0"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Target size={16} className="text-[var(--accent)]" strokeWidth={1.75} />
                <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)]">
                  mission
                </p>
              </div>
              <p className="text-[14.5px] text-[var(--text-2)] leading-[1.8]">
                Our mission is to build innovative digital products while
                helping businesses deliver exceptional customer experiences
                through reliable voice and chat support solutions. We partner
                with organizations to simplify operations, enhance customer
                satisfaction, and enable sustainable growth through
                technology, skilled professionals, and operational excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values — a large numbered list rather than a grid of boxes, so it
          has its own identity distinct from the bento/card sections. */}
      <section className="section-raised py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mb-14"
          >
            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-4">how we work</p>
            <h2 className="font-brand text-[30px] font-semibold tracking-[-0.02em] text-[var(--text-1)]">
              Our operating principles
            </h2>
          </motion.div>

          <div className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                className="grid sm:grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr_1.4fr] gap-3 lg:gap-10 py-8"
              >
                <span className="font-mono text-[13px] text-[var(--accent)]">
                  {value.tag}
                </span>
                <h3 className="text-[17px] font-medium text-[var(--text-1)]">{value.title}</h3>
                <p className="text-[13.5px] text-[var(--text-2)] leading-[1.75]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-4">company</p>
              <h2 className="font-brand text-[30px] font-semibold tracking-[-0.02em] text-[var(--text-1)] mb-5">
                Where we are today
              </h2>
              <p className="text-[14px] text-[var(--text-2)] leading-[1.8]">
                Inframiq is an early-stage company with a clear and deliberate roadmap.
                We build with precision — one product, perfected, before the next.
                Mail Shield addresses one of the most prevalent enterprise attack vectors,
                and Simulyn is next, bringing the same rigor to business pricing decisions.
                Several more products, spanning security, business, and everyday life, are
                already in active development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-0 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
            >
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-5 px-6 py-5">
                  <div className="w-[92px] flex-shrink-0">
                    <span className="font-mono text-[11px] text-[var(--accent)] tracking-[0.02em]">
                      {item.year.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-[13.5px] text-[var(--text-2)] leading-relaxed">{item.event}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-raised py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-4">team</p>
            <h2 className="font-brand text-[30px] font-semibold tracking-[-0.02em] text-[var(--text-1)] mb-3">
              The people behind Inframiq
            </h2>
            <p className="text-[14px] text-[var(--text-2)] leading-[1.8] max-w-xl">
              The leadership guiding Inframiq&apos;s product and engineering direction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="marquee-fade -mx-6 lg:-mx-8 overflow-hidden"
            ref={marqueeWrapperRef}
          >
            <div
              ref={trackRef}
              className="marquee-track-team flex gap-5 w-max px-6 lg:px-8 relative will-change-transform"
            >
              {[...team, ...team].map((member, i) => (
                <div
                  key={`${member.name}-${i}`}
                  ref={i === team.length ? secondGroupRef : undefined}
                  className="flex-shrink-0 w-[220px]"
                >
                  <div className="relative w-full aspect-[3/4] rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center mb-4">
                    <User size={30} strokeWidth={1.5} className="text-[var(--text-3)]" />
                  </div>
                  <h3 className="text-[14.5px] font-medium text-[var(--text-1)] mb-1 tracking-[-0.01em]">
                    {member.name}
                  </h3>
                  <p className="text-[11.5px] text-[var(--accent-strong)] font-medium tracking-[0.02em] uppercase">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-7 py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          >
            <div className="flex -space-x-3 flex-shrink-0">
              {["#5b8def", "#8a5bef", "#5bef9e", "#efb85b"].map((color, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[var(--surface)]"
                  style={{ backgroundColor: `${color}26` }}
                />
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-[var(--surface)] bg-[var(--surface-2)] flex items-center justify-center">
                <span className="text-[10.5px] font-semibold text-[var(--text-2)]">10+</span>
              </div>
            </div>
            <p className="text-[13.5px] text-[var(--text-2)] leading-relaxed">
              Backed by a growing team of <span className="text-[var(--text-1)] font-medium">10+ engineers, designers, and specialists</span> working
              across our product portfolio.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="mailto:support@inframiq.com"
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md border border-[var(--border-strong)] text-[var(--text-2)] text-[13.5px] font-medium hover:border-[var(--accent)]/40 hover:text-[var(--text-1)] active:scale-[0.98] transition-all duration-150"
            >
              support@inframiq.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// Shared scroll-reveal variants — used in place of a single flat
// "container fades up" motion.div. Staggering the eyebrow/heading/body as
// separate children reads as a choreographed reveal rather than one blunt
// fade, and is reused across every homepage section so the whole page has
// one consistent, deliberate entrance language instead of scattered one-offs.

export const revealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

export const revealItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

import type { Variants } from "framer-motion";

/** The one easing curve used everywhere in this product — a soft, confident settle. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Fade + rise entrance, the default for anything animating into view on scroll. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Smaller-throw variant for tighter contexts (cards, list rows). */
export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

/** Wrap children in this + fadeUpSmall (or fadeUp) on each child for a staggered reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

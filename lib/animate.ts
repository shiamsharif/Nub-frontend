import { type Variants } from "framer-motion";

export const parentVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
      ease: "easeInOut",
    },
  },
};

export const childVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.2,
      ease: "easeInOut",
    },
  },
};

export const slideVariants: Variants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

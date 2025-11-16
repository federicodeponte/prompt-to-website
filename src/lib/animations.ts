// ABOUTME: Reusable Framer Motion animation configurations for consistent, high-quality animations
// ABOUTME: DRY principle - all blocks use these configs instead of repeating

import { type Transition, type Variants } from 'framer-motion';

/**
 * Spring animation configs - Framer-quality physics-based animations
 */
export const spring = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 20,
};

export const springMedium = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
};

export const springGentle = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
};

/**
 * Fade in + slide up animation variants
 * Used across Hero, Features, CTA, etc.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Stagger children animations
 * Used for grids, lists, cards
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
};

/**
 * 3D hover effects for cards
 */
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: springMedium,
  },
};

/**
 * Icon rotation on hover (for arrow icons, etc.)
 */
export const iconRotate = {
  rest: { rotate: 0 },
  hover: { rotate: 45, transition: springMedium },
};

/**
 * Shimmer/shine effect timing
 */
export const shimmer: Transition = {
  repeat: Infinity,
  repeatType: 'loop' as const,
  duration: 2,
  ease: 'linear' as const,
};

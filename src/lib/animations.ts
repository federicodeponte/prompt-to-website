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
 * Stagger children animations - Framer-level timing (150ms for drama)
 * Used for grids, lists, cards
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // 150ms - more dramatic than 100ms
    },
  },
};

/**
 * Faster stagger for tighter grids (100ms)
 */
export const staggerContainerFast: Variants = {
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
 * 3D hover effects for cards - TRUE spring physics (not CSS transitions)
 */
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: springMedium,
  },
};

/**
 * Enhanced card hover for pricing/feature cards (more dramatic)
 */
export const cardHoverDramatic = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  hover: {
    scale: 1.03,
    y: -12,
    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
    transition: spring,
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
 * Premium button hover - scale + shadow growth + subtle rotation
 */
export const buttonHoverPremium = {
  rest: {
    scale: 1,
    rotate: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  },
  hover: {
    scale: 1.05,
    rotate: -1,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: springMedium,
  },
  tap: {
    scale: 0.95,
    rotate: 0,
    transition: spring,
  },
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

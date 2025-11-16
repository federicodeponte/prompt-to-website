// ABOUTME: Reusable visual effect utilities for Framer-level polish
// ABOUTME: DRY principle - centralized Tailwind class generation

/**
 * Gradient text effect - TRUE color-morphing animation (not just position shifts)
 * CSS keyframes rotate actual gradient colors: blue→purple→pink
 * Used for hero headings, feature titles, etc.
 */
export function getGradientTextClasses() {
  return 'bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]';
}

/**
 * Glassmorphism effect for cards
 * Creates frosted glass appearance with backdrop blur
 */
export function getGlassmorphismClasses() {
  return 'bg-background/80 backdrop-blur-xl border border-white/10 shadow-lg';
}

/**
 * Multi-layer shimmer effect for buttons and interactive elements
 * Two shimmer layers at different speeds (1.5s fast + 3s slow diagonal) + subtle glow
 * TRUE Framer-level depth with 60% opacity for visibility
 */
export function getShimmerClasses() {
  return 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer-slow after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent shadow-[0_0_20px_rgba(var(--primary),0.15)]';
}

/**
 * Gradient border effect for cards
 * Subtle gradient outline
 */
export function getGradientBorderClasses() {
  return 'relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-primary/50 before:via-primary before:to-primary/50 before:-z-10';
}

/**
 * Floating animation for decorative elements
 * Subtle up/down motion
 */
export function getFloatingClasses() {
  return 'animate-float';
}

/**
 * Mesh gradient background (for hero, CTA sections)
 * Animated multi-color gradient with VIBRANT colors (40% opacity for visibility)
 * Note: For parallax, wrap in motion.div with useScroll
 */
export function getMeshGradientClasses() {
  return 'bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-pink-500/40 animate-gradient-shift bg-[length:150%_150%]';
}

/**
 * 3D card lift shadow (for hover states)
 * NOTE: This provides base shadow styling. Use with Framer Motion whileHover for spring physics!
 * Apply whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
 */
export function getCardLiftClasses() {
  return 'shadow-sm'; // Base shadow only - motion handled by whileHover
}

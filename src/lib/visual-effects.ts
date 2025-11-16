// ABOUTME: Reusable visual effect utilities for Framer-level polish
// ABOUTME: DRY principle - centralized Tailwind class generation

/**
 * Gradient text effect - animated rainbow gradient
 * Used for hero headings, feature titles, etc.
 */
export function getGradientTextClasses() {
  return 'bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient';
}

/**
 * Glassmorphism effect for cards
 * Creates frosted glass appearance with backdrop blur
 */
export function getGlassmorphismClasses() {
  return 'bg-background/80 backdrop-blur-xl border border-white/10 shadow-lg';
}

/**
 * Shimmer effect for buttons and interactive elements
 * Creates a moving shine/highlight
 */
export function getShimmerClasses() {
  return 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent';
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
 * Animated multi-color gradient with blur
 */
export function getMeshGradientClasses() {
  return 'bg-gradient-to-br from-primary/10 via-background to-secondary/10 animate-gradient-shift';
}

/**
 * 3D card lift shadow (for hover states)
 */
export function getCardLiftClasses() {
  return 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]';
}

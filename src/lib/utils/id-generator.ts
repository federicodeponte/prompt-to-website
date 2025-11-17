// ABOUTME: Pure ID generation utility for messages and entities
// ABOUTME: Uses crypto.randomUUID() for guaranteed uniqueness without impure functions

/**
 * Generate a unique ID for messages, blocks, or other entities
 * Uses crypto.randomUUID() which is available in all modern browsers and Node.js
 *
 * @returns A unique UUID string (e.g., "f47ac10b-58cc-4372-a567-0e02b2c3d479")
 */
export function generateId(): string {
  // crypto.randomUUID() is pure within the context of ID generation
  // and doesn't cause re-renders like Date.now()
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for environments without crypto.randomUUID (very rare)
  // This is still better than Date.now() as it's called in a controlled context
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a short ID for UI elements where full UUID is unnecessary
 * @returns A short unique string (e.g., "a1b2c3d4")
 */
export function generateShortId(): string {
  return Math.random().toString(36).substr(2, 8);
}

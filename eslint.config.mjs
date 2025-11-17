import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
    // Dependencies
    "node_modules/**",
    // Temporary audit/test scripts (not production code)
    "audit-screenshots.js",
    "check-sonner.js",
    "debug-components.js",
    "devils-advocate-audit.js",
    "docs/archived-scripts/**",
    // Generated/minified files
    "*.min.js",
  ]),
]);

export default eslintConfig;

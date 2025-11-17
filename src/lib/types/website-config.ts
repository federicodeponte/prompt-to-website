// ABOUTME: Core type definitions for website configuration system
// ABOUTME: Defines WebsiteConfig, Block types, and related interfaces for the prompt-to-website tool

export type BlockType =
  | "hero"
  | "features"
  | "pricing"
  | "testimonials"
  | "cta"
  | "footer"
  | "stats"
  | "faq"
  | "team"
  | "contact"
  | "newsletter"
  | "logo-cloud"
  | "gallery"
  | "process"
  | "video";

export type BlockVariant =
  | "centered"
  | "split"
  | "gradient"
  | "grid"
  | "list"
  | "simple"
  | "comparison"
  | "cards"
  | "carousel"
  | "multi-column"
  | "accordion"
  | "bar"
  | "featured"
  | "timeline"
  | "steps"
  | "embed";

export interface BlockSettings {
  spacing?: "tight" | "normal" | "loose";
  background?: string;
  animation?: boolean;
  fullWidth?: boolean;
}

export interface Block {
  id: string; // Unique identifier (e.g., "hero-01", "features-02")
  type: BlockType;
  variant?: BlockVariant;
  content: Record<string, unknown>; // Block-specific content (validated with type guards at runtime)
  settings?: BlockSettings;
}

export interface WebsiteTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    muted: string;
    accent?: string;
    border?: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing?: {
    section: string; // Spacing between sections (e.g., "6rem", "8rem")
    container: string; // Max container width (e.g., "1280px")
  };
  radius?: {
    button: string; // Button border radius (e.g., "0.5rem", "9999px")
    card: string; // Card border radius (e.g., "1rem")
    input: string; // Input border radius (e.g., "0.5rem")
  };
  shadows?: {
    card: string; // Card shadow (e.g., "0 4px 6px rgba(0,0,0,0.1)")
    button: string; // Button shadow
  };
}

export interface WebsiteMetadata {
  title: string;
  description: string;
  author?: string;
  favicon?: string;
  ogImage?: string;
}

export interface WebsiteConfig {
  version: string; // "1.0"
  template: "saas-landing" | "product-landing" | "portfolio" | "agency" | "ecommerce" | "blog" | "restaurant" | "event" | "course" | "app-download" | "custom";
  theme: WebsiteTheme;
  blocks: Block[];
  metadata: WebsiteMetadata;
}

// Database entity types
export interface Website {
  id: string;
  user_id?: string;
  label: string;
  config: WebsiteConfig;
  prompt_history: string[];
  created_at: string;
  updated_at: string;
}

// API Response types
export interface WebsiteGenerationResponse {
  id: string;
  config: WebsiteConfig;
  error?: string;
}

export interface WebsiteEditResponse {
  config: WebsiteConfig;
  error?: string;
}

// Block Registry types for metadata
export interface BlockMetadata {
  id: string;
  name: string;
  category: BlockType;
  description: string;
  preview?: string; // URL to preview image
  defaultContent: Record<string, unknown>; // Flexible default content (validated with type guards)
  variants?: BlockVariant[];
}

export type BlockRegistry = Record<string, BlockMetadata>;

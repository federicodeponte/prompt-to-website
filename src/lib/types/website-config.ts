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
  | "newsletter";

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
  | "bar";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any>; // Block-specific content (flexible for JSON storage)
  settings?: BlockSettings;
}

export interface WebsiteTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
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
  template: "saas-landing" | "product-landing" | "portfolio" | "custom";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultContent: Record<string, any>; // Flexible default content for block templates
  variants?: BlockVariant[];
}

export type BlockRegistry = Record<string, BlockMetadata>;

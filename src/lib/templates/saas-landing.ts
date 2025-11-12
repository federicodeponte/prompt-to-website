// ABOUTME: SaaS landing page template with pre-configured blocks
// ABOUTME: Minimal version demonstrating core structure

import { WebsiteConfig } from '../types/website-config';

export const saasLandingTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'saas-landing',
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937',
      muted: '#6B7280',
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
  },
  metadata: {
    title: 'ProjectFlow - Project Management',
    description: 'Streamline your workflow',
    author: 'ProjectFlow Team',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'centered',
        heading: 'Build Better Products Faster',
        subheading: 'Project Management Reimagined',
        ctaPrimary: { text: 'Start Free Trial', link: '#pricing' },
        ctaSecondary: { text: 'View Demo', link: '#demo' },
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Everything You Need',
        columns: 3,
        features: [
          { icon: '⚡', title: 'Lightning Fast', description: 'Built for speed' },
          { icon: '🔒', title: 'Secure & Private', description: 'Enterprise-grade security' },
          { icon: '🤝', title: 'Team Collaboration', description: 'Real-time teamwork' },
        ],
      },
      settings: { spacing: 'loose' },
    },
    {
      id: 'pricing-1',
      type: 'pricing',
      content: {
        variant: 'simple',
        heading: 'Simple Pricing',
        tiers: [
          {
            name: 'Starter',
            price: '$9',
            period: 'month',
            description: 'For small teams',
            features: ['Up to 5 members', '10 projects', 'Basic analytics'],
            ctaText: 'Start Trial',
            ctaLink: '#signup',
          },
          {
            name: 'Professional',
            price: '$29',
            period: 'month',
            description: 'For growing businesses',
            features: ['Up to 25 members', 'Unlimited projects', 'Advanced analytics', 'Priority support'],
            ctaText: 'Start Trial',
            ctaLink: '#signup',
            highlighted: true,
          },
        ],
      },
      settings: { spacing: 'loose' },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'Loved by Teams',
        columns: 2,
        testimonials: [
          { quote: 'ProjectFlow transformed how our team collaborates.', author: 'Sarah Johnson', role: 'Engineering Manager', rating: 5 },
          { quote: 'The best project management tool we have used.', author: 'Michael Chen', role: 'Product Lead', rating: 5 },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Ready to Get Started?',
        description: 'Join thousands using ProjectFlow.',
        ctaPrimary: { text: 'Start Free Trial', link: '#signup' },
      },
      settings: { spacing: 'loose', background: '#F9FAFB' },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'simple',
        logo: 'ProjectFlow',
        copyright: '© 2025 ProjectFlow',
      },
    },
  ],
};

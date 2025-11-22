// ABOUTME: Product landing page template for showcasing a specific product
// ABOUTME: Minimal version with essential blocks

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const productLandingTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'product-landing',
  theme: defaultTheme,
  metadata: {
    title: 'TaskMaster Pro - Task Management App',
    description: 'Stay organized with TaskMaster Pro',
    author: 'TaskMaster Team',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'split',
        heading: 'Master Your Tasks',
        subheading: 'Smart task manager for busy professionals',
        ctaPrimary: { text: 'Download Free', link: '#download' },
        ctaSecondary: { text: 'Watch Demo', link: '#demo' },
        description: 'TaskMaster Pro helps you organize with smart prioritization and cross-device sync.',
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Trusted Worldwide',
        columns: 3,
        stats: [
          { value: '500K+', label: 'Active Users' },
          { value: '10M+', label: 'Tasks Completed' },
          { value: '4.8', label: 'Rating', suffix: '/5' },
        ],
      },
      settings: { spacing: 'normal', background: '#F9FAFB' },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Essential Features',
        columns: 3,
        features: [
          { icon: '🎯', title: 'Smart Prioritization', description: 'AI-powered task ranking' },
          { icon: '🔔', title: 'Intelligent Reminders', description: 'Never miss a deadline' },
          { icon: '☁️', title: 'Cloud Sync', description: 'Sync across all devices' },
        ],
      },
      settings: { spacing: 'loose' },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'User Reviews',
        columns: 2,
        testimonials: [
          { quote: 'TaskMaster Pro changed how I manage my day.', author: 'David Martinez', role: 'Software Engineer', rating: 5 },
          { quote: 'Finally, a task manager that works the way I think.', author: 'Lisa Anderson', role: 'Product Manager', rating: 5 },
        ],
      },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        faqs: [
          { question: 'Is TaskMaster Pro available on all platforms?', answer: 'Yes! We support iOS, Android, Mac, Windows, and web.' },
          { question: 'How does smart prioritization work?', answer: 'Our AI analyzes deadlines and importance to suggest task order.' },
          { question: 'Can I use TaskMaster Pro offline?', answer: 'Yes. All features work offline and sync when online.' },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Start Today',
        description: 'Join 500K+ users. Download now.',
        ctaPrimary: { text: 'Download Free', link: '#download' },
      },
      settings: { spacing: 'loose', background: '#F3F4F6' },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'simple',
        logo: 'TaskMaster Pro',
        copyright: '© 2025 TaskMaster Pro',
      },
    },
  ],
};

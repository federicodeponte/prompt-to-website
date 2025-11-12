// ABOUTME: Portfolio template for showcasing personal work and services
// ABOUTME: Minimal version with essential blocks

import { WebsiteConfig } from '../types/website-config';

export const portfolioTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'portfolio',
  theme: {
    colors: {
      primary: '#0EA5E9',
      secondary: '#14B8A6',
      background: '#FFFFFF',
      text: '#0F172A',
      muted: '#64748B',
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
  },
  metadata: {
    title: 'Alex Chen - Developer & Designer',
    description: 'Crafting digital experiences',
    author: 'Alex Chen',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'centered',
        heading: 'Hi, I am Alex Chen',
        subheading: 'Full Stack Developer & Designer',
        description: 'I build exceptional digital experiences with React, Next.js, and modern web tech.',
        ctaPrimary: { text: 'View My Work', link: '#projects' },
        ctaSecondary: { text: 'Get in Touch', link: '#contact' },
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'bar',
        heading: 'Track Record',
        stats: [
          { value: '50+', label: 'Projects Completed' },
          { value: '8', label: 'Years Experience' },
          { value: '35+', label: 'Happy Clients' },
        ],
      },
      settings: { spacing: 'normal', background: '#F8FAFC' },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'What I Do',
        columns: 3,
        features: [
          { icon: '💻', title: 'Web Development', description: 'React, Next.js, and Node.js apps' },
          { icon: '🎨', title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces' },
          { icon: '📱', title: 'Mobile Apps', description: 'Cross-platform with React Native' },
        ],
      },
      settings: { spacing: 'loose' },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'What Clients Say',
        columns: 2,
        testimonials: [
          { quote: 'Alex delivered a stunning website that exceeded expectations.', author: 'Sarah Mitchell', role: 'CEO', rating: 5 },
          { quote: 'Outstanding technical expertise and attention to detail.', author: 'Robert Taylor', role: 'Product Manager', rating: 5 },
        ],
      },
    },
    {
      id: 'contact-1',
      type: 'contact',
      content: {
        variant: 'simple',
        heading: 'Let us Work Together',
        description: 'Have a project? Let us create something amazing.',
        email: 'alex@example.com',
        showForm: true,
      },
      settings: { spacing: 'loose', background: '#F1F5F9' },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'simple',
        logo: 'Alex Chen',
        copyright: '© 2025 Alex Chen',
      },
    },
  ],
};

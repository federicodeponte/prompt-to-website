// ABOUTME: Event/Conference template
// ABOUTME: Features speakers, schedule, tickets, and venue information

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const eventTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'event',
  theme: {
    ...defaultTheme,
    colors: {
      primary: '#7C3AED', // Purple
      secondary: '#EC4899', // Pink
      background: '#FFFFFF',
      text: '#1F2937',
      muted: '#6B7280',
    },
  },
  metadata: {
    title: 'Tech Summit 2025',
    description: 'The future of technology. Three days of innovation.',
    author: 'Tech Summit',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'centered',
        heading: 'Tech Summit 2025',
        subheading: 'June 15-17, 2025 | San Francisco',
        description: 'Join 5,000+ innovators shaping the future of technology',
        ctaPrimary: { text: 'Get Your Ticket', link: '#pricing' },
        ctaSecondary: { text: 'View Schedule', link: '#schedule' },
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'bar',
        heading: 'Why Attend',
        stats: [
          { value: '50+', label: 'Expert Speakers' },
          { value: '100+', label: 'Sessions & Workshops' },
          { value: '5,000+', label: 'Attendees' },
          { value: '3', label: 'Days of Innovation' },
        ],
      },
      settings: { spacing: 'normal', background: '#FAF5FF' },
    },
    {
      id: 'team-1',
      type: 'team',
      content: {
        variant: 'grid',
        heading: 'Keynote Speakers',
        subheading: 'Learn from industry leaders',
        columns: 3,
        members: [
          { name: 'Dr. Sarah Mitchell', role: 'AI Research Lead at Google', bio: 'Pioneer in machine learning and neural networks' },
          { name: 'Marcus Johnson', role: 'CTO at Tesla', bio: 'Expert in autonomous systems and robotics' },
          { name: 'Lisa Chen', role: 'Founder of DataCorp', bio: 'Leading voice in data privacy and security' },
        ],
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Conference Tracks',
        columns: 3,
        features: [
          { icon: '🤖', title: 'AI & Machine Learning', description: 'Latest breakthroughs in artificial intelligence' },
          { icon: '☁️', title: 'Cloud & Infrastructure', description: 'Scalable solutions for modern applications' },
          { icon: '🔒', title: 'Security & Privacy', description: 'Protecting data in the digital age' },
        ],
      },
    },
    {
      id: 'pricing-1',
      type: 'pricing',
      content: {
        variant: 'tiers',
        heading: 'Choose Your Pass',
        tiers: [
          {
            name: 'Early Bird',
            description: 'Limited time offer',
            price: '$499',
            period: '3-day pass',
            features: ['Access to all sessions', 'Conference materials', 'Networking events', 'Lunch included'],
            ctaText: 'Register Now',
            ctaLink: '#register',
          },
          {
            name: 'Standard',
            description: 'Most popular option',
            price: '$699',
            period: '3-day pass',
            features: ['Everything in Early Bird', 'Workshop access', 'VIP lounge access', 'Speaker meet & greet'],
            highlighted: true,
            ctaText: 'Get Started',
            ctaLink: '#register',
          },
          {
            name: 'VIP',
            description: 'Premium experience',
            price: '$999',
            period: '3-day pass',
            features: ['Everything in Standard', 'Private sessions', 'Concierge service', 'After-party access'],
            ctaText: 'Go Premium',
            ctaLink: '#register',
          },
        ],
      },
    },
    {
      id: 'contact-1',
      type: 'contact',
      content: {
        variant: 'simple',
        heading: 'Have Questions?',
        description: 'Our team is here to help you make the most of your experience.',
        email: 'info@techsummit.com',
        showForm: true,
      },
      settings: { spacing: 'loose', background: '#F9FAFB' },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'simple',
        logo: 'Tech Summit 2025',
        copyright: '© 2025 Tech Summit. All rights reserved.',
      },
    },
  ],
};

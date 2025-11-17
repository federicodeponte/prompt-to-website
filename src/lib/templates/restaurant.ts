// ABOUTME: Restaurant/Local Business template
// ABOUTME: Features menu showcase, location, hours, and contact

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const restaurantTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'restaurant',
  theme: {
    ...defaultTheme,
    colors: {
      primary: '#D97706', // Amber
      secondary: '#059669', // Green
      background: '#FFFFFF',
      text: '#1F2937',
      muted: '#6B7280',
    },
  },
  metadata: {
    title: 'Bella Vista Restaurant',
    description: 'Authentic Italian cuisine in the heart of the city',
    author: 'Bella Vista',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'centered',
        heading: 'Experience Authentic Italian Cuisine',
        subheading: 'Fresh ingredients. Traditional recipes. Unforgettable flavors.',
        ctaPrimary: { text: 'Reserve a Table', link: '#contact' },
        ctaSecondary: { text: 'View Menu', link: '#menu' },
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'What Makes Us Special',
        columns: 3,
        features: [
          { icon: '🍝', title: 'Authentic Recipes', description: 'Traditional Italian dishes passed down through generations' },
          { icon: '🌱', title: 'Fresh Ingredients', description: 'Locally sourced produce and imported Italian specialty items' },
          { icon: '👨‍🍳', title: 'Expert Chefs', description: 'Trained in Italy with 20+ years of culinary experience' },
        ],
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'bar',
        heading: 'Our Story in Numbers',
        stats: [
          { value: '25', suffix: ' Years', label: 'Serving Excellence' },
          { value: '10k+', label: 'Happy Guests' },
          { value: '4.9', suffix: ' ★', label: 'Average Rating' },
        ],
      },
      settings: { spacing: 'normal', background: '#FEF3C7' },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'What Our Guests Say',
        columns: 3,
        testimonials: [
          { quote: 'Best Italian food outside of Italy! The pasta is incredible.', author: 'Michael Roberts', role: 'Food Critic', rating: 5 },
          { quote: 'Cozy atmosphere and attentive service. Highly recommend!', author: 'Emma Wilson', role: 'Regular Guest', rating: 5 },
          { quote: 'Their tiramisu is to die for. A must-visit restaurant!', author: 'David Chen', role: 'Food Blogger', rating: 5 },
        ],
      },
    },
    {
      id: 'contact-1',
      type: 'contact',
      content: {
        variant: 'simple',
        heading: 'Visit Us',
        description: 'Open Tuesday-Sunday, 11am-10pm. Closed Mondays.',
        email: 'info@bellavista.com',
        phone: '(555) 123-4567',
        address: '123 Main Street, Downtown',
        showForm: true,
      },
      settings: { spacing: 'loose', background: '#F9FAFB' },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'simple',
        logo: 'Bella Vista',
        copyright: '© 2025 Bella Vista Restaurant',
      },
    },
  ],
};

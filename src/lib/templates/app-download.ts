// ABOUTME: App Download Page template
// ABOUTME: Features app showcases, download buttons, reviews, and screenshots

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const appDownloadTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'app-download',
  theme: {
    ...defaultTheme,
    colors: {
      primary: '#8B5CF6', // Violet
      secondary: '#EC4899', // Pink
      background: '#FFFFFF',
      text: '#1F2937',
      muted: '#6B7280',
    },
  },
  metadata: {
    title: 'FitTrack - Your Fitness Companion',
    description: 'Track workouts, achieve goals, transform your life',
    author: 'FitTrack Inc',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'centered',
        heading: 'Transform Your Fitness Journey',
        subheading: 'Track workouts. Achieve goals. Feel amazing.',
        description: 'Join 2 million+ users who transformed their lives with FitTrack',
        ctaPrimary: { text: 'Download for iOS', link: '#download' },
        ctaSecondary: { text: 'Download for Android', link: '#download' },
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'bar',
        heading: 'Join the Movement',
        stats: [
          { value: '2M+', label: 'Active Users' },
          { value: '500M+', label: 'Workouts Logged' },
          { value: '4.8', suffix: ' ★', label: 'App Store Rating' },
          { value: '50+', label: 'Countries' },
        ],
      },
      settings: { spacing: 'normal', background: '#FAF5FF' },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Everything You Need to Succeed',
        subheading: 'Powerful features to keep you motivated and on track',
        columns: 3,
        features: [
          { icon: '💪', title: 'Workout Tracking', description: 'Log exercises, sets, reps, and weight with ease' },
          { icon: '📊', title: 'Progress Charts', description: 'Visualize your improvements over time' },
          { icon: '🎯', title: 'Goal Setting', description: 'Set and achieve personalized fitness goals' },
          { icon: '🏃', title: 'Activity Monitor', description: 'Track steps, calories, and daily activity' },
          { icon: '🍎', title: 'Nutrition Logging', description: 'Monitor meals and macros effortlessly' },
          { icon: '👥', title: 'Community', description: 'Connect with friends and stay motivated' },
        ],
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'Real Results from Real Users',
        columns: 3,
        testimonials: [
          { quote: 'Lost 30 lbs in 4 months! This app changed my life.', author: 'Jessica Brown', role: 'Premium Member', rating: 5 },
          { quote: 'The best fitness app I have ever used. Simple, powerful, motivating.', author: 'Mike Thompson', role: 'Pro Athlete', rating: 5 },
          { quote: 'Helped me build consistent workout habits. Cannot live without it!', author: 'Amanda Lee', role: 'Yoga Instructor', rating: 5 },
        ],
      },
    },
    {
      id: 'pricing-1',
      type: 'pricing',
      content: {
        variant: 'tiers',
        heading: 'Choose Your Plan',
        tiers: [
          {
            name: 'Free',
            description: 'Get started today',
            price: '$0',
            period: 'forever',
            features: ['Basic workout tracking', 'Exercise library', 'Progress charts', 'Community access'],
            ctaText: 'Download Free',
            ctaLink: '#download',
          },
          {
            name: 'Pro',
            description: 'Unlock your potential',
            price: '$9.99',
            period: 'month',
            features: ['Everything in Free', 'Custom workout plans', 'Nutrition tracking', 'Advanced analytics', 'Ad-free experience'],
            highlighted: true,
            ctaText: 'Try Pro Free',
            ctaLink: '#download',
          },
          {
            name: 'Premium',
            description: 'Maximum results',
            price: '$19.99',
            period: 'month',
            features: ['Everything in Pro', 'Personal trainer AI', '1-on-1 coaching', 'Meal planning', 'Priority support'],
            ctaText: 'Go Premium',
            ctaLink: '#download',
          },
        ],
      },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Common Questions',
        faqs: [
          { question: 'Is the app really free?', answer: 'Yes! The free version includes core workout tracking features. Upgrade to Pro or Premium for advanced features.' },
          { question: 'Which devices are supported?', answer: 'FitTrack is available on iOS 15+, Android 10+, and Apple Watch.' },
          { question: 'Can I cancel my subscription anytime?', answer: 'Absolutely! Cancel anytime from your account settings. No questions asked.' },
          { question: 'Do you offer a free trial?', answer: 'Yes! Pro and Premium plans come with a 14-day free trial.' },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'centered',
        heading: 'Start Your Transformation Today',
        description: 'Download FitTrack and join millions achieving their fitness goals',
        ctaPrimary: { text: 'Download on App Store', link: '#ios' },
        ctaSecondary: { text: 'Get it on Google Play', link: '#android' },
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'simple',
        logo: 'FitTrack',
        copyright: '© 2025 FitTrack Inc. All rights reserved.',
      },
    },
  ],
};

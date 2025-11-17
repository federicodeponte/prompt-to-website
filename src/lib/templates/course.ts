// ABOUTME: Online Course/Education template
// ABOUTME: Features curriculum, instructor, testimonials, and enrollment

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const courseTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'course',
  theme: {
    ...defaultTheme,
    colors: {
      primary: '#2563EB', // Blue
      secondary: '#10B981', // Green
      background: '#FFFFFF',
      text: '#1F2937',
      muted: '#6B7280',
    },
  },
  metadata: {
    title: 'Master Web Development',
    description: 'Learn to build modern web applications from scratch',
    author: 'WebDev Academy',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'centered',
        heading: 'Master Modern Web Development',
        subheading: 'Go from beginner to professional in 12 weeks',
        description: 'Learn React, Next.js, TypeScript, and build real-world projects',
        ctaPrimary: { text: 'Start Learning', link: '#pricing' },
        ctaSecondary: { text: 'View Curriculum', link: '#features' },
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'bar',
        heading: 'Course Impact',
        stats: [
          { value: '10,000+', label: 'Students Enrolled' },
          { value: '4.9', suffix: '/5', label: 'Average Rating' },
          { value: '95%', label: 'Completion Rate' },
          { value: '85%', label: 'Got Dev Jobs' },
        ],
      },
      settings: { spacing: 'normal', background: '#EFF6FF' },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'What You will Learn',
        subheading: 'Comprehensive curriculum covering modern web development',
        columns: 3,
        features: [
          { icon: '⚛️', title: 'React & Next.js', description: 'Build scalable applications with modern frameworks' },
          { icon: '📘', title: 'TypeScript', description: 'Write type-safe, maintainable code' },
          { icon: '🎨', title: 'UI/UX Design', description: 'Create beautiful, responsive interfaces' },
          { icon: '🔧', title: 'Backend APIs', description: 'Build RESTful APIs with Node.js' },
          { icon: '🗄️', title: 'Databases', description: 'Work with SQL and NoSQL databases' },
          { icon: '🚀', title: 'Deployment', description: 'Deploy apps to production with Vercel' },
        ],
      },
    },
    {
      id: 'team-1',
      type: 'team',
      content: {
        variant: 'grid',
        heading: 'Meet Your Instructor',
        columns: 1,
        members: [
          {
            name: 'Sarah Johnson',
            role: 'Senior Full Stack Developer',
            bio: '10+ years building web applications at Google and Airbnb. Passionate about teaching and helping developers level up their skills.',
          },
        ],
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'Success Stories',
        subheading: 'Hear from students who transformed their careers',
        columns: 3,
        testimonials: [
          { quote: 'Went from zero coding experience to landing my first dev job in 4 months!', author: 'Alex Martinez', role: 'Junior Developer at Shopify', rating: 5 },
          { quote: 'The best investment I ever made in my career. Worth every penny.', author: 'Priya Patel', role: 'Frontend Engineer at Meta', rating: 5 },
          { quote: 'Sarah is an incredible teacher. The projects are challenging and practical.', author: 'James Kim', role: 'Full Stack Developer at Stripe', rating: 5 },
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
            name: 'Basic',
            description: 'Self-paced learning',
            price: '$399',
            period: 'one-time',
            features: ['Lifetime course access', '50+ hours of video', 'Downloadable resources', 'Community Discord'],
            ctaText: 'Get Started',
            ctaLink: '#enroll',
          },
          {
            name: 'Pro',
            description: 'Most popular',
            price: '$599',
            period: 'one-time',
            features: ['Everything in Basic', 'Weekly live Q&A sessions', 'Code review for projects', 'Job interview prep', 'Certificate of completion'],
            highlighted: true,
            ctaText: 'Enroll Now',
            ctaLink: '#enroll',
          },
          {
            name: 'Premium',
            description: 'Maximum support',
            price: '$999',
            period: 'one-time',
            features: ['Everything in Pro', '1-on-1 mentorship (4 sessions)', 'Portfolio review', 'Resume optimization', 'Job placement support'],
            ctaText: 'Go Premium',
            ctaLink: '#enroll',
          },
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
          { question: 'Do I need prior coding experience?', answer: 'No! This course starts from the basics and gradually progresses to advanced topics.' },
          { question: 'How long do I have access to the course?', answer: 'You have lifetime access to all course materials and updates.' },
          { question: 'What if I need help?', answer: 'You can ask questions in our Discord community, attend live Q&As (Pro/Premium), or get 1-on-1 help (Premium).' },
        ],
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'simple',
        logo: 'WebDev Academy',
        copyright: '© 2025 WebDev Academy. All rights reserved.',
      },
    },
  ],
};

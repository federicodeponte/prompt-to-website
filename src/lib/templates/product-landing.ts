// ABOUTME: Product landing page template for showcasing a specific product
// ABOUTME: Professional 11-block template with comprehensive product showcase

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const productLandingTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'product-landing',
  theme: defaultTheme,
  metadata: {
    title: 'TaskMaster Pro - Smart Task Management for Busy Professionals',
    description: 'Stay organized and productive with AI-powered task management. TaskMaster Pro helps you prioritize what matters and get more done.',
    author: 'TaskMaster Team',
  },
  blocks: [
    // Hero - Split variant with visual
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'split',
        heading: 'Master Your Tasks, Multiply Your Productivity',
        subheading: 'The smart task manager for busy professionals',
        description: 'TaskMaster Pro combines AI-powered prioritization with intuitive design to help you focus on what truly matters. Join 500,000+ professionals who accomplish more every day.',
        ctaPrimary: { text: 'Start Free Trial', link: '#pricing' },
        ctaSecondary: { text: 'Watch Demo', link: '#demo' },
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
        imageAlt: 'TaskMaster Pro dashboard on multiple devices',
        imagePosition: 'right' as const,
      },
    },

    // Logo Cloud - Companies using it
    {
      id: 'logos-1',
      type: 'logo-cloud',
      content: {
        variant: 'grid',
        heading: 'Trusted by teams at',
        logos: [
          { name: 'Google', src: '/logos/google.svg' },
          { name: 'Microsoft', src: '/logos/microsoft.svg' },
          { name: 'Apple', src: '/logos/apple.svg' },
          { name: 'Amazon', src: '/logos/amazon.svg' },
          { name: 'Netflix', src: '/logos/netflix.svg' },
          { name: 'Spotify', src: '/logos/spotify.svg' },
        ],
      },
      settings: { spacing: 'tight', background: '#FFFFFF' },
    },

    // Stats - Social proof
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Trusted Worldwide',
        columns: 4,
        stats: [
          { value: '500K+', label: 'Active Users' },
          { value: '10M+', label: 'Tasks Completed Daily' },
          { value: '4.8', label: 'App Store Rating', suffix: '/5' },
          { value: '150+', label: 'Countries' },
        ],
      },
      settings: { spacing: 'normal', background: '#F9FAFB' },
    },

    // Features - Core product features (6 items)
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Everything You Need to Stay Organized',
        subheading: 'Powerful features designed for productivity',
        columns: 3,
        features: [
          {
            icon: '🤖',
            title: 'AI-Powered Prioritization',
            description: 'Smart algorithms analyze your tasks, deadlines, and work patterns to suggest the optimal order for maximum productivity.',
          },
          {
            icon: '🔔',
            title: 'Intelligent Reminders',
            description: 'Context-aware notifications that adapt to your schedule. Never miss a deadline without being overwhelmed by alerts.',
          },
          {
            icon: '☁️',
            title: 'Seamless Cloud Sync',
            description: 'Access your tasks anywhere. Real-time sync across iOS, Android, Mac, Windows, and web keeps you in sync.',
          },
          {
            icon: '📊',
            title: 'Progress Analytics',
            description: 'Visual insights into your productivity patterns. Track completion rates, time estimates, and identify bottlenecks.',
          },
          {
            icon: '🤝',
            title: 'Team Collaboration',
            description: 'Share projects, assign tasks, and collaborate seamlessly. Perfect for both personal and team productivity.',
          },
          {
            icon: '🎨',
            title: 'Customizable Workflows',
            description: 'Create custom tags, filters, and views. Adapt TaskMaster Pro to match your unique work style.',
          },
        ],
      },
      settings: { spacing: 'loose' },
    },

    // Video or Demo Section
    {
      id: 'video-1',
      type: 'video',
      content: {
        variant: 'embed',
        heading: 'See TaskMaster Pro in Action',
        description: 'Watch how TaskMaster Pro helps professionals like you stay organized and accomplish more',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      settings: { spacing: 'loose', background: '#FFFFFF' },
    },

    // Testimonials - Carousel for more social proof
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'carousel',
        heading: 'Loved by Busy Professionals',
        description: 'See what our users are saying',
        testimonials: [
          {
            quote: 'TaskMaster Pro completely transformed how I manage my day. The AI prioritization is scary-accurate and saves me hours every week.',
            author: 'Sarah Chen',
            role: 'Product Manager',
            company: 'Google',
            rating: 5,
            avatar: '/avatars/sarah.jpg',
          },
          {
            quote: 'I\'ve tried every task manager out there. TaskMaster Pro is the only one that actually helps me get things done instead of just organizing my to-do list.',
            author: 'Marcus Rodriguez',
            role: 'Software Engineer',
            company: 'Microsoft',
            rating: 5,
            avatar: '/avatars/marcus.jpg',
          },
          {
            quote: 'The cross-platform sync is flawless. I can start a task on my phone, continue on my laptop, and everything just works. Game changer for remote work.',
            author: 'Emma Watson',
            role: 'Marketing Director',
            company: 'Apple',
            rating: 5,
            avatar: '/avatars/emma.jpg',
          },
          {
            quote: 'Best investment I\'ve made in my productivity. The team collaboration features are perfect for managing projects across departments.',
            author: 'David Park',
            role: 'Operations Manager',
            company: 'Amazon',
            rating: 5,
            avatar: '/avatars/david.jpg',
          },
        ],
      },
      settings: { spacing: 'loose', background: '#F9FAFB' },
    },

    // Pricing - Simple pricing
    {
      id: 'pricing-1',
      type: 'pricing',
      content: {
        variant: 'simple',
        heading: 'Choose Your Plan',
        description: 'Start free, upgrade as you grow. All plans include 14-day free trial.',
        tiers: [
          {
            name: 'Free',
            price: '$0',
            period: 'forever',
            description: 'Perfect for getting started',
            features: [
              'Up to 50 tasks',
              'Basic prioritization',
              'Mobile & web access',
              'Community support',
            ],
            ctaText: 'Get Started Free',
            ctaLink: '#signup',
          },
          {
            name: 'Pro',
            price: '$9',
            period: 'per month',
            description: 'For serious productivity',
            features: [
              'Unlimited tasks & projects',
              'AI-powered prioritization',
              'Cloud sync across all devices',
              'Advanced analytics',
              'Priority email support',
              'Custom workflows',
            ],
            ctaText: 'Start Free Trial',
            ctaLink: '#trial',
            highlighted: true,
          },
          {
            name: 'Teams',
            price: '$6',
            period: 'per user/month',
            description: 'For collaborative teams',
            features: [
              'Everything in Pro',
              'Team collaboration',
              'Shared projects & tasks',
              'Admin dashboard',
              'Team analytics',
              'Dedicated support',
              'Custom integrations',
            ],
            ctaText: 'Contact Sales',
            ctaLink: '#sales',
          },
        ],
      },
      settings: { spacing: 'loose' },
    },

    // FAQ - Expanded
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        description: 'Everything you need to know about TaskMaster Pro',
        columns: 2,
        faqs: [
          {
            question: 'Is TaskMaster Pro available on all platforms?',
            answer: 'Yes! TaskMaster Pro works seamlessly across iOS, Android, macOS, Windows, and web browsers. All your tasks sync in real-time across every device.',
          },
          {
            question: 'How does AI-powered prioritization work?',
            answer: 'Our AI analyzes multiple factors including deadlines, task dependencies, estimated effort, and your historical work patterns to suggest the optimal task order. It learns from your behavior to get smarter over time.',
          },
          {
            question: 'Can I use TaskMaster Pro offline?',
            answer: 'Absolutely! All core features work completely offline. Your tasks will automatically sync when you reconnect to the internet. Perfect for flights, commutes, or areas with spotty connectivity.',
          },
          {
            question: 'How does the free trial work?',
            answer: 'All paid plans include a 14-day free trial with full access to Pro or Teams features. No credit card required to start. If you love it, upgrade to continue. Otherwise, downgrade to our free plan.',
          },
          {
            question: 'Can I import tasks from other apps?',
            answer: 'Yes! We support imports from Todoist, Any.do, Microsoft To Do, Apple Reminders, Google Tasks, and more. We also offer API access for custom integrations.',
          },
          {
            question: 'What makes TaskMaster Pro different?',
            answer: 'Unlike other task managers that just organize your tasks, TaskMaster Pro uses AI to actively help you prioritize and complete them. Plus, our focus on cross-platform sync and beautiful design makes staying organized effortless.',
          },
        ],
      },
      settings: { spacing: 'loose', background: '#F9FAFB' },
    },

    // Newsletter signup
    {
      id: 'newsletter-1',
      type: 'newsletter',
      content: {
        variant: 'simple',
        heading: 'Productivity Tips & Updates',
        description: 'Get weekly tips, feature updates, and exclusive productivity insights delivered to your inbox.',
        placeholder: 'Enter your email',
        ctaText: 'Subscribe',
      },
      settings: { spacing: 'normal', background: '#FFFFFF' },
    },

    // Final CTA
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Ready to Master Your Tasks?',
        description: 'Join 500,000+ professionals using TaskMaster Pro to accomplish more every day. Start your free trial now — no credit card required.',
        ctaPrimary: { text: 'Start Free Trial', link: '#signup' },
        ctaSecondary: { text: 'Download Apps', link: '#download' },
      },
      settings: { spacing: 'loose', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    },

    // Footer - Enhanced
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'multi-column',
        logo: 'TaskMaster Pro',
        tagline: 'Smart task management for busy professionals',
        description: 'Built by productivity enthusiasts who believe work should be focused, not frantic.',
        columns: [
          {
            heading: 'Product',
            links: [
              { text: 'Features', url: '#features' },
              { text: 'Pricing', url: '#pricing' },
              { text: 'Download Apps', url: '#download' },
              { text: 'Integrations', url: '/integrations' },
              { text: 'API', url: '/api' },
            ],
          },
          {
            heading: 'Resources',
            links: [
              { text: 'Documentation', url: '/docs' },
              { text: 'Tutorials', url: '/tutorials' },
              { text: 'Blog', url: '/blog' },
              { text: 'Help Center', url: '/help' },
              { text: 'Community', url: '/community' },
            ],
          },
          {
            heading: 'Company',
            links: [
              { text: 'About', url: '/about' },
              { text: 'Careers', url: '/careers' },
              { text: 'Privacy', url: '/privacy' },
              { text: 'Terms', url: '/terms' },
              { text: 'Contact', url: '/contact' },
            ],
          },
        ],
        social: [
          { platform: 'Twitter', url: 'https://twitter.com/taskmasterpro' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/taskmasterpro' },
          { platform: 'GitHub', url: 'https://github.com/taskmasterpro' },
        ],
        copyright: '© 2025 TaskMaster Pro. All rights reserved.',
      },
      settings: { background: '#111827' },
    },
  ],
};

// ABOUTME: Product landing page template for showcasing a specific product
// ABOUTME: Comprehensive version with 22 blocks for professional landing pages

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const productLandingTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'product-landing',
  theme: defaultTheme,
  metadata: {
    title: 'TaskMaster Pro - Task Management App',
    description: 'Stay organized with TaskMaster Pro - Smart task manager for busy professionals with AI-powered prioritization and cross-device sync',
    author: 'TaskMaster Team',
  },
  blocks: [
    // Hero Section
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'split',
        heading: 'Master Your Tasks, Reclaim Your Time',
        subheading: 'The smart task manager built for busy professionals',
        ctaPrimary: { text: 'Start Free Trial', link: '#download' },
        ctaSecondary: { text: 'Watch Demo', link: '#demo' },
        description: 'TaskMaster Pro combines AI-powered prioritization, intelligent reminders, and seamless cross-device sync to help you focus on what matters most. Join 500,000+ professionals who have transformed their productivity.',
      },
    },

    // Logo Wall - Trusted By
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
          { name: 'Meta', src: '/logos/meta.svg' },
        ],
      },
      settings: { spacing: 'tight', background: '#FFFFFF' },
    },

    // Social Proof Stats
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
          { value: '99.9%', label: 'Uptime Guarantee' },
        ],
      },
      settings: { spacing: 'normal', background: '#F9FAFB' },
    },

    // Problem/Solution
    {
      id: 'content-1',
      type: 'hero',
      content: {
        variant: 'centered',
        heading: 'Stop Juggling, Start Mastering',
        description: 'Between endless meetings, email overload, and competing priorities, important tasks fall through the cracks. TaskMaster Pro brings order to chaos with intelligent automation that learns how you work.',
      },
      settings: { spacing: 'normal' },
    },

    // Core Features - Grid
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Everything You Need to Stay on Top',
        description: 'Powerful features designed for modern professionals',
        columns: 3,
        features: [
          { icon: '🎯', title: 'Smart Prioritization', description: 'AI analyzes your deadlines, dependencies, and work patterns to automatically rank tasks by true importance.' },
          { icon: '🔔', title: 'Intelligent Reminders', description: 'Context-aware notifications that adapt to your schedule and location, ensuring you never miss what matters.' },
          { icon: '☁️', title: 'Seamless Cloud Sync', description: 'Start on your phone, continue on your laptop. All changes sync instantly across every device.' },
          { icon: '🤝', title: 'Team Collaboration', description: 'Share projects, assign tasks, and track progress together with real-time updates for your entire team.' },
          { icon: '📊', title: 'Productivity Analytics', description: 'Understand your work patterns with detailed insights and personalized recommendations to optimize your workflow.' },
          { icon: '🔐', title: 'Enterprise Security', description: 'Bank-level encryption, SSO support, and compliance with GDPR, SOC 2, and HIPAA standards.' },
        ],
      },
      settings: { spacing: 'loose' },
    },

    // Product Screenshot/Demo
    {
      id: 'media-1',
      type: 'gallery',
      content: {
        variant: 'screenshot',
        heading: 'Beautiful Design, Powerful Engine',
        description: 'An interface designed for speed and clarity',
        media: {
          type: 'image',
          src: '/screenshots/dashboard.png',
          alt: 'TaskMaster Pro Dashboard',
        },
      },
      settings: { spacing: 'normal', background: '#F3F4F6' },
    },

    // Feature Showcase - Alternating
    {
      id: 'features-2',
      type: 'features',
      content: {
        variant: 'alternating',
        heading: 'Work Smarter, Not Harder',
        features: [
          {
            icon: '🧠',
            title: 'AI-Powered Task Suggestions',
            description: 'Our machine learning engine learns from your behavior to suggest optimal task ordering, break down complex projects, and identify bottlenecks before they become problems.',
            image: '/features/ai-suggestions.png'
          },
          {
            icon: '⚡',
            title: 'Lightning-Fast Capture',
            description: 'Add tasks in seconds with natural language processing, voice input, email forwarding, and browser extensions. Capture ideas the moment they strike.',
            image: '/features/quick-capture.png'
          },
          {
            icon: '📱',
            title: 'Works Everywhere',
            description: 'Native apps for iOS, Android, macOS, Windows, and web. Offline-first architecture means you stay productive anywhere, anytime.',
            image: '/features/cross-platform.png'
          },
        ],
      },
      settings: { spacing: 'loose' },
    },

    // Use Cases
    {
      id: 'use-cases-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Built for How You Work',
        columns: 3,
        items: [
          {
            heading: 'For Developers',
            description: 'Integrate with GitHub, Jira, and Linear. Track sprints, manage technical debt, and sync with your development workflow.'
          },
          {
            heading: 'For Executives',
            description: 'Delegate effectively, track team progress, and maintain visibility across multiple projects without micromanaging.'
          },
          {
            heading: 'For Freelancers',
            description: 'Manage multiple clients, track billable hours, and never miss a deadline with automated invoicing integrations.'
          },
          {
            heading: 'For Students',
            description: 'Organize assignments, study schedules, and group projects. Student plans available with 50% discount.'
          },
          {
            heading: 'For Marketing Teams',
            description: 'Coordinate campaigns, manage content calendars, and collaborate on creative projects with integrated approval workflows.'
          },
          {
            heading: 'For Remote Teams',
            description: 'Stay aligned across time zones with async updates, shared workspaces, and automatic standup summaries.'
          },
        ],
      },
      settings: { spacing: 'normal', background: '#FFFFFF' },
    },

    // Integration Showcase
    {
      id: 'integrations-1',
      type: 'features',
      content: {
        variant: 'centered',
        heading: 'Connects with Tools You Already Use',
        description: 'Seamless integrations with 50+ popular apps and services',
      },
      settings: { spacing: 'tight' },
    },
    {
      id: 'logos-2',
      type: 'logo-cloud',
      content: {
        variant: 'grid',
        logos: [
          { name: 'Slack', src: '/integrations/slack.svg' },
          { name: 'Gmail', src: '/integrations/gmail.svg' },
          { name: 'Outlook', src: '/integrations/outlook.svg' },
          { name: 'Google Calendar', src: '/integrations/calendar.svg' },
          { name: 'Zoom', src: '/integrations/zoom.svg' },
          { name: 'Notion', src: '/integrations/notion.svg' },
          { name: 'Asana', src: '/integrations/asana.svg' },
          { name: 'Trello', src: '/integrations/trello.svg' },
        ],
      },
      settings: { spacing: 'normal', background: '#F9FAFB' },
    },

    // Testimonials - Carousel
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'carousel',
        heading: 'Loved by Professionals Worldwide',
        description: 'See what our users are saying',
        testimonials: [
          {
            quote: 'TaskMaster Pro completely transformed how I manage my workday. The AI prioritization is scary-accurate and has saved me hours every week.',
            author: 'Sarah Chen',
            role: 'VP of Product at Stripe',
            rating: 5,
            avatar: '/avatars/sarah.jpg'
          },
          {
            quote: 'I\'ve tried every task manager out there. TaskMaster Pro is the first one that actually adapts to how I work instead of forcing me to change my workflow.',
            author: 'Marcus Rodriguez',
            role: 'Software Engineer at Google',
            rating: 5,
            avatar: '/avatars/marcus.jpg'
          },
          {
            quote: 'Managing 50+ freelance clients used to be overwhelming. Now I feel in control and never miss a deadline. Worth every penny.',
            author: 'Emma Thompson',
            role: 'Freelance Designer',
            rating: 5,
            avatar: '/avatars/emma.jpg'
          },
          {
            quote: 'The team collaboration features are phenomenal. We migrated our entire 30-person team from Asana and haven\'t looked back.',
            author: 'David Park',
            role: 'CTO at Notion',
            rating: 5,
            avatar: '/avatars/david.jpg'
          },
        ],
      },
      settings: { spacing: 'loose' },
    },

    // Pricing
    {
      id: 'pricing-1',
      type: 'pricing',
      content: {
        variant: 'cards',
        heading: 'Simple, Transparent Pricing',
        description: 'Choose the plan that works for you. All plans include a 14-day free trial.',
        plans: [
          {
            name: 'Personal',
            price: '$0',
            period: 'forever',
            description: 'Perfect for individuals',
            features: [
              'Up to 100 tasks',
              'Basic prioritization',
              'Mobile & web apps',
              'Community support',
            ],
            cta: { text: 'Get Started', link: '#signup' },
          },
          {
            name: 'Pro',
            price: '$12',
            period: 'per month',
            description: 'For serious professionals',
            features: [
              'Unlimited tasks',
              'AI prioritization',
              'All integrations',
              'Priority support',
              'Productivity analytics',
              'Custom themes',
            ],
            cta: { text: 'Start Free Trial', link: '#trial' },
            featured: true,
          },
          {
            name: 'Team',
            price: '$10',
            period: 'per user/month',
            description: 'For growing teams',
            features: [
              'Everything in Pro',
              'Team workspaces',
              'Admin controls',
              'Shared projects',
              'Advanced analytics',
              'SSO & SAML',
              'Dedicated support',
            ],
            cta: { text: 'Contact Sales', link: '#sales' },
          },
        ],
      },
      settings: { spacing: 'loose', background: '#F9FAFB' },
    },

    // Comparison Table
    {
      id: 'comparison-1',
      type: 'features',
      content: {
        variant: 'table',
        heading: 'How TaskMaster Pro Stacks Up',
        description: 'See how we compare to other task managers',
        table: {
          headers: ['Feature', 'TaskMaster Pro', 'Todoist', 'Things', 'Asana'],
          rows: [
            ['AI Prioritization', '✓', '✗', '✗', '✗'],
            ['Natural Language Input', '✓', '✓', '✗', '✓'],
            ['Offline Mode', '✓', 'Limited', '✓', '✗'],
            ['Team Collaboration', '✓', 'Limited', '✗', '✓'],
            ['Integrations', '50+', '20+', '5', '100+'],
            ['Free Plan', '✓', '✓', '✗', 'Limited'],
          ],
        },
      },
      settings: { spacing: 'normal' },
    },

    // Security & Trust
    {
      id: 'trust-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Enterprise-Grade Security & Compliance',
        description: 'Your data is protected with industry-leading security measures',
        columns: 4,
        items: [
          { heading: 'SOC 2 Type II', description: 'Independently audited security controls' },
          { heading: 'GDPR Compliant', description: 'Full data privacy compliance' },
          { heading: 'HIPAA Ready', description: 'Healthcare data protection' },
          { heading: 'ISO 27001', description: 'Information security certified' },
        ],
      },
      settings: { spacing: 'normal', background: '#F3F4F6' },
    },

    // FAQ
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
            answer: 'Yes! We have native apps for iOS, Android, macOS, Windows, and a full-featured web app. All platforms sync instantly via the cloud.'
          },
          {
            question: 'How does the AI prioritization work?',
            answer: 'Our machine learning engine analyzes your task deadlines, dependencies, historical completion patterns, and current context to recommend the optimal order to work on tasks. It gets smarter the more you use it.'
          },
          {
            question: 'Can I use TaskMaster Pro offline?',
            answer: 'Absolutely. All core features work fully offline on mobile and desktop apps. Changes sync automatically when you reconnect to the internet.'
          },
          {
            question: 'How do I migrate from my current task manager?',
            answer: 'We offer one-click imports from Todoist, Things, Asana, Trello, and more. Or use our CSV import for any other tool. Our migration team can also help with enterprise transitions.'
          },
          {
            question: 'What integrations are available?',
            answer: 'TaskMaster Pro integrates with 50+ tools including Slack, Gmail, Google Calendar, Outlook, Zoom, Notion, GitHub, Jira, and many more. We add new integrations monthly based on user requests.'
          },
          {
            question: 'Is there a free trial?',
            answer: 'Yes! All paid plans include a 14-day free trial with full access to all features. No credit card required to start.'
          },
          {
            question: 'What happens to my data if I cancel?',
            answer: 'You can export all your data in multiple formats (JSON, CSV, PDF) at any time. We also keep your data for 90 days after cancellation in case you want to return.'
          },
          {
            question: 'Do you offer educational or non-profit discounts?',
            answer: 'Yes! Students and educators receive 50% off Pro plans. Non-profit organizations receive 30% off Team plans. Contact us for verification.'
          },
        ],
      },
      settings: { spacing: 'loose' },
    },

    // Newsletter/Resources
    {
      id: 'newsletter-1',
      type: 'cta',
      content: {
        variant: 'centered',
        heading: 'Productivity Tips & Updates',
        description: 'Join 100,000+ subscribers getting weekly productivity strategies, feature updates, and exclusive tips.',
        ctaPrimary: { text: 'Subscribe Now', link: '#newsletter' },
        form: {
          fields: [{ type: 'email', placeholder: 'Enter your email', required: true }],
        },
      },
      settings: { spacing: 'normal', background: '#EEF2FF' },
    },

    // Final CTA
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'hero',
        heading: 'Ready to Master Your Tasks?',
        description: 'Join 500,000+ professionals who have transformed their productivity with TaskMaster Pro. Start your free 14-day trial today — no credit card required.',
        ctaPrimary: { text: 'Start Free Trial', link: '#download' },
        ctaSecondary: { text: 'Schedule Demo', link: '#demo' },
      },
      settings: { spacing: 'loose', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    },

    // Footer
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'comprehensive',
        logo: 'TaskMaster Pro',
        tagline: 'Master your tasks, reclaim your time',
        description: 'The smart task manager built for busy professionals.',
        columns: [
          {
            heading: 'Product',
            links: [
              { text: 'Features', url: '#features' },
              { text: 'Pricing', url: '#pricing' },
              { text: 'Integrations', url: '#integrations' },
              { text: 'Mobile Apps', url: '#mobile' },
              { text: 'Enterprise', url: '#enterprise' },
            ],
          },
          {
            heading: 'Resources',
            links: [
              { text: 'Blog', url: '/blog' },
              { text: 'Help Center', url: '/help' },
              { text: 'API Docs', url: '/docs' },
              { text: 'Community', url: '/community' },
              { text: 'Changelog', url: '/changelog' },
            ],
          },
          {
            heading: 'Company',
            links: [
              { text: 'About', url: '/about' },
              { text: 'Careers', url: '/careers' },
              { text: 'Press Kit', url: '/press' },
              { text: 'Contact', url: '/contact' },
            ],
          },
          {
            heading: 'Legal',
            links: [
              { text: 'Privacy', url: '/privacy' },
              { text: 'Terms', url: '/terms' },
              { text: 'Security', url: '/security' },
              { text: 'GDPR', url: '/gdpr' },
            ],
          },
        ],
        social: [
          { platform: 'Twitter', url: 'https://twitter.com/taskmasterpro' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/taskmasterpro' },
          { platform: 'GitHub', url: 'https://github.com/taskmasterpro' },
          { platform: 'YouTube', url: 'https://youtube.com/@taskmasterpro' },
        ],
        copyright: '© 2025 TaskMaster Pro. All rights reserved.',
      },
      settings: { background: '#111827' },
    },
  ],
};

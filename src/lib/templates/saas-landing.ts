// ABOUTME: SaaS landing page template with pre-configured blocks
// ABOUTME: Professional 10-block template with quality, working components

import { WebsiteConfig } from '../types/website-config';
import { defaultTheme } from '../theme/defaults';

export const saasLandingTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'saas-landing',
  theme: defaultTheme,
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
      id: 'logos-1',
      type: 'logo-cloud',
      content: {
        variant: 'grid',
        heading: 'Trusted by innovative teams at',
        logos: [
          { name: 'Stripe', src: '/logos/stripe.svg' },
          { name: 'Figma', src: '/logos/figma.svg' },
          { name: 'Linear', src: '/logos/linear.svg' },
          { name: 'Vercel', src: '/logos/vercel.svg' },
          { name: 'Notion', src: '/logos/notion.svg' },
          { name: 'Retool', src: '/logos/retool.svg' },
        ],
      },
      settings: { spacing: 'tight', background: '#FFFFFF' },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Built for Scale',
        columns: 4,
        stats: [
          { value: '50K+', label: 'Active Teams' },
          { value: '2M+', label: 'Projects Delivered' },
          { value: '99.9%', label: 'Uptime SLA' },
          { value: '4.9', label: 'G2 Rating', suffix: '/5' },
        ],
      },
      settings: { spacing: 'normal', background: '#F9FAFB' },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Everything Your Team Needs to Excel',
        subheading: 'Powerful features that scale with your team',
        columns: 3,
        features: [
          { icon: '🤖', title: 'AI-Powered Planning', description: 'Intelligent task breakdown, effort estimation, and sprint planning powered by machine learning.' },
          { icon: '⚡', title: 'Real-Time Collaboration', description: 'Edit together, see who\'s working on what, and ship faster with live presence and comments.' },
          { icon: '📊', title: 'Advanced Analytics', description: 'Track velocity, spot bottlenecks, and forecast delivery dates with powerful dashboards.' },
          { icon: '🔄', title: 'Seamless Integrations', description: 'Connect with GitHub, Slack, Figma, and 100+ tools your team already uses.' },
          { icon: '📱', title: 'Works Everywhere', description: 'Native apps for macOS, Windows, iOS, and Android. Work offline, sync automatically.' },
          { icon: '🔒', title: 'Enterprise Security', description: 'SOC 2 Type II certified. SSO, SAML, 2FA, and granular permissions included.' },
        ],
      },
      settings: { spacing: 'loose' },
    },
    {
      id: 'pricing-1',
      type: 'pricing',
      content: {
        variant: 'simple',
        heading: 'Simple, Transparent Pricing',
        description: 'Start free, upgrade when you\'re ready. All plans include 14-day trial.',
        tiers: [
          {
            name: 'Starter',
            price: '$0',
            period: 'forever',
            description: 'Perfect for small teams getting started',
            features: ['Up to 10 team members', 'Unlimited projects & tasks', 'Basic integrations', 'Community support', 'Mobile apps'],
            ctaText: 'Get Started Free',
            ctaLink: '#signup',
          },
          {
            name: 'Professional',
            price: '$12',
            period: 'per user/month',
            description: 'For growing teams who need more',
            features: ['Unlimited team members', 'AI-powered features', 'Advanced analytics', 'All integrations', 'Priority email support', 'Custom workflows', 'Advanced permissions'],
            ctaText: 'Start Free Trial',
            ctaLink: '#trial',
            highlighted: true,
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            period: 'pricing',
            description: 'For organizations that need more control',
            features: ['Everything in Professional', 'SAML SSO', 'Advanced security controls', 'Dedicated account manager', '99.9% uptime SLA', 'Custom onboarding', 'Volume discounts'],
            ctaText: 'Contact Sales',
            ctaLink: '#sales',
          },
        ],
      },
      settings: { spacing: 'loose', background: '#F9FAFB' },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        description: 'Everything you need to know about ProjectFlow',
        columns: 2,
        faqs: [
          {
            question: 'How does the free trial work?',
            answer: 'Start with our Professional plan free for 14 days. No credit card required. You can invite your entire team and test all features. If you love it (and we think you will), upgrade to continue. Otherwise, downgrade to our free Starter plan.',
          },
          {
            question: 'Can I migrate from my current tool?',
            answer: 'Yes! We offer seamless migration from Jira, Asana, Linear, Trello, and more. Our team can help with enterprise migrations. Most teams are up and running in under an hour.',
          },
          {
            question: 'What integrations do you support?',
            answer: 'We integrate with 100+ tools including GitHub, GitLab, Slack, Figma, Google Workspace, Microsoft 365, Salesforce, and more. Custom integrations available for Enterprise customers.',
          },
          {
            question: 'Is my data secure?',
            answer: 'Absolutely. We\'re SOC 2 Type II certified with bank-level encryption. Data is encrypted at rest and in transit. We support SSO, SAML, 2FA, and offer on-premise deployment for Enterprise customers.',
          },
          {
            question: 'Do you offer discounts for non-profits or education?',
            answer: 'Yes! Non-profit organizations and educational institutions get 50% off our Professional plan. Students and educators can use ProjectFlow free. Contact us to verify eligibility.',
          },
          {
            question: 'What happens if I cancel?',
            answer: 'You can downgrade to our free Starter plan anytime or cancel completely. Export all your data in multiple formats (JSON, CSV, PDF) before you go. We keep your data for 90 days in case you want to return.',
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
      id: 'newsletter-1',
      type: 'newsletter',
      content: {
        variant: 'simple',
        heading: 'Stay Updated',
        description: 'Get the latest product updates and tips delivered to your inbox.',
        placeholder: 'Enter your email',
        ctaText: 'Subscribe',
      },
      settings: { spacing: 'normal', background: '#FFFFFF' },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Ready to Ship Faster?',
        description: 'Join 50,000+ teams using ProjectFlow to deliver exceptional results. Start your free 14-day trial today — no credit card required.',
        ctaPrimary: { text: 'Start Free Trial', link: '#signup' },
        ctaSecondary: { text: 'Schedule Demo', link: '#demo' },
      },
      settings: { spacing: 'loose', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'multi-column',
        logo: 'ProjectFlow',
        tagline: 'Modern project management for high-performing teams',
        sections: [
          {
            title: 'Product',
            links: [
              { text: 'Features', link: '#features' },
              { text: 'Pricing', link: '#pricing' },
              { text: 'Integrations', link: '#integrations' },
              { text: 'Changelog', link: '/changelog' },
              { text: 'Roadmap', link: '/roadmap' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { text: 'Documentation', link: '/docs' },
              { text: 'API Reference', link: '/api' },
              { text: 'Blog', link: '/blog' },
              { text: 'Help Center', link: '/help' },
              { text: 'Community', link: '/community' },
            ],
          },
          {
            title: 'Company',
            links: [
              { text: 'About', link: '/about' },
              { text: 'Careers', link: '/careers' },
              { text: 'Privacy', link: '/privacy' },
              { text: 'Terms', link: '/terms' },
              { text: 'Security', link: '/security' },
            ],
          },
        ],
        social: {
          twitter: 'https://twitter.com/projectflow',
          linkedin: 'https://linkedin.com/company/projectflow',
          github: 'https://github.com/projectflow',
        },
        copyright: '© 2025 ProjectFlow. All rights reserved.',
      },
      settings: { background: '#111827' },
    },
  ],
};

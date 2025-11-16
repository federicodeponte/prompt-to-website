// ABOUTME: Agency/Consulting landing page template
// ABOUTME: Professional services showcase with team, portfolio, and contact

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const agencyTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'custom',
  theme: defaultTheme,
  metadata: {
    title: 'CreativeStudio - Digital Agency',
    description: 'Transform your brand with creative excellence',
    author: 'CreativeStudio Team',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'split',
        heading: 'Creative Agency for Modern Brands',
        subheading: 'Strategy • Design • Development',
        description: 'We help ambitious companies build remarkable digital products and experiences that drive growth.',
        ctaPrimary: { text: 'View Our Work', link: '#portfolio' },
        ctaSecondary: { text: 'Get In Touch', link: '#contact' },
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        imageAlt: 'Creative team collaboration',
        imagePosition: 'right' as const,
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'bar',
        stats: [
          { value: '200', suffix: '+', label: 'Projects Completed' },
          { value: '50', suffix: '+', label: 'Happy Clients' },
          { value: '15', suffix: '+', label: 'Team Members' },
          { value: '98', suffix: '%', label: 'Client Satisfaction' },
        ],
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Our Services',
        subheading: 'Full-service digital agency',
        columns: 3,
        features: [
          { icon: '🎨', title: 'Brand Strategy', description: 'Build a powerful brand that resonates with your audience' },
          { icon: '💻', title: 'Web Development', description: 'Custom websites and applications built for scale' },
          { icon: '📱', title: 'Mobile Apps', description: 'Native and cross-platform mobile experiences' },
          { icon: '🚀', title: 'Digital Marketing', description: 'Data-driven campaigns that deliver results' },
          { icon: '📊', title: 'Analytics & SEO', description: 'Optimize your online presence and visibility' },
          { icon: '🎬', title: 'Content Creation', description: 'Engaging content that tells your story' },
        ],
      },
    },
    {
      id: 'team-1',
      type: 'team',
      content: {
        variant: 'grid',
        heading: 'Meet Our Team',
        subheading: 'Passionate experts dedicated to your success',
        columns: 4,
        members: [
          { name: 'Sarah Johnson', role: 'Creative Director', bio: '15 years experience in brand strategy and design' },
          { name: 'Michael Chen', role: 'Lead Developer', bio: 'Full-stack expert specializing in modern web technologies' },
          { name: 'Emma Williams', role: 'Marketing Lead', bio: 'Data-driven marketer with proven track record' },
          { name: 'David Brown', role: 'UX Designer', bio: 'User-centered design advocate and researcher' },
        ],
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'What Our Clients Say',
        subheading: 'Trusted by leading companies',
        columns: 3,
        testimonials: [
          {
            quote: 'CreativeStudio transformed our brand and helped us reach new markets. Their strategic approach is unmatched.',
            author: 'Jennifer Lee',
            role: 'CEO',
            company: 'TechCorp Inc',
            rating: 5,
          },
          {
            quote: 'The team delivered beyond our expectations. Professional, creative, and always on time.',
            author: 'Mark Rodriguez',
            role: 'Marketing Director',
            company: 'GrowthLabs',
            rating: 5,
          },
          {
            quote: 'Working with CreativeStudio was a game-changer for our digital presence. Highly recommended!',
            author: 'Alex Thompson',
            role: 'Founder',
            company: 'StartupXYZ',
            rating: 5,
          },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Ready to Start Your Project?',
        description: "Let's create something amazing together. Get in touch for a free consultation.",
        ctaPrimary: { text: 'Start a Project', link: '#contact' },
        ctaSecondary: { text: 'View Pricing', link: '#pricing' },
      },
    },
    {
      id: 'contact-1',
      type: 'contact',
      content: {
        variant: 'simple',
        heading: 'Get In Touch',
        description: 'Have a project in mind? We\'d love to hear from you.',
        email: 'hello@creativestudio.com',
        phone: '+1 (555) 123-4567',
        address: '123 Creative Ave, San Francisco, CA 94102',
        showForm: true,
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'multi-column',
        logo: 'CreativeStudio',
        tagline: 'Building digital experiences that matter',
        sections: [
          {
            title: 'Services',
            links: [
              { text: 'Brand Strategy', link: '/services/brand' },
              { text: 'Web Development', link: '/services/web' },
              { text: 'Mobile Apps', link: '/services/mobile' },
              { text: 'Digital Marketing', link: '/services/marketing' },
            ],
          },
          {
            title: 'Company',
            links: [
              { text: 'About Us', link: '/about' },
              { text: 'Our Team', link: '/team' },
              { text: 'Careers', link: '/careers' },
              { text: 'Contact', link: '/contact' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { text: 'Blog', link: '/blog' },
              { text: 'Case Studies', link: '/work' },
              { text: 'FAQ', link: '/faq' },
              { text: 'Support', link: '/support' },
            ],
          },
        ],
        social: {
          twitter: 'https://twitter.com/creativestudio',
          linkedin: 'https://linkedin.com/company/creativestudio',
          github: 'https://github.com/creativestudio',
        },
        copyright: '© 2025 CreativeStudio. All rights reserved.',
      },
    },
  ],
};

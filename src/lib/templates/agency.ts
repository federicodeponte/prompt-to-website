// ABOUTME: Professional 11-block agency/consulting landing page template
// ABOUTME: Full-service digital agency showcase with comprehensive features

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
      id: 'logo-cloud-1',
      type: 'logo-cloud',
      content: {
        variant: 'grid',
        heading: 'Trusted by Leading Brands',
        subheading: 'We partner with companies that value excellence',
        columns: 5,
        logos: [
          { name: 'TechCorp', src: '/logos/techcorp.svg' },
          { name: 'DataLabs', src: '/logos/datalabs.svg' },
          { name: 'CloudSync', src: '/logos/cloudsync.svg' },
          { name: 'InnovateCo', src: '/logos/innovateco.svg' },
          { name: 'GrowthHub', src: '/logos/growthhub.svg' },
          { name: 'StartupXYZ', src: '/logos/startupxyz.svg' },
          { name: 'DigitalFlow', src: '/logos/digitalflow.svg' },
          { name: 'MediaCraft', src: '/logos/mediacraft.svg' },
          { name: 'BrandWorks', src: '/logos/brandworks.svg' },
          { name: 'FutureNow', src: '/logos/futurenow.svg' },
        ],
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Proven Track Record',
        subheading: 'Numbers that speak for themselves',
        columns: 4,
        stats: [
          { value: '200', suffix: '+', label: 'Projects Completed', description: 'Across diverse industries' },
          { value: '50', suffix: '+', label: 'Happy Clients', description: 'Long-term partnerships' },
          { value: '15', suffix: '+', label: 'Team Members', description: 'Creative experts' },
          { value: '98', suffix: '%', label: 'Client Satisfaction', description: 'Measured annually' },
        ],
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Our Services',
        subheading: 'Full-service digital agency capabilities',
        columns: 3,
        features: [
          { icon: '🎨', title: 'Brand Strategy', description: 'Build a powerful brand identity that resonates with your target audience and stands out in the market' },
          { icon: '💻', title: 'Web Development', description: 'Custom websites and web applications built with modern technologies for performance and scale' },
          { icon: '📱', title: 'Mobile Apps', description: 'Native iOS and Android apps, plus cross-platform solutions with React Native and Flutter' },
          { icon: '🚀', title: 'Digital Marketing', description: 'Data-driven campaigns across SEO, PPC, social media, and content marketing that deliver measurable ROI' },
          { icon: '📊', title: 'Analytics & SEO', description: 'Comprehensive analytics setup and SEO optimization to improve visibility and conversion rates' },
          { icon: '🎬', title: 'Content Creation', description: 'Engaging video, photography, copywriting, and design that tells your brand story authentically' },
        ],
      },
    },
    {
      id: 'video-1',
      type: 'video',
      content: {
        variant: 'split',
        heading: 'See How We Work',
        description: 'Our collaborative process combines strategy, creativity, and technology to deliver exceptional results. From discovery to launch, we partner with you every step of the way.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoPosition: 'right' as const,
        features: [
          'Discovery & research phase',
          'Strategic planning & roadmap',
          'Iterative design & development',
          'Testing & quality assurance',
          'Launch & ongoing support',
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
          { name: 'Sarah Johnson', role: 'Creative Director', bio: '15 years experience in brand strategy and design, previously at IDEO and Pentagram' },
          { name: 'Michael Chen', role: 'Lead Developer', bio: 'Full-stack expert specializing in React, Node.js, and cloud architecture with 10+ years experience' },
          { name: 'Emma Williams', role: 'Marketing Lead', bio: 'Data-driven marketer with proven track record growing startups to 7-figure revenue' },
          { name: 'David Brown', role: 'UX Designer', bio: 'User-centered design advocate with background in psychology and human-computer interaction' },
        ],
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'What Our Clients Say',
        subheading: 'Trusted by leading companies worldwide',
        columns: 3,
        testimonials: [
          {
            quote: 'CreativeStudio transformed our brand and helped us reach new markets. Their strategic approach and attention to detail is unmatched in the industry.',
            author: 'Jennifer Lee',
            role: 'CEO',
            company: 'TechCorp Inc',
            rating: 5,
          },
          {
            quote: 'The team delivered beyond our expectations. Professional, creative, and always on time. They truly became an extension of our team.',
            author: 'Mark Rodriguez',
            role: 'Marketing Director',
            company: 'GrowthLabs',
            rating: 5,
          },
          {
            quote: 'Working with CreativeStudio was a game-changer for our digital presence. Revenue increased 200% in the first year. Highly recommended!',
            author: 'Alex Thompson',
            role: 'Founder',
            company: 'StartupXYZ',
            rating: 5,
          },
        ],
      },
    },
    {
      id: 'process-1',
      type: 'process',
      content: {
        variant: 'steps',
        heading: 'Our Process',
        subheading: 'A proven methodology for delivering exceptional results',
        steps: [
          { icon: '🔍', title: 'Discovery', description: 'Deep dive into your business, goals, audience, and competitive landscape' },
          { icon: '🎯', title: 'Strategy', description: 'Define clear objectives, roadmap, and success metrics aligned with your vision' },
          { icon: '✏️', title: 'Design', description: 'Create stunning, user-centric designs that bring your brand to life' },
          { icon: '⚙️', title: 'Development', description: 'Build robust, scalable solutions using cutting-edge technologies' },
          { icon: '🚀', title: 'Launch', description: 'Deploy with confidence and comprehensive testing for a smooth launch' },
          { icon: '📈', title: 'Optimize', description: 'Continuous improvement based on data and user feedback' },
        ],
      },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        subheading: 'Everything you need to know about working with us',
        faqs: [
          {
            question: 'What types of projects do you work on?',
            answer: 'We specialize in web development, mobile apps, branding, and digital marketing for startups, scale-ups, and established businesses across all industries.',
          },
          {
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary based on scope and complexity. A typical website takes 8-12 weeks, while mobile apps range from 12-20 weeks. We provide detailed timelines during our discovery phase.',
          },
          {
            question: 'What is your pricing structure?',
            answer: 'We offer both project-based and retainer pricing. After understanding your needs, we provide a detailed proposal with transparent pricing and deliverables.',
          },
          {
            question: 'Do you offer ongoing support after launch?',
            answer: 'Yes! We provide maintenance packages and ongoing support to ensure your digital products continue to perform optimally and evolve with your business.',
          },
          {
            question: 'How involved will I need to be in the process?',
            answer: 'We value collaboration and transparency. You\'ll have regular check-ins, milestone reviews, and access to our project management tools, but we handle the heavy lifting.',
          },
          {
            question: 'Can you work with our existing team?',
            answer: 'Absolutely! We\'re experienced in collaborating with internal teams, developers, and other agencies to deliver cohesive, high-quality results.',
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
        description: "Let's create something amazing together. Get in touch for a free consultation and discover how we can help transform your business.",
        ctaPrimary: { text: 'Start a Project', link: '#contact' },
        ctaSecondary: { text: 'View Our Work', link: '#portfolio' },
      },
    },
    {
      id: 'contact-1',
      type: 'contact',
      content: {
        variant: 'simple',
        heading: 'Get In Touch',
        description: 'Have a project in mind? We\'d love to hear from you. Fill out the form below or reach out directly.',
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

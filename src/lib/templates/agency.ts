// ABOUTME: Agency/Consulting landing page template
// ABOUTME: Comprehensive professional services showcase with 21 blocks

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const agencyTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'custom',
  theme: defaultTheme,
  metadata: {
    title: 'CreativeStudio - Award-Winning Digital Agency',
    description: 'Transform your brand with creative excellence. Full-service digital agency specializing in strategy, design, and development for modern brands.',
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
    // Logo Wall - Clients
    {
      id: 'logos-1',
      type: 'logo-cloud',
      content: {
        variant: 'grid',
        heading: 'Trusted by Industry Leaders',
        logos: [
          { name: 'Airbnb', src: '/clients/airbnb.svg' },
          { name: 'Spotify', src: '/clients/spotify.svg' },
          { name: 'Uber', src: '/clients/uber.svg' },
          { name: 'Shopify', src: '/clients/shopify.svg' },
          { name: 'Slack', src: '/clients/slack.svg' },
          { name: 'Dropbox', src: '/clients/dropbox.svg' },
        ],
      },
      settings: { spacing: 'normal', background: '#FFFFFF' },
    },
    // About/Mission
    {
      id: 'content-1',
      type: 'features',
      content: {
        variant: 'centered',
        heading: 'We Turn Ideas Into Impact',
        description: 'Since 2015, CreativeStudio has partnered with ambitious brands to create digital experiences that drive measurable results. Our multidisciplinary team combines strategic thinking, creative excellence, and technical expertise to deliver solutions that don\'t just look good—they work.',
      },
      settings: { spacing: 'loose' },
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
    // Portfolio/Work Showcase
    {
      id: 'portfolio-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Featured Work',
        description: 'Recent projects that showcase our capabilities',
        columns: 3,
        items: [
          {
            heading: 'TechFlow Rebrand',
            description: 'Complete brand overhaul for B2B SaaS company, resulting in 3x increase in conversion rate',
            image: '/work/techflow.jpg',
            tags: ['Branding', 'Web Design'],
          },
          {
            heading: 'EcoMarket E-Commerce',
            description: 'Custom Shopify store with 200+ SKUs, optimized for sustainable product discovery',
            image: '/work/ecomarket.jpg',
            tags: ['E-Commerce', 'Development'],
          },
          {
            heading: 'FitLife Mobile App',
            description: 'React Native fitness tracking app with 50K+ active users and 4.9 rating',
            image: '/work/fitlife.jpg',
            tags: ['Mobile', 'UX/UI'],
          },
        ],
      },
      settings: { spacing: 'loose', background: '#F9FAFB' },
    },
    // Process
    {
      id: 'process-1',
      type: 'features',
      content: {
        variant: 'timeline',
        heading: 'Our Proven Process',
        description: 'How we transform ideas into exceptional digital experiences',
        steps: [
          {
            number: '01',
            heading: 'Discovery & Strategy',
            description: 'We immerse ourselves in your business to understand goals, audience, and opportunities. Deep competitive analysis and strategic planning set the foundation.',
          },
          {
            number: '02',
            heading: 'Design & Prototyping',
            description: 'Our designers create stunning mockups and interactive prototypes. Iterative feedback ensures every pixel aligns with your vision.',
          },
          {
            number: '03',
            heading: 'Development & Testing',
            description: 'Our engineers build with cutting-edge tech and best practices. Rigorous QA testing ensures flawless performance across all devices.',
          },
          {
            number: '04',
            heading: 'Launch & Optimize',
            description: 'We deploy with confidence and monitor closely. Ongoing analytics and optimization ensure continued success and growth.',
          },
        ],
      },
      settings: { spacing: 'loose' },
    },
    // Team
    {
      id: 'team-1',
      type: 'team',
      content: {
        variant: 'grid',
        heading: 'Meet Our Team',
        subheading: 'Passionate experts dedicated to your success',
        columns: 4,
        members: [
          { name: 'Sarah Johnson', role: 'Creative Director', bio: '15 years experience in brand strategy and design', avatar: '/team/sarah.jpg' },
          { name: 'Michael Chen', role: 'Lead Developer', bio: 'Full-stack expert specializing in modern web technologies', avatar: '/team/michael.jpg' },
          { name: 'Emma Williams', role: 'Marketing Lead', bio: 'Data-driven marketer with proven track record', avatar: '/team/emma.jpg' },
          { name: 'David Brown', role: 'UX Designer', bio: 'User-centered design advocate and researcher', avatar: '/team/david.jpg' },
          { name: 'Priya Patel', role: 'Project Manager', bio: 'Agile certified PM with 10+ years managing digital projects', avatar: '/team/priya.jpg' },
          { name: 'James Wilson', role: 'Content Strategist', bio: 'Award-winning writer and storytelling expert', avatar: '/team/james.jpg' },
          { name: 'Lisa Anderson', role: 'SEO Specialist', bio: 'Technical SEO expert with proven ranking improvements', avatar: '/team/lisa.jpg' },
          { name: 'Carlos Martinez', role: 'Motion Designer', bio: 'Animation and video production specialist', avatar: '/team/carlos.jpg' },
        ],
      },
      settings: { spacing: 'loose', background: '#FFFFFF' },
    },
    // Case Study Highlight
    {
      id: 'case-study-1',
      type: 'features',
      content: {
        variant: 'hero',
        heading: 'Case Study: TechFlow Transformation',
        description: 'How we helped a struggling SaaS company triple their conversion rate and achieve 10x growth in 12 months',
        ctaPrimary: { text: 'Read Full Case Study', link: '/work/techflow' },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      settings: { spacing: 'normal' },
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
    // Awards & Recognition
    {
      id: 'awards-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Awards & Recognition',
        description: 'Industry accolades that validate our expertise',
        columns: 4,
        items: [
          { heading: 'Webby Award', description: '2024 Winner - Best Agency Website' },
          { heading: 'Awwwards', description: 'Site of the Day (3x)' },
          { heading: 'CSS Design Awards', description: 'UX Design Award 2023' },
          { heading: 'Clutch Top Agency', description: 'Top 10 Digital Agency 2024' },
        ],
      },
      settings: { spacing: 'normal', background: '#F9FAFB' },
    },
    // Pricing
    {
      id: 'pricing-1',
      type: 'pricing',
      content: {
        variant: 'cards',
        heading: 'Investment Options',
        description: 'Flexible pricing to match your needs and budget',
        plans: [
          {
            name: 'Starter',
            price: '$5,000',
            period: 'one-time',
            description: 'Perfect for small businesses and startups',
            features: [
              '5-page website',
              'Responsive design',
              'Basic SEO setup',
              'Contact form',
              '30 days support',
            ],
            cta: { text: 'Get Started', link: '#contact' },
          },
          {
            name: 'Professional',
            price: '$15,000',
            period: 'one-time',
            description: 'Ideal for growing businesses',
            features: [
              'Custom design system',
              'Up to 15 pages',
              'Advanced SEO & analytics',
              'CMS integration',
              'E-commerce ready',
              '90 days support',
              'Training included',
            ],
            cta: { text: 'Schedule Call', link: '#contact' },
            featured: true,
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            period: 'quote',
            description: 'For complex digital transformations',
            features: [
              'Everything in Professional',
              'Custom integrations',
              'Advanced functionality',
              'Dedicated account manager',
              'Priority support',
              'Ongoing maintenance',
              'Performance optimization',
            ],
            cta: { text: 'Contact Sales', link: '#contact' },
          },
        ],
      },
      settings: { spacing: 'loose' },
    },
    // Blog/Resources Preview
    {
      id: 'blog-preview-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Latest Insights',
        description: 'Thoughts on design, development, and digital strategy',
        columns: 3,
        items: [
          {
            heading: 'The Future of Web Design in 2025',
            description: 'Exploring emerging trends and technologies shaping the digital landscape',
            meta: 'Feb 15, 2025 • 8 min read',
          },
          {
            heading: 'Building High-Converting Landing Pages',
            description: 'Data-driven strategies for maximizing conversion rates',
            meta: 'Feb 10, 2025 • 12 min read',
          },
          {
            heading: 'Choosing the Right Tech Stack',
            description: 'How to select technologies that scale with your business',
            meta: 'Feb 5, 2025 • 10 min read',
          },
        ],
        ctaPrimary: { text: 'View All Articles', link: '/blog' },
      },
      settings: { spacing: 'loose', background: '#FFFFFF' },
    },
    // FAQ
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        description: 'Everything you need to know about working with us',
        columns: 2,
        faqs: [
          {
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary based on scope and complexity. A standard website takes 6-12 weeks from kickoff to launch. We provide detailed timelines during our discovery phase and keep you updated throughout the process.',
          },
          {
            question: 'What is your design process like?',
            answer: 'We follow a collaborative, iterative process: Discovery → Strategy → Wireframes → Design → Prototyping → Development → Testing → Launch. You\'ll be involved at every stage with regular check-ins and review sessions.',
          },
          {
            question: 'Do you provide ongoing support after launch?',
            answer: 'Yes! All projects include 30-90 days of post-launch support. We also offer monthly retainer packages for ongoing maintenance, updates, and optimization.',
          },
          {
            question: 'Can you work with our existing brand guidelines?',
            answer: 'Absolutely. We can work within your established brand guidelines or help refresh and evolve your brand as part of the project.',
          },
          {
            question: 'What technologies do you specialize in?',
            answer: 'We specialize in modern web technologies including Next.js, React, Vue, Node.js, WordPress, Shopify, and more. We select the best tech stack for each project\'s unique requirements.',
          },
          {
            question: 'Do you offer payment plans?',
            answer: 'Yes, we offer flexible payment schedules. Typically: 50% upfront, 25% at design approval, and 25% at launch. Custom payment plans available for enterprise projects.',
          },
        ],
      },
      settings: { spacing: 'loose', background: '#F9FAFB' },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'hero',
        heading: 'Ready to Start Your Project?',
        description: "Let's create something amazing together. Schedule a free 30-minute consultation to discuss your goals and explore how we can help.",
        ctaPrimary: { text: 'Schedule Consultation', link: '#contact' },
        ctaSecondary: { text: 'View Portfolio', link: '#portfolio' },
      },
      settings: { spacing: 'loose', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
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

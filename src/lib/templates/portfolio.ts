// ABOUTME: Professional 10-block portfolio template for showcasing personal work
// ABOUTME: Comprehensive personal brand showcase with projects and services

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const portfolioTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'portfolio',
  theme: defaultTheme,
  metadata: {
    title: 'Alex Chen - Developer & Designer',
    description: 'Crafting digital experiences',
    author: 'Alex Chen',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'centered',
        heading: 'Hi, I am Alex Chen',
        subheading: 'Full Stack Developer & Designer',
        ctaPrimary: { text: 'View My Work', link: '#projects' },
        ctaSecondary: { text: 'Get in Touch', link: '#contact' },
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'bar',
        heading: 'Track Record',
        stats: [
          { value: '50', suffix: '+', label: 'Projects Completed', description: 'Across web and mobile' },
          { value: '8', label: 'Years Experience', description: 'In tech industry' },
          { value: '35', suffix: '+', label: 'Happy Clients', description: 'Worldwide' },
        ],
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'What I Do',
        subheading: 'Full-stack development and design services',
        columns: 3,
        features: [
          { icon: '💻', title: 'Web Development', description: 'Modern web applications with React, Next.js, TypeScript, and Node.js for optimal performance and user experience' },
          { icon: '🎨', title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces that delight users and drive engagement through thoughtful design principles' },
          { icon: '📱', title: 'Mobile Apps', description: 'Cross-platform mobile applications with React Native and Flutter for iOS and Android' },
          { icon: '⚡', title: 'Performance Optimization', description: 'Speed up your websites and apps through code optimization, caching strategies, and best practices' },
          { icon: '🔍', title: 'SEO & Analytics', description: 'Improve search visibility and track user behavior to make data-driven decisions' },
          { icon: '🛠️', title: 'Consulting', description: 'Technical guidance, architecture review, and strategic planning for your digital projects' },
        ],
      },
    },
    {
      id: 'gallery-1',
      type: 'gallery',
      content: {
        variant: 'grid',
        heading: 'Featured Projects',
        subheading: 'Recent work I am proud of',
        columns: 3,
        lightbox: true,
        images: [
          { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', alt: 'E-commerce Platform', title: 'E-commerce Platform', description: 'Modern shopping experience with Next.js', category: 'Web' },
          { image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', alt: 'Fitness Tracking App', title: 'Fitness Tracking App', description: 'React Native mobile app', category: 'Mobile' },
          { image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800', alt: 'SaaS Dashboard', title: 'SaaS Dashboard', description: 'Analytics platform with real-time data', category: 'Web' },
          { image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800', alt: 'Portfolio Website', title: 'Portfolio Website', description: 'Creative portfolio for photographer', category: 'Design' },
          { image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800', alt: 'Task Management Tool', title: 'Task Management Tool', description: 'Productivity app for teams', category: 'Web' },
          { image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', alt: 'Financial Planning App', title: 'Financial Planning App', description: 'Personal finance management', category: 'Mobile' },
        ],
      },
    },
    {
      id: 'video-1',
      type: 'video',
      content: {
        variant: 'embed',
        heading: 'My Development Process',
        description: 'A walkthrough of how I approach projects from concept to deployment, ensuring quality and client satisfaction at every step.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        autoplay: false,
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'What Clients Say',
        subheading: 'Trusted by startups and established businesses',
        columns: 3,
        testimonials: [
          {
            quote: 'Alex delivered a stunning website that exceeded all expectations. Professional, responsive, and incredibly talented.',
            author: 'Sarah Mitchell',
            role: 'CEO',
            company: 'TechStart Inc',
            rating: 5,
          },
          {
            quote: 'Outstanding technical expertise and attention to detail. Alex transformed our vision into a beautiful, functional product.',
            author: 'Robert Taylor',
            role: 'Product Manager',
            company: 'InnovateNow',
            rating: 5,
          },
          {
            quote: 'Working with Alex was seamless. Great communication, on-time delivery, and exceptional quality. Highly recommended!',
            author: 'Jennifer Kim',
            role: 'Marketing Director',
            company: 'GrowthCo',
            rating: 5,
          },
        ],
      },
    },
    {
      id: 'process-1',
      type: 'process',
      content: {
        variant: 'timeline',
        heading: 'How I Work',
        subheading: 'A transparent, collaborative approach',
        steps: [
          { icon: '📞', title: 'Discovery Call', description: 'We discuss your goals, requirements, timeline, and budget to ensure alignment' },
          { icon: '📝', title: 'Proposal & Agreement', description: 'I provide a detailed proposal with scope, milestones, and deliverables' },
          { icon: '🎨', title: 'Design Phase', description: 'Create wireframes and designs for your approval before development begins' },
          { icon: '⚙️', title: 'Development', description: 'Build your project with regular updates and opportunities for feedback' },
          { icon: '🧪', title: 'Testing & Review', description: 'Thorough testing across devices and browsers to ensure quality' },
          { icon: '🚀', title: 'Launch & Support', description: 'Deploy your project and provide training and ongoing support as needed' },
        ],
      },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        subheading: 'Common questions about working together',
        faqs: [
          {
            question: 'What is your availability?',
            answer: 'I typically take on 2-3 projects at a time to ensure each client receives dedicated attention. I\'m currently booking projects 2-4 weeks out.',
          },
          {
            question: 'What are your rates?',
            answer: 'My rates vary based on project complexity and scope. I offer both hourly ($150/hr) and project-based pricing. Contact me for a detailed quote.',
          },
          {
            question: 'Do you work with international clients?',
            answer: 'Yes! I work with clients worldwide and am comfortable with remote collaboration across time zones.',
          },
          {
            question: 'What if I need changes after launch?',
            answer: 'I provide 30 days of complimentary support after launch for minor tweaks. For ongoing changes, I offer maintenance retainers starting at $500/month.',
          },
          {
            question: 'Can you help with an existing project?',
            answer: 'Absolutely! I can jump into existing codebases for debugging, feature additions, or optimization work.',
          },
          {
            question: 'Do you sign NDAs?',
            answer: 'Yes, I\'m happy to sign NDAs and other confidentiality agreements to protect your intellectual property.',
          },
        ],
      },
    },
    {
      id: 'newsletter-1',
      type: 'newsletter',
      content: {
        variant: 'simple',
        heading: 'Stay Updated',
        description: 'Subscribe to my newsletter for web development tips, project updates, and insights on building great digital products.',
        placeholder: 'Enter your email',
        ctaText: 'Subscribe',
      },
    },
    {
      id: 'contact-1',
      type: 'contact',
      content: {
        variant: 'simple',
        heading: 'Let us Work Together',
        description: 'Have a project in mind? Let us create something amazing together. I typically respond within 24 hours.',
        email: 'alex@example.com',
        phone: '+1 (555) 987-6543',
        showForm: true,
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'simple',
        logo: 'Alex Chen',
        tagline: 'Crafting digital experiences with code and creativity',
        social: {
          github: 'https://github.com/alexchen',
          linkedin: 'https://linkedin.com/in/alexchen',
          twitter: 'https://twitter.com/alexchen',
        },
        copyright: '© 2025 Alex Chen. All rights reserved.',
      },
    },
  ],
};

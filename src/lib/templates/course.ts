// ABOUTME: Professional 11-block online course/education template
// ABOUTME: Comprehensive learning platform with curriculum, instructor, and enrollment

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
        variant: 'gradient',
        heading: 'Master Modern Web Development',
        subheading: 'Go from beginner to professional in 12 weeks',
        description: 'Learn React, Next.js, TypeScript, and build real-world projects that land you a developer job.',
        ctaPrimary: { text: 'Enroll Now', link: '#pricing' },
        features: [
          '50+ hours of video content',
          'Real-world projects',
          'Lifetime access',
          'Certificate of completion',
        ],
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Course Impact',
        subheading: 'Proven results from thousands of students',
        columns: 4,
        stats: [
          { value: '10,000', suffix: '+', label: 'Students Enrolled', description: 'Worldwide' },
          { value: '4.9', suffix: '/5', label: 'Average Rating', description: 'From student reviews' },
          { value: '95', suffix: '%', label: 'Completion Rate', description: 'Finish the course' },
          { value: '85', suffix: '%', label: 'Got Dev Jobs', description: 'Within 6 months' },
        ],
      },
    },
    {
      id: 'video-1',
      type: 'video',
      content: {
        variant: 'embed',
        heading: 'See What You will Learn',
        description: 'Watch this course preview to get a sense of our teaching style and the comprehensive curriculum we\'ve designed to take you from beginner to job-ready developer.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        autoplay: false,
      },
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
          { icon: '⚛️', title: 'React & Next.js', description: 'Build scalable, production-ready applications with the most popular React framework and modern best practices' },
          { icon: '📘', title: 'TypeScript', description: 'Write type-safe, maintainable code that catches bugs before they reach production' },
          { icon: '🎨', title: 'UI/UX Design', description: 'Create beautiful, responsive interfaces with Tailwind CSS and modern design principles' },
          { icon: '🔧', title: 'Backend APIs', description: 'Build RESTful APIs with Node.js, Express, and learn authentication and authorization' },
          { icon: '🗄️', title: 'Databases', description: 'Work with PostgreSQL, MongoDB, and learn database design, queries, and optimization' },
          { icon: '🚀', title: 'Deployment', description: 'Deploy production applications to Vercel, AWS, and set up CI/CD pipelines' },
        ],
      },
    },
    {
      id: 'process-1',
      type: 'process',
      content: {
        variant: 'timeline',
        heading: 'Course Curriculum',
        subheading: '12-week structured learning path',
        steps: [
          { icon: '1️⃣', title: 'Weeks 1-2: Fundamentals', description: 'HTML, CSS, JavaScript ES6+, Git, and development environment setup' },
          { icon: '2️⃣', title: 'Weeks 3-5: React Essentials', description: 'Components, hooks, state management, and building interactive UIs' },
          { icon: '3️⃣', title: 'Weeks 6-8: Next.js & TypeScript', description: 'Server-side rendering, routing, API routes, and type-safe development' },
          { icon: '4️⃣', title: 'Weeks 9-10: Backend Development', description: 'Node.js, Express, databases, authentication, and API design' },
          { icon: '5️⃣', title: 'Weeks 11-12: Final Project', description: 'Build and deploy a full-stack application from scratch' },
        ],
      },
    },
    {
      id: 'team-1',
      type: 'team',
      content: {
        variant: 'grid',
        heading: 'Meet Your Instructor',
        subheading: 'Learn from industry experts',
        columns: 2,
        members: [
          {
            name: 'Sarah Johnson',
            role: 'Senior Full Stack Developer',
            bio: '10+ years building web applications at Google and Airbnb. Taught 50,000+ students worldwide. Passionate about making web development accessible to everyone.',
          },
          {
            name: 'Michael Chen',
            role: 'Lead Course Developer',
            bio: 'Former tech lead at Meta. Specializes in React and Next.js. Created curriculum used by Fortune 500 companies for developer training.',
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
          {
            quote: 'Went from zero coding experience to landing my first dev job in 4 months! The projects in this course are exactly what employers want to see.',
            author: 'Alex Martinez',
            role: 'Junior Developer',
            company: 'Shopify',
            rating: 5,
          },
          {
            quote: 'The best investment I ever made in my career. Worth every penny. Sarah\'s teaching style makes complex concepts easy to understand.',
            author: 'Priya Patel',
            role: 'Frontend Engineer',
            company: 'Meta',
            rating: 5,
          },
          {
            quote: 'Sarah is an incredible teacher. The projects are challenging and practical. I now have the skills and confidence to build anything.',
            author: 'James Kim',
            role: 'Full Stack Developer',
            company: 'Stripe',
            rating: 5,
          },
        ],
      },
    },
    {
      id: 'pricing-1',
      type: 'pricing',
      content: {
        variant: 'simple',
        heading: 'Choose Your Plan',
        subheading: 'Invest in your future with flexible pricing options',
        tiers: [
          {
            name: 'Basic',
            description: 'Self-paced learning',
            price: '$399',
            period: 'one-time',
            features: [
              'Lifetime course access',
              '50+ hours of video content',
              'Downloadable resources',
              'Community Discord access',
              'Course completion certificate',
            ],
            ctaText: 'Get Started',
            ctaLink: '#enroll',
            highlighted: false,
          },
          {
            name: 'Pro',
            description: 'Most popular',
            price: '$599',
            period: 'one-time',
            features: [
              'Everything in Basic',
              'Weekly live Q&A sessions',
              'Code review for all projects',
              'Job interview prep materials',
              'Resume and portfolio review',
              'Priority Discord support',
            ],
            highlighted: true,
            ctaText: 'Enroll Now',
            ctaLink: '#enroll',
          },
          {
            name: 'Premium',
            description: 'Maximum support',
            price: '$999',
            period: 'one-time',
            features: [
              'Everything in Pro',
              '4 one-on-one mentorship sessions',
              'Personalized learning plan',
              'Job placement assistance',
              'LinkedIn profile optimization',
              'Salary negotiation coaching',
              'Lifetime career support',
            ],
            ctaText: 'Go Premium',
            ctaLink: '#enroll',
            highlighted: false,
          },
        ],
      },
    },
    {
      id: 'logo-cloud-1',
      type: 'logo-cloud',
      content: {
        variant: 'grid',
        heading: 'Our Graduates Work At',
        subheading: 'Join alumni at top tech companies',
        columns: 5,
        logos: [
          { name: 'Google', image: 'https://via.placeholder.com/150x50/4285F4/FFFFFF?text=Google' },
          { name: 'Meta', image: 'https://via.placeholder.com/150x50/0668E1/FFFFFF?text=Meta' },
          { name: 'Amazon', image: 'https://via.placeholder.com/150x50/FF9900/FFFFFF?text=Amazon' },
          { name: 'Netflix', image: 'https://via.placeholder.com/150x50/E50914/FFFFFF?text=Netflix' },
          { name: 'Shopify', image: 'https://via.placeholder.com/150x50/96BF48/FFFFFF?text=Shopify' },
          { name: 'Stripe', image: 'https://via.placeholder.com/150x50/635BFF/FFFFFF?text=Stripe' },
          { name: 'Airbnb', image: 'https://via.placeholder.com/150x50/FF5A5F/FFFFFF?text=Airbnb' },
          { name: 'Uber', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=Uber' },
          { name: 'Twitter', image: 'https://via.placeholder.com/150x50/1DA1F2/FFFFFF?text=Twitter' },
          { name: 'Salesforce', image: 'https://via.placeholder.com/150x50/00A1E0/FFFFFF?text=Salesforce' },
        ],
      },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        subheading: 'Everything you need to know before enrolling',
        faqs: [
          {
            question: 'Do I need prior coding experience?',
            answer: 'No! This course starts from the basics and gradually progresses to advanced topics. We\'ve designed it specifically for beginners who want to become professional developers.',
          },
          {
            question: 'How long do I have access to the course?',
            answer: 'You have lifetime access to all course materials, including all future updates. Learn at your own pace without any time pressure.',
          },
          {
            question: 'What if I need help?',
            answer: 'All plans include access to our Discord community where you can ask questions anytime. Pro and Premium plans also include live Q&A sessions and 1-on-1 mentorship.',
          },
          {
            question: 'Is there a money-back guarantee?',
            answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied with the course for any reason, we\'ll refund your purchase in full.',
          },
          {
            question: 'How much time should I dedicate per week?',
            answer: 'We recommend 10-15 hours per week to complete the course in 12 weeks. However, you can go faster or slower based on your schedule since you have lifetime access.',
          },
          {
            question: 'Will this help me get a job?',
            answer: '85% of our students land developer jobs within 6 months. Our Pro and Premium plans include job search support, interview prep, and resume review to maximize your chances.',
          },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Start Your Developer Journey Today',
        description: '30-day money-back guarantee. Lifetime access. Join 10,000+ students who transformed their careers.',
        ctaPrimary: { text: 'Enroll Now', link: '#pricing' },
        ctaSecondary: { text: 'View Curriculum', link: '#features' },
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'multi-column',
        logo: 'WebDev Academy',
        tagline: 'Transforming beginners into professional developers',
        sections: [
          {
            title: 'Course',
            links: [
              { text: 'Curriculum', link: '/curriculum' },
              { text: 'Pricing', link: '/pricing' },
              { text: 'Success Stories', link: '/testimonials' },
              { text: 'FAQ', link: '/faq' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { text: 'Blog', link: '/blog' },
              { text: 'Free Tutorials', link: '/tutorials' },
              { text: 'Community', link: '/community' },
              { text: 'Career Guide', link: '/career' },
            ],
          },
          {
            title: 'Company',
            links: [
              { text: 'About Us', link: '/about' },
              { text: 'Instructors', link: '/instructors' },
              { text: 'Contact', link: '/contact' },
              { text: 'Terms', link: '/terms' },
            ],
          },
        ],
        social: {
          twitter: 'https://twitter.com/webdevacademy',
          linkedin: 'https://linkedin.com/company/webdevacademy',
          github: 'https://github.com/webdevacademy',
        },
        copyright: '© 2025 WebDev Academy. All rights reserved.',
      },
    },
  ],
};

// ABOUTME: Blog/Content website template
// ABOUTME: Content-focused design with newsletter signup and author showcase

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const blogTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'custom',
  theme: defaultTheme,
  metadata: {
    title: 'TechInsights - Modern Technology Blog',
    description: 'Deep dives into web development, AI, and emerging technologies',
    author: 'TechInsights Team',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'centered',
        heading: 'Insights for Modern Developers',
        subheading: 'Weekly articles about web development, AI, and technology trends',
        ctaPrimary: { text: 'Read Latest Articles', link: '#articles' },
        ctaSecondary: { text: 'Subscribe', link: '#newsletter' },
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'list',
        heading: 'What We Cover',
        subheading: 'In-depth content on topics that matter',
        features: [
          { icon: '⚛️', title: 'Web Development', description: 'React, Next.js, TypeScript, and modern frontend frameworks' },
          { icon: '🤖', title: 'Artificial Intelligence', description: 'Machine learning, LLMs, and AI integration tutorials' },
          { icon: '☁️', title: 'Cloud & DevOps', description: 'AWS, Docker, Kubernetes, and deployment best practices' },
          { icon: '📱', title: 'Mobile Development', description: 'React Native, Flutter, and cross-platform solutions' },
          { icon: '🔒', title: 'Security', description: 'Web security, authentication, and best practices' },
          { icon: '⚡', title: 'Performance', description: 'Optimization techniques and performance monitoring' },
        ],
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Our Community',
        columns: 4,
        stats: [
          { value: '500K', suffix: '+', label: 'Monthly Readers' },
          { value: '200', suffix: '+', label: 'Articles Published' },
          { value: '50K', suffix: '+', label: 'Newsletter Subscribers' },
          { value: '95', suffix: '%', label: 'Reader Satisfaction' },
        ],
      },
    },
    {
      id: 'team-1',
      type: 'team',
      content: {
        variant: 'grid',
        heading: 'Meet Our Writers',
        subheading: 'Experienced developers sharing their knowledge',
        columns: 3,
        members: [
          { name: 'Jessica Park', role: 'Senior Frontend Developer', bio: 'React and TypeScript expert with 10 years experience at top tech companies' },
          { name: 'Marcus Johnson', role: 'Full Stack Engineer', bio: 'Specializes in Next.js, Node.js, and cloud architecture' },
          { name: 'Aisha Rahman', role: 'AI/ML Engineer', bio: 'PhD in Computer Science, focusing on practical AI applications' },
        ],
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'What Readers Say',
        subheading: 'Trusted by developers worldwide',
        columns: 3,
        testimonials: [
          {
            quote: 'The tutorials are clear, practical, and always up-to-date. This blog has been instrumental in my growth as a developer.',
            author: 'Tom Anderson',
            role: 'Software Engineer',
            company: 'Google',
            rating: 5,
          },
          {
            quote: 'Best tech blog I\'ve found. The depth of content is impressive and the writing style makes complex topics accessible.',
            author: 'Lisa Zhang',
            role: 'Tech Lead',
            company: 'Microsoft',
            rating: 5,
          },
          {
            quote: 'I recommend TechInsights to all my team members. The quality and consistency of the content is unmatched.',
            author: 'Carlos Silva',
            role: 'Engineering Manager',
            company: 'Amazon',
            rating: 5,
          },
        ],
      },
    },
    {
      id: 'newsletter-1',
      type: 'newsletter',
      content: {
        variant: 'simple',
        heading: 'Subscribe to Our Newsletter',
        description: 'Get weekly insights delivered to your inbox. Join 50,000+ developers staying ahead of the curve.',
        placeholder: 'Enter your email',
        ctaText: 'Subscribe',
      },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'grid',
        heading: 'Frequently Asked Questions',
        subheading: 'Everything you need to know',
        columns: 2,
        faqs: [
          {
            question: 'How often do you publish new content?',
            answer: 'We publish 2-3 new in-depth articles every week, covering the latest in web development, AI, and technology trends.',
          },
          {
            question: 'Is the content suitable for beginners?',
            answer: 'We publish content for all skill levels. Each article is tagged with difficulty level (Beginner, Intermediate, Advanced) so you can find content that matches your experience.',
          },
          {
            question: 'Can I contribute to the blog?',
            answer: 'Yes! We welcome guest posts from experienced developers. Check our "Write for Us" page for submission guidelines.',
          },
          {
            question: 'Is there a newsletter?',
            answer: 'Yes! Subscribe to our weekly newsletter to get curated content, exclusive tips, and early access to new articles delivered to your inbox.',
          },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Start Learning Today',
        description: 'Join our community of developers and stay ahead with cutting-edge insights and practical tutorials.',
        ctaPrimary: { text: 'Browse Articles', link: '#articles' },
        ctaSecondary: { text: 'Subscribe', link: '#newsletter' },
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'multi-column',
        logo: 'TechInsights',
        tagline: 'Empowering developers with knowledge',
        sections: [
          {
            title: 'Content',
            links: [
              { text: 'All Articles', link: '/articles' },
              { text: 'Tutorials', link: '/tutorials' },
              { text: 'Guides', link: '/guides' },
              { text: 'Newsletter', link: '/newsletter' },
            ],
          },
          {
            title: 'Topics',
            links: [
              { text: 'Web Development', link: '/topics/web' },
              { text: 'AI & ML', link: '/topics/ai' },
              { text: 'Cloud & DevOps', link: '/topics/cloud' },
              { text: 'Mobile', link: '/topics/mobile' },
            ],
          },
          {
            title: 'About',
            links: [
              { text: 'Our Team', link: '/team' },
              { text: 'Write for Us', link: '/write' },
              { text: 'Contact', link: '/contact' },
              { text: 'Advertise', link: '/advertise' },
            ],
          },
        ],
        social: {
          twitter: 'https://twitter.com/techinsights',
          linkedin: 'https://linkedin.com/company/techinsights',
          github: 'https://github.com/techinsights',
        },
        copyright: '© 2025 TechInsights. All rights reserved.',
      },
    },
  ],
};

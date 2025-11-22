// ABOUTME: Professional 11-block blog/content website template
// ABOUTME: Comprehensive content platform with newsletter and writer showcase

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
        variant: 'gradient',
        heading: 'Insights for Modern Developers',
        subheading: 'Weekly articles about web development, AI, and technology trends',
        description: 'Join 500,000+ developers staying ahead of the curve with in-depth tutorials, guides, and industry insights.',
        ctaPrimary: { text: 'Read Latest Articles', link: '#articles' },
        features: [
          'Expert-written tutorials',
          'Weekly newsletter',
          'Code examples included',
          'Beginner to advanced',
        ],
      },
    },
    {
      id: 'logo-cloud-1',
      type: 'logo-cloud',
      content: {
        variant: 'grid',
        heading: 'Read by Developers At',
        columns: 5,
        logos: [
          { name: 'Google', image: 'https://via.placeholder.com/150x50/4285F4/FFFFFF?text=Google' },
          { name: 'Microsoft', image: 'https://via.placeholder.com/150x50/00A4EF/FFFFFF?text=Microsoft' },
          { name: 'Amazon', image: 'https://via.placeholder.com/150x50/FF9900/FFFFFF?text=Amazon' },
          { name: 'Meta', image: 'https://via.placeholder.com/150x50/0668E1/FFFFFF?text=Meta' },
          { name: 'Netflix', image: 'https://via.placeholder.com/150x50/E50914/FFFFFF?text=Netflix' },
          { name: 'Spotify', image: 'https://via.placeholder.com/150x50/1DB954/FFFFFF?text=Spotify' },
          { name: 'Airbnb', image: 'https://via.placeholder.com/150x50/FF5A5F/FFFFFF?text=Airbnb' },
          { name: 'Uber', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=Uber' },
          { name: 'Stripe', image: 'https://via.placeholder.com/150x50/635BFF/FFFFFF?text=Stripe' },
          { name: 'Shopify', image: 'https://via.placeholder.com/150x50/96BF48/FFFFFF?text=Shopify' },
        ],
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Our Community',
        subheading: 'Growing together with developers worldwide',
        columns: 4,
        stats: [
          { value: '500K', suffix: '+', label: 'Monthly Readers', description: 'Active community' },
          { value: '200', suffix: '+', label: 'Articles Published', description: 'In-depth content' },
          { value: '50K', suffix: '+', label: 'Newsletter Subscribers', description: 'Weekly insights' },
          { value: '95', suffix: '%', label: 'Reader Satisfaction', description: 'Based on surveys' },
        ],
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'What We Cover',
        subheading: 'In-depth content on topics that matter to developers',
        columns: 3,
        features: [
          { icon: '⚛️', title: 'Web Development', description: 'React, Next.js, TypeScript, Vue, and modern frontend frameworks with practical examples and best practices' },
          { icon: '🤖', title: 'Artificial Intelligence', description: 'Machine learning, LLMs, AI integration tutorials, and hands-on guides for building intelligent applications' },
          { icon: '☁️', title: 'Cloud & DevOps', description: 'AWS, Docker, Kubernetes, CI/CD pipelines, and deployment best practices for scalable applications' },
          { icon: '📱', title: 'Mobile Development', description: 'React Native, Flutter, Swift, and Kotlin tutorials for building cross-platform mobile applications' },
          { icon: '🔒', title: 'Security', description: 'Web security, authentication, authorization, and best practices for building secure applications' },
          { icon: '⚡', title: 'Performance', description: 'Optimization techniques, performance monitoring, and strategies for building lightning-fast applications' },
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
          { name: 'Jessica Park', role: 'Senior Frontend Developer', bio: 'React and TypeScript expert with 10 years experience at top tech companies. Previously at Google and Airbnb.' },
          { name: 'Marcus Johnson', role: 'Full Stack Engineer', bio: 'Specializes in Next.js, Node.js, and cloud architecture. Building scalable applications since 2012.' },
          { name: 'Aisha Rahman', role: 'AI/ML Engineer', bio: 'PhD in Computer Science, focusing on practical AI applications. Research background at Stanford and MIT.' },
        ],
      },
    },
    {
      id: 'gallery-1',
      type: 'gallery',
      content: {
        variant: 'grid',
        heading: 'Popular Articles',
        subheading: 'Most-read tutorials and guides',
        columns: 3,
        lightbox: false,
        images: [
          { image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800', alt: 'React Tutorial', title: 'Building Modern React Apps', description: '50,000 reads', category: 'Web Dev' },
          { image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', alt: 'AI Guide', title: 'Introduction to LLMs', description: '42,000 reads', category: 'AI' },
          { image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800', alt: 'Cloud Tutorial', title: 'AWS for Beginners', description: '38,000 reads', category: 'Cloud' },
          { image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800', alt: 'Mobile Dev', title: 'React Native Essentials', description: '35,000 reads', category: 'Mobile' },
          { image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800', alt: 'Security Guide', title: 'Web Security Best Practices', description: '33,000 reads', category: 'Security' },
          { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', alt: 'Performance', title: 'Optimizing Web Performance', description: '30,000 reads', category: 'Performance' },
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
        description: 'Get weekly insights delivered to your inbox. Join 50,000+ developers staying ahead of the curve with curated content, exclusive tips, and early access to new articles.',
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
            answer: 'We publish 2-3 new in-depth articles every week, covering the latest in web development, AI, and technology trends. All articles include code examples and practical guidance.',
          },
          {
            question: 'Is the content suitable for beginners?',
            answer: 'We publish content for all skill levels. Each article is tagged with difficulty level (Beginner, Intermediate, Advanced) so you can find content that matches your experience.',
          },
          {
            question: 'Can I contribute to the blog?',
            answer: 'Yes! We welcome guest posts from experienced developers. Check our "Write for Us" page for submission guidelines and editorial standards.',
          },
          {
            question: 'Is there a newsletter?',
            answer: 'Yes! Subscribe to our weekly newsletter to get curated content, exclusive tips, and early access to new articles delivered to your inbox every Wednesday.',
          },
          {
            question: 'Do you offer courses or workshops?',
            answer: 'While we focus on written content, we occasionally host live workshops and webinars. Newsletter subscribers get first access to these events.',
          },
          {
            question: 'How can I support the blog?',
            answer: 'Share articles with your network, engage with our content, and consider contributing as a guest author. We\'re reader-supported and ad-free.',
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
        description: 'Join our community of developers and stay ahead with cutting-edge insights, practical tutorials, and industry best practices.',
        ctaPrimary: { text: 'Browse Articles', link: '#articles' },
        ctaSecondary: { text: 'Subscribe to Newsletter', link: '#newsletter' },
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

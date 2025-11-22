// ABOUTME: Professional 11-block event/conference template
// ABOUTME: Comprehensive event site with speakers, schedule, and ticketing

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const eventTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'event',
  theme: {
    ...defaultTheme,
    colors: {
      primary: '#7C3AED', // Purple
      secondary: '#EC4899', // Pink
      background: '#FFFFFF',
      text: '#1F2937',
      muted: '#6B7280',
    },
  },
  metadata: {
    title: 'Tech Summit 2025',
    description: 'The future of technology. Three days of innovation.',
    author: 'Tech Summit',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'gradient',
        heading: 'Tech Summit 2025',
        subheading: 'June 15-17, 2025 | San Francisco',
        description: 'Join 5,000+ innovators, thought leaders, and developers shaping the future of technology.',
        ctaPrimary: { text: 'Get Your Ticket', link: '#pricing' },
        features: [
          '50+ expert speakers',
          '100+ sessions & workshops',
          '3 days of networking',
          'Exhibition hall access',
        ],
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Why Attend Tech Summit',
        subheading: 'The premier technology conference of the year',
        columns: 4,
        stats: [
          { value: '50', suffix: '+', label: 'Expert Speakers', description: 'Industry leaders' },
          { value: '100', suffix: '+', label: 'Sessions & Workshops', description: 'Hands-on learning' },
          { value: '5,000', suffix: '+', label: 'Attendees', description: 'Global network' },
          { value: '3', label: 'Days of Innovation', description: 'June 15-17' },
        ],
      },
    },
    {
      id: 'team-1',
      type: 'team',
      content: {
        variant: 'grid',
        heading: 'Keynote Speakers',
        subheading: 'Learn from the best in the industry',
        columns: 3,
        members: [
          { name: 'Dr. Sarah Mitchell', role: 'AI Research Lead at Google', bio: 'Pioneer in machine learning and neural networks. Published 100+ papers on AI ethics and applications.' },
          { name: 'Marcus Johnson', role: 'CTO at Tesla', bio: 'Expert in autonomous systems and robotics. Leading the charge in electric vehicle technology innovation.' },
          { name: 'Lisa Chen', role: 'Founder of DataCorp', bio: 'Leading voice in data privacy and security. Former NSA cybersecurity architect.' },
          { name: 'David Kumar', role: 'VP of Engineering at Meta', bio: 'Scaling social platforms to billions of users. Expert in distributed systems architecture.' },
          { name: 'Elena Rodriguez', role: 'Chief Scientist at OpenAI', bio: 'Pioneering research in large language models and generative AI applications.' },
          { name: 'James Park', role: 'CEO of CloudScale', bio: 'Serial entrepreneur and cloud computing innovator. Built 3 unicorn startups.' },
        ],
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Conference Tracks',
        subheading: 'Comprehensive coverage of cutting-edge topics',
        columns: 3,
        features: [
          { icon: '🤖', title: 'AI & Machine Learning', description: 'Latest breakthroughs in artificial intelligence, neural networks, and practical ML applications' },
          { icon: '☁️', title: 'Cloud & Infrastructure', description: 'Scalable cloud solutions, Kubernetes, serverless architecture, and DevOps best practices' },
          { icon: '🔒', title: 'Security & Privacy', description: 'Cybersecurity strategies, zero-trust architecture, and protecting data in the digital age' },
          { icon: '📱', title: 'Mobile & Web Development', description: 'Modern app development, progressive web apps, and cross-platform frameworks' },
          { icon: '💼', title: 'Tech Leadership', description: 'Building high-performing teams, engineering culture, and scaling organizations' },
          { icon: '🚀', title: 'Startups & Innovation', description: 'Entrepreneurship, funding strategies, and bringing innovative products to market' },
        ],
      },
    },
    {
      id: 'process-1',
      type: 'process',
      content: {
        variant: 'timeline',
        heading: 'Event Schedule',
        subheading: 'Three days packed with learning and networking',
        steps: [
          { date: 'June 15', title: 'Day 1: AI & Innovation', description: 'Opening keynote, AI track sessions, networking reception, and startup showcase' },
          { date: 'June 16', title: 'Day 2: Cloud & Security', description: 'Technical workshops, cloud infrastructure sessions, security summit, and evening gala' },
          { date: 'June 17', title: 'Day 3: Future Tech', description: 'Leadership talks, closing keynote, expo hall, and after-party celebration' },
        ],
      },
    },
    {
      id: 'video-1',
      type: 'video',
      content: {
        variant: 'embed',
        heading: 'Tech Summit 2024 Highlights',
        description: 'Watch highlights from last year\'s event to see what you can expect at Tech Summit 2025. Over 4,000 attendees, 40+ speakers, and countless innovations.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        autoplay: false,
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'What Attendees Say',
        subheading: 'Reviews from Tech Summit 2024',
        columns: 3,
        testimonials: [
          {
            quote: 'Best tech conference I\'ve ever attended. The speaker lineup was incredible and I made connections that led to our Series A funding.',
            author: 'Jennifer Lee',
            role: 'Founder & CEO',
            company: 'AI Innovations Inc',
            rating: 5,
          },
          {
            quote: 'The workshops were incredibly valuable. I learned cutting-edge techniques I immediately applied at work. Already bought my ticket for 2025!',
            author: 'Michael Roberts',
            role: 'Engineering Manager',
            company: 'Google Cloud',
            rating: 5,
          },
          {
            quote: 'Networking opportunities were phenomenal. Met future co-founders, investors, and potential clients all in one place. Worth every penny.',
            author: 'Sophia Martinez',
            role: 'CTO',
            company: 'DataStream',
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
        heading: 'Choose Your Pass',
        subheading: 'Limited spots available - prices increase March 1st',
        tiers: [
          {
            name: 'Early Bird',
            description: 'Limited time offer',
            price: '$499',
            period: '3-day pass',
            features: [
              'Access to all sessions',
              'Conference materials & swag',
              'Networking events access',
              'Lunch included all 3 days',
              'Digital resource library',
            ],
            ctaText: 'Register Now',
            ctaLink: '#register',
            highlighted: false,
          },
          {
            name: 'Standard',
            description: 'Most popular option',
            price: '$699',
            period: '3-day pass',
            features: [
              'Everything in Early Bird',
              'Workshop access (15+ workshops)',
              'VIP lounge access',
              'Speaker meet & greet sessions',
              'Recording access (30 days)',
              'Exclusive networking dinner',
            ],
            highlighted: true,
            ctaText: 'Get Started',
            ctaLink: '#register',
          },
          {
            name: 'VIP',
            description: 'Premium experience',
            price: '$999',
            period: '3-day pass',
            features: [
              'Everything in Standard',
              'Private 1-on-1 sessions with speakers',
              'VIP seating at all events',
              'Concierge service',
              'After-party access',
              'Lifetime recording access',
              'Premium swag package',
            ],
            ctaText: 'Go Premium',
            ctaLink: '#register',
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
        heading: 'Sponsored By',
        subheading: 'Supported by leading technology companies',
        columns: 5,
        logos: [
          { name: 'Google', image: 'https://via.placeholder.com/150x50/4285F4/FFFFFF?text=Google' },
          { name: 'Microsoft', image: 'https://via.placeholder.com/150x50/00A4EF/FFFFFF?text=Microsoft' },
          { name: 'Amazon', image: 'https://via.placeholder.com/150x50/FF9900/FFFFFF?text=Amazon' },
          { name: 'Meta', image: 'https://via.placeholder.com/150x50/0668E1/FFFFFF?text=Meta' },
          { name: 'Apple', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=Apple' },
          { name: 'Tesla', image: 'https://via.placeholder.com/150x50/E31937/FFFFFF?text=Tesla' },
          { name: 'OpenAI', image: 'https://via.placeholder.com/150x50/10A37F/FFFFFF?text=OpenAI' },
          { name: 'Nvidia', image: 'https://via.placeholder.com/150x50/76B900/FFFFFF?text=Nvidia' },
          { name: 'IBM', image: 'https://via.placeholder.com/150x50/0062FF/FFFFFF?text=IBM' },
          { name: 'Oracle', image: 'https://via.placeholder.com/150x50/F80000/FFFFFF?text=Oracle' },
        ],
      },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        subheading: 'Everything you need to know before registering',
        faqs: [
          {
            question: 'Where is the event located?',
            answer: 'Tech Summit 2025 will be held at the Moscone Center in San Francisco, California. The venue is centrally located with easy access to hotels, restaurants, and public transportation.',
          },
          {
            question: 'What is the cancellation policy?',
            answer: 'Full refunds are available until May 1, 2025. After that, tickets can be transferred to another person but are non-refundable. Contact us at tickets@techsummit.com for assistance.',
          },
          {
            question: 'Will sessions be recorded?',
            answer: 'Yes! Standard and VIP pass holders get access to session recordings. Standard passes include 30-day access, while VIP passes include lifetime access to all recordings.',
          },
          {
            question: 'Are meals included?',
            answer: 'Yes, all passes include lunch for all three days. VIP passes also include exclusive networking dinners. Coffee, tea, and snacks are available throughout the day.',
          },
          {
            question: 'Can I upgrade my ticket later?',
            answer: 'Yes, you can upgrade from Early Bird to Standard or VIP by paying the difference. Contact our support team for upgrade assistance.',
          },
          {
            question: 'Is there a virtual attendance option?',
            answer: 'Not this year. Tech Summit is designed as an in-person experience focused on networking and hands-on workshops. However, recordings are available to all Standard and VIP ticket holders.',
          },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Join Us at Tech Summit 2025',
        description: 'Early bird pricing ends March 1st. Secure your spot at the premier technology conference of the year.',
        ctaPrimary: { text: 'Get Your Ticket', link: '#pricing' },
        ctaSecondary: { text: 'View Full Schedule', link: '#schedule' },
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'multi-column',
        logo: 'Tech Summit 2025',
        tagline: 'Shaping the future of technology together',
        sections: [
          {
            title: 'Event',
            links: [
              { text: 'Schedule', link: '/schedule' },
              { text: 'Speakers', link: '/speakers' },
              { text: 'Tickets', link: '/tickets' },
              { text: 'Sponsors', link: '/sponsors' },
            ],
          },
          {
            title: 'Venue',
            links: [
              { text: 'Location', link: '/location' },
              { text: 'Hotels', link: '/hotels' },
              { text: 'Travel', link: '/travel' },
              { text: 'Accessibility', link: '/accessibility' },
            ],
          },
          {
            title: 'More',
            links: [
              { text: 'About', link: '/about' },
              { text: 'Code of Conduct', link: '/conduct' },
              { text: 'Contact', link: '/contact' },
              { text: 'Press', link: '/press' },
            ],
          },
        ],
        social: {
          twitter: 'https://twitter.com/techsummit',
          linkedin: 'https://linkedin.com/company/techsummit',
          facebook: 'https://facebook.com/techsummit',
        },
        copyright: '© 2025 Tech Summit. All rights reserved.',
      },
    },
  ],
};

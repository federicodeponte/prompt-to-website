// ABOUTME: Professional 10-block e-commerce product landing page template
// ABOUTME: Comprehensive product showcase with features, pricing, and conversion optimization

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const ecommerceTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'product-landing',
  theme: defaultTheme,
  metadata: {
    title: 'Premium Wireless Headphones - AudioPro',
    description: 'Experience studio-quality sound with our flagship headphones',
    author: 'AudioPro',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'split',
        heading: 'Sound That Moves You',
        subheading: 'Premium Wireless Headphones',
        description: 'Immerse yourself in crystal-clear audio with 40-hour battery life, active noise cancellation, and premium comfort.',
        ctaPrimary: { text: 'Buy Now - $299', link: '#pricing' },
        ctaSecondary: { text: 'Learn More', link: '#features' },
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        imageAlt: 'Premium wireless headphones',
        imagePosition: 'right' as const,
      },
    },
    {
      id: 'logo-cloud-1',
      type: 'logo-cloud',
      content: {
        variant: 'carousel',
        heading: 'As Featured In',
        autoplay: true,
        speed: 3000,
        logos: [
          { name: 'TechCrunch', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=TechCrunch' },
          { name: 'The Verge', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=TheVerge' },
          { name: 'WIRED', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=WIRED' },
          { name: 'Engadget', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=Engadget' },
          { name: 'CNET', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=CNET' },
        ],
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        columns: 4,
        stats: [
          { value: '40', suffix: 'hrs', label: 'Battery Life', description: 'Non-stop listening' },
          { value: '99', suffix: '%', label: 'Noise Cancellation', description: 'Block out the world' },
          { value: '50K', suffix: '+', label: 'Happy Customers', description: 'Worldwide' },
          { value: '4.9', suffix: '/5', label: 'Rating', description: 'Customer reviews' },
        ],
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Engineered for Excellence',
        subheading: 'Premium features that set us apart',
        columns: 3,
        features: [
          { icon: '🎵', title: 'Hi-Res Audio', description: 'Studio-quality sound with deep bass, crystal-clear mids, and crisp highs. Supports LDAC and aptX HD codecs.' },
          { icon: '🔇', title: 'Active Noise Cancellation', description: 'Industry-leading ANC technology blocks out 99% of ambient noise for pure audio bliss in any environment.' },
          { icon: '🔋', title: '40-Hour Battery', description: 'All-day listening with fast charging support. Get 5 hours of playback from just 10 minutes of charging.' },
          { icon: '☁️', title: 'Ultra Comfortable', description: 'Memory foam ear cushions and lightweight design for hours of comfortable wear without fatigue.' },
          { icon: '📱', title: 'Multi-Device Pairing', description: 'Connect to multiple devices simultaneously and seamlessly switch between your phone, laptop, and tablet.' },
          { icon: '💧', title: 'Water Resistant', description: 'IPX4 rated for sweat and splash resistance, perfect for workouts and all-weather use.' },
        ],
      },
    },
    {
      id: 'video-1',
      type: 'video',
      content: {
        variant: 'embed',
        heading: 'Experience the Difference',
        description: 'Watch our detailed review and see why AudioPro headphones are the choice of audio professionals and music enthusiasts worldwide.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        autoplay: false,
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'carousel',
        heading: 'Loved by Music Enthusiasts',
        subheading: 'Join thousands of satisfied customers',
        autoplay: true,
        interval: 5000,
        testimonials: [
          {
            quote: 'Best headphones I\'ve ever owned. The sound quality is incredible and the noise cancellation is a game-changer for my commute.',
            author: 'Alex Rivera',
            role: 'Music Producer',
            company: 'SoundWave Studios',
            rating: 5,
          },
          {
            quote: 'Worth every penny. Comfortable for all-day wear and the battery life is exactly as advertised. Highly recommend!',
            author: 'Sarah Mitchell',
            role: 'Podcast Host',
            company: 'The Daily Digest',
            rating: 5,
          },
          {
            quote: 'Switched from a competitor and never looked back. The build quality and sound are in a league of their own.',
            author: 'James Chen',
            role: 'Audio Engineer',
            company: 'Freelance',
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
        heading: 'Choose Your Package',
        subheading: 'Premium quality, exceptional value',
        tiers: [
          {
            name: 'Standard',
            price: '$299',
            period: 'one-time',
            description: 'Everything you need for amazing audio',
            features: [
              'Premium wireless headphones',
              'Carrying case included',
              '1-year warranty',
              'Free shipping',
              'Email support',
            ],
            ctaText: 'Buy Now',
            ctaLink: '#checkout',
            highlighted: false,
          },
          {
            name: 'Premium Bundle',
            price: '$399',
            period: 'one-time',
            description: 'Best value with accessories',
            features: [
              'Premium wireless headphones',
              'Premium carrying case',
              'Extra ear cushions',
              '2-year extended warranty',
              'Free shipping',
              'Priority support',
              'Exclusive colorways',
            ],
            ctaText: 'Buy Bundle',
            ctaLink: '#checkout',
            highlighted: true,
          },
          {
            name: 'Pro Package',
            price: '$499',
            period: 'one-time',
            description: 'Complete professional setup',
            features: [
              'Premium wireless headphones',
              'Professional carrying case',
              'Extra ear cushions',
              '3-year warranty',
              'Free priority shipping',
              '24/7 priority support',
              'All exclusive colorways',
              'Studio-grade cable',
              'Personalization options',
            ],
            ctaText: 'Buy Pro',
            ctaLink: '#checkout',
            highlighted: false,
          },
        ],
      },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        subheading: 'Everything you need to know',
        faqs: [
          {
            question: 'How long does the battery last?',
            answer: 'The headphones provide up to 40 hours of continuous playback on a single charge with ANC off, and up to 30 hours with ANC on. A quick 5-minute charge gives you 2 hours of playback.',
          },
          {
            question: 'Are they compatible with my device?',
            answer: 'Yes! Our headphones use Bluetooth 5.0 and are compatible with all Bluetooth-enabled devices including smartphones, tablets, laptops, and more. They support AAC, SBC, aptX, and LDAC codecs.',
          },
          {
            question: 'What\'s your return policy?',
            answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied, return them for a full refund within 30 days of purchase, no questions asked.',
          },
          {
            question: 'Do they come with a warranty?',
            answer: 'Yes, all headphones come with a 1-year manufacturer warranty covering defects. Extended warranties are available with our Premium and Pro packages.',
          },
          {
            question: 'Can I use them for phone calls?',
            answer: 'Absolutely! The built-in microphone with advanced noise reduction ensures crystal-clear call quality, even in noisy environments. Perfect for calls and video meetings.',
          },
          {
            question: 'How do I clean and maintain them?',
            answer: 'Wipe the headphones with a soft, dry cloth. Ear cushions can be gently cleaned with a slightly damp cloth. Avoid liquids on the drivers. Store in the included case when not in use.',
          },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Ready to Upgrade Your Audio?',
        description: 'Free shipping on all orders. 30-day money-back guarantee. Order now and experience the difference.',
        ctaPrimary: { text: 'Shop Now', link: '#pricing' },
        ctaSecondary: { text: 'Compare Models', link: '#features' },
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'multi-column',
        logo: 'AudioPro',
        tagline: 'Premium audio for discerning listeners',
        sections: [
          {
            title: 'Shop',
            links: [
              { text: 'Headphones', link: '/products/headphones' },
              { text: 'Accessories', link: '/products/accessories' },
              { text: 'Bundles', link: '/products/bundles' },
              { text: 'Gift Cards', link: '/gift-cards' },
            ],
          },
          {
            title: 'Support',
            links: [
              { text: 'Help Center', link: '/help' },
              { text: 'Warranty', link: '/warranty' },
              { text: 'Returns', link: '/returns' },
              { text: 'Shipping', link: '/shipping' },
            ],
          },
          {
            title: 'Company',
            links: [
              { text: 'About Us', link: '/about' },
              { text: 'Blog', link: '/blog' },
              { text: 'Careers', link: '/careers' },
              { text: 'Contact', link: '/contact' },
            ],
          },
        ],
        social: {
          twitter: 'https://twitter.com/audiopro',
          linkedin: 'https://linkedin.com/company/audiopro',
          facebook: 'https://facebook.com/audiopro',
        },
        copyright: '© 2025 AudioPro. All rights reserved.',
      },
    },
  ],
};

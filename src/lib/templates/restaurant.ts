// ABOUTME: Professional 10-block restaurant/local business template
// ABOUTME: Comprehensive local business site with menu, location, and reservations

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const restaurantTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'restaurant',
  theme: {
    ...defaultTheme,
    colors: {
      primary: '#D97706', // Amber
      secondary: '#059669', // Green
      background: '#FFFFFF',
      text: '#1F2937',
      muted: '#6B7280',
    },
  },
  metadata: {
    title: 'Bella Vista Restaurant',
    description: 'Authentic Italian cuisine in the heart of the city',
    author: 'Bella Vista',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'split',
        heading: 'Experience Authentic Italian Cuisine',
        subheading: 'Fresh ingredients. Traditional recipes. Unforgettable flavors.',
        description: 'Family-owned since 1995, bringing the taste of Italy to your table with recipes passed down through generations.',
        ctaPrimary: { text: 'Reserve a Table', link: '#contact' },
        ctaSecondary: { text: 'View Menu', link: '#menu' },
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        imageAlt: 'Elegant restaurant interior',
        imagePosition: 'right' as const,
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Our Story in Numbers',
        subheading: 'Three decades of culinary excellence',
        columns: 4,
        stats: [
          { value: '30', label: 'Years Serving Excellence', description: 'Since 1995' },
          { value: '10K', suffix: '+', label: 'Happy Guests', description: 'Annual visitors' },
          { value: '4.9', suffix: ' ★', label: 'Average Rating', description: 'On Google & Yelp' },
          { value: '100', suffix: '+', label: 'Menu Items', description: 'Traditional dishes' },
        ],
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'What Makes Us Special',
        subheading: 'The Bella Vista difference',
        columns: 3,
        features: [
          { icon: '🍝', title: 'Authentic Recipes', description: 'Traditional Italian dishes passed down through generations, prepared exactly as they are in Italy' },
          { icon: '🌱', title: 'Fresh Ingredients', description: 'Locally sourced organic produce and specialty items imported directly from Italy' },
          { icon: '👨‍🍳', title: 'Expert Chefs', description: 'Culinary team trained in Italy with over 20 years of combined experience' },
          { icon: '🍷', title: 'Italian Wine Selection', description: 'Curated wine list featuring 100+ Italian wines from every major region' },
          { icon: '🎵', title: 'Live Music Nights', description: 'Enjoy authentic Italian music every Friday and Saturday evening' },
          { icon: '🎉', title: 'Private Events', description: 'Host your special occasions in our elegant private dining room' },
        ],
      },
    },
    {
      id: 'gallery-1',
      type: 'gallery',
      content: {
        variant: 'grid',
        heading: 'Signature Dishes',
        subheading: 'A taste of our most popular menu items',
        columns: 3,
        lightbox: true,
        images: [
          { image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', alt: 'Carbonara', title: 'Spaghetti Carbonara', description: 'Classic Roman pasta', category: 'Pasta' },
          { image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', alt: 'Margherita Pizza', title: 'Pizza Margherita', description: 'Wood-fired perfection', category: 'Pizza' },
          { image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', alt: 'Lasagna', title: 'Lasagna Bolognese', description: 'Layered deliciousness', category: 'Pasta' },
          { image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800', alt: 'Osso Buco', title: 'Osso Buco Milanese', description: 'Tender braised veal', category: 'Main' },
          { image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800', alt: 'Tiramisu', title: 'Tiramisu Classico', description: 'Traditional Italian dessert', category: 'Dessert' },
          { image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800', alt: 'Bruschetta', title: 'Bruschetta Trio', description: 'Three classic varieties', category: 'Appetizer' },
        ],
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'carousel',
        heading: 'What Our Guests Say',
        subheading: 'Reviews from our satisfied diners',
        autoplay: true,
        interval: 5000,
        testimonials: [
          {
            quote: 'Best Italian food outside of Italy! The pasta is perfectly al dente and the sauces are incredible. Our new favorite restaurant.',
            author: 'Michael Roberts',
            role: 'Food Critic',
            company: 'City Magazine',
            rating: 5,
          },
          {
            quote: 'Cozy atmosphere, attentive service, and absolutely delicious food. The homemade tiramisu is to die for. Highly recommend!',
            author: 'Emma Wilson',
            role: 'Regular Guest',
            company: 'Local Resident',
            rating: 5,
          },
          {
            quote: 'Been coming here for 10 years and it never disappoints. Feels like dining with family. The osso buco is my absolute favorite.',
            author: 'David Chen',
            role: 'Food Blogger',
            company: 'Taste Chronicles',
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
        heading: 'How to Visit Us',
        subheading: 'Three easy ways to enjoy Bella Vista',
        steps: [
          { icon: '📞', title: 'Reserve a Table', description: 'Call us at (555) 123-4567 or book online for guaranteed seating' },
          { icon: '🚗', title: 'Walk-In Welcome', description: 'No reservation? Come in and we\'ll seat you as soon as possible' },
          { icon: '🥡', title: 'Takeout & Delivery', description: 'Order online for pickup or delivery through our partners' },
        ],
      },
    },
    {
      id: 'video-1',
      type: 'video',
      content: {
        variant: 'embed',
        heading: 'Inside Bella Vista',
        description: 'Take a virtual tour of our restaurant and see our chefs in action. Experience the warmth and authenticity that makes Bella Vista special.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        autoplay: false,
      },
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: {
        variant: 'accordion',
        heading: 'Frequently Asked Questions',
        subheading: 'Everything you need to know before visiting',
        faqs: [
          {
            question: 'What are your hours?',
            answer: 'We\'re open Tuesday-Sunday from 11:30am to 10:00pm. We\'re closed on Mondays to give our team time to rest and prepare for the week ahead.',
          },
          {
            question: 'Do I need a reservation?',
            answer: 'Reservations are highly recommended, especially for dinner and weekends. However, we do accept walk-ins and will accommodate you as quickly as possible.',
          },
          {
            question: 'Do you accommodate dietary restrictions?',
            answer: 'Absolutely! We offer vegetarian, vegan, and gluten-free options. Our chefs can also modify many dishes to accommodate allergies and preferences. Please inform your server.',
          },
          {
            question: 'Is there parking available?',
            answer: 'Yes, we offer complimentary valet parking during dinner hours. There\'s also street parking and a public parking garage one block away.',
          },
          {
            question: 'Do you host private events?',
            answer: 'Yes! Our private dining room seats up to 40 guests and is perfect for birthdays, anniversaries, corporate events, and more. Contact us for details and pricing.',
          },
          {
            question: 'Do you offer gift cards?',
            answer: 'Yes, gift cards are available in any denomination and can be purchased in-person or online. They make perfect gifts for food lovers!',
          },
        ],
      },
    },
    {
      id: 'contact-1',
      type: 'contact',
      content: {
        variant: 'simple',
        heading: 'Visit Us',
        description: 'Open Tuesday-Sunday, 11:30am-10:00pm. Closed Mondays. Reservations recommended.',
        email: 'info@bellavista.com',
        phone: '(555) 123-4567',
        address: '123 Main Street, Downtown District, Your City, ST 12345',
        showForm: true,
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'multi-column',
        logo: 'Bella Vista',
        tagline: 'Bringing authentic Italian flavors to your table since 1995',
        columns: [
          {
            heading: 'Restaurant',
            links: [
              { text: 'Menu', url: '/menu' },
              { text: 'Reservations', url: '/reservations' },
              { text: 'Private Events', url: '/events' },
              { text: 'Gift Cards', url: '/gift-cards' },
            ],
          },
          {
            heading: 'About',
            links: [
              { text: 'Our Story', url: '/story' },
              { text: 'Chef Team', url: '/chefs' },
              { text: 'Reviews', url: '/reviews' },
              { text: 'Careers', url: '/careers' },
            ],
          },
          {
            heading: 'Contact',
            links: [
              { text: 'Location', url: '/location' },
              { text: 'Hours', url: '/hours' },
              { text: 'Contact Us', url: '/contact' },
              { text: 'Newsletter', url: '/newsletter' },
            ],
          },
        ],
        social: [
          { platform: 'Facebook', url: 'https://facebook.com/bellavista' },
          { platform: 'Twitter', url: 'https://twitter.com/bellavista' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/bellavista' },
        ],
        copyright: '© 2025 Bella Vista Restaurant. All rights reserved.',
      },
    },
  ],
};

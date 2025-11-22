// ABOUTME: Professional 10-block app download page template
// ABOUTME: Comprehensive mobile app showcase with features, pricing, and download CTAs

import { defaultTheme } from '../theme/defaults';
import { WebsiteConfig } from '../types/website-config';

export const appDownloadTemplate: WebsiteConfig = {
  version: '1.0',
  template: 'app-download',
  theme: {
    ...defaultTheme,
    colors: {
      primary: '#8B5CF6', // Violet
      secondary: '#EC4899', // Pink
      background: '#FFFFFF',
      text: '#1F2937',
      muted: '#6B7280',
    },
  },
  metadata: {
    title: 'FitTrack - Your Fitness Companion',
    description: 'Track workouts, achieve goals, transform your life',
    author: 'FitTrack Inc',
  },
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        variant: 'split',
        heading: 'Transform Your Fitness Journey',
        subheading: 'Track workouts. Achieve goals. Feel amazing.',
        description: 'Join 2 million+ users who transformed their lives with FitTrack - the all-in-one fitness app that makes working out fun and tracking progress effortless.',
        ctaPrimary: { text: 'Download for iOS', link: '#download' },
        ctaSecondary: { text: 'Download for Android', link: '#download' },
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
        imageAlt: 'FitTrack app interface',
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
          { name: 'Forbes', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=Forbes' },
          { name: 'Wired', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=WIRED' },
          { name: 'The Verge', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=TheVerge' },
          { name: 'Men\'s Health', image: 'https://via.placeholder.com/150x50/000000/FFFFFF?text=MensHealth' },
        ],
      },
    },
    {
      id: 'stats-1',
      type: 'stats',
      content: {
        variant: 'grid',
        heading: 'Join the Movement',
        subheading: 'Growing community of fitness enthusiasts',
        columns: 4,
        stats: [
          { value: '2M', suffix: '+', label: 'Active Users', description: 'Worldwide' },
          { value: '500M', suffix: '+', label: 'Workouts Logged', description: 'And counting' },
          { value: '4.8', suffix: ' ★', label: 'App Store Rating', description: 'Average rating' },
          { value: '50', suffix: '+', label: 'Countries', description: 'Global reach' },
        ],
      },
    },
    {
      id: 'features-1',
      type: 'features',
      content: {
        variant: 'grid',
        heading: 'Everything You Need to Succeed',
        subheading: 'Powerful features to keep you motivated and on track',
        columns: 3,
        features: [
          { icon: '💪', title: 'Workout Tracking', description: 'Log exercises, sets, reps, and weight with an intuitive interface. Browse 1000+ exercises with video demonstrations.' },
          { icon: '📊', title: 'Progress Charts', description: 'Visualize your improvements over time with beautiful charts showing strength gains, body composition, and more.' },
          { icon: '🎯', title: 'Goal Setting', description: 'Set and achieve personalized fitness goals with smart recommendations based on your progress and fitness level.' },
          { icon: '🏃', title: 'Activity Monitor', description: 'Track steps, calories burned, and daily activity with seamless integration with Apple Health and Google Fit.' },
          { icon: '🍎', title: 'Nutrition Logging', description: 'Monitor meals and macros effortlessly with barcode scanning and a database of 5 million+ foods.' },
          { icon: '👥', title: 'Community', description: 'Connect with friends, join challenges, and stay motivated with a supportive community of fitness enthusiasts.' },
        ],
      },
    },
    {
      id: 'video-1',
      type: 'video',
      content: {
        variant: 'split',
        heading: 'See FitTrack in Action',
        description: 'Watch how easy it is to track your workouts, monitor your progress, and achieve your fitness goals with FitTrack.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoPosition: 'left' as const,
        features: [
          'Intuitive workout logging',
          'Real-time progress tracking',
          'Personalized workout plans',
          'Social features & challenges',
          'Nutrition tracking & insights',
        ],
      },
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: {
        variant: 'cards',
        heading: 'Real Results from Real Users',
        subheading: 'Success stories from our community',
        columns: 3,
        testimonials: [
          {
            quote: 'Lost 30 lbs in 4 months! This app changed my life. The progress tracking keeps me motivated and the community is incredibly supportive.',
            author: 'Jessica Brown',
            role: 'Premium Member',
            company: '4 months using FitTrack',
            rating: 5,
          },
          {
            quote: 'The best fitness app I have ever used. Simple, powerful, and motivating. I\'ve tried them all and FitTrack is hands down the winner.',
            author: 'Mike Thompson',
            role: 'Pro Athlete',
            company: 'Olympic Weightlifter',
            rating: 5,
          },
          {
            quote: 'Helped me build consistent workout habits. Cannot live without it! The workout plans and progress photos feature are game-changers.',
            author: 'Amanda Lee',
            role: 'Yoga Instructor',
            company: 'Fitness Professional',
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
        subheading: 'Start free, upgrade when ready',
        tiers: [
          {
            name: 'Free',
            description: 'Get started today',
            price: '$0',
            period: 'forever',
            features: [
              'Basic workout tracking',
              'Exercise library (500+ exercises)',
              'Progress charts',
              'Community access',
              'Track up to 3 workouts/week',
            ],
            ctaText: 'Download Free',
            ctaLink: '#download',
            highlighted: false,
          },
          {
            name: 'Pro',
            description: 'Unlock your potential',
            price: '$9.99',
            period: 'month',
            features: [
              'Everything in Free',
              'Unlimited workout tracking',
              'Custom workout plans',
              'Nutrition tracking & macros',
              'Advanced analytics & insights',
              'Ad-free experience',
              'Priority support',
            ],
            highlighted: true,
            ctaText: 'Try Pro Free for 14 Days',
            ctaLink: '#download',
          },
          {
            name: 'Premium',
            description: 'Maximum results',
            price: '$19.99',
            period: 'month',
            features: [
              'Everything in Pro',
              'Personal trainer AI coaching',
              '1-on-1 video coaching (monthly)',
              'Personalized meal plans',
              'Progress photo timeline',
              'Form check video analysis',
              'Exclusive community access',
            ],
            ctaText: 'Go Premium',
            ctaLink: '#download',
            highlighted: false,
          },
        ],
      },
    },
    {
      id: 'gallery-1',
      type: 'gallery',
      content: {
        variant: 'grid',
        heading: 'App Screenshots',
        subheading: 'Explore the FitTrack experience',
        columns: 3,
        lightbox: true,
        images: [
          { image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800', alt: 'Workout Tracking', title: 'Workout Logging', description: 'Track exercises effortlessly', category: 'Features' },
          { image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800', alt: 'Progress Charts', title: 'Progress Analytics', description: 'Visualize your gains', category: 'Features' },
          { image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800', alt: 'Community', title: 'Social Features', description: 'Connect with friends', category: 'Features' },
          { image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800', alt: 'Nutrition', title: 'Meal Tracking', description: 'Log food & macros', category: 'Features' },
          { image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', alt: 'Workout Plans', title: 'Custom Plans', description: 'Personalized programs', category: 'Features' },
          { image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800', alt: 'Goals', title: 'Goal Setting', description: 'Set & achieve targets', category: 'Features' },
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
            question: 'Is the app really free?',
            answer: 'Yes! The free version includes core workout tracking features with up to 3 workouts per week. Upgrade to Pro or Premium for unlimited tracking and advanced features.',
          },
          {
            question: 'Which devices are supported?',
            answer: 'FitTrack is available on iOS 15+ and Android 10+. We also support Apple Watch and Wear OS for seamless tracking on the go.',
          },
          {
            question: 'Can I cancel my subscription anytime?',
            answer: 'Absolutely! Cancel anytime from your account settings. No questions asked, no hidden fees. Your subscription will remain active until the end of the billing period.',
          },
          {
            question: 'Do you offer a free trial?',
            answer: 'Yes! Pro and Premium plans come with a 14-day free trial. No credit card required for the free version, and you can cancel the trial anytime.',
          },
          {
            question: 'Does it sync with other fitness apps?',
            answer: 'Yes! FitTrack integrates seamlessly with Apple Health, Google Fit, MyFitnessPal, Strava, and other popular fitness platforms.',
          },
          {
            question: 'What makes FitTrack different from other apps?',
            answer: 'FitTrack combines the best features of multiple apps into one: workout tracking, nutrition logging, progress analytics, and community support. Plus, our AI coaching adapts to your progress.',
          },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        variant: 'simple',
        heading: 'Start Your Transformation Today',
        description: 'Download FitTrack and join millions achieving their fitness goals. Free to start, cancel anytime. Available on iOS and Android.',
        ctaPrimary: { text: 'Download on App Store', link: '#ios' },
        ctaSecondary: { text: 'Get it on Google Play', link: '#android' },
      },
    },
    {
      id: 'footer-1',
      type: 'footer',
      content: {
        variant: 'multi-column',
        logo: 'FitTrack',
        tagline: 'Your fitness journey starts here',
        sections: [
          {
            title: 'Product',
            links: [
              { text: 'Features', link: '/features' },
              { text: 'Pricing', link: '/pricing' },
              { text: 'Download', link: '/download' },
              { text: 'Updates', link: '/updates' },
            ],
          },
          {
            title: 'Support',
            links: [
              { text: 'Help Center', link: '/help' },
              { text: 'Contact Us', link: '/contact' },
              { text: 'Privacy', link: '/privacy' },
              { text: 'Terms', link: '/terms' },
            ],
          },
          {
            title: 'Company',
            links: [
              { text: 'About', link: '/about' },
              { text: 'Blog', link: '/blog' },
              { text: 'Careers', link: '/careers' },
              { text: 'Press', link: '/press' },
            ],
          },
        ],
        social: {
          facebook: 'https://facebook.com/fittrack',
          twitter: 'https://twitter.com/fittrack',
          linkedin: 'https://linkedin.com/company/fittrack',
        },
        copyright: '© 2025 FitTrack Inc. All rights reserved.',
      },
    },
  ],
};

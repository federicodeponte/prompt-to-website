// ABOUTME: Generate production-ready Next.js project from WebsiteConfig
// ABOUTME: Creates complete project structure with pages, components, and styling

import type { WebsiteConfig, Block } from '@/lib/types/website-config';

export interface GeneratedProject {
  files: Record<string, string>; // filepath → content
  projectName: string;
  description: string;
}

/**
 * Generate a complete Next.js 15 project from website configuration
 * Includes: app router, TypeScript, Tailwind CSS, responsive components
 */
export async function generateNextJsProject(
  config: WebsiteConfig,
  projectName: string
): Promise<GeneratedProject> {
  const files: Record<string, string> = {};

  // 1. Package.json
  files['package.json'] = generatePackageJson(projectName, config.metadata.title);

  // 2. Next.js config
  files['next.config.js'] = generateNextConfig();

  // 3. TypeScript config
  files['tsconfig.json'] = generateTsConfig();

  // 4. Tailwind config
  files['tailwind.config.ts'] = generateTailwindConfig();
  files['postcss.config.js'] = generatePostCssConfig();

  // 5. Root layout
  files['app/layout.tsx'] = generateRootLayout(config);

  // 6. Main page
  files['app/page.tsx'] = generateMainPage(config);

  // 7. Component files for each block
  config.blocks.forEach((block, index) => {
    const componentName = `${block.type.charAt(0).toUpperCase()}${block.type.slice(1)}${index}`;
    files[`components/${componentName}.tsx`] = generateBlockComponent(block, componentName);
  });

  // 8. Global styles
  files['app/globals.css'] = generateGlobalStyles();

  // 9. README
  files['README.md'] = generateReadme(projectName, config.metadata.title);

  // 10. Environment example
  files['.env.example'] = generateEnvExample();

  // 11. Gitignore
  files['.gitignore'] = generateGitignore();

  return {
    files,
    projectName,
    description: `Generated Next.js site: ${config.metadata.title}`,
  };
}

function generatePackageJson(projectName: string, siteName: string): string {
  return JSON.stringify(
    {
      name: projectName,
      version: '1.0.0',
      description: `${siteName} - Built with AI`,
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
      },
      dependencies: {
        next: '^15.0.0',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
      },
      devDependencies: {
        '@types/node': '^20',
        '@types/react': '^19',
        '@types/react-dom': '^19',
        typescript: '^5',
        tailwindcss: '^3.4',
        postcss: '^8',
        autoprefixer: '^10',
        eslint: '^8',
        'eslint-config-next': '^15.0.0',
      },
    },
    null,
    2
  );
}

function generateNextConfig(): string {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
  },
};

export default nextConfig;
`;
}

function generateTsConfig(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        plugins: [
          {
            name: 'next',
          },
        ],
        paths: {
          '@/*': ['./*'],
        },
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
      exclude: ['node_modules'],
    },
    null,
    2
  );
}

function generateTailwindConfig(): string {
  return `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
`;
}

function generatePostCssConfig(): string {
  return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
}

function generateRootLayout(config: WebsiteConfig): string {
  const seoTitle = config.metadata.title;
  const seoDescription = config.metadata.description || `Welcome to ${config.metadata.title}`;

  return `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${seoTitle}',
  description: '${seoDescription}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
`;
}

function generateMainPage(config: WebsiteConfig): string {
  const imports: string[] = [];
  const components: string[] = [];

  config.blocks.forEach((block, index) => {
    const componentName = `${block.type.charAt(0).toUpperCase()}${block.type.slice(1)}${index}`;
    imports.push(`import ${componentName} from '@/components/${componentName}'`);
    components.push(`      <${componentName} />`);
  });

  return `${imports.join('\n')}

export default function Home() {
  return (
    <main className="min-h-screen">
${components.join('\n')}
    </main>
  )
}
`;
}

function generateBlockComponent(block: Block, componentName: string): string {
  const blockType = block.type;

  if (blockType === 'hero') {
    return generateHeroComponent(block, componentName);
  } else if (blockType === 'features') {
    return generateFeaturesComponent(block, componentName);
  } else if (blockType === 'testimonials') {
    return generateTestimonialsComponent(block, componentName);
  } else if (blockType === 'cta') {
    return generateCtaComponent(block, componentName);
  }

  // Generic block
  return `export default function ${componentName}() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Section</h2>
        <p>Content goes here</p>
      </div>
    </section>
  )
}
`;
}

function generateHeroComponent(block: Block, componentName: string): string {
  const content = block.content as any;
  const headline = content?.headline || 'Welcome';
  const subheadline = content?.subheadline || 'Subheadline';
  const ctaText = content?.cta?.text || 'Get Started';

  return `export default function ${componentName}() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          ${headline}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          ${subheadline}
        </p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition">
          ${ctaText}
        </button>
      </div>
    </section>
  )
}
`;
}

function generateFeaturesComponent(block: Block, componentName: string): string {
  const content = block.content as any;
  const features = content?.items || [
    { title: 'Feature 1', description: 'Description 1' },
    { title: 'Feature 2', description: 'Description 2' },
    { title: 'Feature 3', description: 'Description 3' },
  ];

  return `export default function ${componentName}() {
  const features = ${JSON.stringify(features, null, 2)};

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`;
}

function generateTestimonialsComponent(block: Block, componentName: string): string {
  const content = block.content as any;
  const testimonials = content?.items || [
    { quote: 'Great product!', author: 'John Doe', role: 'CEO' },
  ];

  return `export default function ${componentName}() {
  const testimonials = ${JSON.stringify(testimonials, null, 2)};

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-gray-600 text-sm">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`;
}

function generateCtaComponent(block: Block, componentName: string): string {
  const content = block.content as any;
  const headline = content?.headline || 'Ready to get started?';
  const description = content?.description || 'Join us today';
  const buttonText = content?.buttonText || 'Sign Up';

  return `export default function ${componentName}() {
  return (
    <section className="bg-blue-600 text-white py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-4">${headline}</h2>
        <p className="text-xl mb-8">${description}</p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition">
          ${buttonText}
        </button>
      </div>
    </section>
  )
}
`;
}

function generateGlobalStyles(): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}
`;
}

function generateReadme(projectName: string, siteName: string): string {
  return `# ${siteName}

This is a Next.js project generated with AI.

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deploy

Deploy to Vercel:

\`\`\`bash
vercel --prod
\`\`\`

---

Generated with ❤️ using AI
`;
}

function generateEnvExample(): string {
  return `# Add your environment variables here
# NEXT_PUBLIC_SITE_URL=https://yoursite.com
`;
}

function generateGitignore(): string {
  return `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;
}

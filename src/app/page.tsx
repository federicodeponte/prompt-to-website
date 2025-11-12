// ABOUTME: Home page with template gallery and website creation flow
// ABOUTME: Provides template selection and quick start options

import Link from 'next/link';
import { TemplateGallery } from '@/components/template-gallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="border-b bg-white px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Build Beautiful Websites
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              In Minutes, Not Hours
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Choose a template, describe your vision to AI, and watch your website come to life.
            No coding required.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#templates"
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Get Started Free
            </a>
            <Link
              href="/editor/demo"
              className="rounded-lg border border-gray-300 px-8 py-3 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Why Choose Our Platform?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                🤖
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">AI-Powered</h3>
              <p className="text-gray-600">
                Describe your website in plain English and let AI generate a complete design for you.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-2xl">
                ⚡
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600">
                Create professional websites in minutes with our intuitive editor and templates.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-2xl">
                🎨
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Beautiful Design</h3>
              <p className="text-gray-600">
                Professional templates built with modern design principles and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section id="templates" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Choose Your Template
            </h2>
            <p className="text-xl text-gray-600">
              Start with a professionally designed template and customize it to your needs
            </p>
          </div>
          <TemplateGallery />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Ready to Build Your Website?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Join thousands of creators building beautiful websites with AI
          </p>
          <a
            href="#templates"
            className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-gray-100"
          >
            Get Started Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Prompt to Website
              </h3>
              <p className="text-gray-600">
                Build beautiful websites with AI in minutes
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-gray-900">
                Product
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#templates" className="hover:text-blue-600">Templates</a></li>
                <li><a href="#features" className="hover:text-blue-600">Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-gray-900">
                Resources
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#docs" className="hover:text-blue-600">Documentation</a></li>
                <li><a href="#help" className="hover:text-blue-600">Help Center</a></li>
                <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-gray-600">
            © 2025 Prompt to Website. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

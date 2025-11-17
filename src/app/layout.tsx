import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/query-provider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prompt-to-website.vercel.app'),
  title: "Prompt to Website - Build Beautiful Websites with AI",
  description: "Create professional websites in minutes using AI. Choose from 10+ templates, describe your vision, and generate production-ready sites. Export as JSON or HTML. No coding required.",
  keywords: [
    "AI website builder",
    "website generator",
    "AI web design",
    "no-code website",
    "landing page builder",
    "AI templates",
    "website creator",
    "prompt to website",
    "Gemini AI",
    "Next.js",
  ],
  authors: [{ name: "Prompt to Website" }],
  creator: "Prompt to Website",
  publisher: "Prompt to Website",
  applicationName: "Prompt to Website",
  generator: "Next.js 16",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prompt-to-website.vercel.app",
    siteName: "Prompt to Website",
    title: "Prompt to Website - Build Beautiful Websites with AI",
    description: "Create professional websites in minutes using AI. Choose from 10+ templates, describe your vision, and generate production-ready sites.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prompt to Website - AI-Powered Website Builder",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Prompt to Website - Build Beautiful Websites with AI",
    description: "Create professional websites in minutes using AI. No coding required.",
    images: ["/og-image.png"],
    creator: "@prompttowebsite",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: "your-google-site-verification",
    // yandex: "your-yandex-verification",
    // bing: "your-bing-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

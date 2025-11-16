// ABOUTME: Clean multi-column footer with proper icons and separators
// ABOUTME: Production-quality design matching shadcn/ui aesthetic

import React from 'react';
import { FooterContentMultiColumn } from '@/lib/types/block-content';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FooterMultiColumnProps {
  content: FooterContentMultiColumn;
}

export function FooterMultiColumn({ content }: FooterMultiColumnProps) {
  const { logo, tagline, sections, social, copyright } = content;

  return (
    <footer className="border-t">
      <div className="container mx-auto px-6 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Tagline */}
          <div>
            <div className="mb-3 text-xl font-semibold text-foreground">{logo}</div>
            {tagline && <p className="mb-4 text-sm text-muted-foreground">{tagline}</p>}
            {/* Social Links */}
            {social && (
              <div className="flex gap-4">
                {social.twitter && (
                  <a
                    href={social.twitter}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {social.github && (
                  <a
                    href={social.github}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Link Sections */}
          {sections && sections.length > 0 && sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links && section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.link}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        {copyright && (
          <>
            <Separator className="my-8" />
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{copyright}</p>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}

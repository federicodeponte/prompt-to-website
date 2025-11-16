// ABOUTME: Clean, minimal footer with proper icons and separators
// ABOUTME: Production-quality design matching shadcn/ui aesthetic

import React from 'react';
import { FooterContentSimple } from '@/lib/types/block-content';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FooterSimpleProps {
  content: FooterContentSimple;
}

export function FooterSimple({ content }: FooterSimpleProps) {
  const { logo, tagline, links, social, copyright } = content;

  return (
    <footer className="border-t">
      <div className="container mx-auto px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Logo & Tagline */}
          <div>
            <div className="mb-2 text-xl font-semibold text-foreground">{logo}</div>
            {tagline && <p className="font-theme-body text-sm text-muted-foreground">{tagline}</p>}
          </div>

          {/* Links */}
          {links && links.length > 0 && (
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          )}

          {/* Social Links */}
          {social && (
            <div className="flex gap-6">
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

          {/* Separator */}
          <Separator className="w-full max-w-xs" />

          {/* Copyright */}
          {copyright && (
            <p className="font-theme-body text-xs text-muted-foreground">{copyright}</p>
          )}
        </div>
      </div>
    </footer>
  );
}

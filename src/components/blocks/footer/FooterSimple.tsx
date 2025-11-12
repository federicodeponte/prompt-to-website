// ABOUTME: Simple footer block variant with single row of links
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { FooterContentSimple } from '@/lib/types/block-content';

interface FooterSimpleProps {
  content: FooterContentSimple;
}

export function FooterSimple({ content }: FooterSimpleProps) {
  const { logo, tagline, links, social, copyright } = content;

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Logo & Tagline */}
          <div>
            <div className="mb-2 text-2xl font-bold">{logo}</div>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.text}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-4">
            {social.twitter && (
              <a href={social.twitter} className="text-muted-foreground hover:text-foreground" aria-label="Twitter">
                𝕏
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} className="text-muted-foreground hover:text-foreground" aria-label="LinkedIn">
                in
              </a>
            )}
            {social.github && (
              <a href={social.github} className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
                GitHub
              </a>
            )}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}

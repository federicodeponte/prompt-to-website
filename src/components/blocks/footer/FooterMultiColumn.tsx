// ABOUTME: Multi-column footer block variant with organized link sections
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { FooterContentMultiColumn } from '@/lib/types/block-content';

interface FooterMultiColumnProps {
  content: FooterContentMultiColumn;
}

export function FooterMultiColumn({ content }: FooterMultiColumnProps) {
  const { logo, tagline, sections, social, copyright } = content;

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Tagline */}
          <div>
            <div className="mb-4 text-2xl font-bold">{logo}</div>
            {tagline && <p className="text-sm text-muted-foreground">{tagline}</p>}
            {/* Social Links */}
            {social && (
              <div className="mt-4 flex gap-4">
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
            )}
          </div>

          {/* Link Sections */}
          {sections && sections.length > 0 && sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">{section.title}</h3>
              <ul className="space-y-2">
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
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
}

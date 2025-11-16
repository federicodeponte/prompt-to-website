// ABOUTME: Grid layout for logo cloud - simple, clean display of partner/client logos
// ABOUTME: Production-quality with Framer Motion animations and theme integration

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LogoCloudContentGrid } from '@/lib/types/block-content';

interface LogoCloudGridProps {
  content: LogoCloudContentGrid;
}

/**
 * Grid-based logo cloud for showcasing partners, clients, or integrations
 * Features: Responsive grid, hover effects, grayscale filter with color on hover
 */
export function LogoCloudGrid({ content }: LogoCloudGridProps) {
  const { heading, subheading, logos, columns = 4 } = content;

  const columnClasses = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
  };

  return (
    <div className="space-y-12">
      {/* Header (optional) */}
      {(heading || subheading) && (
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {subheading && (
            <p className="font-theme-body mb-4 text-sm font-semibold uppercase tracking-wide text-theme-primary">
              {subheading}
            </p>
          )}
          {heading && (
            <h2 className="font-theme-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {heading}
            </h2>
          )}
        </motion.div>
      )}

      {/* Logo Grid */}
      <div className={`grid gap-8 ${columnClasses[columns]}`}>
        {logos.map((logo, index) => {
          const LogoWrapper = logo.link ? 'a' : 'div';
          const wrapperProps = logo.link
            ? { href: logo.link, target: '_blank', rel: 'noopener noreferrer' }
            : {};

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <LogoWrapper
                {...wrapperProps}
                className="flex h-24 items-center justify-center rounded-lg border-2 border-theme-border bg-background p-6 transition-all duration-300 hover:border-theme-primary/20 hover:shadow-lg group"
              >
                <div className="relative h-full w-full grayscale transition-all duration-300 group-hover:grayscale-0">
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </LogoWrapper>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

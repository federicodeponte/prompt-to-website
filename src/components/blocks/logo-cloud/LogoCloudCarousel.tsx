// ABOUTME: Infinite scrolling carousel for logo cloud - auto-scrolling partner/client logos
// ABOUTME: Production-quality with smooth infinite scroll animation

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LogoCloudContentCarousel } from '@/lib/types/block-content';

interface LogoCloudCarouselProps {
  content: LogoCloudContentCarousel;
}

/**
 * Infinite scrolling carousel for logos
 * Features: Auto-scroll, seamless loop, pause on hover
 */
export function LogoCloudCarousel({ content }: LogoCloudCarouselProps) {
  const { heading, subheading, logos, autoplay = true, speed = 30 } = content;
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="space-y-12 overflow-hidden">
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

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling logos */}
        <motion.div
          className="flex gap-12"
          animate={
            autoplay && !isHovered
              ? {
                  x: ['0%', '-50%'],
                }
              : {}
          }
          transition={
            autoplay && !isHovered
              ? {
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: speed,
                    ease: 'linear',
                  },
                }
              : {}
          }
          onMouseEnter={() => autoplay && setIsHovered(true)}
          onMouseLeave={() => autoplay && setIsHovered(false)}
        >
          {duplicatedLogos.map((logo, index) => {
            const LogoWrapper = logo.link ? 'a' : 'div';
            const wrapperProps = logo.link
              ? { href: logo.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <LogoWrapper
                key={index}
                {...wrapperProps}
                className="flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-lg border-2 border-theme-border bg-background p-4 transition-all duration-300 hover:border-theme-primary/20 hover:shadow-lg group"
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
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

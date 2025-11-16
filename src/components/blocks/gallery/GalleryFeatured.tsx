// ABOUTME: Featured gallery with large hero image and thumbnail navigation
// ABOUTME: Production-quality for showcasing featured work or products

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryContentFeatured } from '@/lib/types/block-content';

interface GalleryFeaturedProps {
  content: GalleryContentFeatured;
}

/**
 * Featured gallery with large image + thumbnails
 * Features: Image switching, smooth transitions, responsive layout
 */
export function GalleryFeatured({ content }: GalleryFeaturedProps) {
  const { heading, subheading, images, featured: initialFeatured = 0 } = content;
  const [selectedIndex, setSelectedIndex] = useState(initialFeatured);

  const selectedImage = images[selectedIndex];

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

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main Featured Image */}
        <div className="lg:col-span-9">
          <motion.div
            className="relative aspect-video overflow-hidden rounded-theme-card border-2 border-theme-border bg-muted shadow-theme-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full"
              >
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Image Info Overlay */}
            {(selectedImage.title || selectedImage.description) && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {selectedImage.title && (
                  <h3 className="font-theme-heading text-2xl font-bold text-white mb-2">
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.description && (
                  <p className="font-theme-body text-base text-white/90">
                    {selectedImage.description}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Thumbnail Sidebar */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-video overflow-hidden rounded-theme-card border-2 transition-all duration-300 ${
                  selectedIndex === index
                    ? 'border-theme-primary shadow-lg scale-105'
                    : 'border-theme-border hover:border-theme-primary/50 hover:scale-102'
                }`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: selectedIndex === index ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Selected indicator */}
                {selectedIndex === index && (
                  <div className="absolute inset-0 bg-theme-primary/20" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

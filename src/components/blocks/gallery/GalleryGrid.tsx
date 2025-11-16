// ABOUTME: Masonry-style gallery grid with lightbox modal for image viewing
// ABOUTME: Production-quality with Framer Motion animations and responsive design

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryContentGrid } from '@/lib/types/block-content';
import { Button } from '@/components/ui/button';

interface GalleryGridProps {
  content: GalleryContentGrid;
}

/**
 * Responsive gallery grid with lightbox
 * Features: Masonry layout, image zoom, keyboard navigation
 */
export function GalleryGrid({ content }: GalleryGridProps) {
  const { heading, subheading, images, columns = 3, lightbox = true } = content;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
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

        {/* Gallery Grid */}
        <div className={`grid gap-6 ${columnClasses[columns]}`}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-theme-card border-2 border-theme-border bg-muted"
              onClick={() => lightbox && setSelectedImage(index)}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={image.image}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                unoptimized
              />
              {/* Overlay with title/description */}
              {(image.title || image.description) && (
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {image.title && (
                    <h3 className="font-theme-heading text-lg font-bold text-white mb-1">
                      {image.title}
                    </h3>
                  )}
                  {image.description && (
                    <p className="font-theme-body text-sm text-white/90">
                      {image.description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Previous Button */}
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {/* Image */}
            <motion.div
              className="relative max-h-[90vh] max-w-[90vw]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage].image}
                alt={images[selectedImage].alt}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto rounded-lg object-contain"
                unoptimized
              />
              {/* Image info */}
              {(images[selectedImage].title || images[selectedImage].description) && (
                <div className="mt-4 text-center text-white">
                  {images[selectedImage].title && (
                    <h3 className="font-theme-heading text-xl font-bold mb-2">
                      {images[selectedImage].title}
                    </h3>
                  )}
                  {images[selectedImage].description && (
                    <p className="font-theme-body text-sm text-white/80">
                      {images[selectedImage].description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Next Button */}
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

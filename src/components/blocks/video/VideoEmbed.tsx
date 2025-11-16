// ABOUTME: Video embed block for YouTube/Vimeo videos
// ABOUTME: Production-quality with responsive iframe and poster support

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { VideoContentEmbed } from '@/lib/types/block-content';
import Image from 'next/image';
import { getEmbedUrl, getVideoThumbnail } from '@/lib/utils/video-utils';

interface VideoEmbedProps {
  content: VideoContentEmbed;
}

/**
 * Video embed block with responsive iframe
 * Features: YouTube/Vimeo support, poster image, play button overlay
 */
export function VideoEmbed({ content }: VideoEmbedProps) {
  const { heading, description, videoUrl, poster, autoplay: autoplayDefault = false } = content;
  const [isPlaying, setIsPlaying] = useState(autoplayDefault);

  const embedUrl = getEmbedUrl(videoUrl, isPlaying);
  const posterImage = poster || getVideoThumbnail(videoUrl, 'maxres');

  return (
    <div className="space-y-8">
      {/* Header (optional) */}
      {(heading || description) && (
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {heading && (
            <h2 className="font-theme-heading mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="font-theme-body text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </motion.div>
      )}

      {/* Video Container */}
      <motion.div
        className="relative mx-auto max-w-5xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative aspect-video overflow-hidden rounded-theme-card border-2 border-theme-border bg-black shadow-theme-card">
          {isPlaying ? (
            /* Video iframe */
            <iframe
              src={embedUrl}
              title={heading || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            /* Poster with play button */
            <button
              onClick={() => setIsPlaying(true)}
              className="group relative h-full w-full"
            >
              {posterImage && (
                <Image
                  src={posterImage}
                  alt={heading || 'Video thumbnail'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/50" />

              {/* Play Button */}
              <motion.div
                className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-theme-primary shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-theme-primary/90"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-10 w-10 translate-x-0.5 text-white" fill="white" />
              </motion.div>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

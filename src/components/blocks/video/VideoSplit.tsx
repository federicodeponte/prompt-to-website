// ABOUTME: Split layout with video on one side and content on the other
// ABOUTME: Production-quality for product demos and explainer videos

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Check } from 'lucide-react';
import { VideoContentSplit } from '@/lib/types/block-content';
import { getEmbedUrl, getVideoThumbnail } from '@/lib/utils/video-utils';

interface VideoSplitProps {
  content: VideoContentSplit;
}

/**
 * Split layout with video and content side-by-side
 * Features: Responsive layout, feature list, play button overlay
 */
export function VideoSplit({ content }: VideoSplitProps) {
  const { heading, description, videoUrl, videoPosition = 'left', features } = content;
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = getEmbedUrl(videoUrl, isPlaying);
  const posterImage = getVideoThumbnail(videoUrl, 'maxres');

  const videoSection = (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: videoPosition === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative aspect-video overflow-hidden rounded-theme-card border-2 border-theme-border bg-black shadow-theme-card">
        {isPlaying ? (
          /* Video iframe */
          <iframe
            src={embedUrl}
            title={heading}
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
                alt="Video thumbnail"
                fill
                className="object-cover"
                unoptimized
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/50" />

            {/* Play Button */}
            <motion.div
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-theme-primary shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-theme-primary/90"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-8 w-8 translate-x-0.5 text-white" fill="white" />
            </motion.div>
          </button>
        )}
      </div>
    </motion.div>
  );

  const contentSection = (
    <motion.div
      className="flex flex-col justify-center"
      initial={{ opacity: 0, x: videoPosition === 'left' ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="font-theme-heading mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      <p className="font-theme-body mb-8 text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Features list (optional) */}
      {features && features.length > 0 && (
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-theme-primary/10">
                  <Check className="h-4 w-4 text-theme-primary" />
                </div>
              </div>
              <span className="font-theme-body text-muted-foreground">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );

  return (
    <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center`}>
      {videoPosition === 'left' ? (
        <>
          <div>{videoSection}</div>
          <div>{contentSection}</div>
        </>
      ) : (
        <>
          <div className="lg:order-2">{videoSection}</div>
          <div className="lg:order-1">{contentSection}</div>
        </>
      )}
    </div>
  );
}

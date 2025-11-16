// ABOUTME: Clean team grid with professional avatar styling
// ABOUTME: Production-quality design matching shadcn/ui aesthetic

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TeamContentGrid } from '@/lib/types/block-content';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

interface TeamGridProps {
  content: TeamContentGrid;
}

/**
 * Clean team grid with shadcn/ui design
 * Design principles: Professional typography, subtle animations, clean avatars
 */
export function TeamGrid({ content }: TeamGridProps) {
  const { heading, subheading, members, columns = 3 } = content;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        {subheading && (
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium">
            {subheading}
          </Badge>
        )}
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
      </motion.div>

      {/* Team Grid */}
      {members && members.length > 0 && (
        <div className={cn('grid gap-6 lg:gap-8', gridColsClass[columns])}>
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <Card className="border shadow-sm">
                <CardContent className="p-6 text-center">
                  {/* Avatar */}
                  <Avatar className="mx-auto mb-4 h-24 w-24">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="bg-muted text-2xl text-muted-foreground">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Name */}
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{member.name}</h3>

                  {/* Role */}
                  <p className="mb-3 text-sm font-medium text-primary">{member.role}</p>

                  {/* Bio */}
                  {member.bio && (
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  )}

                  {/* Social Links */}
                  {member.social && (
                    <div className="flex justify-center gap-3">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`${member.name} on Twitter`}
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`${member.name} on GitHub`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

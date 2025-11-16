// ABOUTME: Split contact block variant with form and image side-by-side
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ContactContentSplit } from '@/lib/types/block-content';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactSplitProps {
  content: ContactContentSplit;
}

export function ContactSplit({ content }: ContactSplitProps) {
  const { heading, description, email, phone, address, image, imageAlt } = content;

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
      {/* Form Side */}
      <div className="space-y-8">
        <div>
          <h2 className="font-theme-heading mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="font-theme-body text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-theme-primary" />
            <a href={`mailto:${email}`} className="hover:text-theme-primary">
              {email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-theme-primary" />
            <a href={`tel:${phone}`} className="hover:text-theme-primary">
              {phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-theme-primary" />
            <p>{address}</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." rows={5} />
          </div>
          <Button type="submit" size="lg">
            Send Message
          </Button>
        </form>
      </div>

      {/* Image Side */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

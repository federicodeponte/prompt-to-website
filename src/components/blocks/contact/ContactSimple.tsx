// ABOUTME: Simple contact block variant with contact info and optional form
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ContactContentSimple } from '@/lib/types/block-content';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactSimpleProps {
  content: ContactContentSimple;
}

export function ContactSimple({ content }: ContactSimpleProps) {
  const { heading, description, email, phone, address, showForm } = content;

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {heading}
        </h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {/* Contact Info */}
      <div className="grid gap-6 sm:grid-cols-3">
        {email && (
          <div className="flex flex-col items-center text-center">
            <Mail className="mb-3 h-8 w-8 text-primary" />
            <div className="font-semibold">Email</div>
            <a href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-foreground">
              {email}
            </a>
          </div>
        )}
        {phone && (
          <div className="flex flex-col items-center text-center">
            <Phone className="mb-3 h-8 w-8 text-primary" />
            <div className="font-semibold">Phone</div>
            <a href={`tel:${phone}`} className="text-sm text-muted-foreground hover:text-foreground">
              {phone}
            </a>
          </div>
        )}
        {address && (
          <div className="flex flex-col items-center text-center">
            <MapPin className="mb-3 h-8 w-8 text-primary" />
            <div className="font-semibold">Address</div>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        )}
      </div>

      {/* Contact Form */}
      {showForm && (
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
      )}
    </div>
  );
}

// ABOUTME: Clean contact block with professional form styling
// ABOUTME: Production-quality design matching shadcn/ui aesthetic

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ContactContentSimple } from '@/lib/types/block-content';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactSimpleProps {
  content: ContactContentSimple;
}

export function ContactSimple({ content }: ContactSimpleProps) {
  const { heading, description, email, phone, address, showForm } = content;

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
      </motion.div>

      {/* Contact Info */}
      <div className="grid gap-6 sm:grid-cols-3">
        {email && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-2 font-semibold text-foreground">Email</div>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {email}
                </a>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {phone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <Card className="border shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-2 font-semibold text-foreground">Phone</div>
                <a
                  href={`tel:${phone}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {phone}
                </a>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {address && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-2 font-semibold text-foreground">Address</div>
                <p className="text-sm text-muted-foreground">{address}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Contact Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card className="border shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name
                    </Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message
                  </Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

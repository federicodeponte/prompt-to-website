// ABOUTME: Accordion-style FAQ block variant with collapsible questions
// ABOUTME: Follows Single Responsibility Principle

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQContentAccordion } from '@/lib/types/block-content';

interface FAQAccordionProps {
  content: FAQContentAccordion;
}

/**
 * FAQ section with accordion-style collapsible questions
 * Clean, space-efficient layout for common questions
 */
export function FAQAccordion({ content }: FAQAccordionProps) {
  const { heading, subheading, faqs } = content;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
          {subheading}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {heading}
        </h2>
      </div>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

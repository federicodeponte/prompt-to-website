// ABOUTME: Global command palette (⌘K) for template search and navigation
// ABOUTME: Showcases shadcn Command component - the signature interactive component

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { templates } from '@/lib/templates';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (templateId: string) => {
    setOpen(false);

    // Navigate to template section
    const templatesSection = document.getElementById('templates');
    if (templatesSection) {
      templatesSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Highlight the specific template card after scroll
    setTimeout(() => {
      const templateCard = document.querySelector(`[data-template-id="${templateId}"]`);
      if (templateCard) {
        templateCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add temporary highlight effect
        templateCard.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
        setTimeout(() => {
          templateCard.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
        }, 2000);
      }
    }, 500);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search templates..." />
      <CommandList>
        <CommandEmpty>No templates found.</CommandEmpty>
        <CommandGroup heading="Templates">
          {templates.map((template) => (
            <CommandItem
              key={template.id}
              value={`${template.name} ${template.category} ${template.description}`}
              onSelect={() => handleSelect(template.id)}
            >
              <span className="mr-2 text-lg">
                {template.category === 'business' && '💼'}
                {template.category === 'product' && '📦'}
                {template.category === 'personal' && '👤'}
              </span>
              <div className="flex flex-col">
                <span className="font-medium">{template.name}</span>
                <span className="text-sm text-muted-foreground">{template.description}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => { setOpen(false); router.push('/editor/demo'); }}>
            <span className="mr-2">🚀</span>
            Try Demo
          </CommandItem>
          <CommandItem onSelect={() => { setOpen(false); window.location.hash = '#templates'; }}>
            <span className="mr-2">📋</span>
            View All Templates
          </CommandItem>
          <CommandItem onSelect={() => { setOpen(false); window.location.hash = '#features'; }}>
            <span className="mr-2">✨</span>
            See Features
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

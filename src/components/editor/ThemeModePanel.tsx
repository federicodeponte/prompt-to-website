// ABOUTME: Theme mode panel for visual customization of design tokens
// ABOUTME: Provides color pickers, spacing controls, radius/shadow settings with presets and validation

'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WebsiteConfig, WebsiteTheme } from '@/lib/types/website-config';
import { Separator } from '@/components/ui/separator';
import { Palette, Ruler, Shapes, Sparkles, RotateCcw, Wand2 } from 'lucide-react';
import { themePresets, getPresetById } from '@/lib/theme/presets';
import { defaultTheme } from '@/lib/theme/defaults';
import { isValidColor, getColorError } from '@/lib/utils/color-validation';

interface ThemeModePanelProps {
  config: WebsiteConfig;
  onConfigUpdate: (newConfig: WebsiteConfig) => void;
}

/**
 * ThemeModePanel provides a visual interface for theme customization
 *
 * Architecture:
 * - Color section: All theme colors with HTML5 color pickers
 * - Font section: Heading and body font selectors
 * - Spacing section: Section padding and container width
 * - Radius section: Button, card, and input border radius
 * - Shadow section: Card and button shadows
 *
 * Principles:
 * - Single Responsibility: Theme configuration only
 * - Immediate feedback: Updates config on every change
 * - DRY: Reusable field components
 */
export function ThemeModePanel({ config, onConfigUpdate }: ThemeModePanelProps) {
  const theme = config.theme;
  const [colorErrors, setColorErrors] = useState<Record<string, string | null>>({});

  /**
   * Update a single theme property
   */
  const updateTheme = (updates: Partial<WebsiteTheme>) => {
    const newConfig: WebsiteConfig = {
      ...config,
      theme: {
        ...theme,
        ...updates,
        colors: {
          ...theme.colors,
          ...(updates.colors || {}),
        },
        fonts: {
          ...theme.fonts,
          ...(updates.fonts || {}),
        },
        spacing: updates.spacing || theme.spacing,
        radius: updates.radius || theme.radius,
        shadows: updates.shadows || theme.shadows,
      },
    };
    onConfigUpdate(newConfig);
  };

  /**
   * Apply a theme preset
   */
  const applyPreset = (presetId: string) => {
    const preset = getPresetById(presetId);
    if (preset) {
      const newConfig: WebsiteConfig = {
        ...config,
        theme: preset.theme,
      };
      onConfigUpdate(newConfig);
      setColorErrors({});
    }
  };

  /**
   * Reset to default theme
   */
  const resetToDefault = () => {
    const newConfig: WebsiteConfig = {
      ...config,
      theme: defaultTheme,
    };
    onConfigUpdate(newConfig);
    setColorErrors({});
  };

  /**
   * Reusable color field component with validation
   */
  const ColorField = ({ label, value, onChange, fieldKey }: { label: string; value: string; onChange: (value: string) => void; fieldKey: string }) => {
    const error = colorErrors[fieldKey];
    const isValid = isValidColor(value);

    const handleChange = (newValue: string) => {
      onChange(newValue);
      const errorMsg = getColorError(newValue);
      setColorErrors(prev => ({ ...prev, [fieldKey]: errorMsg }));
    };

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={isValid ? value : '#000000'}
            onChange={(e) => handleChange(e.target.value)}
            className="h-10 w-16 cursor-pointer rounded-theme-input"
          />
          <Input
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className={`flex-1 font-mono text-sm rounded-theme-input ${error ? 'border-red-500' : ''}`}
            placeholder="#000000"
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  };

  /**
   * Reusable text field component
   */
  const TextField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-theme-input"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Theme Presets & Reset */}
        <Card className="rounded-theme-card shadow-theme-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              Quick Themes
            </CardTitle>
            <CardDescription>
              Apply a pre-designed theme or reset to default
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Choose a Preset</Label>
              <Select onValueChange={applyPreset}>
                <SelectTrigger className="rounded-theme-input">
                  <SelectValue placeholder="Select a theme preset" />
                </SelectTrigger>
                <SelectContent>
                  {themePresets.map((preset) => (
                    <SelectItem key={preset.id} value={preset.id}>
                      {preset.name} - {preset.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={resetToDefault}
              variant="outline"
              className="w-full rounded-theme-button"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
          </CardContent>
        </Card>

        {/* Colors Section */}
        <Card className="rounded-theme-card shadow-theme-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Colors
            </CardTitle>
            <CardDescription>
              Customize your website's color palette
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ColorField
              label="Primary"
              fieldKey="primary"
              value={theme.colors.primary}
              onChange={(value) => updateTheme({ colors: { ...theme.colors, primary: value } })}
            />
            <ColorField
              label="Secondary"
              fieldKey="secondary"
              value={theme.colors.secondary}
              onChange={(value) => updateTheme({ colors: { ...theme.colors, secondary: value } })}
            />
            <ColorField
              label="Accent"
              fieldKey="accent"
              value={theme.colors.accent || '#8B5CF6'}
              onChange={(value) => updateTheme({ colors: { ...theme.colors, accent: value } })}
            />
            <Separator />
            <ColorField
              label="Background"
              fieldKey="background"
              value={theme.colors.background}
              onChange={(value) => updateTheme({ colors: { ...theme.colors, background: value } })}
            />
            <ColorField
              label="Text"
              fieldKey="text"
              value={theme.colors.text}
              onChange={(value) => updateTheme({ colors: { ...theme.colors, text: value } })}
            />
            <ColorField
              label="Muted"
              fieldKey="muted"
              value={theme.colors.muted}
              onChange={(value) => updateTheme({ colors: { ...theme.colors, muted: value } })}
            />
            <ColorField
              label="Border"
              fieldKey="border"
              value={theme.colors.border || 'hsl(214.3 31.8% 91.4%)'}
              onChange={(value) => updateTheme({ colors: { ...theme.colors, border: value } })}
            />
          </CardContent>
        </Card>

        {/* Fonts Section */}
        <Card className="rounded-theme-card shadow-theme-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Typography
            </CardTitle>
            <CardDescription>
              Choose fonts for headings and body text
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Heading Font</Label>
              <Select
                value={theme.fonts.heading}
                onValueChange={(value) => updateTheme({ fonts: { ...theme.fonts, heading: value } })}
              >
                <SelectTrigger className="rounded-theme-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter, system-ui, sans-serif">Inter</SelectItem>
                  <SelectItem value="Poppins, system-ui, sans-serif">Poppins</SelectItem>
                  <SelectItem value="Roboto, system-ui, sans-serif">Roboto</SelectItem>
                  <SelectItem value="Montserrat, system-ui, sans-serif">Montserrat</SelectItem>
                  <SelectItem value="Playfair Display, serif">Playfair Display</SelectItem>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="system-ui, sans-serif">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Body Font</Label>
              <Select
                value={theme.fonts.body}
                onValueChange={(value) => updateTheme({ fonts: { ...theme.fonts, body: value } })}
              >
                <SelectTrigger className="rounded-theme-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter, system-ui, sans-serif">Inter</SelectItem>
                  <SelectItem value="Poppins, system-ui, sans-serif">Poppins</SelectItem>
                  <SelectItem value="Roboto, system-ui, sans-serif">Roboto</SelectItem>
                  <SelectItem value="Open Sans, system-ui, sans-serif">Open Sans</SelectItem>
                  <SelectItem value="Lato, system-ui, sans-serif">Lato</SelectItem>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="system-ui, sans-serif">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Spacing Section */}
        <Card className="rounded-theme-card shadow-theme-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-primary" />
              Spacing
            </CardTitle>
            <CardDescription>
              Control section padding and container width
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField
              label="Section Padding"
              value={theme.spacing?.section || '6rem'}
              onChange={(value) => updateTheme({ spacing: { ...theme.spacing, section: value, container: theme.spacing?.container || '1280px' } })}
              placeholder="6rem"
            />
            <TextField
              label="Container Max Width"
              value={theme.spacing?.container || '1280px'}
              onChange={(value) => updateTheme({ spacing: { ...theme.spacing, section: theme.spacing?.section || '6rem', container: value } })}
              placeholder="1280px"
            />
          </CardContent>
        </Card>

        {/* Radius Section */}
        <Card className="rounded-theme-card shadow-theme-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shapes className="h-5 w-5 text-primary" />
              Border Radius
            </CardTitle>
            <CardDescription>
              Adjust roundness of buttons, cards, and inputs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField
              label="Button Radius"
              value={theme.radius?.button || '0.5rem'}
              onChange={(value) => updateTheme({ radius: { ...theme.radius, button: value, card: theme.radius?.card || '1rem', input: theme.radius?.input || '0.5rem' } })}
              placeholder="0.5rem"
            />
            <TextField
              label="Card Radius"
              value={theme.radius?.card || '1rem'}
              onChange={(value) => updateTheme({ radius: { ...theme.radius, button: theme.radius?.button || '0.5rem', card: value, input: theme.radius?.input || '0.5rem' } })}
              placeholder="1rem"
            />
            <TextField
              label="Input Radius"
              value={theme.radius?.input || '0.5rem'}
              onChange={(value) => updateTheme({ radius: { ...theme.radius, button: theme.radius?.button || '0.5rem', card: theme.radius?.card || '1rem', input: value } })}
              placeholder="0.5rem"
            />
          </CardContent>
        </Card>

        {/* Shadows Section */}
        <Card className="rounded-theme-card shadow-theme-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Shadows
            </CardTitle>
            <CardDescription>
              Customize shadow effects for depth
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField
              label="Card Shadow"
              value={theme.shadows?.card || '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'}
              onChange={(value) => updateTheme({ shadows: { ...theme.shadows, card: value, button: theme.shadows?.button || '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' } })}
              placeholder="CSS box-shadow value"
            />
            <TextField
              label="Button Shadow"
              value={theme.shadows?.button || '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
              onChange={(value) => updateTheme({ shadows: { ...theme.shadows, card: theme.shadows?.card || '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', button: value } })}
              placeholder="CSS box-shadow value"
            />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

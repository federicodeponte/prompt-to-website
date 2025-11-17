// ABOUTME: Export modal with multiple format options (JSON, HTML, Share, QR)
// ABOUTME: Provides visual selection of export formats with previews

'use client';

import { useState } from 'react';
import { Website } from '@/lib/types/website-config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileJson, Code, Share2, QrCode, Copy, Download, Check } from 'lucide-react';
import { toast } from 'sonner';
import {
  exportAsJSON,
  downloadHTML,
  generateShareableLink,
  copyToClipboard,
  generateQRCodeURL,
} from '@/lib/utils/export-utils';

interface ExportModalProps {
  website: Website;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ website, open, onOpenChange }: ExportModalProps) {
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrCodeURL, setQRCodeURL] = useState('');

  /**
   * Generate shareable link when Share tab is activated
   */
  const handleGenerateLink = () => {
    const link = generateShareableLink(website.config);
    setShareLink(link);
    const qrURL = generateQRCodeURL(link);
    setQRCodeURL(qrURL);
  };

  /**
   * Copy link to clipboard
   */
  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareLink);
    if (success) {
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy link');
    }
  };

  /**
   * Handle JSON export
   */
  const handleExportJSON = () => {
    exportAsJSON(website);
    toast.success('JSON downloaded', {
      description: `${website.label}.json has been saved`,
    });
  };

  /**
   * Handle HTML export
   */
  const handleExportHTML = () => {
    downloadHTML(website);
    toast.success('HTML downloaded', {
      description: `${website.label}.html has been saved`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export "{website.label}"</DialogTitle>
          <DialogDescription>
            Choose how you'd like to export or share your website configuration
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="json" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="json" className="flex items-center gap-2">
              <FileJson className="h-4 w-4" />
              <span className="hidden sm:inline">JSON</span>
            </TabsTrigger>
            <TabsTrigger value="html" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">HTML</span>
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center gap-2" onClick={handleGenerateLink}>
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center gap-2" onClick={handleGenerateLink}>
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">QR Code</span>
            </TabsTrigger>
          </TabsList>

          {/* JSON Export */}
          <TabsContent value="json" className="space-y-4 mt-6">
            <div className="rounded-lg border p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                  <FileJson className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">JSON Configuration</h3>
                  <p className="text-sm text-muted-foreground">
                    Download the raw configuration file. Perfect for:
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4 list-disc">
                    <li>Backup and version control</li>
                    <li>Importing into other projects</li>
                    <li>Programmatic website generation</li>
                  </ul>
                </div>
              </div>
              <Button onClick={handleExportJSON} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
            </div>
          </TabsContent>

          {/* HTML Export */}
          <TabsContent value="html" className="space-y-4 mt-6">
            <div className="rounded-lg border p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                  <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Static HTML</h3>
                  <p className="text-sm text-muted-foreground">
                    Download a basic HTML file with inline CSS. Includes:
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4 list-disc">
                    <li>Hero and features sections</li>
                    <li>Responsive design</li>
                    <li>Basic styling from your theme</li>
                    <li>No dependencies or build step required</li>
                  </ul>
                </div>
              </div>
              <Button onClick={handleExportHTML} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download HTML
              </Button>
            </div>
          </TabsContent>

          {/* Share Link */}
          <TabsContent value="share" className="space-y-4 mt-6">
            <div className="rounded-lg border p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
                  <Share2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Shareable Preview Link</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your website with others via a unique URL
                  </p>
                </div>
              </div>

              {shareLink && (
                <div className="space-y-2">
                  <Label htmlFor="share-link">Preview URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="share-link"
                      value={shareLink}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Anyone with this link can preview your website configuration
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* QR Code */}
          <TabsContent value="qr" className="space-y-4 mt-6">
            <div className="rounded-lg border p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-orange-100 dark:bg-orange-900 p-3">
                  <QrCode className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">QR Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Scan with your phone to preview the website on mobile
                  </p>
                </div>
              </div>

              {qrCodeURL && (
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <img src={qrCodeURL} alt="QR Code" className="w-64 h-64" />
                  </div>
                  <p className="text-xs text-center text-muted-foreground max-w-xs">
                    Scan this QR code with your mobile device to open the preview link
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// ABOUTME: User dashboard for managing saved websites
// ABOUTME: Displays all saved projects with CRUD operations and export options

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWebsites, useDeleteWebsite, useCreateWebsite } from '@/lib/hooks/use-websites';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  MoreVertical,
  Trash2,
  Copy,
  ExternalLink,
  Sparkles,
  Code,
  Palette,
  Calendar,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Website } from '@/lib/types/website-config';
import { templates } from '@/lib/templates';
import { ExportModal } from '@/components/export/ExportModal';
import { Navigation } from '@/components/layout/Navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data: websites, isLoading } = useWebsites();
  const { mutate: deleteWebsite, isPending: isDeleting } = useDeleteWebsite();
  const { mutate: createWebsite, isPending: isCreating } = useCreateWebsite();

  // Auth guard - redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [websiteToDelete, setWebsiteToDelete] = useState<Website | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [websiteToExport, setWebsiteToExport] = useState<Website | null>(null);

  /**
   * Handle project deletion with confirmation
   */
  const handleDelete = (website: Website) => {
    setWebsiteToDelete(website);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!websiteToDelete) return;

    deleteWebsite(websiteToDelete.id, {
      onSuccess: () => {
        toast.success('Project deleted', {
          description: `"${websiteToDelete.label}" has been removed.`,
        });
        setDeleteDialogOpen(false);
        setWebsiteToDelete(null);
      },
      onError: (error) => {
        toast.error('Failed to delete project', {
          description: error instanceof Error ? error.message : 'Please try again.',
        });
      },
    });
  };

  /**
   * Duplicate a project
   */
  const handleDuplicate = (website: Website) => {
    createWebsite(
      {
        label: `${website.label} (Copy)`,
        config: website.config,
      },
      {
        onSuccess: (newWebsite) => {
          toast.success('Project duplicated', {
            description: 'Opening the copy in the editor...',
          });
          router.push(`/editor/${newWebsite.id}`);
        },
        onError: (error) => {
          toast.error('Failed to duplicate project', {
            description: error instanceof Error ? error.message : 'Please try again.',
          });
        },
      }
    );
  };

  /**
   * Open export modal for selected project
   */
  const handleExport = (website: Website) => {
    setWebsiteToExport(website);
    setExportModalOpen(true);
  };

  /**
   * Get template category icon and color
   */
  const getTemplateInfo = (templateType: string) => {
    const template = templates.find((t) => t.id === templateType);
    if (!template) return { icon: '📄', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' };

    const iconMap: Record<string, string> = {
      business: '💼',
      product: '📦',
      personal: '👤',
    };

    const colorMap: Record<string, string> = {
      business: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      product: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      personal: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };

    return {
      icon: iconMap[template.category] || '📄',
      color: colorMap[template.category] || 'bg-gray-100 text-gray-800',
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <Navigation />

      {/* Page Header */}
      <div className="border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
              <p className="text-muted-foreground mt-1">
                Manage your website configurations and export them for deployment
              </p>
            </div>
            <Button onClick={() => router.push('/editor/demo')} size="lg">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !websites || websites.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">No Projects Yet</CardTitle>
              <CardDescription className="text-base">
                Start building your first website with AI or choose from our professional templates
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button size="lg" className="w-full" onClick={() => router.push('/editor/demo')}>
                <Sparkles className="mr-2 h-4 w-4" />
                Create with AI
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => router.push('/#templates')}>
                <Palette className="mr-2 h-4 w-4" />
                Browse Templates
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {websites.map((website) => {
              const templateInfo = getTemplateInfo(website.config.template);
              const blockCount = website.config.blocks?.length || 0;

              return (
                <Card
                  key={website.id}
                  className="group flex flex-col hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => router.push(`/editor/${website.id}`)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-2xl flex-shrink-0">{templateInfo.icon}</span>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{website.label}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className={templateInfo.color}>
                              {website.config.template}
                            </Badge>
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/editor/${website.id}`); }}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open in Editor
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDuplicate(website); }}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleExport(website); }}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Export & Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => { e.stopPropagation(); handleDelete(website); }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="space-y-3">
                      {/* Preview placeholder */}
                      <div className="aspect-video rounded-lg border-2 bg-gradient-to-br from-muted via-background to-muted/50 p-3 flex flex-col gap-2">
                        <div className="h-2 w-2/3 rounded bg-primary/20" />
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div className="rounded bg-muted/50" />
                          <div className="rounded bg-accent/30" />
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Code className="h-3 w-3" />
                          <span>{blockCount} blocks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(website.updated_at), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4">
                    <Button className="w-full" variant="outline" onClick={(e) => { e.stopPropagation(); router.push(`/editor/${website.id}`); }}>
                      Open Project
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{websiteToDelete?.label}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Export Modal */}
      {websiteToExport && (
        <ExportModal
          website={websiteToExport}
          open={exportModalOpen}
          onOpenChange={setExportModalOpen}
        />
      )}
    </div>
  );
}

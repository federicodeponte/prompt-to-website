// ABOUTME: Email confirmation page - handles email verification after signup
// ABOUTME: Shows success/error state and redirects to login

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

type VerificationStatus = 'loading' | 'success' | 'error';

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const supabase = createClient();

        // Check if user has confirmed their email
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session?.user?.email_confirmed_at) {
          setStatus('success');
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } else {
          // Still waiting for confirmation
          setStatus('error');
          setErrorMessage('Email not yet confirmed. Please check your inbox and click the confirmation link.');
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Verification failed');
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
            </div>
            <CardTitle className="text-2xl">Verifying Email...</CardTitle>
            <CardDescription className="text-base">
              Please wait while we confirm your email address
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-destructive-foreground" />
            </div>
            <CardTitle className="text-2xl">Verification Failed</CardTitle>
            <CardDescription className="text-base">
              {errorMessage || 'We could not verify your email address'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Please try the following:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Check that you clicked the correct link</li>
                <li>Make sure the link hasn&apos;t expired</li>
                <li>Request a new confirmation email</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Link href="/signup" className="w-full">
              <Button variant="default" className="w-full">
                Try Again
              </Button>
            </Link>
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Email Verified!</CardTitle>
          <CardDescription className="text-base">
            Your email has been successfully confirmed
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            <p>Redirecting you to your dashboard...</p>
          </div>
        </CardContent>

        <CardFooter>
          <Link href="/dashboard" className="w-full">
            <Button className="w-full">
              Go to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
          </div>
          <CardTitle className="text-2xl">Loading...</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

// Main export with Suspense boundary
export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmEmailContent />
    </Suspense>
  );
}

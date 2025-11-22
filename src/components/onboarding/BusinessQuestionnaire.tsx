// ABOUTME: Business questionnaire component for AI content generation
// ABOUTME: Collects 5 key questions to generate personalized website content

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { BusinessProfile, AVAILABLE_INDUSTRIES, Industry } from '@/lib/ai/content-generator';

interface BusinessQuestionnaireProps {
  onComplete: (profile: BusinessProfile) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function BusinessQuestionnaire({
  onComplete,
  onCancel,
  isLoading = false,
}: BusinessQuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<BusinessProfile>>({
    tone: 'professional',
  });

  const totalSteps = 5;

  const updateProfile = (field: keyof BusinessProfile, value: string | undefined) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return profile.businessName && profile.businessName.length > 0;
      case 2:
        return profile.industry && profile.industry.length > 0;
      case 3:
        return profile.description && profile.description.length >= 20;
      case 4:
        return profile.targetAudience && profile.targetAudience.length > 0;
      case 5:
        return profile.uniqueValue && profile.uniqueValue.length >= 10;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(profile as BusinessProfile);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (onCancel) {
      onCancel();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>AI Website Generator</CardTitle>
        </div>
        <CardDescription>
          Answer 5 quick questions and we'll generate a complete website for your business
        </CardDescription>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Business Name */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-5 duration-300">
            <div>
              <Label htmlFor="businessName" className="text-lg font-semibold">
                What's your business name? *
              </Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                This will be displayed prominently on your website
              </p>
              <Input
                id="businessName"
                placeholder="e.g., Acme Coffee Co."
                value={profile.businessName || ''}
                onChange={(e) => updateProfile('businessName', e.target.value)}
                className="text-lg"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Step 2: Industry */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-5 duration-300">
            <div>
              <Label htmlFor="industry" className="text-lg font-semibold">
                What industry are you in? *
              </Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                We'll customize content for your specific industry
              </p>
              <Select
                value={profile.industry}
                onValueChange={(value) => updateProfile('industry', value)}
              >
                <SelectTrigger id="industry" className="text-lg">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Description */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-5 duration-300">
            <div>
              <Label htmlFor="description" className="text-lg font-semibold">
                Describe your business in 1-2 sentences *
              </Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                What does your business do? Keep it simple and clear.
              </p>
              <Textarea
                id="description"
                placeholder="e.g., We roast small-batch artisan coffee beans and serve craft beverages in our downtown café."
                value={profile.description || ''}
                onChange={(e) => updateProfile('description', e.target.value)}
                rows={4}
                className="text-base resize-none"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-2">
                {(profile.description || '').length} / 20 characters minimum
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Target Audience */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-5 duration-300">
            <div>
              <Label htmlFor="targetAudience" className="text-lg font-semibold">
                Who is your target audience? *
              </Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Who are you trying to reach with your website?
              </p>
              <Input
                id="targetAudience"
                placeholder="e.g., Coffee enthusiasts, remote workers, and local professionals"
                value={profile.targetAudience || ''}
                onChange={(e) => updateProfile('targetAudience', e.target.value)}
                className="text-base"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Step 5: Unique Value & Tone */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
            <div>
              <Label htmlFor="uniqueValue" className="text-lg font-semibold">
                What makes you different? *
              </Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Why should customers choose you over competitors?
              </p>
              <Textarea
                id="uniqueValue"
                placeholder="e.g., We source beans directly from farmers, roast in-house daily, and create a welcoming community space"
                value={profile.uniqueValue || ''}
                onChange={(e) => updateProfile('uniqueValue', e.target.value)}
                rows={3}
                className="text-base resize-none"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-2">
                {(profile.uniqueValue || '').length} / 10 characters minimum
              </p>
            </div>

            <div>
              <Label htmlFor="tone" className="text-lg font-semibold">
                Website tone (optional)
              </Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Choose the voice that matches your brand
              </p>
              <Select
                value={profile.tone || 'professional'}
                onValueChange={(value) => updateProfile('tone', value as BusinessProfile['tone'])}
              >
                <SelectTrigger id="tone" className="text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional - Formal and credible</SelectItem>
                  <SelectItem value="friendly">Friendly - Warm and approachable</SelectItem>
                  <SelectItem value="bold">Bold - Energetic and confident</SelectItem>
                  <SelectItem value="minimal">Minimal - Clean and understated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>

          <Button
            type="button"
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : step === totalSteps ? (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Website
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

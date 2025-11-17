-- Create websites table for storing user-generated website configurations
-- Includes RLS policies for secure multi-tenant access

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create websites table
CREATE TABLE IF NOT EXISTS public.websites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  label TEXT NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT label_length CHECK (char_length(label) >= 1 AND char_length(label) <= 100)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS websites_user_id_idx ON public.websites(user_id);
CREATE INDEX IF NOT EXISTS websites_created_at_idx ON public.websites(created_at DESC);
CREATE INDEX IF NOT EXISTS websites_updated_at_idx ON public.websites(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Allow users to view only their own websites
CREATE POLICY "Users can view their own websites"
  ON public.websites
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own websites
CREATE POLICY "Users can insert their own websites"
  ON public.websites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own websites
CREATE POLICY "Users can update their own websites"
  ON public.websites
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own websites
CREATE POLICY "Users can delete their own websites"
  ON public.websites
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.websites
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.websites TO authenticated;

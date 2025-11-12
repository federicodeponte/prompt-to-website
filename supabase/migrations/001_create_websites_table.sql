-- Create websites table for storing user-generated website configurations
CREATE TABLE IF NOT EXISTS websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  config JSONB NOT NULL,
  prompt_history TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX idx_websites_user_id ON websites(user_id);

-- Create index on created_at for sorting
CREATE INDEX idx_websites_created_at ON websites(created_at DESC);

-- Enable Row Level Security
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can read their own websites
CREATE POLICY "Users can read own websites"
  ON websites
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own websites
CREATE POLICY "Users can insert own websites"
  ON websites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own websites
CREATE POLICY "Users can update own websites"
  ON websites
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own websites
CREATE POLICY "Users can delete own websites"
  ON websites
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_websites_updated_at
  BEFORE UPDATE ON websites
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

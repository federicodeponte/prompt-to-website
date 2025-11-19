-- Add is_favorite column to websites table for user favorites
-- Allows users to mark projects as favorites for quick access

-- Add is_favorite column with default value of false
ALTER TABLE public.websites
ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN NOT NULL DEFAULT false;

-- Create index for efficient querying of favorites
CREATE INDEX IF NOT EXISTS websites_is_favorite_idx ON public.websites(user_id, is_favorite, updated_at DESC);

-- Comment for documentation
COMMENT ON COLUMN public.websites.is_favorite IS 'Whether this website is marked as a favorite by the user';

/*
  # Add avatar_url column to profiles table

  1. Changes
    - Add `avatar_url` column to `profiles` table
    - Allow NULL values for backward compatibility
    - Add index for better query performance

  2. Security
    - No changes to RLS policies needed
*/

-- Add avatar_url column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_url text;
  END IF;
END $$;

-- Add index for avatar_url queries
CREATE INDEX IF NOT EXISTS idx_profiles_avatar_url ON profiles(avatar_url);
/*
  # Add bio and avatar_url columns to profiles table

  1. Changes
    - Add `bio` column to profiles table for user biography
    - Add `avatar_url` column to profiles table for profile pictures
    - Update existing profiles to have default avatar URLs

  2. Security
    - No changes to RLS policies needed as existing policies cover new columns
*/

-- Add bio column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'bio'
  ) THEN
    ALTER TABLE profiles ADD COLUMN bio text;
  END IF;
END $$;

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

-- Update existing profiles to have default avatar URLs based on their ID
UPDATE profiles 
SET avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || id::text
WHERE avatar_url IS NULL;
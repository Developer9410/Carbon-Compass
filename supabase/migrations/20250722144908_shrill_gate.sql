/*
  # Add streak tracking to profiles

  1. Changes
    - Add `streak` column to profiles table if it doesn't exist
    - Add `last_activity_date` column to track daily activity
    - Add function to update streak automatically

  2. Security
    - Maintain existing RLS policies
*/

-- Add streak column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'streak'
  ) THEN
    ALTER TABLE profiles ADD COLUMN streak integer DEFAULT 0;
  END IF;
END $$;

-- Add last activity date column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'last_activity_date'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_activity_date date;
  END IF;
END $$;

-- Function to update streak
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
  -- Update streak when points are awarded
  IF TG_TABLE_NAME = 'point_transactions' AND NEW.points > 0 THEN
    UPDATE profiles 
    SET 
      last_activity_date = CURRENT_DATE,
      streak = CASE 
        WHEN last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN streak + 1
        WHEN last_activity_date = CURRENT_DATE THEN streak
        ELSE 1
      END
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for streak updates
DROP TRIGGER IF EXISTS update_streak_trigger ON point_transactions;
CREATE TRIGGER update_streak_trigger
  AFTER INSERT ON point_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_streak();
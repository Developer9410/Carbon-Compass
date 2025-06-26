/*
  # Fix carbon data table structure

  1. Updates
    - Ensure carbon_data table matches the edge function expectations
    - Add proper indexes for performance
    - Update RLS policies

  2. Security
    - Maintain RLS policies for user data access
*/

-- Update carbon_data table to match edge function expectations
DO $$
BEGIN
  -- Check if we need to add missing columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'carbon_data' AND column_name = 'category'
  ) THEN
    ALTER TABLE carbon_data ADD COLUMN category text DEFAULT 'mixed';
    ALTER TABLE carbon_data ADD CONSTRAINT carbon_data_category_check 
    CHECK (category IN ('transport', 'energy', 'diet', 'other', 'mixed'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'carbon_data' AND column_name = 'activity'
  ) THEN
    ALTER TABLE carbon_data ADD COLUMN activity text DEFAULT 'Carbon footprint calculation';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'carbon_data' AND column_name = 'amount'
  ) THEN
    ALTER TABLE carbon_data ADD COLUMN amount numeric DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'carbon_data' AND column_name = 'date'
  ) THEN
    ALTER TABLE carbon_data ADD COLUMN date date DEFAULT CURRENT_DATE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'carbon_data' AND column_name = 'details'
  ) THEN
    ALTER TABLE carbon_data ADD COLUMN details jsonb DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'carbon_data' AND column_name = 'inserted_at'
  ) THEN
    ALTER TABLE carbon_data ADD COLUMN inserted_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Add constraint to amount column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'carbon_data_amount_check' 
    AND table_name = 'carbon_data'
  ) THEN
    ALTER TABLE carbon_data ADD CONSTRAINT carbon_data_amount_check CHECK (amount >= 0);
  END IF;
END $$;

-- Ensure RLS policies exist
DROP POLICY IF EXISTS "Users can read own carbon data" ON carbon_data;
DROP POLICY IF EXISTS "Users can insert own carbon data" ON carbon_data;
DROP POLICY IF EXISTS "Users can update own carbon data" ON carbon_data;
DROP POLICY IF EXISTS "Users can delete own carbon data" ON carbon_data;

CREATE POLICY "Users can read own carbon data"
  ON carbon_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own carbon data"
  ON carbon_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own carbon data"
  ON carbon_data
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own carbon data"
  ON carbon_data
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_carbon_data_user_date ON carbon_data(user_id, date DESC);
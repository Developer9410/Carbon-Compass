
-- 20250604162430_aged_morning.sql

/*
  # Create carbon_entries table

  This is your “base” table that ai_suggestions,
  point_transactions, etc. all reference.
*/

CREATE TABLE IF NOT EXISTS carbon_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  category text NOT NULL
    CHECK (category IN ('transport','energy','diet','other','mixed')),
  activity text NOT NULL DEFAULT 'carbon calculation',
  amount numeric NOT NULL CHECK (amount >= 0),  -- kg CO2e
  details jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable row-level security
ALTER TABLE carbon_entries ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY IF NOT EXISTS "Users can read own carbon entries"
  ON carbon_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own carbon entries"
  ON carbon_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own carbon entries"
  ON carbon_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete own carbon entries"
  ON carbon_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);



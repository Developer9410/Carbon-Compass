/*
  # Create carbon data tracking system

  1. New Tables
    - `carbon_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `date` (date)
      - `category` (text)
      - `activity` (text)
      - `amount` (numeric) - kg CO2e
      - `details` (jsonb) - store input details
      - `inserted_at` (timestamp)

    - `point_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `points` (integer)
      - `action_type` (text)
      - `description` (text)
      - `carbon_entry_id` (uuid, optional reference)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS carbon_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  category text NOT NULL CHECK (category IN ('transport', 'energy', 'diet', 'other', 'mixed')),
  activity text NOT NULL DEFAULT 'Carbon footprint calculation',
  amount numeric NOT NULL CHECK (amount >= 0),
  details jsonb DEFAULT '{}',
  inserted_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS point_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points integer NOT NULL,
  action_type text NOT NULL,
  description text NOT NULL,
  carbon_entry_id uuid REFERENCES carbon_data(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE carbon_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- Carbon data policies
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

-- Point transactions policies
CREATE POLICY "Users can read own point transactions"
  ON point_transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own point transactions"
  ON point_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_carbon_data_user_date ON carbon_data(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_point_transactions_user ON point_transactions(user_id, created_at DESC);
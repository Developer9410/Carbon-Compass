/*
  # Create offset transactions table

  1. New Tables
    - `offset_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `kg_co2e` (numeric)
      - `cost` (numeric)
      - `provider` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on offset_transactions table
    - Add policy for authenticated users to read their own transactions
*/

CREATE TABLE IF NOT EXISTS offset_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  kg_co2e numeric NOT NULL CHECK (kg_co2e > 0),
  cost numeric NOT NULL CHECK (cost > 0),
  provider text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE offset_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own transactions"
  ON offset_transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
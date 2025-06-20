/*
  # Create AI suggestions table

  1. New Tables
    - `ai_suggestions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `carbon_entry_id` (uuid, foreign key to carbon_entries)
      - `suggestions` (jsonb array of suggestions)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on ai_suggestions table
    - Add policies for authenticated users to read their own suggestions
*/

CREATE TABLE IF NOT EXISTS ai_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  carbon_entry_id uuid NOT NULL REFERENCES carbon_entries(id),
  suggestions jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(carbon_entry_id)
);

ALTER TABLE ai_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own suggestions"
  ON ai_suggestions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
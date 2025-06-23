-- 20250604163000_velvet_mountain_ai_suggestions.sql

/*
  # Create AI suggestions table
  This depends on carbon_entries (created in aged_morning).
*/

CREATE TABLE IF NOT EXISTS ai_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  carbon_entry_id uuid NOT NULL REFERENCES carbon_entries(id) ON DELETE CASCADE,
  suggestions jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (carbon_entry_id)
);

ALTER TABLE ai_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can read own suggestions"
  ON ai_suggestions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own suggestions"
  ON ai_suggestions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

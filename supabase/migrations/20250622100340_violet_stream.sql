-- 20250622100340_violet_stream.sql

-- Example: Indexes + RLS on point_transactions

-- Index for point_transactions by user and date
CREATE INDEX IF NOT EXISTS idx_point_transactions_user ON point_transactions(user_id, created_at DESC);

-- Example: policy update (optional)
CREATE POLICY IF NOT EXISTS "Users can delete own points"
  ON point_transactions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

/*
  # Analytics and tracking improvements

  1. New Tables
    - `user_sessions` - Track user activity sessions
    - `feature_usage` - Track feature usage analytics
    - `carbon_trends` - Store calculated carbon trends
    - `app_feedback` - User feedback and ratings

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- User session tracking
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_start timestamptz DEFAULT now(),
  session_end timestamptz,
  duration_minutes integer,
  pages_visited text[],
  actions_performed text[],
  device_type text CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
  browser text,
  ip_address inet,
  created_at timestamptz DEFAULT now()
);

-- Feature usage analytics
CREATE TABLE IF NOT EXISTS feature_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  feature_name text NOT NULL,
  action text NOT NULL,
  metadata jsonb DEFAULT '{}',
  timestamp timestamptz DEFAULT now()
);

-- Carbon trends analysis
CREATE TABLE IF NOT EXISTS carbon_trends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  period_type text NOT NULL CHECK (period_type IN ('weekly', 'monthly', 'quarterly', 'yearly')),
  period_start date NOT NULL,
  period_end date NOT NULL,
  total_emissions numeric NOT NULL,
  transport_emissions numeric DEFAULT 0,
  energy_emissions numeric DEFAULT 0,
  diet_emissions numeric DEFAULT 0,
  other_emissions numeric DEFAULT 0,
  trend_direction text CHECK (trend_direction IN ('increasing', 'decreasing', 'stable')),
  percentage_change numeric,
  calculated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, period_type, period_start)
);

-- User feedback system
CREATE TABLE IF NOT EXISTS app_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  feedback_type text NOT NULL CHECK (feedback_type IN ('bug_report', 'feature_request', 'general', 'rating')),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  title text,
  description text NOT NULL,
  category text,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_feedback ENABLE ROW LEVEL SECURITY;

-- Policies for user_sessions
CREATE POLICY "Users can read own sessions"
  ON user_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON user_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON user_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for feature_usage
CREATE POLICY "Users can read own feature usage"
  ON feature_usage FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feature usage"
  ON feature_usage FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Policies for carbon_trends
CREATE POLICY "Users can read own trends"
  ON carbon_trends FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage trends"
  ON carbon_trends FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for app_feedback
CREATE POLICY "Users can read own feedback"
  ON app_feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert feedback"
  ON app_feedback FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Function to calculate carbon trends
CREATE OR REPLACE FUNCTION calculate_carbon_trends()
RETURNS void AS $$
DECLARE
  user_record RECORD;
  current_month_start date;
  current_month_end date;
  previous_month_start date;
  previous_month_end date;
  current_emissions numeric;
  previous_emissions numeric;
  trend_direction text;
  percentage_change numeric;
BEGIN
  current_month_start := date_trunc('month', CURRENT_DATE)::date;
  current_month_end := (date_trunc('month', CURRENT_DATE) + interval '1 month - 1 day')::date;
  previous_month_start := (date_trunc('month', CURRENT_DATE) - interval '1 month')::date;
  previous_month_end := (date_trunc('month', CURRENT_DATE) - interval '1 day')::date;

  FOR user_record IN SELECT id FROM users LOOP
    -- Calculate current month emissions
    SELECT COALESCE(SUM(amount), 0) INTO current_emissions
    FROM carbon_data 
    WHERE user_id = user_record.id 
    AND date >= current_month_start 
    AND date <= current_month_end;

    -- Calculate previous month emissions
    SELECT COALESCE(SUM(amount), 0) INTO previous_emissions
    FROM carbon_data 
    WHERE user_id = user_record.id 
    AND date >= previous_month_start 
    AND date <= previous_month_end;

    -- Determine trend direction
    IF current_emissions > previous_emissions * 1.05 THEN
      trend_direction := 'increasing';
    ELSIF current_emissions < previous_emissions * 0.95 THEN
      trend_direction := 'decreasing';
    ELSE
      trend_direction := 'stable';
    END IF;

    -- Calculate percentage change
    IF previous_emissions > 0 THEN
      percentage_change := ((current_emissions - previous_emissions) / previous_emissions) * 100;
    ELSE
      percentage_change := 0;
    END IF;

    -- Insert or update trend record
    INSERT INTO carbon_trends (
      user_id, period_type, period_start, period_end, 
      total_emissions, trend_direction, percentage_change
    ) VALUES (
      user_record.id, 'monthly', current_month_start, current_month_end,
      current_emissions, trend_direction, percentage_change
    ) ON CONFLICT (user_id, period_type, period_start) 
    DO UPDATE SET 
      total_emissions = EXCLUDED.total_emissions,
      trend_direction = EXCLUDED.trend_direction,
      percentage_change = EXCLUDED.percentage_change,
      calculated_at = now();
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_start ON user_sessions(session_start);
CREATE INDEX IF NOT EXISTS idx_feature_usage_user_id ON feature_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_feature_usage_feature ON feature_usage(feature_name);
CREATE INDEX IF NOT EXISTS idx_feature_usage_timestamp ON feature_usage(timestamp);
CREATE INDEX IF NOT EXISTS idx_carbon_trends_user_period ON carbon_trends(user_id, period_type, period_start);
CREATE INDEX IF NOT EXISTS idx_app_feedback_status ON app_feedback(status);
CREATE INDEX IF NOT EXISTS idx_app_feedback_type ON app_feedback(feedback_type);
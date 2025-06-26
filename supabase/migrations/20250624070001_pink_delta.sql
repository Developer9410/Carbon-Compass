/*
  # Add user preferences and settings

  1. New Tables
    - `user_preferences` - Store user settings and preferences
    - `notification_settings` - Manage notification preferences
    - `user_goals` - Track user-defined carbon reduction goals

  2. Security
    - Enable RLS on all new tables
    - Add policies for users to manage their own data
*/

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  theme text DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
  language text DEFAULT 'en' CHECK (language IN ('en', 'es', 'fr', 'de')),
  units text DEFAULT 'metric' CHECK (units IN ('metric', 'imperial')),
  privacy_level text DEFAULT 'public' CHECK (privacy_level IN ('public', 'friends', 'private')),
  email_notifications boolean DEFAULT true,
  push_notifications boolean DEFAULT true,
  weekly_reports boolean DEFAULT true,
  challenge_invites boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Notification settings table
CREATE TABLE IF NOT EXISTS notification_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_type text NOT NULL CHECK (notification_type IN (
    'carbon_reminder', 'goal_milestone', 'challenge_update', 
    'community_activity', 'reward_available', 'offset_confirmation'
  )),
  enabled boolean DEFAULT true,
  frequency text DEFAULT 'immediate' CHECK (frequency IN ('immediate', 'daily', 'weekly', 'never')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, notification_type)
);

-- User goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal_type text NOT NULL CHECK (goal_type IN ('reduction', 'offset', 'points', 'streak')),
  target_value numeric NOT NULL CHECK (target_value > 0),
  target_unit text NOT NULL,
  target_date date,
  current_value numeric DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;

-- Policies for user_preferences
CREATE POLICY "Users can manage own preferences"
  ON user_preferences FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for notification_settings
CREATE POLICY "Users can manage own notification settings"
  ON notification_settings FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_goals
CREATE POLICY "Users can manage own goals"
  ON user_goals FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to create default preferences for new users
CREATE OR REPLACE FUNCTION create_default_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
  -- Create default preferences
  INSERT INTO user_preferences (user_id) VALUES (NEW.id);
  
  -- Create default notification settings
  INSERT INTO notification_settings (user_id, notification_type) VALUES
    (NEW.id, 'carbon_reminder'),
    (NEW.id, 'goal_milestone'),
    (NEW.id, 'challenge_update'),
    (NEW.id, 'community_activity'),
    (NEW.id, 'reward_available'),
    (NEW.id, 'offset_confirmation');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create default preferences for new users
CREATE TRIGGER create_user_preferences_trigger
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION create_default_user_preferences();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_settings_user_id ON notification_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_goals_user_id ON user_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_user_goals_status ON user_goals(status);
CREATE INDEX IF NOT EXISTS idx_carbon_data_user_date ON carbon_data(user_id, date DESC);
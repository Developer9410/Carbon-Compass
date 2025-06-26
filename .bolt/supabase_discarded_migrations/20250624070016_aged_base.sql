/*
  # Enhanced social and community features

  1. New Tables
    - `user_follows` - User following system
    - `post_shares` - Track post sharing
    - `user_achievements` - Achievement system
    - `challenge_leaderboards` - Challenge-specific leaderboards

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- User following system
CREATE TABLE IF NOT EXISTS user_follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Post sharing tracking
CREATE TABLE IF NOT EXISTS post_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  platform text CHECK (platform IN ('twitter', 'facebook', 'linkedin', 'email', 'copy_link')),
  created_at timestamptz DEFAULT now()
);

-- Achievement system
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_type text NOT NULL CHECK (achievement_type IN (
    'first_calculation', 'carbon_neutral', 'streak_7', 'streak_30', 'streak_100',
    'community_contributor', 'challenge_winner', 'offset_champion', 'eco_warrior'
  )),
  achievement_name text NOT NULL,
  achievement_description text NOT NULL,
  points_awarded integer DEFAULT 0,
  badge_icon text,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_type)
);

-- Challenge-specific leaderboards
CREATE TABLE IF NOT EXISTS challenge_leaderboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id uuid NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score numeric NOT NULL DEFAULT 0,
  rank integer,
  last_updated timestamptz DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

-- Enable RLS
ALTER TABLE user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_leaderboards ENABLE ROW LEVEL SECURITY;

-- Policies for user_follows
CREATE POLICY "Users can read all follows"
  ON user_follows FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own follows"
  ON user_follows FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete own follows"
  ON user_follows FOR DELETE
  TO authenticated
  USING (auth.uid() = follower_id);

-- Policies for post_shares
CREATE POLICY "Users can read all shares"
  ON post_shares FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own shares"
  ON post_shares FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_achievements
CREATE POLICY "Users can read all achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can insert achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for challenge_leaderboards
CREATE POLICY "Users can read challenge leaderboards"
  ON challenge_leaderboards FOR SELECT
  TO authenticated
  USING (true);

-- Function to award achievements
CREATE OR REPLACE FUNCTION check_and_award_achievements()
RETURNS TRIGGER AS $$
DECLARE
  user_carbon_entries_count integer;
  user_streak integer;
  user_total_offset numeric;
BEGIN
  -- Check for first calculation achievement
  IF TG_TABLE_NAME = 'carbon_data' AND TG_OP = 'INSERT' THEN
    SELECT COUNT(*) INTO user_carbon_entries_count
    FROM carbon_data WHERE user_id = NEW.user_id;
    
    IF user_carbon_entries_count = 1 THEN
      INSERT INTO user_achievements (user_id, achievement_type, achievement_name, achievement_description, points_awarded, badge_icon)
      VALUES (NEW.user_id, 'first_calculation', 'Carbon Tracker', 'Calculated your first carbon footprint', 100, 'calculator')
      ON CONFLICT (user_id, achievement_type) DO NOTHING;
    END IF;
  END IF;

  -- Check for carbon neutral achievement
  IF TG_TABLE_NAME = 'offset_transactions' AND TG_OP = 'INSERT' THEN
    SELECT COALESCE(SUM(kg_co2e), 0) INTO user_total_offset
    FROM offset_transactions WHERE user_id = NEW.user_id;
    
    -- This is a simplified check - in reality you'd compare with total emissions
    IF user_total_offset >= 1000 THEN
      INSERT INTO user_achievements (user_id, achievement_type, achievement_name, achievement_description, points_awarded, badge_icon)
      VALUES (NEW.user_id, 'carbon_neutral', 'Carbon Neutral Champion', 'Offset over 1000kg of CO2', 500, 'leaf')
      ON CONFLICT (user_id, achievement_type) DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for achievements
CREATE TRIGGER award_achievements_carbon_data
  AFTER INSERT ON carbon_data
  FOR EACH ROW EXECUTE FUNCTION check_and_award_achievements();

CREATE TRIGGER award_achievements_offsets
  AFTER INSERT ON offset_transactions
  FOR EACH ROW EXECUTE FUNCTION check_and_award_achievements();

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_user_follows_follower ON user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_following ON user_follows(following_id);
CREATE INDEX IF NOT EXISTS idx_post_shares_user ON post_shares(user_id);
CREATE INDEX IF NOT EXISTS idx_post_shares_post ON post_shares(post_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_leaderboards_challenge ON challenge_leaderboards(challenge_id, rank);
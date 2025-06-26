/*
  # Complete Carbon Compass Database Schema

  1. New Tables
    - `carbon_data` - Store real carbon footprint calculations
    - `offsets` - Track carbon offset purchases
    - `green_points` - User points system
    - `community_posts` - Social feed posts
    - `likes` - Post likes
    - `comments` - Post comments
    - `challenges` - Group challenges
    - `challenge_members` - Challenge participation
    - `leaderboard_cache` - Cached leaderboard data

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for data access
*/

-- Carbon data tracking
CREATE TABLE IF NOT EXISTS carbon_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transport_emissions numeric DEFAULT 0,
  energy_emissions numeric DEFAULT 0,
  diet_emissions numeric DEFAULT 0,
  other_emissions numeric DEFAULT 0,
  total_emissions numeric NOT NULL,
  calculation_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Carbon offsets
CREATE TABLE IF NOT EXISTS offsets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_kg_co2e numeric NOT NULL CHECK (amount_kg_co2e > 0),
  cost_usd numeric NOT NULL CHECK (cost_usd > 0),
  provider text NOT NULL,
  project_name text NOT NULL,
  certificate_id text,
  status text DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Green points system
CREATE TABLE IF NOT EXISTS green_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points integer NOT NULL,
  action_type text NOT NULL,
  description text NOT NULL,
  reference_id uuid, -- Can reference carbon_data, offsets, etc.
  created_at timestamptz DEFAULT now()
);

-- Community posts
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  image_url text,
  category text DEFAULT 'general' CHECK (category IN ('general', 'achievement', 'tip', 'question')),
  tags text[] DEFAULT '{}',
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post likes
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Post comments
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Group challenges
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('transport', 'energy', 'diet', 'general')),
  challenge_type text DEFAULT 'group' CHECK (challenge_type IN ('individual', 'group')),
  target_value numeric NOT NULL,
  target_unit text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_by uuid NOT NULL REFERENCES users(id),
  max_participants integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Challenge participation
CREATE TABLE IF NOT EXISTS challenge_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id uuid NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  progress_value numeric DEFAULT 0,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

-- Leaderboard cache for performance
CREATE TABLE IF NOT EXISTS leaderboard_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_points integer DEFAULT 0,
  total_co2_reduced numeric DEFAULT 0,
  total_co2_offset numeric DEFAULT 0,
  rank_by_points integer,
  rank_by_reduction integer,
  last_updated timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE carbon_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE offsets ENABLE ROW LEVEL SECURITY;
ALTER TABLE green_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_cache ENABLE ROW LEVEL SECURITY;

-- Carbon data policies
CREATE POLICY "Users can read own carbon data"
  ON carbon_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own carbon data"
  ON carbon_data FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Offsets policies
CREATE POLICY "Users can read own offsets"
  ON offsets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own offsets"
  ON offsets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Green points policies
CREATE POLICY "Users can read own points"
  ON green_points FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own points"
  ON green_points FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Community posts policies
CREATE POLICY "Anyone can read posts"
  ON community_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own posts"
  ON community_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON community_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Anyone can read likes"
  ON likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own likes"
  ON likes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Challenges policies
CREATE POLICY "Anyone can read active challenges"
  ON challenges FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can create challenges"
  ON challenges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Challenge members policies
CREATE POLICY "Anyone can read challenge members"
  ON challenge_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join challenges"
  ON challenge_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Leaderboard policies
CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard_cache FOR SELECT
  TO authenticated
  USING (true);

-- Functions to update counters
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER likes_count_trigger
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

CREATE TRIGGER comments_count_trigger
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

-- Insert sample challenges
INSERT INTO challenges (title, description, category, target_value, target_unit, start_date, end_date, created_by) VALUES
('Meatless Monday Challenge', 'Skip meat every Monday for a month', 'diet', 4, 'weeks', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', (SELECT id FROM users LIMIT 1)),
('Bike to Work Week', 'Replace car commutes with biking', 'transport', 5, 'days', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', (SELECT id FROM users LIMIT 1)),
('Energy Saver Challenge', 'Reduce household energy consumption by 20%', 'energy', 20, 'percent', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', (SELECT id FROM users LIMIT 1));
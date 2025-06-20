/*
  # Create points and rewards system

  1. New Tables
    - `point_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `points` (integer)
      - `action_type` (text)
      - `description` (text)
      - `carbon_entry_id` (uuid, references carbon_entries, nullable)
      - `created_at` (timestamp)
    
    - `rewards`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `points_cost` (integer)
      - `image_url` (text)
      - `partner` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
    
    - `reward_redemptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `reward_id` (uuid, references rewards)
      - `points_spent` (integer)
      - `status` (text)
      - `redemption_code` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS point_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  points integer NOT NULL,
  action_type text NOT NULL,
  description text NOT NULL,
  carbon_entry_id uuid REFERENCES carbon_entries(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  points_cost integer NOT NULL CHECK (points_cost > 0),
  image_url text NOT NULL,
  partner text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reward_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  reward_id uuid NOT NULL REFERENCES rewards(id),
  points_spent integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered', 'cancelled')),
  redemption_code text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;

-- Policies for point_transactions
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

-- Policies for rewards
CREATE POLICY "Anyone can read active rewards"
  ON rewards
  FOR SELECT
  TO authenticated
  USING (active = true);

-- Policies for reward_redemptions
CREATE POLICY "Users can read own redemptions"
  ON reward_redemptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own redemptions"
  ON reward_redemptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample rewards
INSERT INTO rewards (name, description, category, points_cost, image_url, partner) VALUES
('$10 Patagonia Discount', 'Get $10 off your next Patagonia purchase of sustainable outdoor gear', 'discount', 500, 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=500', 'Patagonia'),
('Tree Planting Donation', 'Plant 5 trees through our reforestation partner', 'donation', 250, 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=500', 'One Tree Planted'),
('Bamboo Toothbrush Set', 'Eco-friendly bamboo toothbrush 4-pack with biodegradable bristles', 'product', 300, 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500', 'EcoLife'),
('Solar Panel Consultation', 'Free consultation for home solar panel installation', 'service', 1000, 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=500', 'SolarCity'),
('Ocean Cleanup Donation', 'Support ocean plastic cleanup efforts', 'donation', 400, 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=500', 'Ocean Cleanup'),
('Reusable Water Bottle', 'Premium stainless steel water bottle with temperature control', 'product', 200, 'https://images.pexels.com/photos/3737631/pexels-photo-3737631.jpeg?auto=compress&cs=tinysrgb&w=500', 'Hydro Flask'),
('Carbon Offset Credits', 'Offset 100kg of CO2 through verified projects', 'offset', 150, 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=500', 'Carbon Trust'),
('Organic Meal Kit', 'One week of organic, locally-sourced meal kits', 'product', 600, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500', 'Green Chef'),
('Electric Bike Rental', '3-day electric bike rental for eco-friendly transportation', 'service', 800, 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=500', 'Lime'),
('Wildlife Conservation', 'Support endangered species protection programs', 'donation', 350, 'https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg?auto=compress&cs=tinysrgb&w=500', 'WWF');
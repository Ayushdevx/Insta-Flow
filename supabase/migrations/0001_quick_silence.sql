/*
  # Instagram Automation Schema

  1. New Tables
    - `automation_rules`
      - Stores automation rules for Instagram posts
      - Links triggers to actions
    - `automation_logs`
      - Tracks all automation activities
    - `user_profiles`
      - Stores Instagram user profile data
    - `analytics`
      - Stores engagement metrics and stats

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  instagram_user_id text,
  access_token text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Automation Rules Table
CREATE TABLE IF NOT EXISTS automation_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  post_id text NOT NULL,
  trigger_keyword text NOT NULL,
  response_message text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own automation rules"
  ON automation_rules FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Automation Logs Table
CREATE TABLE IF NOT EXISTS automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  rule_id uuid REFERENCES automation_rules(id),
  trigger_type text NOT NULL,
  triggered_by text NOT NULL,
  response_sent text NOT NULL,
  success boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own automation logs"
  ON automation_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  date date DEFAULT CURRENT_DATE,
  total_triggers integer DEFAULT 0,
  successful_responses integer DEFAULT 0,
  failed_responses integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own analytics"
  ON analytics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_automation_rules_updated_at
  BEFORE UPDATE ON automation_rules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_analytics_updated_at
  BEFORE UPDATE ON analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
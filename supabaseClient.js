import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qrvjgzeioeltyccepanu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydmpnemVpb2VsdHljY2VwYW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NjA4MjgsImV4cCI6MjA3NTIzNjgyOH0.qLEedBP0JXDNAf-kKEkJkR162-Ae0fzC9_Y7LmPjMss'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database setup functions
export const setupDatabase = async () => {
  try {
    // Create users table
    const { error: usersError } = await supabase.rpc('create_users_table')

    // Create questions table
    const { error: questionsError } = await supabase.rpc('create_questions_table')

    // Create chat table
    const { error: chatError } = await supabase.rpc('create_chat_table')

    // Create test_results table
    const { error: testError } = await supabase.rpc('create_test_results_table')

    console.log('Database setup completed')
  } catch (error) {
    console.error('Database setup error:', error)
  }
}

// SQL functions to create tables
export const createTablesSQL = `
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  phone VARCHAR,
  username VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  chapter VARCHAR NOT NULL,
  subject VARCHAR NOT NULL,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  answer VARCHAR(1) NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create chat table
CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  sender_id UUID REFERENCES users(id),
  sender_username VARCHAR NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create test results table
CREATE TABLE IF NOT EXISTS test_results (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  test_type VARCHAR NOT NULL,
  subjects JSONB,
  chapters JSONB,
  total_questions INTEGER,
  correct_answers INTEGER,
  incorrect_answers INTEGER,
  unattempted INTEGER,
  score_percentage DECIMAL,
  time_taken INTEGER,
  detailed_results JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can read questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Users can read all chat messages" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Users can insert chat messages" ON chat_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can read own test results" ON test_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own test results" ON test_results FOR INSERT WITH CHECK (auth.uid() = user_id);
`;

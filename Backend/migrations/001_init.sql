-- Migration: 001_init.sql
-- Membuat semua tabel untuk Mathify

-- Reset all tables
DROP TABLE IF EXISTS refresh_tokens CASCADE;
DROP TABLE IF EXISTS quiz_results CASCADE;
DROP TABLE IF EXISTS quiz_discussions CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS practice_questions CASCADE;
DROP TABLE IF EXISTS videos CASCADE;
DROP TABLE IF EXISTS material_steps CASCADE;
DROP TABLE IF EXISTS materials CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Tabel Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  avatar_url VARCHAR(255),
  role VARCHAR(20) DEFAULT 'student',
  jenjang VARCHAR(50) DEFAULT 'smp',
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  study_duration INTEGER DEFAULT 0, -- in seconds
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Topics (Topik Matematika)
CREATE TABLE IF NOT EXISTS topics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon_url VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Materials (Materi)
CREATE TABLE IF NOT EXISTS materials (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  type VARCHAR(50) DEFAULT 'theory',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Practice Questions (Latihan Soal)
CREATE TABLE IF NOT EXISTS practice_questions (
  id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  option_a VARCHAR(500) NOT NULL,
  option_b VARCHAR(500) NOT NULL,
  option_c VARCHAR(500) NOT NULL,
  option_d VARCHAR(500) NOT NULL,
  correct_answer INTEGER NOT NULL, -- 0 untuk A, 1 untuk B, 2 untuk C, 3 untuk D
  explanation TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Tabel Material Steps (Detail Materi Step-by-step)
CREATE TABLE IF NOT EXISTS material_steps (
  id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Videos (Video Pembelajaran)
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  video_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(255),
  duration INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  time_limit INTEGER DEFAULT 30,
  passing_score INTEGER DEFAULT 70,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  option_a VARCHAR(500) NOT NULL,
  option_b VARCHAR(500) NOT NULL,
  option_c VARCHAR(500) NOT NULL,
  option_d VARCHAR(500) NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('a','b','c','d')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Quiz Discussions (Pembahasan)
CREATE TABLE IF NOT EXISTS quiz_discussions (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES quiz_questions(id) ON DELETE CASCADE,
  explanation TEXT NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Quiz Results (Hasil Quiz)
CREATE TABLE IF NOT EXISTS quiz_results (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  time_taken INTEGER DEFAULT 0,
  passed BOOLEAN DEFAULT false,
  answers JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Refresh Tokens
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_revoked BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes untuk performa
CREATE INDEX IF NOT EXISTS idx_materials_topic_id ON materials(topic_id);
CREATE INDEX IF NOT EXISTS idx_practice_questions_material_id ON practice_questions(material_id);
CREATE INDEX IF NOT EXISTS idx_material_steps_material_id ON material_steps(material_id);
CREATE INDEX IF NOT EXISTS idx_videos_material_id ON videos(material_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_material_id ON quizzes(material_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_discussions_question_id ON quiz_discussions(question_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz_id ON quiz_results(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);

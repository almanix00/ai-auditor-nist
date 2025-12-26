-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  organization TEXT,
  role TEXT DEFAULT 'user', -- user, admin
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AI Models (Projects) table
CREATE TABLE IF NOT EXISTS ai_models (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  model_type TEXT NOT NULL, -- text_generation, classification, etc.
  api_provider TEXT NOT NULL, -- OpenAI, HuggingFace, Custom, etc.
  api_endpoint TEXT NOT NULL,
  api_key_encrypted TEXT, -- Encrypted API key
  model_id TEXT, -- gpt-4-turbo, claude-3, etc.
  industry TEXT, -- Healthcare, Finance, etc.
  regulatory_scope TEXT, -- EU AI Act, NIST AI RMF, ISO 42001
  status TEXT DEFAULT 'active', -- active, inactive, archived
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Scan Results table
CREATE TABLE IF NOT EXISTS scan_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model_id INTEGER NOT NULL,
  scan_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  scan_type TEXT NOT NULL, -- full, security, fairness, robustness
  status TEXT DEFAULT 'pending', -- pending, running, completed, failed
  
  -- Overall Scores
  security_score REAL,
  fairness_score REAL,
  robustness_score REAL,
  overall_score REAL,
  
  -- Security Details (JSON stored as TEXT)
  security_details TEXT, -- prompt_injection_rate, jailbreak_attempts, blocked_count
  
  -- Fairness Details (JSON stored as TEXT)
  fairness_details TEXT, -- demographic_parity, gender_bias, race_bias
  
  -- Robustness Details (JSON stored as TEXT)
  robustness_details TEXT, -- semantic_stability, typo_resistance
  
  -- NIST Mapping (JSON stored as TEXT)
  nist_mapping TEXT, -- {"MEASURE-1.1": "PASS", "MEASURE-2.3": "FAIL", ...}
  
  -- Execution metadata
  test_dataset_size INTEGER,
  execution_time_seconds INTEGER,
  error_message TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (model_id) REFERENCES ai_models(id) ON DELETE CASCADE
);

-- Test Datasets table
CREATE TABLE IF NOT EXISTS test_datasets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  file_url TEXT, -- URL to uploaded CSV/JSON file
  row_count INTEGER,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (model_id) REFERENCES ai_models(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ai_models_user_id ON ai_models(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_models_status ON ai_models(status);
CREATE INDEX IF NOT EXISTS idx_scan_results_model_id ON scan_results(model_id);
CREATE INDEX IF NOT EXISTS idx_scan_results_scan_date ON scan_results(scan_date);
CREATE INDEX IF NOT EXISTS idx_scan_results_status ON scan_results(status);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_test_datasets_model_id ON test_datasets(model_id);

// Database types
export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  organization?: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface AIModel {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  model_type: 'text_generation' | 'classification' | 'embedding' | 'other';
  api_provider: 'OpenAI' | 'Anthropic' | 'HuggingFace' | 'Custom' | string;
  api_endpoint: string;
  api_key_encrypted?: string;
  model_id?: string;
  industry?: string;
  regulatory_scope?: string;
  status: 'active' | 'inactive' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface ScanResult {
  id: number;
  model_id: number;
  scan_date: string;
  scan_type: 'full' | 'security' | 'fairness' | 'robustness';
  status: 'pending' | 'running' | 'completed' | 'failed';
  
  security_score?: number;
  fairness_score?: number;
  robustness_score?: number;
  overall_score?: number;
  
  security_details?: SecurityDetails;
  fairness_details?: FairnessDetails;
  robustness_details?: RobustnessDetails;
  nist_mapping?: NISTMapping;
  
  test_dataset_size?: number;
  execution_time_seconds?: number;
  error_message?: string;
  created_at: string;
}

export interface TestDataset {
  id: number;
  model_id: number;
  name: string;
  file_url?: string;
  row_count?: number;
  uploaded_at: string;
}

// Scan Details types
export interface SecurityDetails {
  promptInjectionRate: number;
  jailbreakAttempts: number;
  blockedCount: number;
  vulnerabilities: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
  }>;
}

export interface FairnessDetails {
  demographicParity: number;
  genderBias: number;
  raceBias: number;
  ageGroupBias?: number;
  biasBreakdown: Array<{
    group: string;
    metric: number;
    status: 'pass' | 'warning' | 'fail';
  }>;
}

export interface RobustnessDetails {
  semanticStability: number;
  typoResistance: number;
  adversarialResistance?: number;
  testCases: Array<{
    original: string;
    perturbed: string;
    similarity: number;
  }>;
}

export interface NISTMapping {
  [key: string]: 'PASS' | 'FAIL' | 'WARNING' | 'NOT_TESTED';
}

// Cloudflare Bindings
export interface CloudflareBindings {
  DB: D1Database;
}

// API Request/Response types
export interface CreateModelRequest {
  name: string;
  description?: string;
  model_type: string;
  api_provider: string;
  api_endpoint: string;
  api_key?: string;
  model_id?: string;
  industry?: string;
  regulatory_scope?: string;
}

export interface StartScanRequest {
  model_id: number;
  scan_type: 'full' | 'security' | 'fairness' | 'robustness';
  test_dataset_id?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  organization?: string;
}

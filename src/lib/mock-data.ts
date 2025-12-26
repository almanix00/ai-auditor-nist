import type { AIModel, ScanResult, SecurityDetails, FairnessDetails, RobustnessDetails, NISTMapping } from '../types';

// Mock Users
export const mockUsers = [
  {
    id: 1,
    email: 'demo@nist-auditor.com',
    name: 'Demo User',
    organization: 'NIST Research Lab',
    role: 'admin' as const
  }
];

// Mock AI Models
export const mockAIModels: AIModel[] = [
  {
    id: 1,
    user_id: 1,
    name: 'GPT-4 Healthcare Chatbot',
    description: 'AI chatbot for patient consultation and medical information',
    model_type: 'text_generation',
    api_provider: 'OpenAI',
    api_endpoint: 'https://api.openai.com/v1/chat/completions',
    model_id: 'gpt-4-turbo',
    industry: 'Healthcare',
    regulatory_scope: 'EU AI Act, NIST AI RMF 1.0, HIPAA',
    status: 'active',
    created_at: '2025-12-20T10:30:00Z',
    updated_at: '2025-12-26T03:00:00Z'
  },
  {
    id: 2,
    user_id: 1,
    name: 'Resume Screening AI',
    description: 'Automated resume analysis and candidate ranking system',
    model_type: 'classification',
    api_provider: 'Custom',
    api_endpoint: 'https://api.company.com/hr/screening',
    model_id: 'bert-classifier-v3',
    industry: 'Human Resources',
    regulatory_scope: 'EU AI Act, NIST AI RMF 1.0',
    status: 'active',
    created_at: '2025-12-15T14:20:00Z',
    updated_at: '2025-12-25T16:45:00Z'
  },
  {
    id: 3,
    user_id: 1,
    name: 'Financial Fraud Detector',
    description: 'Real-time transaction fraud detection system',
    model_type: 'classification',
    api_provider: 'Custom',
    api_endpoint: 'https://api.fintech.com/fraud/detect',
    model_id: 'xgboost-fraud-v2',
    industry: 'Finance',
    regulatory_scope: 'NIST AI RMF 1.0, PCI DSS',
    status: 'active',
    created_at: '2025-11-10T09:15:00Z',
    updated_at: '2025-12-22T11:30:00Z'
  },
  {
    id: 4,
    user_id: 1,
    name: 'GPT-5.2 Advanced Assistant',
    description: 'Next-generation AI assistant with enhanced reasoning and multimodal capabilities',
    model_type: 'text_generation',
    api_provider: 'OpenAI',
    api_endpoint: 'https://api.openai.com/v1/chat/completions',
    model_id: 'gpt-5.2',
    industry: 'General AI',
    regulatory_scope: 'EU AI Act, NIST AI RMF 1.0, ISO 42001',
    status: 'active',
    created_at: '2025-12-26T04:00:00Z',
    updated_at: '2025-12-26T04:00:00Z'
  },
  {
    id: 5,
    user_id: 1,
    name: 'Gemini 3 Pro Reasoning Engine',
    description: 'Most advanced reasoning model from Google with multimodal capabilities',
    model_type: 'text_generation',
    api_provider: 'Google',
    api_endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-3-pro',
    model_id: 'gemini-3-pro',
    industry: 'Enterprise AI',
    regulatory_scope: 'EU AI Act, NIST AI RMF 1.0',
    status: 'active',
    created_at: '2025-12-26T05:00:00Z',
    updated_at: '2025-12-26T05:00:00Z'
  },
  {
    id: 6,
    user_id: 1,
    name: 'Claude Opus 4.5 Strategic Advisor',
    description: 'Anthropic\'s most advanced hybrid-reasoning model for complex decision-making',
    model_type: 'text_generation',
    api_provider: 'Anthropic',
    api_endpoint: 'https://api.anthropic.com/v1/messages',
    model_id: 'claude-opus-4.5',
    industry: 'Strategic Consulting',
    regulatory_scope: 'EU AI Act, NIST AI RMF 1.0, ISO 42001',
    status: 'active',
    created_at: '2025-12-26T05:30:00Z',
    updated_at: '2025-12-26T05:30:00Z'
  },
  {
    id: 7,
    user_id: 1,
    name: 'Grok 4.1 Fast Analysis',
    description: 'xAI\'s flagship reasoning model with real-time data integration',
    model_type: 'text_generation',
    api_provider: 'xAI',
    api_endpoint: 'https://api.x.ai/v1/chat/completions',
    model_id: 'grok-4.1-fast',
    industry: 'Real-time Analytics',
    regulatory_scope: 'NIST AI RMF 1.0',
    status: 'active',
    created_at: '2025-12-26T06:00:00Z',
    updated_at: '2025-12-26T06:00:00Z'
  },
  {
    id: 8,
    user_id: 1,
    name: 'DeepSeek R1 Research Assistant',
    description: 'Advanced reasoning model specialized in scientific research and analysis',
    model_type: 'text_generation',
    api_provider: 'DeepSeek',
    api_endpoint: 'https://api.deepseek.com/v1/chat/completions',
    model_id: 'deepseek-r1',
    industry: 'Research & Development',
    regulatory_scope: 'NIST AI RMF 1.0',
    status: 'active',
    created_at: '2025-12-26T06:30:00Z',
    updated_at: '2025-12-26T06:30:00Z'
  },
  {
    id: 9,
    user_id: 1,
    name: 'Llama 4 Maverick Open Platform',
    description: 'Meta\'s advanced open-source model with exceptional performance',
    model_type: 'text_generation',
    api_provider: 'Meta',
    api_endpoint: 'https://api.meta.ai/llama/v4/completions',
    model_id: 'llama-4-maverick',
    industry: 'Open Source AI',
    regulatory_scope: 'EU AI Act, NIST AI RMF 1.0',
    status: 'active',
    created_at: '2025-12-26T07:00:00Z',
    updated_at: '2025-12-26T07:00:00Z'
  },
  {
    id: 10,
    user_id: 1,
    name: 'o3 Advanced Reasoning',
    description: 'OpenAI\'s specialized reasoning model for complex problem-solving',
    model_type: 'text_generation',
    api_provider: 'OpenAI',
    api_endpoint: 'https://api.openai.com/v1/chat/completions',
    model_id: 'o3',
    industry: 'Scientific Computing',
    regulatory_scope: 'NIST AI RMF 1.0, ISO 42001',
    status: 'active',
    created_at: '2025-12-26T07:30:00Z',
    updated_at: '2025-12-26T07:30:00Z'
  },
  {
    id: 11,
    user_id: 1,
    name: 'GPT 5.2 Thinking Mode',
    description: 'Advanced thinking model with visible reasoning process and chain-of-thought',
    model_type: 'text_generation',
    api_provider: 'OpenAI',
    api_endpoint: 'https://api.openai.com/v1/chat/completions',
    model_id: 'gpt-5.2-thinking',
    industry: 'Education & Training',
    regulatory_scope: 'EU AI Act, NIST AI RMF 1.0',
    status: 'active',
    created_at: '2025-12-26T08:00:00Z',
    updated_at: '2025-12-26T08:00:00Z'
  }
];

// Mock Security Details
const mockSecurityDetails: SecurityDetails = {
  promptInjectionRate: 15,
  jailbreakAttempts: 100,
  blockedCount: 85,
  vulnerabilities: [
    {
      type: 'Prompt Injection',
      severity: 'high',
      description: 'Model susceptible to indirect prompt injection via user context'
    },
    {
      type: 'Data Leakage',
      severity: 'medium',
      description: 'Potential exposure of training data patterns in edge cases'
    },
    {
      type: 'Jailbreak',
      severity: 'low',
      description: 'Minor bypasses detected with complex multi-turn conversations'
    }
  ]
};

// Mock Fairness Details
const mockFairnessDetails: FairnessDetails = {
  demographicParity: 0.12,
  genderBias: 0.08,
  raceBias: 0.15,
  ageGroupBias: 0.09,
  biasBreakdown: [
    { group: 'Gender: Male', metric: 0.52, status: 'pass' },
    { group: 'Gender: Female', metric: 0.48, status: 'pass' },
    { group: 'Race: Caucasian', metric: 0.55, status: 'warning' },
    { group: 'Race: African American', metric: 0.40, status: 'warning' },
    { group: 'Race: Asian', metric: 0.50, status: 'pass' },
    { group: 'Age: 18-35', metric: 0.60, status: 'pass' },
    { group: 'Age: 36-50', metric: 0.55, status: 'pass' },
    { group: 'Age: 51+', metric: 0.45, status: 'warning' }
  ]
};

// Mock Robustness Details
const mockRobustnessDetails: RobustnessDetails = {
  semanticStability: 0.91,
  typoResistance: 0.89,
  adversarialResistance: 0.87,
  testCases: [
    {
      original: 'What are the symptoms of diabetes?',
      perturbed: 'Whut are the symptms of diabetus?',
      similarity: 0.94
    },
    {
      original: 'How can I improve my credit score?',
      perturbed: 'How cn I improove my credet score?',
      similarity: 0.91
    },
    {
      original: 'Explain machine learning in simple terms',
      perturbed: 'Explane masheen lerning in simpel terms',
      similarity: 0.88
    }
  ]
};

// Mock NIST Mapping
const mockNISTMapping: NISTMapping = {
  'GOVERN-1.1': 'PASS',
  'GOVERN-1.2': 'PASS',
  'GOVERN-1.3': 'PASS',
  'MAP-1.1': 'PASS',
  'MAP-1.2': 'PASS',
  'MAP-2.3': 'WARNING',
  'MAP-3.4': 'PASS',
  'MEASURE-1.1': 'PASS',
  'MEASURE-1.2': 'WARNING',
  'MEASURE-2.1': 'FAIL',
  'MEASURE-2.2': 'PASS',
  'MEASURE-2.3': 'PASS',
  'MEASURE-3.1': 'PASS',
  'MEASURE-3.2': 'PASS',
  'MEASURE-4.1': 'PASS',
  'MANAGE-1.1': 'PASS',
  'MANAGE-1.2': 'PASS',
  'MANAGE-2.1': 'WARNING',
  'MANAGE-2.2': 'PASS',
  'MANAGE-3.1': 'PASS',
  'MANAGE-4.1': 'PASS'
};

// Mock Scan Results
export const mockScanResults: ScanResult[] = [
  {
    id: 1,
    model_id: 1,
    scan_date: '2025-12-26T03:00:00Z',
    scan_type: 'full',
    status: 'completed',
    security_score: 85,
    fairness_score: 72,
    robustness_score: 91,
    overall_score: 83,
    security_details: mockSecurityDetails,
    fairness_details: mockFairnessDetails,
    robustness_details: mockRobustnessDetails,
    nist_mapping: mockNISTMapping,
    test_dataset_size: 1000,
    execution_time_seconds: 245,
    created_at: '2025-12-26T03:00:00Z'
  },
  {
    id: 2,
    model_id: 1,
    scan_date: '2025-12-20T14:30:00Z',
    scan_type: 'full',
    status: 'completed',
    security_score: 82,
    fairness_score: 68,
    robustness_score: 88,
    overall_score: 79,
    security_details: { ...mockSecurityDetails, promptInjectionRate: 18 },
    fairness_details: { ...mockFairnessDetails, demographicParity: 0.15 },
    robustness_details: { ...mockRobustnessDetails, semanticStability: 0.88 },
    nist_mapping: mockNISTMapping,
    test_dataset_size: 950,
    execution_time_seconds: 232,
    created_at: '2025-12-20T14:30:00Z'
  },
  {
    id: 3,
    model_id: 2,
    scan_date: '2025-12-25T16:45:00Z',
    scan_type: 'fairness',
    status: 'completed',
    fairness_score: 65,
    overall_score: 65,
    fairness_details: {
      ...mockFairnessDetails,
      demographicParity: 0.22,
      genderBias: 0.18
    },
    nist_mapping: {
      'MAP-2.3': 'FAIL',
      'MEASURE-2.1': 'FAIL',
      'MEASURE-2.2': 'WARNING',
      'MEASURE-2.3': 'PASS'
    },
    test_dataset_size: 2500,
    execution_time_seconds: 180,
    created_at: '2025-12-25T16:45:00Z'
  },
  {
    id: 4,
    model_id: 3,
    scan_date: '2025-12-22T11:30:00Z',
    scan_type: 'security',
    status: 'completed',
    security_score: 93,
    overall_score: 93,
    security_details: {
      ...mockSecurityDetails,
      promptInjectionRate: 7,
      blockedCount: 93
    },
    nist_mapping: {
      'MEASURE-1.1': 'PASS',
      'MEASURE-1.2': 'PASS',
      'MANAGE-2.1': 'PASS'
    },
    test_dataset_size: 500,
    execution_time_seconds: 120,
    created_at: '2025-12-22T11:30:00Z'
  },
  {
    id: 5,
    model_id: 4,
    scan_date: '2025-12-26T04:30:00Z',
    scan_type: 'full',
    status: 'completed',
    security_score: 94,
    fairness_score: 89,
    robustness_score: 96,
    overall_score: 93,
    security_details: {
      promptInjectionRate: 6,
      jailbreakAttempts: 150,
      blockedCount: 141,
      vulnerabilities: [
        {
          type: 'Prompt Injection',
          severity: 'low',
          description: 'Minimal susceptibility to advanced prompt injection techniques'
        },
        {
          type: 'Data Leakage',
          severity: 'low',
          description: 'Robust privacy controls prevent training data exposure'
        }
      ]
    },
    fairness_details: {
      demographicParity: 0.05,
      genderBias: 0.03,
      raceBias: 0.06,
      ageGroupBias: 0.04,
      biasBreakdown: [
        { group: 'Gender: Male', metric: 0.51, status: 'pass' },
        { group: 'Gender: Female', metric: 0.49, status: 'pass' },
        { group: 'Race: Caucasian', metric: 0.51, status: 'pass' },
        { group: 'Race: African American', metric: 0.48, status: 'pass' },
        { group: 'Race: Asian', metric: 0.50, status: 'pass' },
        { group: 'Race: Hispanic', metric: 0.49, status: 'pass' },
        { group: 'Age: 18-35', metric: 0.52, status: 'pass' },
        { group: 'Age: 36-50', metric: 0.51, status: 'pass' },
        { group: 'Age: 51+', metric: 0.49, status: 'pass' }
      ]
    },
    robustness_details: {
      semanticStability: 0.96,
      typoResistance: 0.95,
      adversarialResistance: 0.94,
      testCases: [
        {
          original: 'Explain quantum computing in simple terms',
          perturbed: 'Explan quantom computng in simpl term',
          similarity: 0.97
        },
        {
          original: 'What are the benefits of renewable energy?',
          perturbed: 'Wat r the benifits ov reneuable enrgy?',
          similarity: 0.96
        },
        {
          original: 'How does blockchain technology work?',
          perturbed: 'How dose blockchane tecnology werk?',
          similarity: 0.95
        }
      ]
    },
    nist_mapping: {
      'GOVERN-1.1': 'PASS',
      'GOVERN-1.2': 'PASS',
      'GOVERN-1.3': 'PASS',
      'MAP-1.1': 'PASS',
      'MAP-1.2': 'PASS',
      'MAP-2.3': 'PASS',
      'MAP-3.4': 'PASS',
      'MEASURE-1.1': 'PASS',
      'MEASURE-1.2': 'PASS',
      'MEASURE-2.1': 'PASS',
      'MEASURE-2.2': 'PASS',
      'MEASURE-2.3': 'PASS',
      'MEASURE-3.1': 'PASS',
      'MEASURE-3.2': 'PASS',
      'MEASURE-4.1': 'PASS',
      'MANAGE-1.1': 'PASS',
      'MANAGE-1.2': 'PASS',
      'MANAGE-2.1': 'PASS',
      'MANAGE-2.2': 'PASS',
      'MANAGE-3.1': 'PASS',
      'MANAGE-4.1': 'PASS'
    },
    test_dataset_size: 2000,
    execution_time_seconds: 310,
    created_at: '2025-12-26T04:30:00Z'
  },
  // Gemini 3 Pro Scan
  {
    id: 6,
    model_id: 5,
    scan_date: '2025-12-26T05:15:00Z',
    scan_type: 'full',
    status: 'completed',
    security_score: 96,
    fairness_score: 92,
    robustness_score: 95,
    overall_score: 94,
    security_details: {
      promptInjectionRate: 4,
      jailbreakAttempts: 200,
      blockedCount: 192,
      vulnerabilities: [
        {
          type: 'Edge Case Vulnerability',
          severity: 'low',
          description: 'Minimal edge cases in adversarial prompt handling'
        }
      ]
    },
    fairness_details: {
      demographicParity: 0.04,
      genderBias: 0.02,
      raceBias: 0.04,
      ageGroupBias: 0.03,
      biasBreakdown: [
        { group: 'Gender: Male', metric: 0.50, status: 'pass' },
        { group: 'Gender: Female', metric: 0.50, status: 'pass' },
        { group: 'Race: All Groups', metric: 0.49, status: 'pass' }
      ]
    },
    robustness_details: {
      semanticStability: 0.95,
      typoResistance: 0.96,
      adversarialResistance: 0.94,
      testCases: [
        {
          original: 'Analyze quantum entanglement principles',
          perturbed: 'Analyz quantm entnglment princples',
          similarity: 0.96
        }
      ]
    },
    nist_mapping: {
      'GOVERN-1.1': 'PASS', 'GOVERN-1.2': 'PASS', 'GOVERN-1.3': 'PASS',
      'MAP-1.1': 'PASS', 'MAP-1.2': 'PASS', 'MAP-2.3': 'PASS', 'MAP-3.4': 'PASS',
      'MEASURE-1.1': 'PASS', 'MEASURE-1.2': 'PASS', 'MEASURE-2.1': 'PASS',
      'MEASURE-2.2': 'PASS', 'MEASURE-2.3': 'PASS', 'MEASURE-3.1': 'PASS',
      'MEASURE-3.2': 'PASS', 'MEASURE-4.1': 'PASS', 'MANAGE-1.1': 'PASS',
      'MANAGE-1.2': 'PASS', 'MANAGE-2.1': 'PASS', 'MANAGE-2.2': 'PASS',
      'MANAGE-3.1': 'PASS', 'MANAGE-4.1': 'PASS'
    },
    test_dataset_size: 2500,
    execution_time_seconds: 340,
    created_at: '2025-12-26T05:15:00Z'
  },
  // Claude Opus 4.5 Scan
  {
    id: 7,
    model_id: 6,
    scan_date: '2025-12-26T05:45:00Z',
    scan_type: 'full',
    status: 'completed',
    security_score: 97,
    fairness_score: 95,
    robustness_score: 96,
    overall_score: 96,
    security_details: {
      promptInjectionRate: 3,
      jailbreakAttempts: 250,
      blockedCount: 243,
      vulnerabilities: []
    },
    fairness_details: {
      demographicParity: 0.02,
      genderBias: 0.01,
      raceBias: 0.02,
      ageGroupBias: 0.02,
      biasBreakdown: [
        { group: 'Gender: Male', metric: 0.50, status: 'pass' },
        { group: 'Gender: Female', metric: 0.50, status: 'pass' },
        { group: 'All Demographics', metric: 0.50, status: 'pass' }
      ]
    },
    robustness_details: {
      semanticStability: 0.97,
      typoResistance: 0.96,
      adversarialResistance: 0.95,
      testCases: [
        {
          original: 'Develop strategic business framework',
          perturbed: 'Devlop stratgic busness framwork',
          similarity: 0.97
        }
      ]
    },
    nist_mapping: {
      'GOVERN-1.1': 'PASS', 'GOVERN-1.2': 'PASS', 'GOVERN-1.3': 'PASS',
      'MAP-1.1': 'PASS', 'MAP-1.2': 'PASS', 'MAP-2.3': 'PASS', 'MAP-3.4': 'PASS',
      'MEASURE-1.1': 'PASS', 'MEASURE-1.2': 'PASS', 'MEASURE-2.1': 'PASS',
      'MEASURE-2.2': 'PASS', 'MEASURE-2.3': 'PASS', 'MEASURE-3.1': 'PASS',
      'MEASURE-3.2': 'PASS', 'MEASURE-4.1': 'PASS', 'MANAGE-1.1': 'PASS',
      'MANAGE-1.2': 'PASS', 'MANAGE-2.1': 'PASS', 'MANAGE-2.2': 'PASS',
      'MANAGE-3.1': 'PASS', 'MANAGE-4.1': 'PASS'
    },
    test_dataset_size: 3000,
    execution_time_seconds: 380,
    created_at: '2025-12-26T05:45:00Z'
  },
  // Grok 4.1 Fast Scan
  {
    id: 8,
    model_id: 7,
    scan_date: '2025-12-26T06:15:00Z',
    scan_type: 'full',
    status: 'completed',
    security_score: 91,
    fairness_score: 88,
    robustness_score: 93,
    overall_score: 91,
    security_details: {
      promptInjectionRate: 9,
      jailbreakAttempts: 180,
      blockedCount: 164,
      vulnerabilities: [
        {
          type: 'Real-time Data Injection',
          severity: 'medium',
          description: 'Potential risks with real-time external data integration'
        }
      ]
    },
    fairness_details: {
      demographicParity: 0.07,
      genderBias: 0.05,
      raceBias: 0.08,
      ageGroupBias: 0.06,
      biasBreakdown: [
        { group: 'Gender: Male', metric: 0.53, status: 'pass' },
        { group: 'Gender: Female', metric: 0.47, status: 'pass' },
        { group: 'Race: Diverse', metric: 0.49, status: 'pass' }
      ]
    },
    robustness_details: {
      semanticStability: 0.93,
      typoResistance: 0.92,
      adversarialResistance: 0.91,
      testCases: [
        {
          original: 'Real-time market analysis',
          perturbed: 'Realtime marktet analisys',
          similarity: 0.93
        }
      ]
    },
    nist_mapping: {
      'GOVERN-1.1': 'PASS', 'GOVERN-1.2': 'PASS', 'GOVERN-1.3': 'PASS',
      'MAP-1.1': 'PASS', 'MAP-1.2': 'PASS', 'MAP-2.3': 'PASS', 'MAP-3.4': 'PASS',
      'MEASURE-1.1': 'PASS', 'MEASURE-1.2': 'WARNING', 'MEASURE-2.1': 'PASS',
      'MEASURE-2.2': 'PASS', 'MEASURE-2.3': 'PASS', 'MEASURE-3.1': 'PASS',
      'MEASURE-3.2': 'PASS', 'MEASURE-4.1': 'PASS', 'MANAGE-1.1': 'PASS',
      'MANAGE-1.2': 'PASS', 'MANAGE-2.1': 'WARNING', 'MANAGE-2.2': 'PASS',
      'MANAGE-3.1': 'PASS', 'MANAGE-4.1': 'PASS'
    },
    test_dataset_size: 1800,
    execution_time_seconds: 195,
    created_at: '2025-12-26T06:15:00Z'
  },
  // DeepSeek R1 Scan
  {
    id: 9,
    model_id: 8,
    scan_date: '2025-12-26T06:45:00Z',
    scan_type: 'full',
    status: 'completed',
    security_score: 89,
    fairness_score: 91,
    robustness_score: 94,
    overall_score: 91,
    security_details: {
      promptInjectionRate: 11,
      jailbreakAttempts: 160,
      blockedCount: 142,
      vulnerabilities: [
        {
          type: 'Research Data Exposure',
          severity: 'low',
          description: 'Minor risk of exposing research methodologies'
        }
      ]
    },
    fairness_details: {
      demographicParity: 0.06,
      genderBias: 0.04,
      raceBias: 0.07,
      ageGroupBias: 0.05,
      biasBreakdown: [
        { group: 'Gender: Male', metric: 0.52, status: 'pass' },
        { group: 'Gender: Female', metric: 0.48, status: 'pass' },
        { group: 'Academic Background', metric: 0.50, status: 'pass' }
      ]
    },
    robustness_details: {
      semanticStability: 0.94,
      typoResistance: 0.93,
      adversarialResistance: 0.92,
      testCases: [
        {
          original: 'Conduct scientific literature review',
          perturbed: 'Condct scintific litarature revew',
          similarity: 0.94
        }
      ]
    },
    nist_mapping: {
      'GOVERN-1.1': 'PASS', 'GOVERN-1.2': 'PASS', 'GOVERN-1.3': 'PASS',
      'MAP-1.1': 'PASS', 'MAP-1.2': 'PASS', 'MAP-2.3': 'PASS', 'MAP-3.4': 'PASS',
      'MEASURE-1.1': 'PASS', 'MEASURE-1.2': 'PASS', 'MEASURE-2.1': 'PASS',
      'MEASURE-2.2': 'PASS', 'MEASURE-2.3': 'PASS', 'MEASURE-3.1': 'PASS',
      'MEASURE-3.2': 'PASS', 'MEASURE-4.1': 'PASS', 'MANAGE-1.1': 'PASS',
      'MANAGE-1.2': 'PASS', 'MANAGE-2.1': 'PASS', 'MANAGE-2.2': 'PASS',
      'MANAGE-3.1': 'PASS', 'MANAGE-4.1': 'PASS'
    },
    test_dataset_size: 2200,
    execution_time_seconds: 290,
    created_at: '2025-12-26T06:45:00Z'
  }
];

// Helper functions
export const getMockAIModel = (id: number): AIModel | undefined => {
  return mockAIModels.find(model => model.id === id);
};

export const getMockScanResults = (modelId: number): ScanResult[] => {
  return mockScanResults.filter(result => result.model_id === modelId);
};

export const getMockLatestScan = (modelId: number): ScanResult | undefined => {
  const results = getMockScanResults(modelId);
  return results.sort((a, b) => 
    new Date(b.scan_date).getTime() - new Date(a.scan_date).getTime()
  )[0];
};

export const getMockUserModels = (userId: number): AIModel[] => {
  return mockAIModels.filter(model => model.user_id === userId);
};

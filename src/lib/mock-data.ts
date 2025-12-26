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

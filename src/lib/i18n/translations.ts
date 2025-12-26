export const translations = {
  ko: {
    // Navigation
    nav: {
      dashboard: '대시보드',
      projects: '프로젝트',
      reports: '리포트',
    },
    
    // Dashboard
    dashboard: {
      title: 'NIST AI Auditor',
      subtitle: '자동화된 AI 컴플라이언스 감사',
      registeredModels: '등록된 모델',
      completedScans: '완료된 스캔',
      averageScore: '평균 점수',
      risksDetected: '위험 감지',
      recentScans: '최근 스캔 결과',
      activeModels: '활성 AI 모델',
      viewDetails: '상세보기',
      startScan: '스캔 시작',
    },
    
    // Projects
    projects: {
      title: 'AI 모델 프로젝트',
      subtitle: '등록된 AI 모델을 관리하고 컴플라이언스 스캔을 실행하세요',
      registerNew: '새 모델 등록',
      active: '활성',
      inactive: '비활성',
      details: '상세 정보',
      newScan: '새 스캔 시작',
      viewResult: '최근 결과 보기',
      scanHistory: '스캔 히스토리',
      backToList: '프로젝트 목록으로',
    },
    
    // Scan Results
    scan: {
      title: '스캔 결과 상세',
      overallScore: '전체 점수',
      security: '보안성',
      fairness: '공정성',
      robustness: '견고성',
      downloadPdf: 'PDF 다운로드',
      rescan: '재스캔',
      testDataset: '테스트 데이터셋',
      executionTime: '실행 시간',
      status: '상태',
      samples: '샘플',
      seconds: '초',
      
      // Status
      completed: '완료',
      running: '실행중',
      failed: '실패',
      pending: '대기중',
      
      // Security Details
      securityDetails: '보안성 상세',
      promptInjectionResistance: '프롬프트 인젝션 저항률',
      jailbreakAttempts: '탈옥 시도 횟수',
      blockedCount: '차단 성공 횟수',
      vulnerabilitiesFound: '발견된 취약점',
      
      // Fairness Details
      fairnessDetails: '공정성 상세',
      demographicParity: '인구통계학적 균등성',
      genderBias: '성별 편향 지수',
      raceBias: '인종 편향 지수',
      groupAnalysis: '집단별 분석',
      
      // Robustness Details
      robustnessDetails: '견고성 상세',
      semanticStability: '의미론적 안정성',
      typoResistance: '오타 저항성',
      adversarialResistance: '적대적 공격 저항성',
      testCases: '테스트 케이스 샘플',
      similarity: '유사도',
      original: '원본',
      perturbed: '변형',
      
      // NIST Mapping
      nistMapping: 'NIST AI RMF 1.0 맵핑 결과',
      nistDescription: 'NIST AI RMF (Risk Management Framework)는 AI 시스템의 신뢰성과 안전성을 평가하기 위한 미국 국립표준기술연구소의 프레임워크입니다. 각 항목은 AI 거버넌스의 핵심 요소를 나타냅니다.',
    },
    
    // Model Info
    model: {
      basicInfo: '기본 정보',
      modelType: '모델 타입',
      apiProvider: 'API 제공자',
      modelId: '모델 ID',
      industry: '산업군',
      regulatoryScope: '규제 범위',
      createdAt: '생성일',
      lastUpdated: '최종 수정',
    },
    
    // Common
    common: {
      score: '점',
      pass: 'PASS',
      fail: 'FAIL',
      warning: 'WARNING',
      notTested: 'NOT_TESTED',
    },
  },
  
  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      projects: 'Projects',
      reports: 'Reports',
    },
    
    // Dashboard
    dashboard: {
      title: 'NIST AI Auditor',
      subtitle: 'Automated AI Compliance Audit',
      registeredModels: 'Registered Models',
      completedScans: 'Completed Scans',
      averageScore: 'Average Score',
      risksDetected: 'Risks Detected',
      recentScans: 'Recent Scan Results',
      activeModels: 'Active AI Models',
      viewDetails: 'View Details',
      startScan: 'Start Scan',
    },
    
    // Projects
    projects: {
      title: 'AI Model Projects',
      subtitle: 'Manage registered AI models and run compliance scans',
      registerNew: 'Register New Model',
      active: 'Active',
      inactive: 'Inactive',
      details: 'Details',
      newScan: 'Start New Scan',
      viewResult: 'View Latest Result',
      scanHistory: 'Scan History',
      backToList: 'Back to Projects',
    },
    
    // Scan Results
    scan: {
      title: 'Scan Result Details',
      overallScore: 'Overall Score',
      security: 'Security',
      fairness: 'Fairness',
      robustness: 'Robustness',
      downloadPdf: 'Download PDF',
      rescan: 'Rescan',
      testDataset: 'Test Dataset',
      executionTime: 'Execution Time',
      status: 'Status',
      samples: 'samples',
      seconds: 'seconds',
      
      // Status
      completed: 'Completed',
      running: 'Running',
      failed: 'Failed',
      pending: 'Pending',
      
      // Security Details
      securityDetails: 'Security Details',
      promptInjectionResistance: 'Prompt Injection Resistance',
      jailbreakAttempts: 'Jailbreak Attempts',
      blockedCount: 'Blocked Count',
      vulnerabilitiesFound: 'Vulnerabilities Found',
      
      // Fairness Details
      fairnessDetails: 'Fairness Details',
      demographicParity: 'Demographic Parity',
      genderBias: 'Gender Bias',
      raceBias: 'Race Bias',
      groupAnalysis: 'Group Analysis',
      
      // Robustness Details
      robustnessDetails: 'Robustness Details',
      semanticStability: 'Semantic Stability',
      typoResistance: 'Typo Resistance',
      adversarialResistance: 'Adversarial Resistance',
      testCases: 'Test Cases',
      similarity: 'Similarity',
      original: 'Original',
      perturbed: 'Perturbed',
      
      // NIST Mapping
      nistMapping: 'NIST AI RMF 1.0 Mapping Results',
      nistDescription: 'NIST AI RMF (Risk Management Framework) is a framework by the National Institute of Standards and Technology for evaluating the trustworthiness and safety of AI systems. Each item represents a core element of AI governance.',
    },
    
    // Model Info
    model: {
      basicInfo: 'Basic Information',
      modelType: 'Model Type',
      apiProvider: 'API Provider',
      modelId: 'Model ID',
      industry: 'Industry',
      regulatoryScope: 'Regulatory Scope',
      createdAt: 'Created At',
      lastUpdated: 'Last Updated',
    },
    
    // Common
    common: {
      score: 'pts',
      pass: 'PASS',
      fail: 'FAIL',
      warning: 'WARNING',
      notTested: 'NOT_TESTED',
    },
  },
};

export type Language = 'ko' | 'en';

export function getTranslation(lang: Language) {
  return translations[lang];
}

import type { ScanResult, AIModel } from '../types'

// Navigation Header Component
export function NavHeader(props: { active: 'dashboard' | 'projects' | 'reports' }) {
  return (
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <i class="fas fa-shield-alt text-3xl text-blue-600"></i>
            <h1 class="text-2xl font-bold text-gray-900">NIST AI Auditor</h1>
          </div>
          <nav class="flex space-x-6">
            <a href="/" class={props.active === 'dashboard' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}>
              <i class="fas fa-home mr-2"></i>대시보드
            </a>
            <a href="/projects" class={props.active === 'projects' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}>
              <i class="fas fa-project-diagram mr-2"></i>프로젝트
            </a>
            <a href="/reports" class={props.active === 'reports' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}>
              <i class="fas fa-file-pdf mr-2"></i>리포트
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

// Scan Result Detail Page
export function ScanDetailPage(props: { scan: ScanResult; model: AIModel }) {
  const { scan, model } = props
  
  return (
    <div class="min-h-screen">
      <NavHeader active="projects" />
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div class="mb-6">
          <a href="/projects" class="text-blue-600 hover:underline">
            <i class="fas fa-arrow-left mr-2"></i>
            프로젝트 목록으로
          </a>
          <span class="mx-2 text-gray-400">/</span>
          <a href={`/projects/${model.id}`} class="text-blue-600 hover:underline">
            {model.name}
          </a>
        </div>

        {/* Scan Header */}
        <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">스캔 결과 상세</h2>
              <p class="text-gray-600">
                {new Date(scan.scan_date).toLocaleString('ko-KR')} • {scan.scan_type} 스캔
              </p>
            </div>
            <div class="flex space-x-3">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <i class="fas fa-download mr-2"></i>
                PDF 다운로드
              </button>
              <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                <i class="fas fa-redo mr-2"></i>
                재스캔
              </button>
            </div>
          </div>

          {/* Overall Score */}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="col-span-1 flex items-center justify-center">
              <div class="text-center">
                <div class={`score-circle ${
                  scan.overall_score! >= 80 ? 'bg-green-100 text-green-600' :
                  scan.overall_score! >= 60 ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {scan.overall_score}
                </div>
                <p class="text-sm text-gray-600 mt-3 font-semibold">전체 점수</p>
              </div>
            </div>
            
            <div class="col-span-3 grid grid-cols-3 gap-4">
              {scan.security_score && (
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <i class="fas fa-shield-alt text-2xl text-blue-600"></i>
                    <span class="text-3xl font-bold text-blue-600">{scan.security_score}</span>
                  </div>
                  <p class="text-sm font-semibold text-gray-700">보안성</p>
                  <div class="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-600 h-2 rounded-full" 
                      style={`width: ${scan.security_score}%`}
                    ></div>
                  </div>
                </div>
              )}
              
              {scan.fairness_score && (
                <div class="bg-green-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <i class="fas fa-balance-scale text-2xl text-green-600"></i>
                    <span class="text-3xl font-bold text-green-600">{scan.fairness_score}</span>
                  </div>
                  <p class="text-sm font-semibold text-gray-700">공정성</p>
                  <div class="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-green-600 h-2 rounded-full" 
                      style={`width: ${scan.fairness_score}%`}
                    ></div>
                  </div>
                </div>
              )}
              
              {scan.robustness_score && (
                <div class="bg-purple-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <i class="fas fa-hammer text-2xl text-purple-600"></i>
                    <span class="text-3xl font-bold text-purple-600">{scan.robustness_score}</span>
                  </div>
                  <p class="text-sm font-semibold text-gray-700">견고성</p>
                  <div class="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-purple-600 h-2 rounded-full" 
                      style={`width: ${scan.robustness_score}%`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Execution Info */}
          <div class="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg text-sm">
            <div>
              <span class="text-gray-600">테스트 데이터셋:</span>
              <span class="ml-2 font-semibold">{scan.test_dataset_size?.toLocaleString()} 샘플</span>
            </div>
            <div>
              <span class="text-gray-600">실행 시간:</span>
              <span class="ml-2 font-semibold">{scan.execution_time_seconds}초</span>
            </div>
            <div>
              <span class="text-gray-600">상태:</span>
              <span class={`ml-2 px-2 py-1 rounded font-semibold ${
                scan.status === 'completed' ? 'bg-green-100 text-green-800' :
                scan.status === 'running' ? 'bg-blue-100 text-blue-800' :
                scan.status === 'failed' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {scan.status === 'completed' ? '완료' :
                 scan.status === 'running' ? '실행중' :
                 scan.status === 'failed' ? '실패' : '대기중'}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Security Details */}
          {scan.security_details && (
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                <i class="fas fa-shield-alt mr-2 text-blue-600"></i>
                보안성 상세
              </h3>
              
              <div class="space-y-4 mb-6">
                <div class="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span class="text-gray-700">프롬프트 인젝션 저항률</span>
                  <span class="font-bold text-blue-600">
                    {100 - scan.security_details.promptInjectionRate}%
                  </span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span class="text-gray-700">탈옥 시도 횟수</span>
                  <span class="font-bold">{scan.security_details.jailbreakAttempts}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span class="text-gray-700">차단 성공 횟수</span>
                  <span class="font-bold text-green-600">{scan.security_details.blockedCount}</span>
                </div>
              </div>

              <h4 class="font-semibold text-gray-900 mb-3">발견된 취약점</h4>
              <div class="space-y-2">
                {scan.security_details.vulnerabilities.map(vuln => (
                  <div class={`border-l-4 pl-4 py-2 ${
                    vuln.severity === 'critical' ? 'border-red-600 bg-red-50' :
                    vuln.severity === 'high' ? 'border-orange-600 bg-orange-50' :
                    vuln.severity === 'medium' ? 'border-yellow-600 bg-yellow-50' :
                    'border-blue-600 bg-blue-50'
                  }`}>
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="font-semibold text-gray-900">{vuln.type}</p>
                        <p class="text-sm text-gray-600 mt-1">{vuln.description}</p>
                      </div>
                      <span class={`px-2 py-1 rounded text-xs font-semibold ${
                        vuln.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        vuln.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        vuln.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {vuln.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fairness Details */}
          {scan.fairness_details && (
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                <i class="fas fa-balance-scale mr-2 text-green-600"></i>
                공정성 상세
              </h3>
              
              <div class="space-y-4 mb-6">
                <div class="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span class="text-gray-700">인구통계학적 균등성</span>
                  <span class="font-bold text-green-600">
                    {(1 - scan.fairness_details.demographicParity).toFixed(2)}
                  </span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span class="text-gray-700">성별 편향 지수</span>
                  <span class="font-bold">{scan.fairness_details.genderBias.toFixed(2)}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span class="text-gray-700">인종 편향 지수</span>
                  <span class="font-bold">{scan.fairness_details.raceBias.toFixed(2)}</span>
                </div>
              </div>

              <h4 class="font-semibold text-gray-900 mb-3">집단별 분석</h4>
              <div class="space-y-2">
                {scan.fairness_details.biasBreakdown.map(bias => (
                  <div class="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                    <div class="flex-1">
                      <span class="text-sm text-gray-700">{bias.group}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          class="bg-green-600 h-2 rounded-full" 
                          style={`width: ${bias.metric * 100}%`}
                        ></div>
                      </div>
                      <span class="text-sm font-semibold w-12 text-right">
                        {(bias.metric * 100).toFixed(0)}%
                      </span>
                      <span class={`px-2 py-1 rounded text-xs font-semibold ${
                        bias.status === 'pass' ? 'bg-green-100 text-green-800' :
                        bias.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {bias.status === 'pass' ? 'PASS' :
                         bias.status === 'warning' ? 'WARN' : 'FAIL'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Robustness Details */}
        {scan.robustness_details && (
          <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              <i class="fas fa-hammer mr-2 text-purple-600"></i>
              견고성 상세
            </h3>
            
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="p-4 bg-purple-50 rounded-lg text-center">
                <p class="text-sm text-gray-600 mb-2">의미론적 안정성</p>
                <p class="text-3xl font-bold text-purple-600">
                  {(scan.robustness_details.semanticStability * 100).toFixed(0)}%
                </p>
              </div>
              <div class="p-4 bg-purple-50 rounded-lg text-center">
                <p class="text-sm text-gray-600 mb-2">오타 저항성</p>
                <p class="text-3xl font-bold text-purple-600">
                  {(scan.robustness_details.typoResistance * 100).toFixed(0)}%
                </p>
              </div>
              {scan.robustness_details.adversarialResistance && (
                <div class="p-4 bg-purple-50 rounded-lg text-center">
                  <p class="text-sm text-gray-600 mb-2">적대적 공격 저항성</p>
                  <p class="text-3xl font-bold text-purple-600">
                    {(scan.robustness_details.adversarialResistance * 100).toFixed(0)}%
                  </p>
                </div>
              )}
            </div>

            <h4 class="font-semibold text-gray-900 mb-3">테스트 케이스 샘플</h4>
            <div class="space-y-3">
              {scan.robustness_details.testCases.map((testCase, index) => (
                <div class="border rounded-lg p-4 bg-gray-50">
                  <div class="flex justify-between items-start mb-2">
                    <span class="text-xs font-semibold text-gray-500">Test #{index + 1}</span>
                    <span class={`px-2 py-1 rounded text-xs font-semibold ${
                      testCase.similarity >= 0.9 ? 'bg-green-100 text-green-800' :
                      testCase.similarity >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      유사도: {(testCase.similarity * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p class="text-gray-600 mb-1">원본:</p>
                      <p class="text-gray-900 italic">"{testCase.original}"</p>
                    </div>
                    <div>
                      <p class="text-gray-600 mb-1">변형:</p>
                      <p class="text-gray-900 italic">"{testCase.perturbed}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NIST Mapping */}
        {scan.nist_mapping && (
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              <i class="fas fa-clipboard-check mr-2 text-indigo-600"></i>
              NIST AI RMF 1.0 맵핑 결과
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(scan.nist_mapping).map(([key, value]) => (
                <div class={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                  value === 'PASS' ? 'border-green-500 bg-green-50' :
                  value === 'FAIL' ? 'border-red-500 bg-red-50' :
                  value === 'WARNING' ? 'border-yellow-500 bg-yellow-50' :
                  'border-gray-500 bg-gray-50'
                }`}>
                  <span class="font-mono text-sm font-semibold text-gray-700">{key}</span>
                  <span class={`px-3 py-1 rounded-full text-xs font-bold ${
                    value === 'PASS' ? 'bg-green-100 text-green-800' :
                    value === 'FAIL' ? 'bg-red-100 text-red-800' :
                    value === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
              <p class="text-sm text-blue-900">
                <i class="fas fa-info-circle mr-2"></i>
                <strong>NIST AI RMF (Risk Management Framework)</strong>는 AI 시스템의 신뢰성과 안전성을 
                평가하기 위한 미국 국립표준기술연구소의 프레임워크입니다. 각 항목은 AI 거버넌스의 핵심 요소를 나타냅니다.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

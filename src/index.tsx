import { Hono } from 'hono'
import { renderer } from './renderer'
import { cors } from 'hono/cors'
import type { CloudflareBindings } from './types'
import { mockAIModels, mockScanResults, getMockLatestScan, getMockScanResults } from './lib/mock-data'
import { ScanDetailPage } from './routes/scan-detail'
import { getLanguageFromCookie, setLanguageCookie } from './lib/i18n/utils'
import { getTranslation, type Language } from './lib/i18n/translations'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { NavHeader } from './components/NavHeader'

const app = new Hono<{ Bindings: CloudflareBindings }>()

// Middleware
app.use(renderer)
app.use('/api/*', cors())

// Language middleware
app.use('*', async (c, next) => {
  const queryLang = c.req.query('lang') as Language | undefined;
  if (queryLang && (queryLang === 'ko' || queryLang === 'en')) {
    setLanguageCookie(c, queryLang);
  }
  await next();
})

// Home - Dashboard
app.get('/', (c) => {
  const lang = getLanguageFromCookie(c);
  const t = getTranslation(lang);
  const models = mockAIModels;
  const recentScans = mockScanResults.slice(0, 5);
  
  return c.render(
    <div class="min-h-screen">
      {/* Header */}
      <header class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <i class="fas fa-shield-alt text-3xl text-blue-600"></i>
              <h1 class="text-2xl font-bold text-gray-900">NIST AI Auditor</h1>
            </div>
            <nav class="flex space-x-6">
              <a href="/" class="text-blue-600 font-semibold">
                <i class="fas fa-home mr-2"></i>대시보드
              </a>
              <a href="/projects" class="text-gray-600 hover:text-blue-600">
                <i class="fas fa-project-diagram mr-2"></i>프로젝트
              </a>
              <a href="/reports" class="text-gray-600 hover:text-blue-600">
                <i class="fas fa-file-pdf mr-2"></i>리포트
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">등록된 모델</p>
                <p class="text-3xl font-bold text-gray-900">{models.length}</p>
              </div>
              <div class="bg-blue-100 rounded-full p-3">
                <i class="fas fa-robot text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">완료된 스캔</p>
                <p class="text-3xl font-bold text-gray-900">{mockScanResults.length}</p>
              </div>
              <div class="bg-green-100 rounded-full p-3">
                <i class="fas fa-check-circle text-2xl text-green-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">평균 점수</p>
                <p class="text-3xl font-bold text-gray-900">83</p>
              </div>
              <div class="bg-yellow-100 rounded-full p-3">
                <i class="fas fa-star text-2xl text-yellow-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">위험 감지</p>
                <p class="text-3xl font-bold text-red-600">3</p>
              </div>
              <div class="bg-red-100 rounded-full p-3">
                <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Scans */}
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-bold text-gray-900">
                <i class="fas fa-history mr-2 text-blue-600"></i>
                최근 스캔 결과
              </h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                {recentScans.map(scan => {
                  const model = models.find(m => m.id === scan.model_id);
                  return (
                    <div class="border-l-4 border-blue-500 pl-4 py-2">
                      <div class="flex justify-between items-start">
                        <div>
                          <p class="font-semibold text-gray-900">{model?.name}</p>
                          <p class="text-sm text-gray-600">
                            {new Date(scan.scan_date).toLocaleDateString('ko-KR')} • {scan.scan_type}
                          </p>
                        </div>
                        <span class={`px-3 py-1 rounded-full text-sm font-semibold ${
                          scan.overall_score! >= 80 ? 'bg-green-100 text-green-800' :
                          scan.overall_score! >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {scan.overall_score}점
                        </span>
                      </div>
                      <a href={`/scan/${scan.id}`} class="text-sm text-blue-600 hover:underline mt-2 inline-block">
                        상세보기 →
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Models */}
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-bold text-gray-900">
                <i class="fas fa-robot mr-2 text-blue-600"></i>
                활성 AI 모델
              </h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                {models.filter(m => m.status === 'active').map(model => {
                  const latestScan = getMockLatestScan(model.id);
                  return (
                    <div class="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                      <div class="flex justify-between items-start mb-2">
                        <div>
                          <p class="font-semibold text-gray-900">{model.name}</p>
                          <p class="text-sm text-gray-600">{model.api_provider} • {model.model_id}</p>
                        </div>
                        {latestScan && (
                          <span class={`px-2 py-1 rounded text-xs font-semibold ${
                            latestScan.overall_score! >= 80 ? 'bg-green-100 text-green-800' :
                            latestScan.overall_score! >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {latestScan.overall_score}점
                          </span>
                        )}
                      </div>
                      <p class="text-sm text-gray-600 mb-3">{model.description}</p>
                      <div class="flex space-x-2">
                        <a href={`/projects/${model.id}`} class="text-sm text-blue-600 hover:underline">
                          상세보기
                        </a>
                        <span class="text-gray-300">|</span>
                        <a href={`/scan/new?model=${model.id}`} class="text-sm text-green-600 hover:underline">
                          <i class="fas fa-play-circle mr-1"></i>스캔 시작
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
})

// Projects List
app.get('/projects', (c) => {
  const models = mockAIModels;
  
  return c.render(
    <div class="min-h-screen">
      {/* Header */}
      <header class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <i class="fas fa-shield-alt text-3xl text-blue-600"></i>
              <h1 class="text-2xl font-bold text-gray-900">NIST AI Auditor</h1>
            </div>
            <nav class="flex space-x-6">
              <a href="/" class="text-gray-600 hover:text-blue-600">
                <i class="fas fa-home mr-2"></i>대시보드
              </a>
              <a href="/projects" class="text-blue-600 font-semibold">
                <i class="fas fa-project-diagram mr-2"></i>프로젝트
              </a>
              <a href="/reports" class="text-gray-600 hover:text-blue-600">
                <i class="fas fa-file-pdf mr-2"></i>리포트
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-6 flex justify-between items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900">AI 모델 프로젝트</h2>
            <p class="text-gray-600 mt-1">등록된 AI 모델을 관리하고 컴플라이언스 스캔을 실행하세요</p>
          </div>
          <a href="/projects/new" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <i class="fas fa-plus mr-2"></i>
            새 모델 등록
          </a>
        </div>

        <div class="grid grid-cols-1 gap-6">
          {models.map(model => {
            const latestScan = getMockLatestScan(model.id);
            const scanHistory = getMockScanResults(model.id);
            
            return (
              <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3 mb-2">
                        <h3 class="text-2xl font-bold text-gray-900">{model.name}</h3>
                        <span class={`px-3 py-1 rounded-full text-sm font-semibold ${
                          model.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {model.status === 'active' ? '활성' : '비활성'}
                        </span>
                      </div>
                      <p class="text-gray-600 mb-3">{model.description}</p>
                      <div class="flex flex-wrap gap-2 text-sm">
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          <i class="fas fa-cog mr-1"></i>{model.api_provider}
                        </span>
                        <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                          <i class="fas fa-industry mr-1"></i>{model.industry}
                        </span>
                        <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                          <i class="fas fa-microchip mr-1"></i>{model.model_id}
                        </span>
                      </div>
                    </div>
                    {latestScan && (
                      <div class="text-right ml-6">
                        <p class="text-sm text-gray-600 mb-2">최근 스캔 점수</p>
                        <div class="text-4xl font-bold" style={`color: ${
                          latestScan.overall_score! >= 80 ? '#10b981' :
                          latestScan.overall_score! >= 60 ? '#f59e0b' :
                          '#ef4444'
                        }`}>
                          {latestScan.overall_score}
                        </div>
                        <p class="text-sm text-gray-500 mt-1">
                          {new Date(latestScan.scan_date).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    )}
                  </div>

                  {latestScan && (
                    <div class="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p class="text-sm text-gray-600 mb-1">보안성</p>
                        <div class="flex items-center">
                          <div class="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              class="bg-blue-600 h-2 rounded-full" 
                              style={`width: ${latestScan.security_score}%`}
                            ></div>
                          </div>
                          <span class="text-sm font-semibold">{latestScan.security_score}</span>
                        </div>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600 mb-1">편향성</p>
                        <div class="flex items-center">
                          <div class="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              class="bg-green-600 h-2 rounded-full" 
                              style={`width: ${latestScan.fairness_score}%`}
                            ></div>
                          </div>
                          <span class="text-sm font-semibold">{latestScan.fairness_score}</span>
                        </div>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600 mb-1">견고성</p>
                        <div class="flex items-center">
                          <div class="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              class="bg-purple-600 h-2 rounded-full" 
                              style={`width: ${latestScan.robustness_score}%`}
                            ></div>
                          </div>
                          <span class="text-sm font-semibold">{latestScan.robustness_score}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div class="flex space-x-3">
                    <a 
                      href={`/projects/${model.id}`} 
                      class="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <i class="fas fa-info-circle mr-2"></i>
                      상세 정보
                    </a>
                    <a 
                      href={`/scan/new?model=${model.id}`} 
                      class="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <i class="fas fa-play-circle mr-2"></i>
                      새 스캔 시작
                    </a>
                    {latestScan && (
                      <a 
                        href={`/scan/${latestScan.id}`} 
                        class="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <i class="fas fa-chart-bar mr-2"></i>
                        최근 결과 보기
                      </a>
                    )}
                  </div>

                  {scanHistory.length > 0 && (
                    <div class="mt-4 pt-4 border-t border-gray-200">
                      <p class="text-sm text-gray-600 mb-2">
                        <i class="fas fa-history mr-2"></i>
                        스캔 히스토리 ({scanHistory.length}건)
                      </p>
                      <div class="flex space-x-2 overflow-x-auto">
                        {scanHistory.map(scan => (
                          <a 
                            href={`/scan/${scan.id}`}
                            class="text-sm px-3 py-1 bg-gray-100 hover:bg-blue-100 rounded whitespace-nowrap"
                          >
                            {new Date(scan.scan_date).toLocaleDateString('ko-KR')} - {scan.overall_score}점
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  )
})

// Project Detail
app.get('/projects/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const model = mockAIModels.find(m => m.id === id);
  
  if (!model) {
    return c.text('Model not found', 404);
  }
  
  const scanHistory = getMockScanResults(model.id);
  const latestScan = getMockLatestScan(model.id);
  
  return c.render(
    <div class="min-h-screen">
      {/* Header */}
      <header class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <i class="fas fa-shield-alt text-3xl text-blue-600"></i>
              <h1 class="text-2xl font-bold text-gray-900">NIST AI Auditor</h1>
            </div>
            <nav class="flex space-x-6">
              <a href="/" class="text-gray-600 hover:text-blue-600">
                <i class="fas fa-home mr-2"></i>대시보드
              </a>
              <a href="/projects" class="text-blue-600 font-semibold">
                <i class="fas fa-project-diagram mr-2"></i>프로젝트
              </a>
              <a href="/reports" class="text-gray-600 hover:text-blue-600">
                <i class="fas fa-file-pdf mr-2"></i>리포트
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-6">
          <a href="/projects" class="text-blue-600 hover:underline">
            <i class="fas fa-arrow-left mr-2"></i>
            프로젝트 목록으로
          </a>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">{model.name}</h2>
              <p class="text-gray-600 mb-4">{model.description}</p>
            </div>
            <span class={`px-4 py-2 rounded-full text-sm font-semibold ${
              model.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {model.status === 'active' ? '활성' : '비활성'}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">
                <i class="fas fa-info-circle mr-2 text-blue-600"></i>
                기본 정보
              </h3>
              <dl class="space-y-2 text-sm">
                <div class="flex">
                  <dt class="w-32 text-gray-600">모델 타입:</dt>
                  <dd class="text-gray-900 font-medium">{model.model_type}</dd>
                </div>
                <div class="flex">
                  <dt class="w-32 text-gray-600">API 제공자:</dt>
                  <dd class="text-gray-900 font-medium">{model.api_provider}</dd>
                </div>
                <div class="flex">
                  <dt class="w-32 text-gray-600">모델 ID:</dt>
                  <dd class="text-gray-900 font-medium">{model.model_id}</dd>
                </div>
                <div class="flex">
                  <dt class="w-32 text-gray-600">산업군:</dt>
                  <dd class="text-gray-900 font-medium">{model.industry}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">
                <i class="fas fa-gavel mr-2 text-blue-600"></i>
                규제 범위
              </h3>
              <div class="flex flex-wrap gap-2">
                {model.regulatory_scope?.split(',').map(scope => (
                  <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {scope.trim()}
                  </span>
                ))}
              </div>
              <div class="mt-4">
                <p class="text-sm text-gray-600">생성일: {new Date(model.created_at).toLocaleDateString('ko-KR')}</p>
                <p class="text-sm text-gray-600">최종 수정: {new Date(model.updated_at).toLocaleDateString('ko-KR')}</p>
              </div>
            </div>
          </div>

          <div class="flex space-x-3">
            <a 
              href={`/scan/new?model=${model.id}`} 
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i class="fas fa-play-circle mr-2"></i>
              새 스캔 시작
            </a>
            {latestScan && (
              <a 
                href={`/scan/${latestScan.id}`} 
                class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <i class="fas fa-chart-bar mr-2"></i>
                최근 결과 보기
              </a>
            )}
          </div>
        </div>

        {/* Scan History */}
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">
            <i class="fas fa-history mr-2 text-blue-600"></i>
            스캔 히스토리
          </h3>
          
          {scanHistory.length === 0 ? (
            <div class="text-center py-12">
              <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
              <p class="text-gray-600">아직 스캔 결과가 없습니다.</p>
              <a href={`/scan/new?model=${model.id}`} class="text-blue-600 hover:underline mt-2 inline-block">
                첫 스캔 시작하기 →
              </a>
            </div>
          ) : (
            <div class="space-y-4">
              {scanHistory.map(scan => (
                <div class="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <div class="flex justify-between items-center">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3 mb-2">
                        <span class={`px-3 py-1 rounded-full text-sm font-semibold ${
                          scan.status === 'completed' ? 'bg-green-100 text-green-800' :
                          scan.status === 'running' ? 'bg-blue-100 text-blue-800' :
                          scan.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {scan.status === 'completed' ? '완료' :
                           scan.status === 'running' ? '실행중' :
                           scan.status === 'failed' ? '실패' : '대기중'}
                        </span>
                        <span class="text-sm text-gray-600">{scan.scan_type} 스캔</span>
                        <span class="text-sm text-gray-400">•</span>
                        <span class="text-sm text-gray-600">
                          {new Date(scan.scan_date).toLocaleString('ko-KR')}
                        </span>
                      </div>
                      {scan.overall_score && (
                        <div class="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span class="text-gray-600">전체:</span>
                            <span class="ml-2 font-semibold">{scan.overall_score}점</span>
                          </div>
                          {scan.security_score && (
                            <div>
                              <span class="text-gray-600">보안:</span>
                              <span class="ml-2 font-semibold">{scan.security_score}점</span>
                            </div>
                          )}
                          {scan.fairness_score && (
                            <div>
                              <span class="text-gray-600">편향:</span>
                              <span class="ml-2 font-semibold">{scan.fairness_score}점</span>
                            </div>
                          )}
                          {scan.robustness_score && (
                            <div>
                              <span class="text-gray-600">견고:</span>
                              <span class="ml-2 font-semibold">{scan.robustness_score}점</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <a 
                      href={`/scan/${scan.id}`} 
                      class="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      상세보기 →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
})

// Scan Detail
app.get('/scan/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const scan = mockScanResults.find(s => s.id === id);
  
  if (!scan) {
    return c.text('Scan not found', 404);
  }
  
  const model = mockAIModels.find(m => m.id === scan.model_id);
  
  if (!model) {
    return c.text('Model not found', 404);
  }
  
  return c.render(<ScanDetailPage scan={scan} model={model} />)
})

// I18N Demo Page
app.get('/i18n', (c) => {
  // Handle language query parameter with redirect
  const queryLang = c.req.query('lang') as Language | undefined;
  if (queryLang && (queryLang === 'ko' || queryLang === 'en')) {
    setLanguageCookie(c, queryLang);
    return c.redirect('/i18n'); // Redirect to apply cookie
  }
  
  const lang = getLanguageFromCookie(c);
  const t = getTranslation(lang);
  
  return c.render(
    <div class="min-h-screen bg-gray-50">
      <NavHeader active="dashboard" lang={lang} />
      
      <main class="max-w-4xl mx-auto px-4 py-12">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">
            🌏 {lang === 'ko' ? '다국어 지원' : 'Multilingual Support'}
          </h1>
          
          <div class="mb-8">
            <p class="text-lg text-gray-700 mb-4">
              {lang === 'ko' 
                ? 'NIST AI Auditor는 한국어와 영어를 지원합니다.' 
                : 'NIST AI Auditor supports Korean and English.'}
            </p>
            <p class="text-gray-600">
              {lang === 'ko'
                ? '우측 상단의 언어 버튼을 클릭하여 언어를 전환할 수 있습니다.'
                : 'Click the language button in the top right to switch languages.'}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="border-l-4 border-blue-500 pl-4">
              <h3 class="font-bold text-gray-900 mb-2">{t.dashboard.registeredModels}</h3>
              <p class="text-3xl font-bold text-blue-600">4</p>
            </div>
            <div class="border-l-4 border-green-500 pl-4">
              <h3 class="font-bold text-gray-900 mb-2">{t.dashboard.completedScans}</h3>
              <p class="text-3xl font-bold text-green-600">5</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4">
              <h3 class="font-bold text-gray-900 mb-2">{t.scan.security}</h3>
              <p class="text-3xl font-bold text-yellow-600">94{t.common.score}</p>
            </div>
            <div class="border-l-4 border-purple-500 pl-4">
              <h3 class="font-bold text-gray-900 mb-2">{t.scan.fairness}</h3>
              <p class="text-3xl font-bold text-purple-600">89{t.common.score}</p>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 class="font-bold text-blue-900 mb-3">
              {lang === 'ko' ? '지원되는 언어' : 'Supported Languages'}
            </h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <i class="fas fa-check-circle text-green-600 mr-2"></i>
                <span class="text-gray-700">한국어 (Korean)</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-check-circle text-green-600 mr-2"></i>
                <span class="text-gray-700">English</span>
              </li>
            </ul>
          </div>

          <div class="mt-8 flex space-x-4">
            <a 
              href="/" 
              class="flex-1 bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              {t.dashboard.viewDetails}
            </a>
            <a 
              href="/projects" 
              class="flex-1 bg-gray-200 text-gray-700 text-center px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              {t.nav.projects}
            </a>
          </div>
        </div>
      </main>
    </div>
  )
})

export default app

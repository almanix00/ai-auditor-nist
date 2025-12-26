# NIST AI Auditor

## 프로젝트 개요

**NIST AI Auditor**는 AI 모델의 보안성, 편향성, 견고성을 NIST AI RMF 1.0 기준에 따라 측정하고 컴플라이언스 리포트를 생성하는 SaaS형 자동화 감사 도구입니다.

### 핵심 가치
- **NIST AI RMF 1.0 기준**에 따른 기술적 신뢰성 증명
- **자동화된 스캔 엔진**으로 보안, 공정성, 견고성 평가
- **시각화 대시보드**로 컴플라이언스 상태 한눈에 파악
- **EU AI Act** 대응 가능한 감사 증적 생성

## 🌐 배포 URL

### 프로덕션 (Cloudflare Pages)
- **공식 URL**: https://nist-ai-auditor.pages.dev
- **최신 배포**: https://b12e8fe9.nist-ai-auditor.pages.dev

### 개발/샌드박스
- **샌드박스**: https://3000-i9slplb5qmtvp9afvzbr5-dfc00ec5.sandbox.novita.ai

### GitHub 저장소
- **GitHub**: https://github.com/almanix00/ai-auditor-nist

## 🎯 완료된 기능 (Phase 1 - 프로토타입)

### ✅ 1. 대시보드
- 등록된 AI 모델 현황 통계
- 최근 스캔 결과 요약
- 활성 모델 목록 및 빠른 액세스
- 위험 감지 알림

### ✅ 2. 프로젝트 관리
- AI 모델 목록 조회
- 모델 상세 정보 (API 제공자, 산업군, 규제 범위)
- 스캔 히스토리 추적
- 모델별 최신 스캔 점수 표시

### ✅ 3. 스캔 결과 상세
#### 보안성 (Security)
- 프롬프트 인젝션 저항률
- 탈옥(Jailbreak) 시도 차단율
- 발견된 취약점 목록 (심각도별)

#### 공정성 (Fairness)
- 인구통계학적 균등성 지수
- 성별/인종/연령대별 편향 분석
- 집단별 결과 비교 (PASS/WARN/FAIL)

#### 견고성 (Robustness)
- 의미론적 안정성 점수
- 오타 저항성 측정
- 테스트 케이스별 유사도 분석

### ✅ 4. NIST AI RMF 1.0 맵핑
- 21개 NIST 항목별 PASS/FAIL/WARNING 상태
- GOVERN, MAP, MEASURE, MANAGE 카테고리별 분류
- 시각적 컴플라이언스 현황 표시

### ✅ 5. 다국어 지원 🌏
- **한국어/English 완벽 지원**
- 쿠키 기반 언어 설정 저장
- 우측 상단 언어 전환 버튼
- 모든 UI 텍스트 다국어 지원
- 데모 페이지: `/i18n`

## 📊 데이터 아키텍처

### 데이터베이스 (Cloudflare D1)
```sql
- users: 사용자 정보
- ai_models: 등록된 AI 모델 프로젝트
- scan_results: 스캔 결과 및 점수
- test_datasets: 테스트 데이터셋
```

### Mock 데이터
- **11개 최신 AI 모델 (2025)**: 
  - **GPT-4 Healthcare Chatbot** (OpenAI)
  - **GPT-5.2 Advanced Assistant** (OpenAI) - 2025 최신
  - **GPT 5.2 Thinking Mode** (OpenAI) - 사고 과정 시각화
  - **o3 Advanced Reasoning** (OpenAI) - 추론 특화
  - **Gemini 3 Pro** (Google) - 최첨단 추론 모델
  - **Claude Opus 4.5** (Anthropic) - 하이브리드 추론
  - **Grok 4.1 Fast** (xAI) - 실시간 분석
  - **DeepSeek R1** (DeepSeek) - 연구 특화
  - **Llama 4 Maverick** (Meta) - 오픈소스 최고급
  - Resume Screening AI (Custom)
  - Financial Fraud Detector (Custom)
- **9개 스캔 결과**: 보안/공정성/견고성 점수 포함
- **NIST 맵핑 데이터**: 21개 항목별 평가 결과

### 📊 최고 점수 모델 TOP 3
1. **Claude Opus 4.5**: 96점 (보안 97, 공정성 95, 견고성 96)
2. **Gemini 3 Pro**: 94점 (보안 96, 공정성 92, 견고성 95)
3. **GPT-5.2**: 93점 (보안 94, 공정성 89, 견고성 96)

## 🚧 구현 예정 기능 (Phase 2)

### ❌ 백엔드 스캔 엔진 (별도 개발 필요)
- **FastAPI** 기반 백엔드 서버
- **Giskard** 종합 스캔 엔진
- **ART (Adversarial Robustness Toolbox)** 보안 테스트
- **Fairlearn** 편향성 분석
- **Celery** 비동기 작업 처리

### ⏳ 추가 프론트엔드 기능
- 새 모델 등록 화면
- 스캔 시작 UI
- PDF 리포트 생성
- 사용자 인증 시스템

## 💡 사용 가이드

### 프로토타입 데모 사용법

1. **대시보드 확인**
   - 메인 페이지에서 전체 통계 및 최근 스캔 결과 확인

2. **언어 전환** 🌏
   - 우측 상단의 **한국어/English** 버튼 클릭
   - `/i18n` 페이지에서 다국어 기능 체험

3. **프로젝트 관리**
   - "프로젝트" 탭에서 등록된 AI 모델 목록 조회
   - 각 모델 카드 클릭하여 상세 정보 확인

4. **스캔 결과 분석**
   - 프로젝트 상세 페이지에서 "최근 결과 보기" 클릭
   - 보안성/공정성/견고성 점수 및 상세 분석 확인
   - NIST AI RMF 맵핑 결과 검토

5. **컴플라이언스 보고**
   - NIST 항목별 PASS/FAIL 상태 확인
   - (Phase 2) PDF 리포트 다운로드

## 🛠️ 기술 스택

### Frontend
- **Hono** - 경량 웹 프레임워크
- **TypeScript** - 타입 안전성
- **TailwindCSS** - 스타일링
- **Font Awesome** - 아이콘
- **Chart.js** - 차트 시각화 (추가 예정)

### Backend (향후 통합)
- **FastAPI** - Python 백엔드
- **Giskard** - AI 모델 스캔 엔진
- **ART** - 보안 테스트
- **Fairlearn** - 편향성 분석

### Database
- **Cloudflare D1** - SQLite 기반 분산 DB
- **Supabase** (선택사항) - PostgreSQL

### Deployment
- **Cloudflare Pages** - 프론트엔드 배포
- **Railway** (추천) - 백엔드 배포 예정

## 🔄 백엔드 연동 방법 (Phase 2)

### 1. Railway에 FastAPI 백엔드 배포
```bash
# 백엔드 리포지토리 생성
cd /path/to/backend
railway init
railway up
```

### 2. API 엔드포인트 설정
```typescript
// src/lib/config.ts
export const API_BASE_URL = import.meta.env.PROD
  ? 'https://api.nist-auditor.up.railway.app'
  : 'http://localhost:8000'
```

### 3. Mock API를 실제 API로 교체
```typescript
// Before (Mock)
const scanResult = await getMockScanResult(id)

// After (Real API)
const scanResult = await fetch(`${API_BASE_URL}/api/scans/${id}`).then(r => r.json())
```

## 📈 향후 연구 방향

### 박사 논문 활용
1. **새로운 공격 패턴 개발**: 기존 Giskard/ART에 없는 공격 기법 추가
2. **편향성 측정 공식 개선**: Fairlearn을 넘어선 새로운 메트릭 제안
3. **NIST AI RMF 자동 맵핑 알고리즘**: 스캔 결과를 NIST 항목에 자동 매칭

### 비즈니스 확장
- **CI/CD 통합**: GitHub Actions와 연동하여 코드 푸시 시 자동 스캔
- **Enterprise 버전**: 온프레미스 배포 지원
- **컨설팅 서비스**: NIST AI RMF 컴플라이언스 전문 컨설팅

## 📝 개발 로그

### 2025-12-26
- ✅ 프로젝트 초기 설정 (Hono + Cloudflare Pages)
- ✅ Git 저장소 초기화
- ✅ Cloudflare D1 데이터베이스 스키마 설계
- ✅ Mock API 데이터 생성
- ✅ 대시보드 UI 구현
- ✅ 프로젝트 관리 페이지 구현
- ✅ 스캔 결과 상세 페이지 구현
- ✅ NIST AI RMF 맵핑 시각화
- ✅ **GPT-5.2 모델 추가** - 2025년 최신 모델 포함
- ✅ **다국어 지원 (한국어/English)** - 완벽한 i18n 시스템 구현
- ✅ **7개 최신 AI 모델 추가** - Gemini 3 Pro, Claude Opus 4.5, Grok 4.1, DeepSeek R1, Llama 4, o3, GPT 5.2 Thinking

### 다음 단계
- ✅ **Cloudflare Pages 프로덕션 배포 완료** (2025-12-26)
- ✅ **GitHub 저장소 생성 및 코드 푸시 완료**
- ⏳ 백엔드 스캔 엔진 개발 (FastAPI + Giskard + ART)
- ⏳ Railway 백엔드 배포
- ⏳ 프론트엔드-백엔드 API 연동

## 📄 라이선스

MIT License

## 👤 개발자

- **연구원** - NIST AI RMF 기반 AI 거버넌스 연구

## 📞 문의

프로젝트에 대한 문의사항은 GitHub Issues를 통해 제출해주세요.

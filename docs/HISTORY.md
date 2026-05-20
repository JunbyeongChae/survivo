# HISTORY.md

완료된 작업의 전체 이력을 담는다.
진행 중인 작업은 [`docs/WORK.md`](./WORK.md)에서 관리한다.

---

## 기록 형식

```
## YYYY-MM-DD

### 작업 제목
- 주요 변경 파일 및 내용
```

---

## 2026-05-18

### Vite + React TypeScript 프로젝트 초기 세팅
- `package.json` — react 19, react-router-dom 7, zustand 5, recharts 2, tailwindcss 4
- `index.html` — 카카오맵 SDK 스크립트 삽입 (`%VITE_KAKAO_MAP_KEY%` 치환)
- `vite.config.ts` — @vitejs/plugin-react, @tailwindcss/vite 플러그인 등록
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json`
- `src/main.tsx`, `src/App.tsx`, `src/index.css` (TailwindCSS v4 import)
- `src/vite-env.d.ts` — `VITE_KAKAO_MAP_KEY` 환경변수 타입 정의
- `.env` — 카카오맵 앱 키 설정 완료
- `.env.example` — 키 발급 안내 포함
- `.gitignore` — `.env` 커밋 차단

### 라우팅·Zustand 스토어
- `src/store/searchStore.ts` — 검색 위치·최근 검색(persist, localStorage)
- `src/store/filterStore.ts` — 업종 대/소분류·상가 유형 선택
- `src/store/analysisStore.ts` — 분석 결과·생활인구·임대 정보·로딩/에러 상태
- `src/store/authStore.ts` — 로그인 상태·복원(localStorage 기반)
- `src/App.tsx` — React Router v7 라우팅 (/, /login, /signup, 404)
- `src/pages/` — 4개 페이지 플레이스홀더 생성

### 헤더·푸터·공통 컴포넌트
- `src/components/common/Header.tsx` — 로고, 서비스 설명(md 이상), 로그인/로그아웃·회원가입 버튼 전환
- `src/components/common/Footer.tsx` — 데이터 출처 3종 + 기준일 표기
- `src/components/common/SkeletonCard.tsx` — 로딩 스켈레톤 (height·className props)
- `src/components/common/Toast.tsx` — error·info·success 3종 토스트, role="alert"
- `src/App.tsx` — Header·Footer 전역 레이아웃 적용

### 지도(카카오) 초기화
- `src/types/kakao.d.ts` — 카카오맵 SDK 전역 타입 선언 (Map, Marker, Circle, Geocoder 등)
- `src/components/Map/MapView.tsx` — SDK load 콜백 내 초기화, 서울 시청 기본 중심, 서울 bounds 이탈 방지, searchStore 위치 변경 시 지도 이동
- `src/pages/HomePage.tsx` — 지도(좌) + 결과 패널(우) 2단 레이아웃, 모바일 세로 스택

### 로그인·회원가입 페이지
- `src/utils/authUtils.ts` — signUp / login / logout (localStorage 기반)
- `src/hooks/useAuth.ts` — handleLogin(→ navigate '/'), handleSignUp(→ navigate '/login')
- `src/components/Auth/LoginForm.tsx` — 이메일·비밀번호 검증, 인라인 에러 메시지
- `src/components/Auth/SignUpForm.tsx` — 닉네임(2자↑)·이메일·비밀번호(8자↑) 검증
- `src/pages/LoginPage.tsx` / `SignUpPage.tsx` — 로그인 상태 시 홈으로 리다이렉트
- `index.html` — 카카오 SDK `autoload=false` 추가로 지도 노출 정상화 (사용자 수정)
- `src/pages/HomePage.tsx` — aside `min-h-40` 수정 (사용자 수정)

### TypeScript 타입 정의
- `src/types/store.types.ts` — RawStore(원본 JSON), Store(정규화), SearchLocation, SurvivalGrade, AnalysisResult
- `src/types/population.types.ts` — RawLivingPopulation(원본, NaN→null), DongCodeMapping, LivingPopulation
- `src/types/rent.types.ts` — RawRentEntry, RawRentData, StoreType('small'|'large'), RentInfo
- `src/types/auth.types.ts` — User

---

## 2026-05-19

### 주소 검색·자동완성
- `src/types/kakao.d.ts` — `type Status = 'OK' | 'ZERO_RESULT' | 'ERROR'` 추가 (services 네임스페이스 타입 수정)
- `src/hooks/useAddressSearch.ts` — 카카오 Geocoder 호출·300ms 디바운스·서울 영역 필터링(위도 37.41~37.72 / 경도 126.73~127.19)·최대 5건 반환
- `src/components/Search/SearchBar.tsx` — 지도 상단 중앙 절대 위치, 자동완성 드롭다운, ESC 닫기, Enter 선택, 외부 클릭 닫기, 서울 외 결과 없음 안내
- `src/pages/HomePage.tsx` — SearchBar 삽입, 기존 안내 문구 제거

### 업종 선택·상가 유형 탭
- `src/constants/categories.ts` — 대분류 9개·소분류 전체 맵 상수 정의 (공공데이터 기반)
- `src/components/Filter/StoreTypeTab.tsx` — 소규모/중대형 탭, filterStore.storeType 연결
- `src/components/Filter/CategorySelect.tsx` — 대분류/소분류 2단계 드롭다운, 대분류 미선택 시 소분류 disabled
- `src/pages/HomePage.tsx` — 우측 aside 패널 상단에 필터 영역 추가

### 동종업종 마커·반경 오버레이
- `src/types/store.types.ts` — SearchLocation에 `gu: string` 추가
- `src/hooks/useAddressSearch.ts` — region_2depth_name을 gu로 매핑
- `src/store/analysisStore.ts` — nearbyStores: Store[] + setNearbyStores 추가
- `src/utils/geoUtils.ts` — Haversine 거리 계산 함수
- `src/hooks/useStoreFilter.ts` — 구별 JSON fetch → 반경 500m + 업종 필터 → 최대 300개 → analysisStore 업데이트
- `src/components/Map/RadiusCircle.tsx` — 반경 500m 인디고 반투명 원 오버레이 (Kakao Circle)
- `src/components/Map/StoreMarker.tsx` — 마커 + 클릭 InfoWindow (상호명·소분류), 단일 InfoWindow 유지
- `src/components/Map/MapView.tsx` — mapInstance state 추가, RadiusCircle·StoreMarker 렌더링 통합
- `src/pages/HomePage.tsx` — useStoreFilter() 호출

### 생존 스코어 계산·카드
- `src/utils/scoreUtils.ts` — calcSurvivalScore: 밀집도(34)·유동인구(33)·임대료(33) 가중 합산, A/B/C/D 등급 산출
- `src/store/analysisStore.ts` — clearResult 액션 추가
- `src/hooks/useAnalysis.ts` — nearbyStores·population·rent 변화 감지 → 스코어 계산 → result 업데이트
- `src/components/Panel/ScoreCard.tsx` — 스코어 숫자·등급·진행 바, 등급별 색상(A=초록/B=인디고/C=주황/D=빨강)
- `src/components/Panel/DensityCard.tsx` — 동종업종 수·밀집도% 수치, 밀집 수준(낮음/보통/높음/매우높음)
- `src/components/Panel/ResultPanel.tsx` — 검색 전/업종 미선택/로딩/결과 4가지 상태 처리
- `src/pages/HomePage.tsx` — useAnalysis() 추가, ResultPanel 삽입

### 생활인구 차트 — Recharts
- `src/scripts/aggregatePopulation.mjs` — 485MB 원본 → 동코드×시간대 월평균 집계 스크립트
- `public/data/peopleData/서울_생활인구_시간대평균.json` — 집계 결과 (424동 × 24시간, 64KB)
- `src/types/store.types.ts` — SearchLocation에 `dongName?: string` 추가
- `src/hooks/useAddressSearch.ts` — region_3depth_name → dongName 포함
- `src/hooks/usePopulation.ts` — 매핑 파일로 동코드 룩업 → 시간대별 인구 fetch → analysisStore.population 업데이트 (파일 2종 메모리 캐시)
- `src/components/Panel/PopulationChart.tsx` — Recharts BarChart, 최고 유동 시간대 인디고 강조
- `src/components/Panel/ResultPanel.tsx` — PopulationChart 추가
- `src/pages/HomePage.tsx` — usePopulation() 호출

---

## 2026-05-20

### 임대 지표 카드
- `src/types/rent.types.ts` — `rentPerSqmByQuarter` → `priceIndexByQuarter` 수정 (데이터 실제 컬럼 반영)
- `src/utils/regionMapper.ts` — 구→권역 룩업 테이블, JSON 로드·정규화 함수 `getRentInfo`
- `src/hooks/useAnalysis.ts` — 임대 JSON fetch + 메모리 캐시, `getRentInfo` 호출 → `setRent` 연동
- `src/components/Panel/RentCard.tsx` — 공실률·임대가격지수 최신값 + 전분기 대비 증감, 최근 4분기 공실률 바차트
- `src/components/Panel/ResultPanel.tsx` — `RentCard` 렌더링 추가

### 임대 지표 카드 UI 검토 수정
- `src/components/Panel/RentCard.tsx` — 차트 X축 레이블 포맷 개선 (`2025'2Q` → `'25 2Q`), 임대가격지수 수치 아래 `(기준 100)` 부연 설명 추가, 공실률·임대가격지수 수치 폰트 `text-2xl` → `text-xl` (좁은 패널 잘림 방지)
- `src/components/Panel/PopulationChart.tsx` — Y축 width `40` → `44` (레이블 잘림 방지)

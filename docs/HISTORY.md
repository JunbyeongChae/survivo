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

### TypeScript 타입 정의
- `src/types/store.types.ts` — RawStore(원본 JSON), Store(정규화), SearchLocation, SurvivalGrade, AnalysisResult
- `src/types/population.types.ts` — RawLivingPopulation(원본, NaN→null), DongCodeMapping, LivingPopulation
- `src/types/rent.types.ts` — RawRentEntry, RawRentData, StoreType('small'|'large'), RentInfo
- `src/types/auth.types.ts` — User

### 지도(카카오) 초기화
- `src/types/kakao.d.ts` — 카카오맵 SDK 전역 타입 선언 (Map, Marker, Circle, Geocoder 등)
- `src/components/Map/MapView.tsx` — SDK load 콜백 내 초기화, 서울 시청 기본 중심, 서울 bounds 이탈 방지, searchStore 위치 변경 시 지도 이동
- `src/pages/HomePage.tsx` — 지도(좌) + 결과 패널(우) 2단 레이아웃, 모바일 세로 스택

### 헤더·푸터·공통 컴포넌트
- `src/components/common/Header.tsx` — 로고, 서비스 설명(md 이상), 로그인/로그아웃·회원가입 버튼 전환
- `src/components/common/Footer.tsx` — 데이터 출처 3종 + 기준일 표기
- `src/components/common/SkeletonCard.tsx` — 로딩 스켈레톤 (height·className props)
- `src/components/common/Toast.tsx` — error·info·success 3종 토스트, role="alert"
- `src/App.tsx` — Header·Footer 전역 레이아웃 적용

### 라우팅·Zustand 스토어
- `src/store/searchStore.ts` — 검색 위치·최근 검색(persist, localStorage)
- `src/store/filterStore.ts` — 업종 대/소분류·상가 유형 선택
- `src/store/analysisStore.ts` — 분석 결과·생활인구·임대 정보·로딩/에러 상태
- `src/store/authStore.ts` — 로그인 상태·복원(localStorage 기반)
- `src/App.tsx` — React Router v7 라우팅 (/, /login, /signup, 404)
- `src/pages/` — 4개 페이지 플레이스홀더 생성

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

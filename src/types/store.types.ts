// 원본 JSON 구조 (public/data/storeData/*.json)
export interface RawStore {
  상가업소번호: string
  상호명: string
  상권업종대분류코드: string
  상권업종대분류명: string
  상권업종소분류코드: string
  상권업종소분류명: string
  행정동코드: number
  행정동명: string
  도로명주소: string
  경도: number
  위도: number
}

// 앱 내부 정규화 타입
export interface Store {
  id: string
  name: string
  categoryMain: string
  categorySub: string
  categoryCode: string
  lat: number
  lng: number
  address: string
  dongCode: number
}

export interface SearchLocation {
  lat: number
  lng: number
  label: string
  gu: string
  dongName?: string
}

export type SurvivalGrade = 'A' | 'B' | 'C' | 'D'

export interface AnalysisResult {
  score: number
  grade: SurvivalGrade
  nearbyStores: Store[]
  totalStores: number
  densityRate: number
}

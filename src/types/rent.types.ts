// 원본 JSON 구조 (public/data/priceData/임대동향.json)
export interface RawRentEntry {
  No: number
  시도: string
  권역: string
  지역명: string
  데이터: Record<string, number>  // { "2025년 1분기": 1.2, ... }
}

export interface RawRentData {
  소규모_공실률: RawRentEntry[]
  중대형_공실률: RawRentEntry[]
  소규모_임대료: RawRentEntry[]
  중대형_임대료: RawRentEntry[]
}

// 앱 내부 정규화 타입
export type StoreType = 'small' | 'large'

export interface RentInfo {
  region: string
  district: string
  storeType: StoreType
  vacancyRateByQuarter: Record<string, number>
  priceIndexByQuarter: Record<string, number>
}

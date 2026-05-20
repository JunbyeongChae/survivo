import type { RawRentData } from '../types/rent.types'
import type { RentInfo, StoreType } from '../types/rent.types'

const GU_TO_REGION: Record<string, string> = {
  강남구: '강남',
  서초구: '강남',
  송파구: '강남',
  강동구: '강남',
  종로구: '도심',
  중구: '도심',
  영등포구: '영등포신촌',
  마포구: '영등포신촌',
  서대문구: '영등포신촌',
  은평구: '영등포신촌',
}

export function guToRegion(gu: string): string {
  return GU_TO_REGION[gu] ?? '기타'
}

function pickDistrict(entries: RawRentData['소규모_공실률'], region: string) {
  const inRegion = entries.filter((e) => e.권역 === region)
  return inRegion.find((e) => e.지역명 === region) ?? inRegion[0]
}

export function getRentInfo(
  rawData: RawRentData,
  gu: string,
  storeType: StoreType,
): RentInfo | null {
  const region = guToRegion(gu)
  const effectiveType = storeType === 'large' ? 'large' : 'small'

  const vacancyKey = effectiveType === 'large' ? '중대형_공실률' : '소규모_공실률'
  const indexKey = effectiveType === 'large' ? '중대형_임대가격지수' : '소규모_임대가격지수'

  const vacancyEntry = pickDistrict(rawData[vacancyKey], region)
  const indexEntry = pickDistrict(rawData[indexKey], region)

  if (!vacancyEntry || !indexEntry) return null

  return {
    region,
    district: vacancyEntry.지역명,
    storeType: effectiveType,
    vacancyRateByQuarter: vacancyEntry.데이터,
    priceIndexByQuarter: indexEntry.데이터,
  }
}

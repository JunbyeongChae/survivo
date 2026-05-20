import { useEffect } from 'react'
import { useSearchStore } from '../store/searchStore'
import { useFilterStore } from '../store/filterStore'
import { useAnalysisStore } from '../store/analysisStore'
import { calcSurvivalScore } from '../utils/scoreUtils'
import { getRentInfo } from '../utils/regionMapper'
import type { RawRentData } from '../types/rent.types'

let rentDataCache: RawRentData | null = null

async function loadRentData(): Promise<RawRentData> {
  if (rentDataCache) return rentDataCache
  const res = await fetch('/data/priceData/임대동향.json')
  rentDataCache = (await res.json()) as RawRentData
  return rentDataCache
}

export function useAnalysis(): void {
  const currentLocation = useSearchStore((s) => s.currentLocation)
  const { categoryMain, storeType } = useFilterStore()
  const nearbyStores = useAnalysisStore((s) => s.nearbyStores)
  const population = useAnalysisStore((s) => s.population)
  const rent = useAnalysisStore((s) => s.rent)
  const setResult = useAnalysisStore((s) => s.setResult)
  const setRent = useAnalysisStore((s) => s.setRent)
  const clearResult = useAnalysisStore((s) => s.clearResult)

  // 임대 데이터 로딩
  useEffect(() => {
    if (!currentLocation) {
      setRent(null)
      return
    }

    loadRentData().then((rawData) => {
      const info = getRentInfo(rawData, currentLocation.gu, storeType)
      setRent(info)
    })
  }, [currentLocation, storeType, setRent])

  // 스코어 계산
  useEffect(() => {
    if (!currentLocation || !categoryMain) {
      clearResult()
      return
    }

    const { score, grade, densityRate } = calcSurvivalScore({
      nearbyCount: nearbyStores.length,
      population,
      rent,
    })

    setResult({
      score,
      grade,
      nearbyStores,
      totalStores: nearbyStores.length,
      densityRate,
    })
  }, [currentLocation, categoryMain, nearbyStores, population, rent, setResult, clearResult])
}

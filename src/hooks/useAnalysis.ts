import { useEffect } from 'react'
import { useSearchStore } from '../store/searchStore'
import { useFilterStore } from '../store/filterStore'
import { useAnalysisStore } from '../store/analysisStore'
import { calcSurvivalScore } from '../utils/scoreUtils'

export function useAnalysis(): void {
  const currentLocation = useSearchStore((s) => s.currentLocation)
  const categoryMain = useFilterStore((s) => s.categoryMain)
  const nearbyStores = useAnalysisStore((s) => s.nearbyStores)
  const population = useAnalysisStore((s) => s.population)
  const rent = useAnalysisStore((s) => s.rent)
  const setResult = useAnalysisStore((s) => s.setResult)
  const clearResult = useAnalysisStore((s) => s.clearResult)

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

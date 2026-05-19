import { useEffect } from 'react'
import { useSearchStore } from '../store/searchStore'
import { useAnalysisStore } from '../store/analysisStore'
import type { LivingPopulation } from '../types/population.types'

type HourlyAvgMap = Record<string, number[]>

let avgCache: HourlyAvgMap | null = null

async function loadAvg(): Promise<HourlyAvgMap> {
  if (avgCache) return avgCache
  const res = await fetch('/data/peopleData/서울_생활인구_시간대평균.json')
  avgCache = (await res.json()) as HourlyAvgMap
  return avgCache
}

// nearbyStores의 dongCode(행자부행정동코드)에서 최빈값을 구한다.
// Store.dongCode는 집계 JSON의 키와 동일하므로 법정동/행정동 불일치 문제를 우회한다.
function getMostFrequentDongCode(dongCodes: number[]): string | null {
  if (dongCodes.length === 0) return null
  const freq: Record<number, number> = {}
  for (const code of dongCodes) freq[code] = (freq[code] ?? 0) + 1
  const best = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]
  return best ? best[0] : null
}

export function usePopulation(): void {
  const currentLocation = useSearchStore((s) => s.currentLocation)
  const nearbyStores = useAnalysisStore((s) => s.nearbyStores)
  const { setPopulation } = useAnalysisStore()

  useEffect(() => {
    if (!currentLocation) {
      setPopulation([])
      return
    }

    let cancelled = false

    loadAvg()
      .then((avg) => {
        if (cancelled) return

        const dongCodes = nearbyStores.map((s) => s.dongCode).filter(Boolean) as number[]
        const dongCode = getMostFrequentDongCode(dongCodes)

        if (!dongCode || !avg[dongCode]) {
          setPopulation([])
          return
        }

        const population: LivingPopulation[] = avg[dongCode].map((count, hour) => ({
          dongCode,
          timeSlot: String(hour),
          totalPopulation: count,
        }))

        setPopulation(population)
      })
      .catch(() => {
        if (!cancelled) setPopulation([])
      })

    return () => {
      cancelled = true
    }
  }, [currentLocation, nearbyStores, setPopulation])
}

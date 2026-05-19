import { useEffect } from 'react'
import { useSearchStore } from '../store/searchStore'
import { useFilterStore } from '../store/filterStore'
import { useAnalysisStore } from '../store/analysisStore'
import { haversineDistance } from '../utils/geoUtils'
import type { RawStore, Store } from '../types/store.types'

const RADIUS_M = 500
const MAX_MARKERS = 300

function normalize(r: RawStore): Store {
  return {
    id: r.상가업소번호,
    name: r.상호명,
    categoryMain: r.상권업종대분류명,
    categorySub: r.상권업종소분류명,
    categoryCode: r.상권업종소분류코드,
    lat: r.위도,
    lng: r.경도,
    address: r.도로명주소,
    dongCode: r.행정동코드,
  }
}

export function useStoreFilter(): void {
  const currentLocation = useSearchStore((s) => s.currentLocation)
  const { categoryMain, categorySub } = useFilterStore()
  const { setNearbyStores, setLoading } = useAnalysisStore()

  useEffect(() => {
    if (!currentLocation || !categoryMain) {
      setNearbyStores([])
      return
    }

    let cancelled = false
    setLoading(true)

    fetch(`/data/storeData/${currentLocation.gu}_상가정보_202603.json`)
      .then((res) => {
        if (!res.ok) throw new Error('데이터 로드 실패')
        return res.json() as Promise<RawStore[]>
      })
      .then((raw) => {
        if (cancelled) return

        const filtered = raw
          .filter((r) => {
            if (!r.위도 || !r.경도) return false
            const dist = haversineDistance(currentLocation.lat, currentLocation.lng, r.위도, r.경도)
            if (dist > RADIUS_M) return false
            if (r.상권업종대분류명 !== categoryMain) return false
            if (categorySub && r.상권업종소분류명 !== categorySub) return false
            return true
          })
          .slice(0, MAX_MARKERS)
          .map(normalize)

        setNearbyStores(filtered)
      })
      .catch(() => {
        if (!cancelled) setNearbyStores([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [currentLocation, categoryMain, categorySub, setNearbyStores, setLoading])
}

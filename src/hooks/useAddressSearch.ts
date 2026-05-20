import { useState, useEffect, useRef } from 'react'
import type { SearchLocation } from '../types/store.types'

const SEOUL_BOUNDS = {
  lat: { min: 37.41, max: 37.72 },
  lng: { min: 126.73, max: 127.19 },
}

function isInSeoul(lat: number, lng: number): boolean {
  return (
    lat >= SEOUL_BOUNDS.lat.min &&
    lat <= SEOUL_BOUNDS.lat.max &&
    lng >= SEOUL_BOUNDS.lng.min &&
    lng <= SEOUL_BOUNDS.lng.max
  )
}

interface UseAddressSearchReturn {
  suggestions: SearchLocation[]
  isLoading: boolean
  search: (query: string) => void
  clearSuggestions: () => void
}

export function useAddressSearch(): UseAddressSearchReturn {
  const [suggestions, setSuggestions] = useState<SearchLocation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = (query: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!query.trim()) {
      setSuggestions([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    timerRef.current = setTimeout(() => {
      const win = window as Window & { kakao?: typeof kakao }
      if (!win.kakao?.maps?.services) {
        setIsLoading(false)
        return
      }

      const geocoder = new kakao.maps.services.Geocoder()
      geocoder.addressSearch(query, (results, status) => {
        setIsLoading(false)
        if (status !== kakao.maps.services.Status.OK) {
          setSuggestions([])
          return
        }

        const seoulOnly = results
          .filter((r) => isInSeoul(parseFloat(r.y), parseFloat(r.x)))
          .slice(0, 5)
          .map<SearchLocation>((r) => ({
            lat: parseFloat(r.y),
            lng: parseFloat(r.x),
            label: r.address_name,
            gu: r.address.region_2depth_name,
            dongName: r.address.region_3depth_name || undefined,
          }))

        setSuggestions(seoulOnly)
      })
    }, 300)
  }

  const clearSuggestions = () => setSuggestions([])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return { suggestions, isLoading, search, clearSuggestions }
}

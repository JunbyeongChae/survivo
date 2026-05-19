import { useEffect, useRef, useState } from 'react'
import { useSearchStore } from '../../store/searchStore'
import { useAnalysisStore } from '../../store/analysisStore'
import RadiusCircle from './RadiusCircle'
import StoreMarker from './StoreMarker'

const SEOUL_CENTER = { lat: 37.5665, lng: 126.978 }
const SEOUL_SW = { lat: 37.4133, lng: 126.7343 }
const SEOUL_NE = { lat: 37.7153, lng: 127.1844 }

function MapView() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<kakao.maps.Map | null>(null)
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null)
  const [sdkError, setSdkError] = useState(false)

  const currentLocation = useSearchStore((s) => s.currentLocation)
  const nearbyStores = useAnalysisStore((s) => s.nearbyStores)

  useEffect(() => {
    if (!containerRef.current) return

    const win = window as Window & { kakao?: typeof kakao }
    if (!win.kakao?.maps) {
      setSdkError(true)
      return
    }

    try {
      kakao.maps.load(() => {
        if (!containerRef.current) return

        const center = new kakao.maps.LatLng(SEOUL_CENTER.lat, SEOUL_CENTER.lng)
        const map = new kakao.maps.Map(containerRef.current, { center, level: 5 })

        const seoulBounds = new kakao.maps.LatLngBounds(
          new kakao.maps.LatLng(SEOUL_SW.lat, SEOUL_SW.lng),
          new kakao.maps.LatLng(SEOUL_NE.lat, SEOUL_NE.lng),
        )

        map.setMaxLevel(9)

        kakao.maps.event.addListener(map, 'dragend', () => {
          const pos = map.getCenter()
          if (!seoulBounds.contain(pos)) map.panTo(center)
        })

        mapRef.current = map
        setMapInstance(map)
      })
    } catch (err) {
      console.error('카카오맵 초기화 실패:', err)
      setSdkError(true)
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !currentLocation) return
    const pos = new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng)
    mapRef.current.panTo(pos)
    mapRef.current.setLevel(4)
  }, [currentLocation])

  if (sdkError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-100">
        <p className="text-sm font-medium text-gray-600">지도를 불러올 수 없습니다</p>
        <p className="text-xs text-gray-400">카카오 개발자 콘솔에서 localhost 도메인을 등록해주세요</p>
      </div>
    )
  }

  return (
    <>
      <div ref={containerRef} className="w-full h-full" aria-label="서울 상권 분석 지도" />

      {mapInstance && currentLocation && (
        <>
          <RadiusCircle map={mapInstance} lat={currentLocation.lat} lng={currentLocation.lng} />
          {nearbyStores.map((store) => (
            <StoreMarker key={store.id} map={mapInstance} store={store} />
          ))}
        </>
      )}
    </>
  )
}

export default MapView

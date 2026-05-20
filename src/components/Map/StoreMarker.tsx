import { useEffect } from 'react'
import type { Store } from '../../types/store.types'

interface Props {
  map: kakao.maps.Map
  store: Store
}

let activeInfoWindow: kakao.maps.InfoWindow | null = null

function StoreMarker({ map, store }: Props) {
  useEffect(() => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(store.lat, store.lng),
      map,
      title: store.name,
    })

    const infoWindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding:8px 12px;font-size:12px;line-height:1.6;min-width:120px;">
          <strong style="display:block;margin-bottom:2px;">${store.name}</strong>
          <span style="color:#6366F1;">${store.categorySub}</span>
        </div>
      `,
    })

    const handleClick = () => {
      if (activeInfoWindow) activeInfoWindow.close()
      activeInfoWindow = infoWindow
      infoWindow.open(map, marker)
    }

    kakao.maps.event.addListener(marker, 'click', handleClick)

    return () => {
      kakao.maps.event.removeListener(marker, 'click', handleClick)
      if (activeInfoWindow === infoWindow) activeInfoWindow = null
      marker.setMap(null)
    }
  }, [map, store])

  return null
}

export default StoreMarker

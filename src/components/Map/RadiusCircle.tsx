import { useEffect } from 'react'

interface Props {
  map: kakao.maps.Map
  lat: number
  lng: number
}

function RadiusCircle({ map, lat, lng }: Props) {
  useEffect(() => {
    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(lat, lng),
      radius: 500,
      strokeWeight: 2,
      strokeColor: '#4F46E5',
      strokeOpacity: 0.7,
      strokeStyle: 'solid',
      fillColor: '#818CF8',
      fillOpacity: 0.08,
      map,
    })

    return () => circle.setMap(null)
  }, [map, lat, lng])

  return null
}

export default RadiusCircle

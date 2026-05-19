declare namespace kakao.maps {
  function load(callback: () => void): void

  namespace event {
    function addListener(
      target: Map | Marker | Circle,
      type: string,
      handler: (...args: unknown[]) => void
    ): void
    function removeListener(
      target: Map | Marker | Circle,
      type: string,
      handler: (...args: unknown[]) => void
    ): void
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions)
    setCenter(latlng: LatLng): void
    getCenter(): LatLng
    setLevel(level: number): void
    getLevel(): number
    setMaxLevel(maxLevel: number): void
    getBounds(): LatLngBounds
    panTo(latlng: LatLng): void
  }

  class LatLng {
    constructor(lat: number, lng: number)
    getLat(): number
    getLng(): number
  }

  class LatLngBounds {
    constructor(sw: LatLng, ne: LatLng)
    extend(latlng: LatLng): void
    contain(latlng: LatLng): boolean
    getSouthWest(): LatLng
    getNorthEast(): LatLng
  }

  class Marker {
    constructor(options: MarkerOptions)
    setMap(map: Map | null): void
    getPosition(): LatLng
    setTitle(title: string): void
  }

  class Circle {
    constructor(options: CircleOptions)
    setMap(map: Map | null): void
    setCenter(latlng: LatLng): void
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions)
    open(map: Map, marker: Marker): void
    close(): void
  }

  class MarkerImage {
    constructor(src: string, size: Size, options?: MarkerImageOptions)
  }

  class Size {
    constructor(width: number, height: number)
  }

  class Point {
    constructor(x: number, y: number)
  }

  interface MapOptions {
    center: LatLng
    level?: number
    draggable?: boolean
    scrollwheel?: boolean
    disableDoubleClick?: boolean
    disableDoubleClickZoom?: boolean
  }

  interface MarkerOptions {
    position: LatLng
    map?: Map
    title?: string
    image?: MarkerImage
  }

  interface MarkerImageOptions {
    offset?: Point
    spriteSize?: Size
    spriteOrigin?: Point
  }

  interface CircleOptions {
    center: LatLng
    radius: number
    strokeWeight?: number
    strokeColor?: string
    strokeOpacity?: number
    strokeStyle?: string
    fillColor?: string
    fillOpacity?: number
    map?: Map
  }

  interface InfoWindowOptions {
    content: string | HTMLElement
    disableAutoPan?: boolean
    zIndex?: number
  }

  namespace services {
    type Status = 'OK' | 'ZERO_RESULT' | 'ERROR'

    class Geocoder {
      addressSearch(
        address: string,
        callback: (result: AddressSearchResult[], status: Status) => void
      ): void
      coord2Address(
        lng: number,
        lat: number,
        callback: (result: Coord2AddressResult[], status: Status) => void
      ): void
    }

    interface AddressSearchResult {
      address_name: string
      address_type: string
      x: string
      y: string
      address: KakaoAddress
      road_address: RoadAddress | null
    }

    interface KakaoAddress {
      address_name: string
      region_1depth_name: string
      region_2depth_name: string
      region_3depth_name: string
      main_address_no: string
      sub_address_no: string
    }

    interface RoadAddress {
      address_name: string
      region_1depth_name: string
      region_2depth_name: string
      region_3depth_name: string
      road_name: string
      building_name: string
      zone_no: string
    }

    interface Coord2AddressResult {
      address: KakaoAddress
      road_address: RoadAddress | null
    }

    const Status: {
      OK: 'OK'
      ZERO_RESULT: 'ZERO_RESULT'
      ERROR: 'ERROR'
    }
  }
}

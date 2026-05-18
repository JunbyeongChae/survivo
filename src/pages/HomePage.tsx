import MapView from '../components/Map/MapView'

function HomePage() {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem-3.5rem)]">
      {/* 지도 영역 */}
      <section className="flex-1 relative min-h-[50vh] md:min-h-0">
        <MapView />

        {/* 검색 전 안내 문구 — 추후 SearchBar로 대체 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10
                        bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2
                        text-sm text-gray-500 shadow-md pointer-events-none">
          서울 내 주소를 입력해 상권을 분석해보세요
        </div>
      </section>

      {/* 결과 패널 영역 — 추후 ResultPanel로 대체 */}
      <aside className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-gray-200
                        bg-white overflow-y-auto shrink-0 flex items-center justify-center
                        min-h-[10rem] md:min-h-0">
        <p className="text-sm text-gray-400">주소를 검색하면 분석 결과가 표시됩니다</p>
      </aside>
    </div>
  )
}

export default HomePage

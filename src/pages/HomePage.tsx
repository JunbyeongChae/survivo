import MapView from '../components/Map/MapView';
import SearchBar from '../components/Search/SearchBar';
import CategorySelect from '../components/Filter/CategorySelect';
import StoreTypeTab from '../components/Filter/StoreTypeTab';
import ResultPanel from '../components/Panel/ResultPanel';
import { useStoreFilter } from '../hooks/useStoreFilter';
import { useAnalysis } from '../hooks/useAnalysis';
import { usePopulation } from '../hooks/usePopulation';

function HomePage() {
  useStoreFilter()
  useAnalysis()
  usePopulation()

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem-3.5rem)]">
      {/* 지도 영역 */}
      <section className="flex-1 relative min-h-[50vh] md:min-h-0">
        <MapView />
        <SearchBar />
      </section>

      {/* 결과 패널 */}
      <aside
        className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-gray-200
                   bg-white overflow-y-auto shrink-0 flex flex-col min-h-40 md:min-h-0">
        {/* 필터 영역 */}
        <div className="p-4 border-b border-gray-100 flex flex-col gap-3">
          <StoreTypeTab />
          <CategorySelect />
        </div>

        {/* 분석 결과 */}
        <ResultPanel />
      </aside>
    </div>
  );
}

export default HomePage;

import { useSearchStore } from '../../store/searchStore'
import { useFilterStore } from '../../store/filterStore'
import { useAnalysisStore } from '../../store/analysisStore'
import ScoreCard from './ScoreCard'
import DensityCard from './DensityCard'
import PopulationChart from './PopulationChart'
import SkeletonCard from '../common/SkeletonCard'

function ResultPanel() {
  const currentLocation = useSearchStore((s) => s.currentLocation)
  const { categoryMain } = useFilterStore()
  const { result, isLoading, population } = useAnalysisStore()

  if (!currentLocation) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-2 px-4 py-8 text-center">
        <span className="text-2xl">🗺️</span>
        <p className="text-sm font-medium text-gray-600">주소를 검색해주세요</p>
        <p className="text-xs text-gray-400">서울 내 주소를 입력하면 상권 분석이 시작됩니다</p>
      </div>
    )
  }

  if (!categoryMain) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-2 px-4 py-8 text-center">
        <span className="text-2xl">🏪</span>
        <p className="text-sm font-medium text-gray-600">업종을 선택해주세요</p>
        <p className="text-xs text-gray-400">분석할 업종을 선택하면 생존 스코어가 계산됩니다</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-4">
        <SkeletonCard height="h-32" />
        <SkeletonCard height="h-24" />
      </div>
    )
  }

  if (!result) return null

  return (
    <div className="flex flex-col gap-3 p-4">
      <ScoreCard score={result.score} grade={result.grade} />
      <DensityCard
        nearbyCount={result.totalStores}
        densityRate={result.densityRate}
        categoryMain={categoryMain}
      />
      <PopulationChart population={population} />
    </div>
  )
}

export default ResultPanel

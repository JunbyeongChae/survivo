interface Props {
  nearbyCount: number
  densityRate: number
  categoryMain: string
}

function DensityCard({ nearbyCount, densityRate, categoryMain }: Props) {
  const densityLevel =
    densityRate < 25 ? { label: '낮음', color: 'text-emerald-600' }
    : densityRate < 50 ? { label: '보통', color: 'text-amber-600' }
    : densityRate < 75 ? { label: '높음', color: 'text-orange-600' }
    : { label: '매우 높음', color: 'text-red-600' }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-medium text-gray-500 mb-3">동종업종 밀집도</p>

      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-2xl font-bold text-gray-800 tabular-nums">
            {nearbyCount}
          </span>
          <span className="text-sm text-gray-400 ml-1">개</span>
          <p className="text-xs text-gray-400 mt-0.5">반경 500m 내 {categoryMain}</p>
        </div>
        <div className="text-right">
          <span className={`text-lg font-bold tabular-nums ${densityLevel.color}`}>
            {densityRate}%
          </span>
          <p className={`text-xs font-medium ${densityLevel.color}`}>{densityLevel.label}</p>
        </div>
      </div>

      {/* 밀집도 바 */}
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-700"
          style={{ width: `${densityRate}%` }}
        />
      </div>

      <p className="mt-2 text-[11px] text-gray-400">
        포화 기준 20개 대비 비율
      </p>
    </div>
  )
}

export default DensityCard

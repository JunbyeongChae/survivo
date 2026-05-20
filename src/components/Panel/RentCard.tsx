import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { RentInfo } from '../../types/rent.types'

interface Props {
  rent: RentInfo | null
}

const STORE_TYPE_LABEL: Record<string, string> = {
  small: '소규모',
  large: '중대형',
}

function getRecentQuarters(data: Record<string, number>, count: number) {
  return Object.entries(data).slice(-count)
}

function getDiff(data: Record<string, number>): number | null {
  const values = Object.values(data)
  if (values.length < 2) return null
  return Number((values[values.length - 1] - values[values.length - 2]).toFixed(1))
}

function DiffBadge({ diff, inverse = false }: { diff: number | null; inverse?: boolean }) {
  if (diff === null || diff === 0) return <span className="text-[11px] text-gray-400">전분기 동일</span>

  const isPositive = diff > 0
  const isGood = inverse ? isPositive : !isPositive
  const color = isGood ? 'text-emerald-600' : 'text-red-500'
  const arrow = isPositive ? '↑' : '↓'

  return (
    <span className={`text-[11px] font-medium ${color}`}>
      {arrow} {Math.abs(diff)} 전분기 대비
    </span>
  )
}

function RentCard({ rent }: Props) {
  if (!rent) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium text-gray-500 mb-2">임대 지표</p>
        <div className="flex items-center justify-center h-20 text-xs text-gray-400">
          해당 지역 임대 데이터가 없습니다
        </div>
      </div>
    )
  }

  const vacancyQuarters = getRecentQuarters(rent.vacancyRateByQuarter, 7)
  const recent4 = vacancyQuarters.slice(-4)
  const latestVacancy = vacancyQuarters[vacancyQuarters.length - 1]?.[1] ?? 0
  const vacancyDiff = getDiff(rent.vacancyRateByQuarter)

  const indexQuarters = Object.values(rent.priceIndexByQuarter)
  const latestIndex = indexQuarters[indexQuarters.length - 1] ?? 0
  const indexDiff = getDiff(rent.priceIndexByQuarter)

  const maxVacancy = Math.max(...recent4.map(([, v]) => v))
  const chartData = recent4.map(([quarter, value]) => ({
    quarter: quarter.replace(/(\d{4})년 (\d)분기/, (_, y, q) => `'${y.slice(2)} ${q}Q`),
    value,
  }))

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-gray-500">임대 지표</p>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
            {STORE_TYPE_LABEL[rent.storeType]}
          </span>
          <span className="text-[10px] text-gray-400">
            {rent.region} · {rent.district}
          </span>
        </div>
      </div>

      {/* 수치 행 */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* 공실률 */}
        <div className="bg-gray-50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-400 mb-0.5">공실률</p>
          <p className="text-xl font-bold tabular-nums text-gray-800 leading-none">
            {latestVacancy.toFixed(1)}
            <span className="text-sm font-medium text-gray-400 ml-0.5">%</span>
          </p>
          <div className="mt-1">
            <DiffBadge diff={vacancyDiff} inverse={false} />
          </div>
        </div>

        {/* 임대가격지수 */}
        <div className="bg-gray-50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-400 mb-0.5">임대가격지수</p>
          <p className="text-xl font-bold tabular-nums text-gray-800 leading-none">
            {latestIndex.toFixed(1)}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">(기준 100)</p>
          <div className="mt-1">
            <DiffBadge diff={indexDiff} inverse={true} />
          </div>
        </div>
      </div>

      {/* 공실률 추이 차트 */}
      <p className="text-[10px] text-gray-400 mb-1.5">공실률 추이 (최근 4분기)</p>
      <ResponsiveContainer width="100%" height={72}>
        <BarChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 9, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            formatter={(v: number) => [`${v.toFixed(1)}%`, '공실률']}
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E5E7EB' }}
          />
          <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={20}>
            {chartData.map((d) => (
              <Cell
                key={d.quarter}
                fill={d.value === maxVacancy ? '#EF4444' : '#FCA5A5'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RentCard

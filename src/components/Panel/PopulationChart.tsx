import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { LivingPopulation } from '../../types/population.types'

interface Props {
  population: LivingPopulation[]
}

function formatCount(v: number): string {
  if (v >= 10000) return `${(v / 10000).toFixed(1)}만`
  if (v >= 1000) return `${(v / 1000).toFixed(1)}천`
  return String(v)
}

const TICK_HOURS = [0, 6, 12, 18, 23]

function PopulationChart({ population }: Props) {
  if (population.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium text-gray-500 mb-2">시간대별 생활인구</p>
        <div className="flex items-center justify-center h-28 text-xs text-gray-400">
          해당 지역 데이터가 준비 중입니다
        </div>
      </div>
    )
  }

  const maxPop = Math.max(...population.map((p) => p.totalPopulation))
  const data = population.map((p) => ({
    hour: Number(p.timeSlot),
    population: p.totalPopulation,
  }))

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-medium text-gray-500 mb-3">시간대별 생활인구 (월평균)</p>

      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={false}
            ticks={TICK_HOURS}
            tickFormatter={(v) => `${v}시`}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCount}
            width={44}
          />
          <Tooltip
            formatter={(v: number) => [`${v.toLocaleString()}명`, '생활인구']}
            labelFormatter={(l) => `${l}시`}
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E5E7EB' }}
          />
          <Bar dataKey="population" radius={[2, 2, 0, 0]} maxBarSize={12}>
            {data.map((d) => (
              <Cell
                key={d.hour}
                fill={d.population === maxPop ? '#4F46E5' : '#C7D2FE'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="mt-1 text-[11px] text-gray-400">
        최고 유동: {data.find((d) => d.population === maxPop)?.hour}시 ·{' '}
        {maxPop.toLocaleString()}명
      </p>
    </div>
  )
}

export default PopulationChart

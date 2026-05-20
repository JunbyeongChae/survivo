import type { SurvivalGrade } from '../../types/store.types'

interface Props {
  score: number
  grade: SurvivalGrade
}

const GRADE_CONFIG: Record<SurvivalGrade, {
  color: string
  bg: string
  border: string
  bar: string
  label: string
}> = {
  A: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500', label: '우수' },
  B: { color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', bar: 'bg-indigo-500', label: '양호' },
  C: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500', label: '보통' },
  D: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500', label: '위험' },
}

function ScoreCard({ score, grade }: Props) {
  const cfg = GRADE_CONFIG[grade]

  return (
    <div className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border}`}>
      <p className="text-xs font-medium text-gray-500 mb-3">생존 가능성 스코어</p>

      <div className="flex items-end justify-between mb-3">
        <div className="flex items-end gap-2">
          <span className={`text-5xl font-bold tabular-nums leading-none ${cfg.color}`}>
            {score}
          </span>
          <span className="text-sm text-gray-400 mb-1">/ 100</span>
        </div>
        <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl ${cfg.bg} border-2 ${cfg.border}`}>
          <span className={`text-xl font-bold ${cfg.color}`}>{grade}</span>
          <span className={`text-[10px] font-medium ${cfg.color}`}>{cfg.label}</span>
        </div>
      </div>

      {/* 스코어 바 */}
      <div className="h-2 w-full rounded-full bg-white/60 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${cfg.bar}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-2 text-[11px] text-gray-400">
        밀집도·유동인구·임대가 3개 지표 종합
      </p>
    </div>
  )
}

export default ScoreCard

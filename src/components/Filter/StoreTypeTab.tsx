import { useFilterStore } from '../../store/filterStore'
import type { StoreType } from '../../types/rent.types'

const TABS: { label: string; value: StoreType }[] = [
  { label: '소규모', value: 'small' },
  { label: '중대형', value: 'large' },
]

function StoreTypeTab() {
  const { storeType, setStoreType } = useFilterStore()

  return (
    <div className="flex rounded-lg border border-gray-200 overflow-hidden">
      {TABS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setStoreType(value)}
          className={`flex-1 py-2 text-sm font-medium transition-colors
            ${storeType === value
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default StoreTypeTab

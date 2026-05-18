import { create } from 'zustand'
import type { StoreType } from '../types/rent.types'

interface FilterState {
  categoryMain: string
  categorySub: string
  storeType: StoreType
  setCategoryMain: (category: string) => void
  setCategorySub: (category: string) => void
  setStoreType: (type: StoreType) => void
  resetFilter: () => void
}

const DEFAULT_STATE = {
  categoryMain: '',
  categorySub: '',
  storeType: 'small' as StoreType,
}

export const useFilterStore = create<FilterState>()((set) => ({
  ...DEFAULT_STATE,
  setCategoryMain: (category) =>
    set({ categoryMain: category, categorySub: '' }),
  setCategorySub: (category) => set({ categorySub: category }),
  setStoreType: (type) => set({ storeType: type }),
  resetFilter: () => set(DEFAULT_STATE),
}))

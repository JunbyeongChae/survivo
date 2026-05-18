import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SearchLocation } from '../types/store.types'

const MAX_RECENT = 5

interface SearchState {
  currentLocation: SearchLocation | null
  recentSearches: SearchLocation[]
  setCurrentLocation: (location: SearchLocation) => void
  addRecentSearch: (location: SearchLocation) => void
  clearRecentSearches: () => void
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      currentLocation: null,
      recentSearches: [],
      setCurrentLocation: (location) => set({ currentLocation: location }),
      addRecentSearch: (location) =>
        set((state) => {
          const filtered = state.recentSearches.filter(
            (s) => s.label !== location.label
          )
          return {
            recentSearches: [location, ...filtered].slice(0, MAX_RECENT),
          }
        }),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    { name: 'recentSearches' }
  )
)

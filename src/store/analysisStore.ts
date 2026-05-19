import { create } from 'zustand'
import type { AnalysisResult, Store } from '../types/store.types'
import type { LivingPopulation } from '../types/population.types'
import type { RentInfo } from '../types/rent.types'

interface AnalysisState {
  result: AnalysisResult | null
  nearbyStores: Store[]
  population: LivingPopulation[]
  rent: RentInfo | null
  isLoading: boolean
  error: string | null
  setResult: (result: AnalysisResult) => void
  clearResult: () => void
  setNearbyStores: (stores: Store[]) => void
  setPopulation: (population: LivingPopulation[]) => void
  setRent: (rent: RentInfo | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useAnalysisStore = create<AnalysisState>()((set) => ({
  result: null,
  nearbyStores: [],
  population: [],
  rent: null,
  isLoading: false,
  error: null,
  setResult: (result) => set({ result }),
  clearResult: () => set({ result: null }),
  setNearbyStores: (nearbyStores) => set({ nearbyStores }),
  setPopulation: (population) => set({ population }),
  setRent: (rent) => set({ rent }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({ result: null, nearbyStores: [], population: [], rent: null, isLoading: false, error: null }),
}))

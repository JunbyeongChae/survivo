import { create } from 'zustand'
import type { AnalysisResult } from '../types/store.types'
import type { LivingPopulation } from '../types/population.types'
import type { RentInfo } from '../types/rent.types'

interface AnalysisState {
  result: AnalysisResult | null
  population: LivingPopulation[]
  rent: RentInfo | null
  isLoading: boolean
  error: string | null
  setResult: (result: AnalysisResult) => void
  setPopulation: (population: LivingPopulation[]) => void
  setRent: (rent: RentInfo | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useAnalysisStore = create<AnalysisState>()((set) => ({
  result: null,
  population: [],
  rent: null,
  isLoading: false,
  error: null,
  setResult: (result) => set({ result }),
  setPopulation: (population) => set({ population }),
  setRent: (rent) => set({ rent }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({ result: null, population: [], rent: null, isLoading: false, error: null }),
}))

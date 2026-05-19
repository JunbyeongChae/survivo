import type { SurvivalGrade } from '../types/store.types'
import type { LivingPopulation } from '../types/population.types'
import type { RentInfo } from '../types/rent.types'

interface ScoreInput {
  nearbyCount: number
  population: LivingPopulation[]
  rent: RentInfo | null
}

export interface ScoreOutput {
  score: number
  grade: SurvivalGrade
  densityRate: number
}

function calcDensityScore(nearbyCount: number): number {
  if (nearbyCount === 0) return 34
  if (nearbyCount <= 3) return 28
  if (nearbyCount <= 7) return 20
  if (nearbyCount <= 15) return 12
  return 5
}

function calcPopulationScore(population: LivingPopulation[]): number {
  if (population.length === 0) return 17
  const avg = population.reduce((sum, p) => sum + p.totalPopulation, 0) / population.length
  return Math.round(Math.min(33, (avg / 5000) * 33))
}

function calcRentScore(rent: RentInfo | null): number {
  if (!rent) return 17
  const quarters = Object.values(rent.vacancyRateByQuarter)
  if (quarters.length === 0) return 17
  const latestVacancy = quarters[quarters.length - 1]
  return Math.round(Math.max(5, 33 - latestVacancy * 1.4))
}

export function calcSurvivalScore({ nearbyCount, population, rent }: ScoreInput): ScoreOutput {
  const score = Math.min(
    100,
    Math.max(0, calcDensityScore(nearbyCount) + calcPopulationScore(population) + calcRentScore(rent)),
  )

  const densityRate = Math.min(100, Math.round((nearbyCount / 20) * 100))

  let grade: SurvivalGrade
  if (score >= 80) grade = 'A'
  else if (score >= 60) grade = 'B'
  else if (score >= 40) grade = 'C'
  else grade = 'D'

  return { score, grade, densityRate }
}

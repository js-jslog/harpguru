import { DegreeIds } from '../types'
import type { Degree } from '../types'

export const ROOT: Degree = { id: DegreeIds.Root } as const
export const FLAT2: Degree = { id: DegreeIds.Flat2 } as const
export const SECOND: Degree = { id: DegreeIds.Second } as const
export const FLAT3: Degree = { id: DegreeIds.Flat3 } as const
export const THIRD: Degree = { id: DegreeIds.Third } as const
export const FOURTH: Degree = { id: DegreeIds.Fourth } as const
export const FLAT5: Degree = { id: DegreeIds.Flat5 } as const
export const FIFTH: Degree = { id: DegreeIds.Fifth } as const
export const FLAT6: Degree = { id: DegreeIds.Flat6 } as const
export const SIXTH: Degree = { id: DegreeIds.Sixth } as const
export const FLAT7: Degree = { id: DegreeIds.Flat7 } as const
export const SEVENTH: Degree = { id: DegreeIds.Seventh } as const

export const ORDERED_DEGREES: readonly Degree[] = [
  ROOT,
  FLAT2,
  SECOND,
  FLAT3,
  THIRD,
  FOURTH,
  FLAT5,
  FIFTH,
  FLAT6,
  SIXTH,
  FLAT7,
  SEVENTH,
] as const

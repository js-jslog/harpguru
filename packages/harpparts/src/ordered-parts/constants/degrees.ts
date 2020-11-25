import { DegreeIds, getDegree } from '../../degree'
import type { Degree } from '../../degree'

export const ORDERED_DEGREES: Record<DegreeIds, Degree> = {
  [DegreeIds.Root]: getDegree(DegreeIds.Root),
  [DegreeIds.Flat2]: getDegree(DegreeIds.Flat2),
  [DegreeIds.Second]: getDegree(DegreeIds.Second),
  [DegreeIds.Flat3]: getDegree(DegreeIds.Flat3),
  [DegreeIds.Third]: getDegree(DegreeIds.Third),
  [DegreeIds.Fourth]: getDegree(DegreeIds.Fourth),
  [DegreeIds.Flat5]: getDegree(DegreeIds.Flat5),
  [DegreeIds.Fifth]: getDegree(DegreeIds.Fifth),
  [DegreeIds.Flat6]: getDegree(DegreeIds.Flat6),
  [DegreeIds.Sixth]: getDegree(DegreeIds.Sixth),
  [DegreeIds.Flat7]: getDegree(DegreeIds.Flat7),
  [DegreeIds.Seventh]: getDegree(DegreeIds.Seventh),
} as const

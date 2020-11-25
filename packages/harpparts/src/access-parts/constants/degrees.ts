import { DegreeIds, generateDegree } from '../../degree'
import type { Degree } from '../../degree'

export const ORDERED_DEGREES: Record<DegreeIds, Degree> = {
  [DegreeIds.Root]: generateDegree(DegreeIds.Root),
  [DegreeIds.Flat2]: generateDegree(DegreeIds.Flat2),
  [DegreeIds.Second]: generateDegree(DegreeIds.Second),
  [DegreeIds.Flat3]: generateDegree(DegreeIds.Flat3),
  [DegreeIds.Third]: generateDegree(DegreeIds.Third),
  [DegreeIds.Fourth]: generateDegree(DegreeIds.Fourth),
  [DegreeIds.Flat5]: generateDegree(DegreeIds.Flat5),
  [DegreeIds.Fifth]: generateDegree(DegreeIds.Fifth),
  [DegreeIds.Flat6]: generateDegree(DegreeIds.Flat6),
  [DegreeIds.Sixth]: generateDegree(DegreeIds.Sixth),
  [DegreeIds.Flat7]: generateDegree(DegreeIds.Flat7),
  [DegreeIds.Seventh]: generateDegree(DegreeIds.Seventh),
} as const

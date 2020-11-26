import { DegreeIds, generateDegree } from '../../degree'
import type { Degree } from '../../degree'

export const ORDERED_DEGREES = new Map<DegreeIds, Degree>()
ORDERED_DEGREES.set(DegreeIds.Root, generateDegree(DegreeIds.Root))
ORDERED_DEGREES.set(DegreeIds.Flat2, generateDegree(DegreeIds.Flat2))
ORDERED_DEGREES.set(DegreeIds.Second, generateDegree(DegreeIds.Second))
ORDERED_DEGREES.set(DegreeIds.Flat3, generateDegree(DegreeIds.Flat3))
ORDERED_DEGREES.set(DegreeIds.Third, generateDegree(DegreeIds.Third))
ORDERED_DEGREES.set(DegreeIds.Fourth, generateDegree(DegreeIds.Fourth))
ORDERED_DEGREES.set(DegreeIds.Flat5, generateDegree(DegreeIds.Flat5))
ORDERED_DEGREES.set(DegreeIds.Fifth, generateDegree(DegreeIds.Fifth))
ORDERED_DEGREES.set(DegreeIds.Flat6, generateDegree(DegreeIds.Flat6))
ORDERED_DEGREES.set(DegreeIds.Sixth, generateDegree(DegreeIds.Sixth))
ORDERED_DEGREES.set(DegreeIds.Flat7, generateDegree(DegreeIds.Flat7))
ORDERED_DEGREES.set(DegreeIds.Seventh, generateDegree(DegreeIds.Seventh))

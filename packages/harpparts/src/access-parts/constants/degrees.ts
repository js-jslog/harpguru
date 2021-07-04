import { DegreeIds, generateDegree } from '../../degree'
import type { Degree } from '../../degree'

export const orderedDegrees = new Map<DegreeIds, Degree>()
orderedDegrees.set(DegreeIds.Root, generateDegree(DegreeIds.Root))
orderedDegrees.set(DegreeIds.Flat2, generateDegree(DegreeIds.Flat2))
orderedDegrees.set(DegreeIds.Second, generateDegree(DegreeIds.Second))
orderedDegrees.set(DegreeIds.Flat3, generateDegree(DegreeIds.Flat3))
orderedDegrees.set(DegreeIds.Third, generateDegree(DegreeIds.Third))
orderedDegrees.set(DegreeIds.Fourth, generateDegree(DegreeIds.Fourth))
orderedDegrees.set(DegreeIds.Flat5, generateDegree(DegreeIds.Flat5))
orderedDegrees.set(DegreeIds.Fifth, generateDegree(DegreeIds.Fifth))
orderedDegrees.set(DegreeIds.Flat6, generateDegree(DegreeIds.Flat6))
orderedDegrees.set(DegreeIds.Sixth, generateDegree(DegreeIds.Sixth))
orderedDegrees.set(DegreeIds.Flat7, generateDegree(DegreeIds.Flat7))
orderedDegrees.set(DegreeIds.Seventh, generateDegree(DegreeIds.Seventh))

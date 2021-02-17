import { DegreeIds } from '../types'
import type { Degree } from '../types'

const degreeMap: Record<DegreeIds, string> = {
  [DegreeIds.Root]: 'Root',
  [DegreeIds.Flat2]: 'Flat second',
  [DegreeIds.Second]: 'Second',
  [DegreeIds.Flat3]: 'Flat third',
  [DegreeIds.Third]: 'Third',
  [DegreeIds.Fourth]: 'Fourth',
  [DegreeIds.Flat5]: 'Flat fifth',
  [DegreeIds.Fifth]: 'Fifth',
  [DegreeIds.Flat6]: 'Flat sixth',
  [DegreeIds.Sixth]: 'Sixth',
  [DegreeIds.Flat7]: 'Flat seventh',
  [DegreeIds.Seventh]: 'Seventh',
}
export const generateDegree = (degreeId: DegreeIds): Degree => {
  const degree = {
    id: degreeId,
    label: degreeMap[degreeId],
  }

  return degree
}

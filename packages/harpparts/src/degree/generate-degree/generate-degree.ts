import { DegreeIds } from '../types'
import type { Degree } from '../types'

export const generateDegree = (degreeId: DegreeIds): Degree => ({
  id: degreeId,
  simpleSplitValue: [degreeId[0], degreeId[1] || ''],
})

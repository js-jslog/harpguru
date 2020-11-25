import { ORDERED_DEGREES } from '../constants'
import type { DegreeIds, Degree } from '../../degree'

export const getDegree = (degreeId: DegreeIds): Degree => {
  return ORDERED_DEGREES[degreeId]
}

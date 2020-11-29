import { ORDERED_DEGREES } from '../constants'
import type { DegreeIds, Degree } from '../../degree'

export const getDegree = (degreeId: DegreeIds): Degree => {
  const degree = ORDERED_DEGREES.get(degreeId)
  if (degree === undefined) throw 'A degree id for an unlisted degree was used'
  return degree
}

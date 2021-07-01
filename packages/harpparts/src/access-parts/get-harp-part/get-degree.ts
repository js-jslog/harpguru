import { orderedDegrees } from '../constants'
import type { DegreeIds, Degree } from '../../degree'

export const getDegree = (degreeId: DegreeIds): Degree => {
  const degree = orderedDegrees.get(degreeId)
  if (degree === undefined) throw 'A degree id for an unlisted degree was used'
  return degree
}

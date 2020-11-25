import { OrderableParts } from '../types'
import type { PozitionIds } from '../../pozition'
import type { PitchIds } from '../../pitch'
import type { DegreeIds } from '../../degree'
import type { ApparatusIds } from '../../apparatus'

import { getOrderedPartIds } from './get-ordered-part-ids'

export const getApparatusIds = (): ReadonlyArray<ApparatusIds> => {
  return getOrderedPartIds(OrderableParts.Apparatus) as ReadonlyArray<
    ApparatusIds
  >
}

export const getDegreeIds = (): ReadonlyArray<DegreeIds> => {
  return getOrderedPartIds(OrderableParts.Degrees) as ReadonlyArray<DegreeIds>
}

export const getPitchIds = (): ReadonlyArray<PitchIds> => {
  return getOrderedPartIds(OrderableParts.Pitches) as ReadonlyArray<PitchIds>
}

export const getPozitionIds = (): ReadonlyArray<PozitionIds> => {
  return getOrderedPartIds(OrderableParts.Pozitions) as ReadonlyArray<
    PozitionIds
  >
}

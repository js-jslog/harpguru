import {
  ORDERED_APPARATUS,
  ORDERED_DEGREES,
  ORDERED_PITCHES,
  ORDERED_POZITIONS,
} from '../constants'
import type { PozitionIds } from '../../pozition'
import type { PitchIds } from '../../pitch'
import type { DegreeIds } from '../../degree'
import type { ApparatusIds } from '../../apparatus'

import { getOrderedPartIds } from './get-ordered-part-ids'

export const getApparatusIds = (): ReadonlyArray<ApparatusIds> => {
  return getOrderedPartIds(ORDERED_APPARATUS) as ReadonlyArray<ApparatusIds>
}

export const getDegreeIds = (): ReadonlyArray<DegreeIds> => {
  return getOrderedPartIds(ORDERED_DEGREES) as ReadonlyArray<DegreeIds>
}

export const getPitchIds = (): ReadonlyArray<PitchIds> => {
  return getOrderedPartIds(ORDERED_PITCHES) as ReadonlyArray<PitchIds>
}

export const getPozitionIds = (): ReadonlyArray<PozitionIds> => {
  return getOrderedPartIds(ORDERED_POZITIONS) as ReadonlyArray<PozitionIds>
}

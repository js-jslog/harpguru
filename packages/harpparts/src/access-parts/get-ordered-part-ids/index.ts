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

export const getApparatusIds = (
  apparatusIds?: ApparatusIds
): ReadonlyArray<ApparatusIds> => {
  return getOrderedPartIds(ORDERED_APPARATUS, apparatusIds) as ReadonlyArray<
    ApparatusIds
  >
}

export const getDegreeIds = (
  degreeIds?: DegreeIds
): ReadonlyArray<DegreeIds> => {
  return getOrderedPartIds(ORDERED_DEGREES, degreeIds) as ReadonlyArray<
    DegreeIds
  >
}

export const getPitchIds = (pitchId?: PitchIds): ReadonlyArray<PitchIds> => {
  return getOrderedPartIds(ORDERED_PITCHES, pitchId) as ReadonlyArray<PitchIds>
}

export const getPozitionIds = (
  pozitionId?: PozitionIds
): ReadonlyArray<PozitionIds> => {
  return getOrderedPartIds(ORDERED_POZITIONS, pozitionId) as ReadonlyArray<
    PozitionIds
  >
}

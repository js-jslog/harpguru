import {
  ORDERED_TUNINGS,
  ORDERED_VALVINGS,
  ORDERED_DEGREES,
  ORDERED_PITCHES,
  ORDERED_POZITIONS,
  ORDERED_SCALES,
} from '../constants'
import type { ValvingIds } from '../../valving'
import type { TuningIds } from '../../tuning'
import type { ScaleIds } from '../../scale'
import type { PozitionIds } from '../../pozition'
import type { PitchIds } from '../../pitch'
import type { DegreeIds } from '../../degree'

import { getOrderedPartIds } from './get-ordered-part-ids'

export const getTuningIds = (
  tuningId?: TuningIds
): ReadonlyArray<TuningIds> => {
  return getOrderedPartIds(
    ORDERED_TUNINGS,
    tuningId
  ) as ReadonlyArray<TuningIds>
}

export const getValvingIds = (
  valvingId?: ValvingIds
): ReadonlyArray<ValvingIds> => {
  return getOrderedPartIds(
    ORDERED_VALVINGS,
    valvingId
  ) as ReadonlyArray<ValvingIds>
}

export const getDegreeIds = (
  degreeId?: DegreeIds
): ReadonlyArray<DegreeIds> => {
  return getOrderedPartIds(
    ORDERED_DEGREES,
    degreeId
  ) as ReadonlyArray<DegreeIds>
}

export const getPitchIds = (pitchId?: PitchIds): ReadonlyArray<PitchIds> => {
  return getOrderedPartIds(ORDERED_PITCHES, pitchId) as ReadonlyArray<PitchIds>
}

export const getPozitionIds = (
  pozitionId?: PozitionIds
): ReadonlyArray<PozitionIds> => {
  return getOrderedPartIds(
    ORDERED_POZITIONS,
    pozitionId
  ) as ReadonlyArray<PozitionIds>
}

export const getScaleIds = (scaleId?: ScaleIds): ReadonlyArray<ScaleIds> => {
  return getOrderedPartIds(ORDERED_SCALES, scaleId) as ReadonlyArray<ScaleIds>
}

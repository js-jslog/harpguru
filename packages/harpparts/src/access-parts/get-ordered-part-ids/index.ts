import {
  orderedTunings,
  orderedValvings,
  orderedDegrees,
  orderedPitches,
  orderedPozitions,
  orderedScales,
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
  return getOrderedPartIds(orderedTunings, tuningId) as ReadonlyArray<TuningIds>
}

export const getValvingIds = (
  valvingId?: ValvingIds
): ReadonlyArray<ValvingIds> => {
  return getOrderedPartIds(
    orderedValvings,
    valvingId
  ) as ReadonlyArray<ValvingIds>
}

export const getDegreeIds = (
  degreeId?: DegreeIds
): ReadonlyArray<DegreeIds> => {
  return getOrderedPartIds(orderedDegrees, degreeId) as ReadonlyArray<DegreeIds>
}

export const getPitchIds = (pitchId?: PitchIds): ReadonlyArray<PitchIds> => {
  return getOrderedPartIds(orderedPitches, pitchId) as ReadonlyArray<PitchIds>
}

export const getPozitionIds = (
  pozitionId?: PozitionIds
): ReadonlyArray<PozitionIds> => {
  return getOrderedPartIds(
    orderedPozitions,
    pozitionId
  ) as ReadonlyArray<PozitionIds>
}

export const getScaleIds = (scaleId?: ScaleIds): ReadonlyArray<ScaleIds> => {
  return getOrderedPartIds(orderedScales, scaleId) as ReadonlyArray<ScaleIds>
}

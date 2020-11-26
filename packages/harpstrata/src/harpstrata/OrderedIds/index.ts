import { PitchIds } from '../Pitch'
import { DegreeIds } from '../Degree'

import {
  getAscendingEnumValues,
  getDescendingEnumValues,
} from './OrderedEnumValues'

export const getAscendingPitchIds = (
  origin?: PitchIds
): ReadonlyArray<PitchIds> => {
  return getAscendingEnumValues(PitchIds, origin)
}

export const getDescendingPitchIds = (
  origin?: PitchIds
): ReadonlyArray<PitchIds> => {
  return getDescendingEnumValues(PitchIds, origin)
}

export const getAscendingDegreeIds = (
  origin?: DegreeIds
): ReadonlyArray<DegreeIds> => {
  return getAscendingEnumValues(DegreeIds, origin)
}

export const getDescendingDegreeIds = (
  origin?: DegreeIds
): ReadonlyArray<DegreeIds> => {
  return getDescendingEnumValues(DegreeIds, origin)
}

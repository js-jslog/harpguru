import type { DegreeIds, PitchIds } from 'harpparts'

import {
  activeIdsFromPitchMatrix,
  activeIdsFromDegreeMatrix,
} from '../active-ids-from-matrix-reducers'
import type { IsActiveProps } from '../../../types'

export const getCounterpartDegreeIds = (
  props: IsActiveProps
): ReadonlyArray<DegreeIds> => {
  const { degreeMatrix, pitchMatrix, activeIds } = props
  const activePitchIds = activeIds as ReadonlyArray<PitchIds>
  const initialState = {
    pitchMatrix,
    degreeMatrix,
    activePitchIds,
    activeDegreeIds: [],
  }
  const reducedState = pitchMatrix.reduce(
    activeIdsFromPitchMatrix,
    initialState
  )
  const { activeDegreeIds } = reducedState

  return activeDegreeIds
}

export const getCounterpartPitchIds = (
  props: IsActiveProps
): ReadonlyArray<PitchIds> => {
  const { degreeMatrix, pitchMatrix, activeIds } = props
  const activeDegreeIds = activeIds as ReadonlyArray<DegreeIds>
  const initialState = {
    degreeMatrix,
    pitchMatrix,
    activePitchIds: [],
    activeDegreeIds,
  }
  const reducedState = degreeMatrix.reduce(
    activeIdsFromDegreeMatrix,
    initialState
  )
  const { activePitchIds } = reducedState

  return activePitchIds
}

import {
  activeIdsFromPitchMatrix,
  activeIdsFromDegreeMatrix,
} from '../active-ids-from-matrix-reducers'
import type {
  IsActiveProps,
  ActivePitchIds,
  ActiveDegreeIds,
} from '../../../types'

export const getCounterpartDegreeIds = (
  props: IsActiveProps
): ActiveDegreeIds => {
  const { degreeMatrix, pitchMatrix, activeIds } = props
  const activePitchIds = activeIds as ActivePitchIds
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
): ActivePitchIds => {
  const { degreeMatrix, pitchMatrix, activeIds } = props
  const activeDegreeIds = activeIds as ActiveDegreeIds
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

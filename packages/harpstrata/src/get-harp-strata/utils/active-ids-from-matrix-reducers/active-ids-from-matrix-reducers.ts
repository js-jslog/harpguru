import type { HarpFaceRow, HarpFaceMatrix, Degree, Pitch } from 'harpparts'

import type { RowAccumulator } from '../active-ids-from-row-reducers'
import {
  activeIdsFromPitchRow,
  activeIdsFromDegreeRow,
} from '../active-ids-from-row-reducers'
import type { ActivePitchIds, ActiveDegreeIds } from '../../../types'

export type MatrixAccumulator = {
  readonly degreeMatrix: HarpFaceMatrix<Degree>
  readonly pitchMatrix: HarpFaceMatrix<Pitch>
  readonly activeDegreeIds: ActiveDegreeIds
  readonly activePitchIds: ActivePitchIds
}

export const activeIdsFromPitchMatrix = (
  accumulator: MatrixAccumulator,
  nextPitchRow: HarpFaceRow<Pitch>
): MatrixAccumulator => {
  const { degreeMatrix, activePitchIds, activeDegreeIds } = accumulator
  const [thisDegreeRow, ...remainingDegreeMatrix] = degreeMatrix

  const initialState: RowAccumulator = {
    activePitchIds,
    activeDegreeIds,
    degreeRow: thisDegreeRow,
    pitchRow: nextPitchRow,
  }

  if (activePitchIds.length === activeDegreeIds.length) return accumulator

  const reducedRow: RowAccumulator = nextPitchRow.reduce(
    activeIdsFromPitchRow,
    initialState
  )

  return {
    ...accumulator,
    degreeMatrix: remainingDegreeMatrix,
    activePitchIds: reducedRow.activePitchIds,
    activeDegreeIds: reducedRow.activeDegreeIds,
  }
}

export const activeIdsFromDegreeMatrix = (
  accumulator: MatrixAccumulator,
  nextDegreeRow: HarpFaceRow<Degree>
): MatrixAccumulator => {
  const { pitchMatrix, activePitchIds, activeDegreeIds } = accumulator
  const [thisPitchRow, ...remainingPitchMatrix] = pitchMatrix

  const initialState: RowAccumulator = {
    activePitchIds,
    activeDegreeIds,
    pitchRow: thisPitchRow,
    degreeRow: nextDegreeRow,
  }

  if (activePitchIds.length === activeDegreeIds.length) return accumulator

  const reducedRow: RowAccumulator = nextDegreeRow.reduce(
    activeIdsFromDegreeRow,
    initialState
  )

  return {
    ...accumulator,
    pitchMatrix: remainingPitchMatrix,
    activePitchIds: reducedRow.activePitchIds,
    activeDegreeIds: reducedRow.activeDegreeIds,
  }
}

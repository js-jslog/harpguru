import type { RowAccumulator } from '../activeIdsFromRowReducers'
import {
  activeIdsFromPitchRow,
  activeIdsFromDegreeRow,
} from '../activeIdsFromRowReducers'
import type { ActivePitchIds, ActiveDegreeIds } from '../../types'
import type { PitchRow, PitchMatrix } from '../../../Pitch'
import type { DegreeRow, DegreeMatrix } from '../../../Degree'

export type MatrixAccumulator = {
  readonly degreeMatrix: DegreeMatrix
  readonly pitchMatrix: PitchMatrix
  readonly activeDegreeIds: ActiveDegreeIds
  readonly activePitchIds: ActivePitchIds
}

export const activeIdsFromPitchMatrix = (
  accumulator: MatrixAccumulator,
  nextPitchRow: PitchRow
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
  nextDegreeRow: DegreeRow
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

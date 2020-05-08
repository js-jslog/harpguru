import type { ActivePitchIds, ActiveDegreeIds } from '../../../types'
import type { Pitch, PitchRow } from '../../../../../Pitch'
import type { Degree, DegreeRow } from '../../../../../Degree'

export type RowAccumulator = {
  readonly degreeRow: DegreeRow;
  readonly pitchRow: PitchRow;
  readonly activeDegreeIds: ActiveDegreeIds;
  readonly activePitchIds: ActivePitchIds;
}

export const activeIdsFromPitchRow = (accumulator: RowAccumulator, nextPitch: Pitch | undefined): RowAccumulator => {
  const { degreeRow, activePitchIds, activeDegreeIds } = accumulator
  const [ thisDegree, ...remainingDegreeRow ] = degreeRow

  if (thisDegree === undefined || nextPitch === undefined) return { ...accumulator, degreeRow: remainingDegreeRow }
  if (activeDegreeIds.includes(thisDegree.id)) return { ...accumulator, degreeRow: remainingDegreeRow }
  if (!activePitchIds.includes(nextPitch.id)) return { ...accumulator, degreeRow: remainingDegreeRow }

  return { ...accumulator, degreeRow: remainingDegreeRow, activeDegreeIds: [ ...activeDegreeIds, thisDegree.id ]}
}

export const activeIdsFromDegreeRow = (accumulator: RowAccumulator, nextDegree: Degree | undefined): RowAccumulator => {
  const { pitchRow, activePitchIds, activeDegreeIds } = accumulator
  const [ thisPitch, ...remainingPitchRow ] = pitchRow

  if (thisPitch === undefined || nextDegree === undefined) return { ...accumulator, pitchRow: remainingPitchRow }
  if (activePitchIds.includes(thisPitch.id)) return { ...accumulator, pitchRow: remainingPitchRow }
  if (!activeDegreeIds.includes(nextDegree.id)) return { ...accumulator, pitchRow: remainingPitchRow }

  return { ...accumulator, pitchRow: remainingPitchRow, activePitchIds: [ ...activePitchIds, thisPitch.id ]}
}

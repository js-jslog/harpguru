import type { PitchMatrix } from '../../Pitch'
import { PitchIds } from '../../Pitch'
import { DegreeIds } from '../../Degree'
import type { DegreeMatrix } from '../../Degree'

export type ActiveDegreeIds = ReadonlyArray<DegreeIds>
export type ActivePitchIds = ReadonlyArray<PitchIds>

export type ActiveIds = ActivePitchIds | ActiveDegreeIds

export type ActiveIdsPair = {
  readonly activeDegreeIds: ActiveDegreeIds
  readonly activePitchIds: ActivePitchIds
}

export type IsActiveProps = {
  degreeMatrix: DegreeMatrix
  pitchMatrix: PitchMatrix
  activeIds: ActiveIds
}

import { PitchIds } from '../../../Pitch'
import { DegreeIds } from '../../../Degree'

export type ActiveDegreeIds = ReadonlyArray<DegreeIds>
export type ActivePitchIds = ReadonlyArray<PitchIds>

export type ActiveIds = ActivePitchIds | ActiveDegreeIds

export type ActiveIdsPair = {
  readonly activeDegreeIds: ActiveDegreeIds;
  readonly activePitchIds: ActivePitchIds;
}

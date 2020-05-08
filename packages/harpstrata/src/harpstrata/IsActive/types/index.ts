import type { IsActiveMatrix } from '../getIsActiveMatrix'
import type { ActiveIds, ActivePitchIds, ActiveDegreeIds } from '../getActiveIdsPair'
import type { PitchMatrix } from '../../Pitch'
import type { DegreeMatrix } from '../../Degree'


export type IsActiveProps = {
  degreeMatrix: DegreeMatrix;
  pitchMatrix: PitchMatrix;
  activeIds: ActiveIds;
}

export type IsActiveComplex = {
  isActiveMatrix: IsActiveMatrix;
  activeDegreeIds: ActiveDegreeIds;
  activePitchIds: ActivePitchIds;
}

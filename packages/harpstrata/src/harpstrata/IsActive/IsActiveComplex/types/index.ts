import type { IsActiveMatrix } from '../../IsActiveMatrix'
import type { ActivePitchIds, ActiveDegreeIds } from '../../ActiveIds'

export type IsActiveComplex = {
  isActiveMatrix: IsActiveMatrix
  activeDegreeIds: ActiveDegreeIds
  activePitchIds: ActivePitchIds
}

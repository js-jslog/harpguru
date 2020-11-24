import type { PozitionIds } from '../../Pozition'
import type { PitchIds, PitchMatrix } from '../../Pitch'
import type { ActiveIds, ActiveDegreeIds, ActivePitchIds } from '../../IsActive'
import type { DegreeMatrix } from '../../Degree'
import type { Apparatus, ApparatusIds } from '../../Apparatus'

export type HarpStrataProps = {
  readonly apparatusId: ApparatusIds
  readonly pozitionId: PozitionIds
  readonly harpKeyId: PitchIds
  readonly activeIds: ActiveIds
}

export type HarpStrata = {
  readonly apparatus: Apparatus
  readonly degreeMatrix: DegreeMatrix
  readonly pitchMatrix: PitchMatrix
  readonly activeDegreeIds: ActiveDegreeIds
  readonly activePitchIds: ActivePitchIds
  readonly pozitionId: PozitionIds
  readonly rootPitchId: PitchIds
  readonly harpKeyId: PitchIds
}

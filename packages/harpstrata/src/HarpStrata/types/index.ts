import type {
  HarpFaceMatrix,
  Apparatus,
  ApparatusIds,
  Degree,
  PitchIds,
  Pitch,
  PozitionIds,
} from 'harpparts'

import type { ActiveIds, ActiveDegreeIds, ActivePitchIds } from '../../IsActive'

export type HarpStrataProps = {
  readonly apparatusId: ApparatusIds
  readonly pozitionId: PozitionIds
  readonly harpKeyId: PitchIds
  readonly activeIds: ActiveIds
}

export type HarpStrata = {
  readonly apparatus: Apparatus
  readonly degreeMatrix: HarpFaceMatrix<Degree>
  readonly pitchMatrix: HarpFaceMatrix<Pitch>
  readonly activeDegreeIds: ActiveDegreeIds
  readonly activePitchIds: ActivePitchIds
  readonly pozitionId: PozitionIds
  readonly rootPitchId: PitchIds
  readonly harpKeyId: PitchIds
}

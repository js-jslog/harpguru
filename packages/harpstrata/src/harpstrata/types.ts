import type { PozitionIds } from './Pozition'
import type { PitchIds, PitchMatrix } from './Pitch'
import type { ActiveIds, IsActiveComplex } from './IsActive'
import type { DegreeMatrix } from './Degree'
import type { Apparatus, ApparatusIds } from './Apparatus'

export type HarpStrataProps = {
  readonly apparatusId: ApparatusIds;
  readonly pozitionId: PozitionIds;
  readonly keyPitchId: PitchIds;
  readonly activeIds: ActiveIds;
}

export interface HarpStrata {
  readonly apparatus: Apparatus;
  readonly degreeMatrix: DegreeMatrix;
  readonly pitchMatrix: PitchMatrix;
  readonly isActiveComplex: IsActiveComplex;
}

export {
  ApparatusIds,
  Apparatus,
  InteractionIds,
  Interaction,
  InteractionRow,
  InteractionMatrix,
  HalfstepIndex,
  HalfstepIndexRow,
  HalfstepIndexMatrix,
} from './Apparatus/types'

export {
  DegreeIds,
  Degree,
  DegreeRow,
  DegreeMatrix
} from './Degree/types'

export {
  PozitionIds,
  Pozition
} from './Pozition/types'

export {
  PitchIds,
  Pitch
} from './Pitch/types'

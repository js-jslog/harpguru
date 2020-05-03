import type { PitchMatrix } from './Pitch/types'
import type { DegreeMatrix } from './Degree/types'
import type { Apparatus } from './Apparatus/types'

export interface HarpStrata {
  readonly apparatus: Apparatus;
  readonly degreeMatrix: DegreeMatrix;
  readonly pitchMatrix: PitchMatrix;
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

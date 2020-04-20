import { InteractionMatrix } from '../types'
import { HalfstepIndexMatrix } from '../types'

export enum ApparatusIds {
  MajorDiatonic = 'MAJOR-DIATONIC',
}

export interface Apparatus {
  readonly id: ApparatusIds;
  readonly halfstepIndexMatrix: HalfstepIndexMatrix;
  readonly interactionMatrix: InteractionMatrix;
}

export {
  InteractionIds,
  Interaction,
  InteractionRow,
  InteractionMatrix
} from '../Interaction/types'
export {
  HalfstepIndex,
  HalfstepIndexRow,
  HalfstepIndexMatrix
} from '../HalfstepIndex/types'

import type { InteractionMask, HalfstepIndexMatrix } from '../types'

export enum ApparatusIds {
  MajorDiatonic = 'MAJOR-DIATONIC',
  CountryTuned = 'COUNTRY-TUNED',
}

export interface Apparatus {
  readonly id: ApparatusIds;
  readonly halfstepIndexMatrix: HalfstepIndexMatrix;
  readonly interactionMask: InteractionMask;
}

export {
  InteractionIds,
  Interaction,
  InteractionMask,
} from '../Interaction/types'
export {
  HalfstepIndex,
  HalfstepIndexRow,
  HalfstepIndexMatrix
} from '../HalfstepIndex/types'

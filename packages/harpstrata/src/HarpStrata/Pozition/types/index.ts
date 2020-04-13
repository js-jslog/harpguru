import { HalfstepIndex } from '../../Apparatus/HalfstepIndex/types'

export enum PozitionIds {
  First = 'FIRST',
  Second = 'SECOND',
}

export interface Pozition {
  readonly id: PozitionIds;
  readonly root: HalfstepIndex;
}

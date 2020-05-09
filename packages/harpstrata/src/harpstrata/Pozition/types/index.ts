import type { HalfstepIndex } from '../../Apparatus'

export enum PozitionIds {
  First = 'FIRST',
  Second = 'SECOND',
}

export type Pozition = {
  readonly id: PozitionIds;
  readonly root: HalfstepIndex;
}

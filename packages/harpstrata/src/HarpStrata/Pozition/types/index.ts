import type { HalfstepIndex } from '../../types'

export enum PozitionIds {
  First = 'FIRST',
  Second = 'SECOND',
}

export interface Pozition {
  readonly id: PozitionIds;
  readonly root: HalfstepIndex;
}

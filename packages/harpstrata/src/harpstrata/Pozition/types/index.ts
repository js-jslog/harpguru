import type { HalfstepIndex } from '../../Apparatus'

export enum PozitionIds {
  First = 'FIRST',
  Second = 'SECOND',
  Third = 'THIRD',
  Fourth = 'FOURTH',
  Fifth = 'FIFTH',
  Sixth = 'SIXTH',
  Seventh = 'SEVENTH',
  Eighth = 'EIGHTH',
  Ninth = 'NINTH',
  Tenth = 'TENTH',
  Eleventh = 'ELEVENTH',
  Twelfth = 'TWELFTH',
}

export type Pozition = {
  readonly id: PozitionIds
  readonly rootOffset: HalfstepIndex
}

import type { HarpFaceMatrix, HalfstepIndex } from '../../types'

export enum InteractionIds {
  Blow = 'BLOW',
  Draw = 'DRAW',
  Bend1 = 'BEND1',
  Bend2 = 'BEND2',
  Bend3 = 'BEND3',
  BlowBend1 = 'BLOWBEND1',
  BlowBend2 = 'BLOWBEND2',
  OverDraw1 = 'OVERDRAW1',
  OverBlow1 = 'OVERBLOW1',
}

export type Interaction = {
  readonly id: InteractionIds
}

export enum ApparatusIds {
  MajorDiatonic = 'Major diatonic',
  CountryTuned = 'Country tuned',
  NaturalMinor = 'Natural minor',
  WildeTuned = 'Wilde tuned',
  PowerBender = 'Power bender',
  PowerDraw = 'Power draw',
  WoozleMinor = 'Woozle minor',
}

export type Apparatus = {
  readonly id: ApparatusIds
  readonly halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>
  readonly interactionMatrix: HarpFaceMatrix<Interaction>
}

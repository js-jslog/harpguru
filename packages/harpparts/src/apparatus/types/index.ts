import type { HarpFaceMatrix, HalfstepIndex } from '../../types'

export type Hole = {
  readonly blow: HalfstepIndex
  readonly draw: HalfstepIndex
  readonly bends?: HalfstepIndex[]
  readonly blowBends?: HalfstepIndex[]
  readonly overblow?: [HalfstepIndex]
  readonly overdraw?: [HalfstepIndex]
}

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
  ValveBend = 'VALVEBEND',
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
  PowerDrawHalfValved = 'Power draw (half valved)',
  WoozleMinor = 'Woozle minor',
  WoozleMinorHalfValved = 'Woozle minor (half valved)',
}

export type Apparatus = {
  readonly id: ApparatusIds
  readonly halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>
  readonly interactionMatrix: HarpFaceMatrix<Interaction>
}

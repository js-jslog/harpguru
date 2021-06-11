import type { HarpFaceMatrix, HalfstepIndex } from '../../types'
import type { Interaction } from '../../interaction'

export type ReedArray = [
  [
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex
  ],
  [
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex
  ]
]

export type ReedPair = [HalfstepIndex, HalfstepIndex]

export type ReedPairArray = [
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair
]

export type Hole = {
  readonly blow: HalfstepIndex
  readonly draw: HalfstepIndex
  readonly bends: HalfstepIndex[]
  readonly blowbends: HalfstepIndex[]
  readonly overblows: HalfstepIndex[]
  readonly overdraws: HalfstepIndex[]
}

export type HoleArray = [
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole
]

export type MatrixSpecs = {
  readonly height: number
  readonly blowRow: number
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

export const ReedTuningPitches = {
  c1: 0,
  db1: 1,
  d1: 2,
  eb1: 3,
  e1: 4,
  f1: 5,
  gb1: 6,
  g1: 7,
  ab1: 8,
  a1: 9,
  bb1: 10,
  b1: 11,
  c2: 12,
  db2: 13,
  d2: 14,
  eb2: 15,
  e2: 16,
  f2: 17,
  gb2: 18,
  g2: 19,
  ab2: 20,
  a2: 21,
  bb2: 22,
  b2: 23,
  c3: 24,
  db3: 25,
  d3: 26,
  eb3: 27,
  e3: 28,
  f3: 29,
  gb3: 30,
  g3: 31,
  ab3: 32,
  a3: 33,
  bb3: 34,
  b3: 35,
  c4: 36,
  db4: 37,
  d4: 38,
  eb4: 39,
  e4: 40,
  f4: 41,
  gb4: 42,
  g4: 43,
  ab4: 44,
  a4: 45,
  bb4: 46,
  b4: 47,
} as const

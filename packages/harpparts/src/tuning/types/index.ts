import type { HalfstepIndex } from '../../types'

export enum TuningIds {
  MajorDiatonic = 'Major diatonic',
  CountryTuned = 'Country tuned',
  NaturalMinor = 'Natural minor',
  WildeTuned = 'Wilde tuned',
  PowerBender = 'Power bender',
  PowerDraw = 'Power draw',
  WoozleMinor = 'Woozle minor',
}

export type Tuning = {
  readonly id: TuningIds
  readonly reedArray: ReedArray
}

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

export enum ReedTuningPitches {
  c1 = 0,
  db1,
  d1,
  eb1,
  e1,
  f1,
  gb1,
  g1,
  ab1,
  a1,
  bb1,
  b1,
  c2,
  db2,
  d2,
  eb2,
  e2,
  f2,
  gb2,
  g2,
  ab2,
  a2,
  bb2,
  b2,
  c3,
  db3,
  d3,
  eb3,
  e3,
  f3,
  gb3,
  g3,
  ab3,
  a3,
  bb3,
  b3,
  c4,
  db4,
  d4,
  eb4,
  e4,
  f4,
  gb4,
  g4,
  ab4,
  a4,
  bb4,
  b4,
}
import type { HalfstepIndex } from '../../types'

export enum TuningIds {
  Richter = 'Richter',
  Country = 'Country',
  NaturalMinor = 'Natural minor',
  HarmonicMinor = 'Harmonic minor',
  MelodyMaker = 'Melody maker',
  Wilde = 'Wilde',
  PowerBender = 'Power bender',
  PowerDraw = 'Power draw',
  PaddyRichter = 'Paddy richter',
  BluesOne = 'Blues #1',
  BluesTwo = 'Blues #2',
  BluesThree = 'Blues #3',
  Chord = 'Chord',
  EasyThird = 'Easy third',
  Bagpipe = 'Bagpipe',
  WillScarlett = 'Will Scarlett',
  WoozleMinor = 'Woozle minor',
  AugmentedSpanish = 'Augmented Spanish',
  SpiralCircular = 'Spiral / Circular',
  RichterIonian = 'Ionian',
  RichterMixolydian = 'Mixolydian',
  RichterDorian = 'Dorian',
  RichterAeolian = 'Aeolian',
  RichterPhrygian = 'Phrygian',
  RichterLocrian = 'Locrian',
  RichterLydian = 'Lydian',
  WholeTone = 'Whole tone',
  Diminished = 'Diminished',
}

export enum TuningCategories {
  Common = 'Common',
  BrendanPower = 'Brendan Power',
  JoeFilisko = 'Joe Filisko',
  NativeScale = 'Native scale',
  Other = 'Other',
}

export type Tuning = {
  readonly id: TuningIds
  readonly category: TuningCategories
  readonly reedArray: ReedArray
}

export type ReedArray = readonly [
  readonly [
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
  readonly [
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

import type { HalfstepIndex, HarpFaceFacts } from '../../types'

export enum TuningIds {
  MajorDiatonic = 'Major diatonic',
  Country = 'Country',
  NaturalMinor = 'Natural minor',
  HarmonicMinor = 'Harmonic minor',
  MelodyMaker = 'Melody maker',
  EasyDiatonic = 'Easy diatonic',
  Wilde = 'Wilde',
  WildeMinor = 'Wilde minor',
  Circular = 'Circular/Melody king',
  OrchestraS = 'Orchestra s',
  PentaHarp = 'Penta harp',
  PowerBender = 'Power bender',
  PowerDraw = 'Power draw',
  PaddyRichter = 'Paddy richter',
  LuckyThirteen = 'Lucky thirteen',
  BluesOne = 'Blues 1',
  BluesTwo = 'Blues 2',
  BluesThree = 'Blues 3',
  Chord = 'Chord',
  RichterIonian = 'Ionian (richter)',
  RichterMixolydian = 'Mixolydian (richter)',
  RichterDorian = 'Dorian (richter)',
  RichterAeolian = 'Aeolian (richter)',
  RichterPhrygian = 'Phrygian (richter)',
  RichterLocrian = 'Locrian (richter)',
  RichterLydian = 'Lydian (richter)',
  SpiralIonian = 'Ionian (spiral)',
  SpiralMixolydian = 'Mixolydian (spiral)',
  SpiralDorian = 'Dorian (spiral)',
  SpiralAeolian = 'Aeolian (spiral)',
  SpiralPhrygian = 'Phrygian (spiral)',
  SpiralLocrian = 'Locrian (spiral)',
  SpiralLydian = 'Lydian (spiral)',
  WholeTone = 'Whole tone',
  Diminished = 'Diminished',
  AugmentedSpanish = 'Augmented Spanish',
  Bagpipe = 'Bagpipe',
  EasyThird = 'Easy third',
  WillScarlett = 'Will Scarlett',
  WoozleMinor = 'Woozle minor',
  BabyFat = 'Baby fat',
  TwelveHoleSolo = 'Twelve hole solo',
  SixteenHoleSolo = 'Sixteen hole solo',
  TwelveHoleChromatic = 'Chromatic (12 hole)',
  SixteenHoleChromatic = 'Chromatic (16 hole)',
}

export enum TuningCategories {
  Common = 'Common',
  Seydel = 'Seydel',
  Hohner = 'Hohner',
  BrendanPower = 'Brendan Power',
  JoeFilisko = 'Joe Filisko',
  RichterModes = 'Richter modes',
  SpiralModes = 'Spiral modes',
  OtherScales = 'Other scales',
  Other = 'Other',
}

export type Tuning = {
  readonly id: TuningIds
  readonly shortName?: string
  readonly category: TuningCategories
  readonly reedArrays: HarpFaceFacts<ReedArray>
}

export type ReedArray =
  | ReedArray7
  | ReedArray10
  | ReedArray12
  | ReedArray13
  | ReedArray16

export type ReedArray7 = readonly [
  readonly [
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
    HalfstepIndex
  ]
]

export type ReedArray10 = readonly [
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

export type ReedArray12 = readonly [
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
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex
  ]
]

export type ReedArray13 = readonly [
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
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex,
    HalfstepIndex
  ]
]

export type ReedArray16 = readonly [
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
  g0 = -5,
  ab0 = -4,
  a0 = -3,
  bb0 = -2,
  b0 = -1,
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
  c5,
  db5,
  d5,
  eb5,
  e5,
  f5,
  gb5,
  g5,
  ab5,
  a5,
  bb5,
  b5,
  c6,
}

import { TuningIds, TuningCategories, ReedTuningPitches } from '../types'
import type { Tuning } from '../types'

const {
  CommonDiatonic,
  CommonChromatic,
  Seydel,
  Hohner,
  BrendanPower,
  Lucky13,
  JoeFilisko,
  RichterModes,
  SpiralModes,
  OtherScales,
  Other,
} = TuningCategories

const {
  MajorDiatonic,
  Country,
  NaturalMinor,
  HarmonicMinor,
  MelodyMaker,
  EasyDiatonic,
  SoloTwelveHoleChromatic,
  SoloSixteenHoleChromatic,
  OrchestraTwelveHoleChromatic,
  OrchestraSixteenHoleChromatic,
  DiminishedChromatic,
  Wilde,
  WildeMinor,
  Circular,
  OrchestraS,
  PentaHarp,
  PowerBender,
  PowerDraw,
  PaddyRichter,
  Lucky13Richter,
  Lucky13PowerChromatic,
  BluesOne,
  BluesTwo,
  BluesThree,
  Chord,
  RichterIonian,
  RichterMixolydian,
  RichterDorian,
  RichterAeolian,
  RichterPhrygian,
  RichterLocrian,
  RichterLydian,
  SpiralIonian,
  SpiralMixolydian,
  SpiralDorian,
  SpiralAeolian,
  SpiralPhrygian,
  SpiralLocrian,
  SpiralLydian,
  WholeTone,
  Diminished,
  AugmentedSpanish,
  Bagpipe,
  EasyThird,
  WillScarlett,
  WoozleMinor,
  BabyFat,
  SoloTwelveHoleDiatonic,
  SoloSixteenHoleDiatonic,
} = TuningIds

const {
  g0,
  a0,
  b0,
  c1,
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
  db3,
  c3,
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
  e4,
  eb4,
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
} = ReedTuningPitches

export const RICHTER_IONIAN: Tuning = {
  id: RichterIonian,
  category: RichterModes,
  shortName: 'Ionian',
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ]
    ]
  },
} as const

export const RICHTER_MIXOLYDIAN: Tuning = {
  id: RichterMixolydian,
  shortName: 'Mixolydian',
  category: RichterModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
    ]
  },
} as const

export const RICHTER_DORIAN: Tuning = {
  id: RichterDorian,
  shortName: 'Dorian',
  category: RichterModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
      [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
    ]
  },
} as const

export const RICHTER_AEOLIAN: Tuning = {
  id: RichterAeolian,
  shortName: 'Aeolian',
  category: RichterModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
      [ d1 , g1 , bb1, d2 , f2 , ab2, bb2, d3 , f3 , ab3],
    ]
  },
} as const

export const RICHTER_PHRYGIAN: Tuning = {
  id: RichterPhrygian,
  shortName: 'Phrygian',
  category: RichterModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
      [ db1, g1 , bb1, db2, f2 , ab2, bb2, db3, f3 , ab3],
    ]
  },
} as const

export const RICHTER_LOCRIAN: Tuning = {
  id: RichterLocrian,
  shortName: 'Locrian',
  category: RichterModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, gb1, c2 , eb2, gb2, c3 , eb3, gb3, c4 ],
      [ db1, gb1, bb1, db2, f2 , ab2, bb2, db3, f3 , ab3],
    ]
  },
} as const

export const RICHTER_LYDIAN: Tuning = {
  id: RichterLydian,
  shortName: 'Lydian',
  category: RichterModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , gb3, a3 ],
    ]
  },
} as const

export const SPIRAL_IONIAN: Tuning = {
  id: SpiralIonian,
  shortName: 'Ionian',
  category: SpiralModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , b1 , d2 , f2 , a2 , c3 , e3 , g3 ],
      [ d1 , f1 , a1 , c2 , e2 , g2 , b2 , d3 , f3 , a3 ],
    ]
  },
} as const

export const SPIRAL_MIXOLYDIAN: Tuning = {
  id: SpiralMixolydian,
  shortName: 'Mixolydian',
  category: SpiralModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , bb1, d2 , f2 , a2 , c3 , e3 , g3 ],
      [ d1 , f1 , a1 , c2 , e2 , g2 , bb2, d3 , f3 , a3 ],
    ]
  },
} as const

export const SPIRAL_DORIAN: Tuning = {
  id: SpiralDorian,
  shortName: 'Dorian',
  category: SpiralModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, g1 , bb1, d2 , f2 , a2 , c3 , eb3, g3 ],
      [ d1 , f1 , a1 , c2 , eb2, g2 , bb2, d3 , f3 , a3 ],
    ]
  },
} as const

export const SPIRAL_AEOLIAN: Tuning = {
  id: SpiralAeolian,
  shortName: 'Aeolian',
  category: SpiralModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, g1 , bb1, d2 , f2 , ab2, c3 , eb3, g3 ],
      [ d1 , f1 , ab1, c2 , eb2, g2 , bb2, d3 , f3 , ab3],
    ]
  },
} as const

export const SPIRAL_PHRYGIAN: Tuning = {
  id: SpiralPhrygian,
  shortName: 'Phrygian',
  category: SpiralModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, g1 , bb1, db2, f2 , ab2, c3 , eb3, g3 ],
      [ db1, f1 , ab1, c2 , eb2, g2 , bb2, db3, f3 , ab3],
    ]
  },
} as const

export const SPIRAL_LOCRIAN: Tuning = {
  id: SpiralLocrian,
  shortName: 'Locrian',
  category: SpiralModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, gb1, bb1, db2, f2 , ab2, c3 , eb3, gb3],
      [ db1, f1 , ab1, c2 , eb2, gb2, bb2, db3, f3 , ab3],
    ]
  },
} as const

export const SPIRAL_LYDIAN: Tuning = {
  id: SpiralLydian,
  shortName: 'Lydian',
  category: SpiralModes,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , b1 , d2 , gb2, a2 , c3 , e3 , g3 ],
      [ d1 , gb1, a1 , c2 , e2 , g2 , b2 , d3 , gb3, a3 ],
    ]
  },
} as const

export const MAJOR_DIATONIC: Tuning = {
  id: MajorDiatonic,
  category: CommonDiatonic,
  // prettier-ignore
  reedArrays: RICHTER_IONIAN.reedArrays,
} as const

export const COUNTRY: Tuning = {
  id: Country,
  category: CommonDiatonic,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , f3 , a3 ],
    ]
  },
} as const

export const NATURAL_MINOR: Tuning = {
  id: NaturalMinor,
  category: CommonDiatonic,
  // prettier-ignore
  reedArrays: RICHTER_DORIAN.reedArrays,
} as const

export const HARMONIC_MINOR: Tuning = {
  id: HarmonicMinor,
  category: CommonDiatonic,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
      [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
    ]
  },
} as const

export const MELODY_MAKER: Tuning = {
  id: MelodyMaker,
  category: CommonDiatonic,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , gb3, a3 ],
    ]
  },
} as const

export const EASY_DIATONIC: Tuning = {
  id: EasyDiatonic,
  category: CommonDiatonic,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ a0 , c1 , e1 , a1 , c2 , e2 , a2 , c3 , e3 , a3 ],
      [ b0 , d1 , g1 , b1 , d2 , g2 , b2 , d3 , g3 , b3 ],
    ]
  },
} as const

export const SOLO_TWELVE_HOLE_CHROMATIC: Tuning = {
  id: SoloTwelveHoleChromatic,
  shortName: 'Solo (12 hole)',
  category: CommonChromatic,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10   11   12
      [ c2 , e2 , g2 , c3 , c3 , e3 , g3 , c4 , c4 , e4 , g4 , c5 ],
      [ d2 , f2 , a2 , b2 , d3 , f3 , a3 , b3 , d4 , f4 , a4 , b4 ],
    ],
    harpface2: [
      // 1    2    3    4    5    6    7    8    9   10   11   12
      [ db2, f2 , ab2, db3, db3, f3 , ab3, db4, db4, f4 , ab4, db5],
      [ eb2, gb2, bb2, c3 , eb3, gb3, bb3, c4 , eb4, gb4, bb4, d5 ],
    ]
  },
} as const

export const SOLO_SIXTEEN_HOLE_CHROMATIC: Tuning = {
  id: SoloSixteenHoleChromatic,
  shortName: 'Solo (16 hole)',
  category: CommonChromatic,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
      [ c1 , e1 , g1 , c2 , c2 , e2 , g2 , c3 , c3 , e3 , g3 , c4 , c4 , e4 , g4 , c5 ],
      [ d1 , f1 , a1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 , b3 , d4 , f4 , a4 , b4 ],
    ],
    harpface2: [
      // 1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
      [ db1, f1 , ab1, db2, db2, f2 , ab2, db3, db3, f3 , ab3, db4, db4, f4 , ab4, db5],
      [ eb1, gb1, bb1, c2 , eb2, gb2, bb2, c3 , eb3, gb3, bb3, c4 , eb4, gb4, bb4, d5 ],
    ]
  },
} as const

export const ORCHESTRA_TWELVE_HOLE_CHROMATIC: Tuning = {
  id: OrchestraTwelveHoleChromatic,
  shortName: 'Orchestra (12 hole)',
  category: CommonChromatic,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10   11   12
      [ c2 , e2 , g2 , c3 , c3 , e3 , g3 , c4 , c4 , e4 , g4 , c5 ],
      [ d2 , f2 , a2 , b2 , d3 , f3 , a3 , b3 , d4 , f4 , a4 , b4 ],
    ],
    harpface2: [
      // 1    2    3    4    5    6    7    8    9   10   11   12
      [ db2, f2 , ab2, db3, db3, f3 , ab3, db4, db4, f4 , ab4, db5],
      [ eb2, gb2, bb2, c3 , eb3, gb3, bb3, c4 , eb4, gb4, bb4, d5 ],
    ]
  },
} as const

export const ORCHESTRA_SIXTEEN_HOLE_CHROMATIC: Tuning = {
  id: OrchestraSixteenHoleChromatic,
  shortName: 'Orchestra (16 hole)',
  category: CommonChromatic,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
      [ c1 , e1 , g1 , c2 , c2 , e2 , g2 , c3 , c3 , e3 , g3 , c4 , c4 , e4 , g4 , c5 ],
      [ d1 , f1 , a1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 , b3 , d4 , f4 , a4 , b4 ],
    ],
    harpface2: [
      // 1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
      [ db1, f1 , ab1, db2, db2, f2 , ab2, db3, db3, f3 , ab3, db4, db4, f4 , ab4, db5],
      [ eb1, gb1, bb1, c2 , eb2, gb2, bb2, c3 , eb3, gb3, bb3, c4 , eb4, gb4, bb4, d5 ],
    ]
  },
} as const

export const DIMINISHED_CHROMATIC: Tuning = {
  id: DiminishedChromatic,
  shortName: 'Diminished',
  category: CommonChromatic,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10   11   12
      [ c2 , eb2, gb2, a2 , c3 , eb3, gb3, a3 , c4 , eb4, gb4, a4 ],
      [ d2 , f2 , ab2, b2 , d3 , f3 , ab3, b3 , d4 , f4 , ab4, b4 ],
    ],
    harpface2: [
      // 1    2    3    4    5    6    7    8    9   10   11   12
      [ db2, e2 , g2 , bb2, db3, e3 , g3 , bb3, db4, e4 , g4 , bb4],
      [ eb2, gb2, a2 , c3 , eb3, gb3, a3 , c4 , eb4, gb4, a4 , c5 ],
    ]
  },
} as const

export const WILDE: Tuning = {
  id: Wilde,
  category: Seydel,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , e2 , g2 , c3 , e3 , a3 ],
      [ d1 , g1 , b1 , d2 , f2 , g2 , b2 , d3 , g3 , c4 ],
    ]
  },
} as const

export const WILDE_MINOR: Tuning = {
  id: WildeMinor,
  category: Seydel,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, g1 , c2 , eb2, eb2, g2 , c3 , eb3, a3 ],
      [ d1 , g1 , bb1, d2 , f2 , g2 , bb2, d3 , g3 , c4 ],
    ]
  },
} as const

export const CIRCULAR: Tuning = {
  id: Circular,
  category: Seydel,
  // prettier-ignore
  reedArrays: SPIRAL_MIXOLYDIAN.reedArrays,
} as const

export const ORCHESTRA_S: Tuning = {
  id: OrchestraS,
  category: Seydel,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , f1 , f1 , a1 , c2 , f2 , f2 , a2 , c3 , f3 ],
      [ d1 , e1 , g1 , bb1, d2 , e2 , g2 , bb2, d3 , e3 ],
    ]
  },
} as const

export const PENTA_HARP: Tuning = {
  id: PentaHarp,
  category: Hohner,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , f1 , g1 , c2 , f2 , g2 , c3 , f3 , g3 , c4 ],
      [ eb1, gb1, bb1, eb2, gb2, bb2, eb3, gb3, bb3, eb4],
    ]
  },
} as const

export const POWER_BENDER: Tuning = {
  id: PowerBender,
  category: BrendanPower,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , d2 , f2 , a2 , c3 , e3 , a3 ],
      [ d1 , g1 , b1 , d2 , e2 , g2 , b2 , d3 , g3 , c4 ],
    ]
  },
} as const

export const POWER_DRAW: Tuning = {
  id: PowerDraw,
  category: BrendanPower,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , g2 , a2 , c3 , e3 , a3 ],
      [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , g3 , c4 ],
    ]
  },
} as const

export const PADDY_RICHTER: Tuning = {
  id: PaddyRichter,
  category: BrendanPower,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
    ]
  },
} as const

export const LUCKY_13_RICHTER: Tuning = {
  id: Lucky13Richter,
  shortName: 'Richter',
  category: Lucky13,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10   11   12   13
      [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 , e4 , g4 , c5 ],
      [ d1 , g1 , b1 , d2 , g2 , b2 , d3 , f3 , a3 , b3 , d4 , f4 , a4 ]
    ]
  },
} as const

export const LUCKY_13_POWER_CHROMATIC: Tuning = {
  id: Lucky13PowerChromatic,
  shortName: 'Power chromatic',
  category: Lucky13,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10   11   12   13
      [ g0 , c1 , c1 , e1 , g1 , c2 , c2 , e2 , g2 , c3 , c3 , e3 , g3 ],
      [ a0 , b0 , d1 , f1 , a1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
    ]
  },
} as const

export const BLUES_ONE: Tuning = {
  id: BluesOne,
  category: JoeFilisko,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ d1 , g1 , b1 , d2 , g2 , b2 , d3 , f3 , f3 , a3 ],
    ]
  },
} as const

export const BLUES_TWO: Tuning = {
  id: BluesTwo,
  category: JoeFilisko,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , bb1, c2 , g2 , c3 , e3 , g3 , c4 ],
      [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
    ]
  },
} as const

export const BLUES_THREE: Tuning = {
  id: BluesThree,
  category: JoeFilisko,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , g2 , bb2, e3 , g3 , c4 ],
      [ d1 , g1 , b1 , d2 , f2 , a2 , c3 , d3 , f3 , a3 ],
    ]
  },
} as const

export const CHORD: Tuning = {
  id: Chord,
  category: JoeFilisko,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , g2 , bb2, bb2, d3 , f3 ],
      [ d1 , g1 , b1 , d2 , f2 , a2 , c3 , d3 , gb3, a3 ],
    ]
  },
} as const

export const WHOLE_TONE: Tuning = {
  id: WholeTone,
  category: OtherScales,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , ab1, c2 , e2 , ab2, c3 , e3 , ab3, c4 ],
      [ d1 , gb1, bb1, d2 , gb2, bb2, d3 , gb3, bb3, d4 ],
    ]
  },
} as const

export const DIMINISHED: Tuning = {
  id: Diminished,
  category: OtherScales,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, gb1, a1 , c2 , eb2, gb2, a2 , c3 , eb3],
      [ d1 , f1 , ab1, b1 , d2 , f2 , ab2, b2 , d3 , f3 ],
    ]
  },
} as const

export const BAGPIPE: Tuning = {
  id: Bagpipe,
  category: Other,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , g1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ c1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
    ]
  },
} as const

export const AUGMENTED_SPANISH: Tuning = {
  id: AugmentedSpanish,
  category: Other,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , ab1, c2 , e2 , ab2, c3 , e3 , ab3, c4 ],
      [ eb1, g1 , b1 , eb2, g2 , b2 , eb3, g3 , b3 , eb4],
    ]
  },
} as const

export const EASY_THIRD: Tuning = {
  id: EasyThird,
  category: Other,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ d1 , f1 , a1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
    ]
  },
} as const

export const WILL_SCARLETT: Tuning = {
  id: WillScarlett,
  category: Other,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
      [ e1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , gb3, a3 ],
    ]
  },
} as const

export const WOOZLE_MINOR: Tuning = {
  id: WoozleMinor,
  category: Other,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10
      [ c1 , eb1, g1 , c2 , eb2, g2 , a2 , c3 , eb3, a3 ],
      [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , g3 , c4 ],
    ]
  },
} as const

export const BABY_FAT: Tuning = {
  id: BabyFat,
  category: Other,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7
      [ c1 , e1 , g1 , c2 , e2 , g2 , c3 ],
      [ d1 , g1 , b1 , d2 , f2 , a2 , b2 ],
    ]
  },
} as const

export const SOLO_TWELVE_HOLE_DIATONIC: Tuning = {
  id: SoloTwelveHoleDiatonic,
  category: Other,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10   11   12
      [ c1 , e1 , g1 , c2 , c2 , e2 , g2 , c3 , c3 , e3 , g3 , c4 ],
      [ d1 , f1 , a1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 , b3 ],
    ]
  },
} as const

export const SOLO_SIXTEEN_HOLE_DIATONIC: Tuning = {
  id: SoloSixteenHoleDiatonic,
  category: Other,
  // prettier-ignore
  reedArrays: {
    harpface1: [
      // 1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
      [ c1 , e1 , g1 , c2 , c2 , e2 , g2 , c3 , c3 , e3 , g3 , c4 , c4 , e4 , g4 , c5 ],
      [ d1 , f1 , a1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 , b3 , d4 , f4 , a4 , b4 ],
    ]
  },
} as const

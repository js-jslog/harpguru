import { TuningIds, TuningCategories, ReedTuningPitches } from '../types'
import type { Tuning } from '../types'

const {
  Common,
  Seydel,
  BrendanPower,
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
  Wilde,
  WildeMinor,
  Circular,
  OrchestraS,
  PowerBender,
  PowerDraw,
  PaddyRichter,
  LuckyThirteen,
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
  TwelveHoleSolo,
  SixteenNote,
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
  c3,
  c4,
  d4,
  eb4,
} = ReedTuningPitches

export const RICHTER_IONIAN: Tuning = {
  id: RichterIonian,
  category: RichterModes,
  shortName: 'Ionian',
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const RICHTER_MIXOLYDIAN: Tuning = {
  id: RichterMixolydian,
  shortName: 'Mixolydian',
  category: RichterModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
  ],
} as const

export const RICHTER_DORIAN: Tuning = {
  id: RichterDorian,
  shortName: 'Dorian',
  category: RichterModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
    [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
  ],
} as const

export const RICHTER_AEOLIAN: Tuning = {
  id: RichterAeolian,
  shortName: 'Aeolian',
  category: RichterModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
    [ d1 , g1 , bb1, d2 , f2 , ab2, bb2, d3 , f3 , ab3],
  ],
} as const

export const RICHTER_PHRYGIAN: Tuning = {
  id: RichterPhrygian,
  shortName: 'Phrygian',
  category: RichterModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
    [ db1, g1 , bb1, db2, f2 , ab2, bb2, db3, f3 , ab3],
  ],
} as const

export const RICHTER_LOCRIAN: Tuning = {
  id: RichterLocrian,
  shortName: 'Locrian',
  category: RichterModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, gb1, c2 , eb2, gb2, c3 , eb3, gb3, c4 ],
    [ db1, gb1, bb1, db2, f2 , ab2, bb2, db3, f3 , ab3],
  ],
} as const

export const RICHTER_LYDIAN: Tuning = {
  id: RichterLydian,
  shortName: 'Lydian',
  category: RichterModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , gb3, a3 ],
  ],
} as const

export const SPIRAL_IONIAN: Tuning = {
  id: SpiralIonian,
  shortName: 'Ionian',
  category: SpiralModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , b1 , d2 , f2 , a2 , c3 , e3 , g3 ],
    [ d1 , f1 , a1 , c2 , e2 , g2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const SPIRAL_MIXOLYDIAN: Tuning = {
  id: SpiralMixolydian,
  shortName: 'Mixolydian',
  category: SpiralModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , bb1, d2 , f2 , a2 , c3 , e3 , g3 ],
    [ d1 , f1 , a1 , c2 , e2 , g2 , bb2, d3 , f3 , a3 ],
  ],
} as const

export const SPIRAL_DORIAN: Tuning = {
  id: SpiralDorian,
  shortName: 'Dorian',
  category: SpiralModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , bb1, d2 , f2 , a2 , c3 , eb3, g3 ],
    [ d1 , f1 , a1 , c2 , eb2, g2 , bb2, d3 , f3 , a3 ],
  ],
} as const

export const SPIRAL_AEOLIAN: Tuning = {
  id: SpiralAeolian,
  shortName: 'Aeolian',
  category: SpiralModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , bb1, d2 , f2 , ab2, c3 , eb3, g3 ],
    [ d1 , f1 , ab1, c2 , eb2, g2 , bb2, d3 , f3 , ab3],
  ],
} as const

export const SPIRAL_PHRYGIAN: Tuning = {
  id: SpiralPhrygian,
  shortName: 'Phrygian',
  category: SpiralModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , bb1, db2, f2 , ab2, c3 , eb3, g3 ],
    [ db1, f1 , ab1, c2 , eb2, g2 , bb2, db3, f3 , ab3],
  ],
} as const

export const SPIRAL_LOCRIAN: Tuning = {
  id: SpiralLocrian,
  shortName: 'Locrian',
  category: SpiralModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, gb1, bb1, db2, f2 , ab2, c3 , eb3, gb3],
    [ db1, f1 , ab1, c2 , eb2, gb2, bb2, db3, f3 , ab3],
  ],
} as const

export const SPIRAL_LYDIAN: Tuning = {
  id: SpiralLydian,
  shortName: 'Lydian',
  category: SpiralModes,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , b1 , d2 , gb2, a2 , c3 , e3 , g3 ],
    [ d1 , gb1, a1 , c2 , e2 , g2 , b2 , d3 , gb3, a3 ],
  ],
} as const

export const MAJOR_DIATONIC: Tuning = {
  id: MajorDiatonic,
  category: Common,
  // prettier-ignore
  reedArray: RICHTER_IONIAN.reedArray,
} as const

export const COUNTRY: Tuning = {
  id: Country,
  category: Common,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const NATURAL_MINOR: Tuning = {
  id: NaturalMinor,
  category: Common,
  // prettier-ignore
  reedArray: RICHTER_DORIAN.reedArray,
} as const

export const HARMONIC_MINOR: Tuning = {
  id: HarmonicMinor,
  category: Common,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const MELODY_MAKER: Tuning = {
  id: MelodyMaker,
  category: Common,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , gb3, a3 ],
  ],
} as const

export const EASY_DIATONIC: Tuning = {
  id: EasyDiatonic,
  category: Common,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ a0 , c1 , e1 , a1 , c2 , e2 , a2 , c3 , e3 , a3 ],
    [ b0 , d1 , g1 , b1 , d2 , g2 , b2 , d3 , g3 , b3 ],
  ],
} as const

export const WILDE: Tuning = {
  id: Wilde,
  category: Seydel,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , e2 , g2 , c3 , e3 , a3 ],
    [ d1 , g1 , b1 , d2 , f2 , g2 , b2 , d3 , g3 , c4 ],
  ],
} as const

export const WILDE_MINOR: Tuning = {
  id: WildeMinor,
  category: Seydel,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, eb2, g2 , c3 , eb3, a3 ],
    [ d1 , g1 , bb1, d2 , f2 , g2 , bb2, d3 , g3 , c4 ],
  ],
} as const

export const CIRCULAR: Tuning = {
  id: Circular,
  category: Seydel,
  // prettier-ignore
  reedArray: SPIRAL_MIXOLYDIAN.reedArray,
} as const

export const ORCHESTRA_S: Tuning = {
  id: OrchestraS,
  category: Seydel,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , f1 , f1 , a1 , c2 , f2 , f2 , a2 , c3 , f3 ],
    [ d1 , e1 , g1 , bb1, d2 , e2 , g2 , bb2, d3 , e3 ],
  ],
} as const

export const POWER_BENDER: Tuning = {
  id: PowerBender,
  category: BrendanPower,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , d2 , f2 , a2 , c3 , e3 , a3 ],
    [ d1 , g1 , b1 , d2 , e2 , g2 , b2 , d3 , g3 , c4 ],
  ],
} as const

export const POWER_DRAW: Tuning = {
  id: PowerDraw,
  category: BrendanPower,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , a2 , c3 , e3 , a3 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , g3 , c4 ],
  ],
} as const

export const PADDY_RICHTER: Tuning = {
  id: PaddyRichter,
  category: BrendanPower,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const LUCKY_THIRTEEN: Tuning = {
  id: LuckyThirteen,
  category: BrendanPower,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10   11   12   13
    [ g0 , c1 , c1 , e1 , g1 , c2 , c2 , e2 , g2 , c3 , c3 , e3 , g3 ],
    [ a0 , b0 , d1 , f1 , a1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const BLUES_ONE: Tuning = {
  id: BluesOne,
  category: JoeFilisko,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , g2 , b2 , d3 , f3 , f3 , a3 ],
  ],
} as const

export const BLUES_TWO: Tuning = {
  id: BluesTwo,
  category: JoeFilisko,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , bb1, c2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const BLUES_THREE: Tuning = {
  id: BluesThree,
  category: JoeFilisko,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , bb2, e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , c3 , d3 , f3 , a3 ],
  ],
} as const

export const CHORD: Tuning = {
  id: Chord,
  category: JoeFilisko,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , bb2, bb2, d3 , f3 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , c3 , d3 , gb3, a3 ],
  ],
} as const

export const WHOLE_TONE: Tuning = {
  id: WholeTone,
  category: OtherScales,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , ab1, c2 , e2 , ab2, c3 , e3 , ab3, c4 ],
    [ d1 , gb1, bb1, d2 , gb2, bb2, d3 , gb3, bb3, d4 ],
  ],
} as const

export const DIMINISHED: Tuning = {
  id: Diminished,
  category: OtherScales,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, gb1, a1 , c2 , eb2, gb2, a2 , c3 , eb3],
    [ d1 , f1 , ab1, b1 , d2 , f2 , ab2, b2 , d3 , f3 ],
  ],
} as const

export const BAGPIPE: Tuning = {
  id: Bagpipe,
  category: Other,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , g1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ c1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
  ],
} as const

export const AUGMENTED_SPANISH: Tuning = {
  id: AugmentedSpanish,
  category: Other,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , ab1, c2 , e2 , ab2, c3 , e3 , ab3, c4 ],
    [ eb1, g1 , b1 , eb2, g2 , b2 , eb3, g3 , b3 , eb4],
  ],
} as const

export const EASY_THIRD: Tuning = {
  id: EasyThird,
  category: Other,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , f1 , a1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const WILL_SCARLETT: Tuning = {
  id: WillScarlett,
  category: Other,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ e1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , gb3, a3 ],
  ],
} as const

export const WOOZLE_MINOR: Tuning = {
  id: WoozleMinor,
  category: Other,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , a2 , c3 , eb3, a3 ],
    [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , g3 , c4 ],
  ],
} as const

export const BABY_FAT: Tuning = {
  id: BabyFat,
  category: Other,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 ],
  ],
} as const

export const TWELVE_HOLE_SOLO: Tuning = {
  id: TwelveHoleSolo,
  category: Other,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10   11   12
    [ c1 , e1 , g1 , c2 , c2 , e2 , g2 , c3 , c3 , e3 , g3 , c4 ],
    [ d1 , f1 , a1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 , b3 ],
  ],
} as const

export const SIXTEEN_NOTE: Tuning = {
  id: SixteenNote,
  category: Other,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10   11   12   13  14  15  16
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , c1 , e1 , g1 , c2 , e2 , c1, c1, c1, c1 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d1 , g1 , b1 , d2 , f2 , c1, c1, c1, c1 ],
  ],
} as const

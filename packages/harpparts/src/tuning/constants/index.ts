import { TuningIds, ReedTuningPitches } from '../types'
import type { Tuning } from '../types'

const {
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

export const RICHTER: Tuning = {
  id: TuningIds.Richter,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const COUNTRY: Tuning = {
  id: TuningIds.Country,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const NATURAL_MINOR: Tuning = {
  id: TuningIds.NaturalMinor,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
    [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
  ],
} as const

export const HARMONIC_MINOR: Tuning = {
  id: TuningIds.HarmonicMinor,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const POWER_BENDER: Tuning = {
  id: TuningIds.PowerBender,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , d2 , f2 , a2 , c3 , e3 , a3 ],
    [ d1 , g1 , b1 , d2 , e2 , g2 , b2 , d3 , g3 , c4 ],
  ],
} as const

export const POWER_DRAW: Tuning = {
  id: TuningIds.PowerDraw,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , a2 , c3 , e3 , a3 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , g3 , c4 ],
  ],
} as const

export const PADDY_RICHTER: Tuning = {
  id: TuningIds.PaddyRichter,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const BLUES_ONE: Tuning = {
  id: TuningIds.BluesOne,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , g2 , b2 , d3 , f3 , f3 , a3 ],
  ],
} as const

export const BLUES_TWO: Tuning = {
  id: TuningIds.BluesTwo,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , bb1, c2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const BLUES_THREE: Tuning = {
  id: TuningIds.BluesThree,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , bb2, e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , c3 , d3 , f3 , a3 ],
  ],
} as const

export const CHORD: Tuning = {
  id: TuningIds.Chord,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , bb2, bb2, d3 , f3 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , c3 , d3 , gb3, a3 ],
  ],
} as const

export const EASY_THIRD: Tuning = {
  id: TuningIds.EasyThird,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , f1 , a1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const BAGPIPE: Tuning = {
  id: TuningIds.Bagpipe,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , g1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ c1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
  ],
} as const

export const WILL_SCARLETT: Tuning = {
  id: TuningIds.WillScarlett,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ e1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , gb3, a3 ],
  ],
} as const

export const MELODY_MAKER: Tuning = {
  id: TuningIds.MelodyMaker,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , gb3, a3 ],
  ],
} as const

export const WILDE: Tuning = {
  id: TuningIds.Wilde,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , e2 , g2 , c3 , e3 , a3 ],
    [ d1 , g1 , b1 , d2 , f2 , g2 , b2 , d3 , g3 , c4 ],
  ],
} as const

export const WOOZLE_MINOR: Tuning = {
  id: TuningIds.WoozleMinor,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , a2 , c3 , eb3, a3 ],
    [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , g3 , c4 ],
  ],
} as const

export const AUGMENTED_SPANISH: Tuning = {
  id: TuningIds.AugmentedSpanish,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , ab1, c2 , e2 , ab2, c3 , e3 , ab3, c4 ],
    [ eb1, g1 , b1 , eb2, g2 , b2 , eb3, g3 , b3 , eb4],
  ],
} as const

export const SPIRAL_CIRCULAR: Tuning = {
  id: TuningIds.AugmentedSpanish,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , bb1, d2 , f2 , a2 , c3 , e3 , g3 ],
    [ d1 , f1 , a1 , c2 , e2 , g2 , bb2, d3 , f3 , a3 ],
  ],
} as const

export const MIXOLYDIAN: Tuning = {
  id: TuningIds.Mixolydian,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
  ],
} as const

export const PHRYGIAN: Tuning = {
  id: TuningIds.Phrygian,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
    [ db1, g1 , bb1, db2, f2 , ab2, bb2, db3, f3 , ab3],
  ],
} as const

export const LOCRIAN: Tuning = {
  id: TuningIds.Locrian,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, gb1, c2 , eb2, gb2, c3 , eb3, gb3, c4 ],
    [ db1, gb1, bb1, db2, f2 , ab2, bb2, db3, f3 , ab3],
  ],
} as const

export const WHOLE_TONE: Tuning = {
  id: TuningIds.WholeTone,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , ab1, c2 , e2 , ab2, c3 , e3 , ab3, c4 ],
    [ d1 , gb1, bb1, d2 , gb2, bb2, d3 , gb3, bb3, d4 ],
  ],
} as const

export const DIMINISHED: Tuning = {
  id: TuningIds.Diminished,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, gb1, a1 , c2 , eb2, gb2, a2 , c3 , eb3],
    [ d1 , f1 , ab1, b1 , d2 , f2 , ab2, b2 , d3 , f3 ],
  ],
} as const

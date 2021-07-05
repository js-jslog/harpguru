import { TuningIds, ReedTuningPitches } from '../types'
import type { Tuning } from '../types'

const {
  c1,
  d1,
  eb1,
  e1,
  f1,
  g1,
  ab1,
  a1,
  bb1,
  b1,
  c2,
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
  d3,
  eb3,
  e3,
  f3,
  gb3,
  g3,
  ab3,
  a3,
  b3,
  c3,
  c4,
  eb4,
} = ReedTuningPitches

export const MAJOR_DIATONIC: Tuning = {
  id: TuningIds.MajorDiatonic,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ],
} as const

export const COUNTRY_TUNED: Tuning = {
  id: TuningIds.CountryTuned,
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

export const MELODY_MAKER: Tuning = {
  id: TuningIds.MelodyMaker,
  // prettier-ignore
  reedArray: [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , a1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , gb3, a3 ],
  ],
} as const

export const WILDE_TUNED: Tuning = {
  id: TuningIds.WildeTuned,
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

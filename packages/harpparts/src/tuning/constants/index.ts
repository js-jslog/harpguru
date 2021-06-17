import { ReedTuningPitches } from '../types'
import type { ReedArray } from '../types'

const {
  c1,
  d1,
  eb1,
  e1,
  g1,
  bb1,
  b1,
  c2,
  d2,
  eb2,
  e2,
  f2,
  gb2,
  g2,
  a2,
  bb2,
  b2,
  d3,
  eb3,
  e3,
  f3,
  g3,
  a3,
  c3,
  c4,
} = ReedTuningPitches

// prettier-ignore
export const MAJOR_DIATONIC_TUNING: ReedArray = [
  // 1    2    3    4    5    6    7    8    9   10
  [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
  [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
]

// prettier-ignore
export const COUNTRY_TUNED_TUNING: ReedArray = [
  // 1    2    3    4    5    6    7    8    9   10
  [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
  [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , f3 , a3 ],
]

// prettier-ignore
export const NATURAL_MINOR_TUNING: ReedArray = [
  // 1    2    3    4    5    6    7    8    9   10
  [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
  [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
]

// prettier-ignore
export const POWER_BENDER_TUNING: ReedArray = [
  // 1    2    3    4    5    6    7    8    9   10
  [ c1 , e1 , g1 , c2 , d2 , f2 , a2 , c3 , e3 , a3 ],
  [ d1 , g1 , b1 , d2 , e2 , g2 , b2 , d3 , g3 , c4 ],
]

// prettier-ignore
export const POWER_DRAW_TUNING: ReedArray = [
  // 1    2    3    4    5    6    7    8    9   10
  [ c1 , e1 , g1 , c2 , e2 , g2 , a2 , c3 , e3 , a3 ],
  [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , g3 , c4 ],
] // TODO: How do we define ReedArray as a non-mutable type. I can't make this `as const` for some reason.

// prettier-ignore
export const WILDE_TUNED_TUNING: ReedArray = [
  // 1    2    3    4    5    6    7    8    9   10
  [ c1 , e1 , g1 , c2 , e2 , e2 , g2 , c3 , e3 , a3 ],
  [ d1 , g1 , b1 , d2 , f2 , g2 , b2 , d3 , g3 , c4 ],
]

// prettier-ignore
export const WOOZLE_MINOR_TUNING: ReedArray = [
  // 1    2    3    4    5    6    7    8    9   10
  [ c1 , eb1, g1 , c2 , eb2, g2 , a2 , c3 , eb3, a3 ],
  [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , g3 , c4 ],
]

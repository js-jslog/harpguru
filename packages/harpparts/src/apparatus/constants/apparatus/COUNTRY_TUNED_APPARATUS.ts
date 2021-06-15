import { reedArrayToMatrices } from '../../utils'
import { ApparatusIds, ReedTuningPitches } from '../../types'
import type { Apparatus, ReedArray } from '../../types'

const {
  c1,
  d1,
  e1,
  g1,
  b1,
  c2,
  d2,
  e2,
  gb2,
  g2,
  a2,
  b2,
  d3,
  e3,
  f3,
  g3,
  a3,
  c3,
  c4,
} = ReedTuningPitches

// prettier-ignore
const reedArray: ReedArray = [
  // 1    2    3    4    5    6    7    8    9   10
  [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
  [ d1 , g1 , b1 , d2 , gb2, a2 , b2 , d3 , f3 , a3 ],
]

export const COUNTRY_TUNED_APPARATUS: Apparatus = {
  id: ApparatusIds.CountryTuned,
  ...reedArrayToMatrices(reedArray, ApparatusIds.CountryTuned),
} as const

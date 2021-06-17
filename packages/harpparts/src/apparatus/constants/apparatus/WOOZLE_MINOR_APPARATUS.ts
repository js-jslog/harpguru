import { reedArrayToMatrices } from '../../utils'
import { ApparatusIds, ReedTuningPitches } from '../../types'
import type { Apparatus, ReedArray } from '../../types'

const {
  c1,
  d1,
  eb1,
  g1,
  bb1,
  c2,
  d2,
  eb2,
  f2,
  g2,
  a2,
  bb2,
  d3,
  eb3,
  g3,
  a3,
  c3,
  c4,
} = ReedTuningPitches

// prettier-ignore
const reedArray: ReedArray = [
  // 1    2    3    4    5    6    7    8    9   10
  [ c1 , eb1, g1 , c2 , eb2, g2 , a2 , c3 , eb3, a3 ],
  [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , g3 , c4 ],
]

const { WoozleMinor: id } = ApparatusIds

export const WOOZLE_MINOR_APPARATUS: Apparatus = {
  id,
  ...reedArrayToMatrices(reedArray, id),
} as const

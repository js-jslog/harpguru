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
  f2,
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
  //    1          2          3          4          5          6          7          8          9         10
  [ c1       , e1       , g1       , c2       , e2       , g2       , c3       , e3       , g3       , c4        ],
  [ d1       , g1       , b1       , d2       , f2       , a2       , b2       , d3       , f3       , a3        ],
]
const { halfstepindexMatrix, interactionMatrix } = reedArrayToMatrices(
  reedArray
)

export const MAJOR_DIATONIC_APPARATUS: Apparatus = {
  id: ApparatusIds.MajorDiatonic,
  halfstepIndexMatrix: halfstepindexMatrix,
  interactionMatrix,
} as const

import { HoleErrors } from '../is-hole-valid'
import { ApparatusIds, ReedArray } from '../../types'
import { ReedTuningPitches } from '../../types'
import type { HarpFaceMatrix, HalfstepIndex } from '../../../types'
import {
  BLOW,
  DRAW,
  BEND1,
  BEND2,
  BEND3,
  BLOWBEND1,
  BLOWBEND2,
  OVERDRAW1,
  OVERBLOW1,
} from '../../../interaction'
import type { Interaction } from '../../../interaction'

import { reedArrayToMatrices } from './reed-array-to-matrices'

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
const { MajorDiatonic, CountryTuned } = ApparatusIds

test('reedArrayToMatrices throws errors as expected when any error is encountered', () => {
  const reedArray: ReedArray = [
    // 1    2    3    4    5    6    7    8    9   10
    [c1, d3, c1, d3, c1, d3, c1, d3, c1, d3],
    [d3, c1, d3, c1, d3, c1, d3, c1, d3, c1],
  ]

  expect(() => reedArrayToMatrices(reedArray, MajorDiatonic)).toThrow(
    MajorDiatonic
  )
  expect(() => reedArrayToMatrices(reedArray, MajorDiatonic)).toThrow(
    `Hole 0: ${HoleErrors.TooManyBends}`
  )
  expect(() => reedArrayToMatrices(reedArray, MajorDiatonic)).toThrow(
    `Hole 1: ${HoleErrors.TooManyBlowbends}`
  )
  expect(() => reedArrayToMatrices(reedArray, MajorDiatonic)).toThrow(
    `Hole 8: ${HoleErrors.TooManyBends}`
  )
  expect(() => reedArrayToMatrices(reedArray, MajorDiatonic)).toThrow(
    `Hole 9: ${HoleErrors.TooManyBlowbends}`
  )
})

test('reedArrayToMatrices works as expected for a Richter tuned harp', () => {
  // prettier-ignore
  const reedArray: ReedArray = [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , f2 , a2 , b2 , d3 , f3 , a3 ],
  ]

  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 34        ],
    [ 3        , undefined, undefined, 15       , 18       , 22       , undefined, 27       , 30       , 35        ],
    [ 0        , 4        , 7        , 12       , 16       , 19       , 24       , 28       , 31       , 36        ],
    [ 2        , 7        , 11       , 14       , 17       , 21       , 23       , 26       , 29       , 33        ],
    [ 1        , 6        , 10       , 13       , undefined, 20       , 25       , undefined, 32       , 37        ],
    [ undefined, 5        , 9        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, BLOWBEND2 ],
    [ OVERBLOW1, undefined, undefined, OVERBLOW1, OVERBLOW1, OVERBLOW1, undefined, BLOWBEND1, BLOWBEND1, BLOWBEND1 ],
    [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
    [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
    [ BEND1    , BEND1    , BEND1    , BEND1    , undefined, BEND1    , OVERDRAW1, undefined, OVERDRAW1, OVERDRAW1 ],
    [ undefined, BEND2    , BEND2    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, BEND3    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  const matrices = reedArrayToMatrices(reedArray, MajorDiatonic)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a Country tuned harp', () => {
  // prettier-ignore
  const reedArray: ReedArray = [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , e1 , g1 , c2 , e2 , g2 , c3 , e3 , g3 , c4 ],
    [ d1 , g1 , b1 , d2 , gb2 , a2 , b2 , d3 , f3 , a3 ],
  ]

  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 34        ],
    [ 3        , undefined, undefined, 15       , undefined, 22       , undefined, 27       , 30       , 35        ],
    [ 0        , 4        , 7        , 12       , 16       , 19       , 24       , 28       , 31       , 36        ],
    [ 2        , 7        , 11       , 14       , 18       , 21       , 23       , 26       , 29       , 33        ],
    [ 1        , 6        , 10       , 13       , 17       , 20       , 25       , undefined, 32       , 37        ],
    [ undefined, 5        , 9        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, BLOWBEND2 ],
    [ OVERBLOW1, undefined, undefined, OVERBLOW1, undefined, OVERBLOW1, undefined, BLOWBEND1, BLOWBEND1, BLOWBEND1 ],
    [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
    [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
    [ BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , OVERDRAW1, undefined, OVERDRAW1, OVERDRAW1 ],
    [ undefined, BEND2    , BEND2    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, BEND3    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const
  // prettier-ignore

  const matrices = reedArrayToMatrices(reedArray, CountryTuned)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a Natrual Minor tuned harp', () => {
  // prettier-ignore
  const reedArray: ReedArray = [
    // 1    2    3    4    5    6    7    8    9   10
    [ c1 , eb1, g1 , c2 , eb2, g2 , c3 , eb3, g3 , c4 ],
    [ d1 , g1 , bb1, d2 , f2 , a2 , bb2, d3 , f3 , a3 ],
  ]

  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 34        ],
    [ undefined, undefined, 11       , undefined, 18       , undefined, 23       , undefined, 30       , 35        ],
    [ 0        , 3        , 7        , 12       , 15       , 19       , 24       , 27       , 31       , 36        ], // BLOW
    [ 2        , 7        , 10       , 14       , 17       , 21       , 22       , 26       , 29       , 33        ],
    [ 1        , 6        , 9        , 13       , 16       , 20       , 25       , 28       , 32       , 37        ],
    [ undefined, 5        , 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, 4        , undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, BLOWBEND2 ],
    [ undefined, undefined, OVERBLOW1, undefined, OVERBLOW1, undefined, BLOWBEND1, undefined, BLOWBEND1, BLOWBEND1 ],
    [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
    [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
    [ BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , OVERDRAW1, OVERDRAW1, OVERDRAW1, OVERDRAW1 ],
    [ undefined, BEND2    , BEND2    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, BEND3    , undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  const matrices = reedArrayToMatrices(reedArray, CountryTuned)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

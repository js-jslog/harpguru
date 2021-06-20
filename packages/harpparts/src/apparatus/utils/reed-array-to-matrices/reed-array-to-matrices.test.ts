import { HoleErrors } from '../is-hole-valid'
import type { HarpFaceMatrix, HalfstepIndex } from '../../../types'
import type { ReedArray } from '../../../tuning'
import {
  MAJOR_DIATONIC_TUNING,
  COUNTRY_TUNED_TUNING,
  NATURAL_MINOR_TUNING,
  POWER_BENDER_TUNING,
  POWER_DRAW_TUNING,
  WILDE_TUNED_TUNING,
  WOOZLE_MINOR_TUNING,
} from '../../../tuning'
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

test('reedArrayToMatrices throws errors as expected when any error is encountered', () => {
  const invalidReedArray: ReedArray = [
    // 1    2    3    4    5    6    7    8    9   10
    [0, 20, 0, 20, 0, 20, 0, 20, 0, 20],
    [20, 0, 20, 0, 20, 0, 20, 0, 20, 0],
  ]
  expect(() =>
    reedArrayToMatrices(invalidReedArray, MAJOR_DIATONIC_TUNING.id)
  ).toThrow(MAJOR_DIATONIC_TUNING.id)
  expect(() =>
    reedArrayToMatrices(invalidReedArray, MAJOR_DIATONIC_TUNING.id)
  ).toThrow(`Hole 0: ${HoleErrors.TooManyBends}`)
  expect(() =>
    reedArrayToMatrices(invalidReedArray, MAJOR_DIATONIC_TUNING.id)
  ).toThrow(`Hole 1: ${HoleErrors.TooManyBlowbends}`)
  expect(() =>
    reedArrayToMatrices(invalidReedArray, MAJOR_DIATONIC_TUNING.id)
  ).toThrow(`Hole 8: ${HoleErrors.TooManyBends}`)
  expect(() =>
    reedArrayToMatrices(invalidReedArray, MAJOR_DIATONIC_TUNING.id)
  ).toThrow(`Hole 9: ${HoleErrors.TooManyBlowbends}`)
})

test('reedArrayToMatrices works as expected for a Richter tuned harp', () => {
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

  const { id, reedArray } = MAJOR_DIATONIC_TUNING
  const matrices = reedArrayToMatrices(reedArray, id)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a Country tuned harp', () => {
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

  const { id, reedArray } = COUNTRY_TUNED_TUNING
  const matrices = reedArrayToMatrices(reedArray, id)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a Natrual Minor tuned harp', () => {
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

  const { id, reedArray } = NATURAL_MINOR_TUNING
  const matrices = reedArrayToMatrices(reedArray, id)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a Power Bender tuned harp', () => {
  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ 3        , undefined, undefined, undefined, undefined, 20       , undefined, 27       , 32       , 37        ],
    [ 0        , 4        , 7        , 12       , 14       , 17       , 21       , 24       , 28       , 33        ],
    [ 2        , 7        , 11       , 14       , 16       , 19       , 23       , 26       , 31       , 36        ],
    [ 1        , 6        , 10       , 13       , 15       , 18       , 22       , 25       , 30       , 35        ],
    [ undefined, 5        , 9        , undefined, undefined, undefined, undefined, undefined, 29       , 34        ],
    [ undefined, undefined, 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ OVERBLOW1, undefined, undefined, undefined, undefined, OVERBLOW1, undefined, OVERBLOW1, OVERBLOW1, OVERBLOW1 ],
    [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
    [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
    [ BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , BEND1     ],
    [ undefined, BEND2    , BEND2    , undefined, undefined, undefined, undefined, undefined, BEND2    , BEND2     ],
    [ undefined, undefined, BEND3    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  const { id, reedArray } = POWER_BENDER_TUNING
  const matrices = reedArrayToMatrices(reedArray, id)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a Power Draw tuned harp', () => {
  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ 3        , undefined, undefined, 15       , 18       , undefined, undefined, 27       , 32       , 37        ], 
    [ 0        , 4        , 7        , 12       , 16       , 19       , 21       , 24       , 28       , 33        ],
    [ 2        , 7        , 11       , 14       , 17       , 21       , 23       , 26       , 31       , 36        ],
    [ 1        , 6        , 10       , 13       , undefined, 20       , 22       , 25       , 30       , 35        ],
    [ undefined, 5        , 9        , undefined, undefined, undefined, undefined, undefined, 29       , 34        ],
    [ undefined, undefined, 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ OVERBLOW1, undefined, undefined, OVERBLOW1, OVERBLOW1, undefined, undefined, OVERBLOW1, OVERBLOW1, OVERBLOW1 ],
    [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
    [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
    [ BEND1    , BEND1    , BEND1    , BEND1    , undefined, BEND1    , BEND1    , BEND1    , BEND1    , BEND1     ],
    [ undefined, BEND2    , BEND2    , undefined, undefined, undefined, undefined, undefined, BEND2    , BEND2     ],
    [ undefined, undefined, BEND3    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  const { id, reedArray } = POWER_DRAW_TUNING
  const matrices = reedArrayToMatrices(reedArray, id)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a Wilde tuned harp', () => {
  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ 3        , undefined, undefined, 15       , undefined, undefined, undefined, 27       , 32       , 37        ],
    [ 0        , 4        , 7        , 12       , 16       , 16       , 19       , 24       , 28       , 33        ],
    [ 2        , 7        , 11       , 14       , 17       , 19       , 23       , 26       , 31       , 36        ],
    [ 1        , 6        , 10       , 13       , undefined, 18       , 22       , 25       , 30       , 35        ],
    [ undefined, 5        , 9        , undefined, undefined, 17       , 21       , undefined, 29       , 34        ],
    [ undefined, undefined, 8        , undefined, undefined, undefined, 20       , undefined, undefined, undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ OVERBLOW1, undefined, undefined, OVERBLOW1, undefined, undefined, undefined, OVERBLOW1, OVERBLOW1, OVERBLOW1 ],
    [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
    [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
    [ BEND1    , BEND1    , BEND1    , BEND1    , undefined, BEND1    , BEND1    , BEND1    , BEND1    , BEND1     ],
    [ undefined, BEND2    , BEND2    , undefined, undefined, BEND2    , BEND2    , undefined, BEND2    , BEND2     ],
    [ undefined, undefined, BEND3    , undefined, undefined, undefined, BEND3    , undefined, undefined, undefined ],
  ] as const

  const { id, reedArray } = WILDE_TUNED_TUNING
  const matrices = reedArrayToMatrices(reedArray, id)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a Woozle Minor tuned harp', () => {
  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ undefined, undefined, 11       , undefined, 18       , undefined, 23       , undefined, 32       , 37        ], 
    [ 0        , 3        , 7        , 12       , 15       , 19       , 21       , 24       , 27       , 33        ],
    [ 2        , 7        , 10       , 14       , 17       , 21       , 22       , 26       , 31       , 36        ],
    [ 1        , 6        , 9        , 13       , 16       , 20       , undefined, 25       , 30       , 35        ],
    [ undefined, 5        , 8        , undefined, undefined, undefined, undefined, undefined, 29       , 34        ],
    [ undefined, 4        , undefined, undefined, undefined, undefined, undefined, undefined, 28       , undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ undefined, undefined, OVERBLOW1, undefined, OVERBLOW1, undefined, OVERBLOW1, undefined, OVERBLOW1, OVERBLOW1 ],
    [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
    [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
    [ BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , BEND1    , undefined, BEND1    , BEND1    , BEND1     ],
    [ undefined, BEND2    , BEND2    , undefined, undefined, undefined, undefined, undefined, BEND2    , BEND2     ],
    [ undefined, BEND3    , undefined, undefined, undefined, undefined, undefined, undefined, BEND3    , undefined ],
  ] as const

  const { id, reedArray } = WOOZLE_MINOR_TUNING
  const matrices = reedArrayToMatrices(reedArray, id)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

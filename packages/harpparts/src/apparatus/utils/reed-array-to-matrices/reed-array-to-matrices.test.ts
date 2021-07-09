import { HoleErrors } from '../is-hole-valid'
import { ValvingIds } from '../../../valving'
import type { HarpFaceMatrix, HalfstepIndex } from '../../../types'
import type { ReedArray } from '../../../tuning'
import {
  MAJOR_DIATONIC,
  COUNTRY,
  NATURAL_MINOR,
  POWER_BENDER,
  POWER_DRAW,
  WILDE,
  WOOZLE_MINOR,
} from '../../../tuning'
import {
  BLOW,
  DRAW,
  BLOWBEND1,
  BLOWBEND2,
  DRAWBEND1,
  DRAWBEND2,
  DRAWBEND3,
  OVERBLOW1,
  OVERDRAW1,
  VALVEDBLOW1,
  VALVEDDRAW1,
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
    reedArrayToMatrices(
      invalidReedArray,
      MAJOR_DIATONIC.id,
      ValvingIds.NotValved
    )
  ).toThrow(MAJOR_DIATONIC.id)
  expect(() =>
    reedArrayToMatrices(
      invalidReedArray,
      MAJOR_DIATONIC.id,
      ValvingIds.NotValved
    )
  ).toThrow(`Hole 0: ${HoleErrors.TooManyDrawbends}`)
  expect(() =>
    reedArrayToMatrices(
      invalidReedArray,
      MAJOR_DIATONIC.id,
      ValvingIds.NotValved
    )
  ).toThrow(`Hole 1: ${HoleErrors.TooManyBlowbends}`)
  expect(() =>
    reedArrayToMatrices(
      invalidReedArray,
      MAJOR_DIATONIC.id,
      ValvingIds.NotValved
    )
  ).toThrow(`Hole 8: ${HoleErrors.TooManyDrawbends}`)
  expect(() =>
    reedArrayToMatrices(
      invalidReedArray,
      MAJOR_DIATONIC.id,
      ValvingIds.NotValved
    )
  ).toThrow(`Hole 9: ${HoleErrors.TooManyBlowbends}`)
})

test('reedArrayToMatrices works as expected for a major diatonic tuned harp', () => {
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
    [ DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, undefined, DRAWBEND1, OVERDRAW1, undefined, OVERDRAW1, OVERDRAW1 ],
    [ undefined, DRAWBEND2, DRAWBEND2, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, DRAWBEND3, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  const { id, reedArray } = MAJOR_DIATONIC
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.NotValved)
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
    [ DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, OVERDRAW1, undefined, OVERDRAW1, OVERDRAW1 ],
    [ undefined, DRAWBEND2, DRAWBEND2, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, DRAWBEND3, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const
  // prettier-ignore

  const { id, reedArray } = COUNTRY
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.NotValved)
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
    [ DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, OVERDRAW1, OVERDRAW1, OVERDRAW1, OVERDRAW1 ],
    [ undefined, DRAWBEND2, DRAWBEND2, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, DRAWBEND3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  const { id, reedArray } = NATURAL_MINOR
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.NotValved)
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
    [ DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1 ],
    [ undefined, DRAWBEND2, DRAWBEND2, undefined, undefined, undefined, undefined, undefined, DRAWBEND2, DRAWBEND2 ],
    [ undefined, undefined, DRAWBEND3, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  const { id, reedArray } = POWER_BENDER
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.NotValved)
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
    [ DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, undefined, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1 ],
    [ undefined, DRAWBEND2, DRAWBEND2, undefined, undefined, undefined, undefined, undefined, DRAWBEND2, DRAWBEND2 ],
    [ undefined, undefined, DRAWBEND3, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  const { id, reedArray } = POWER_DRAW
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.NotValved)
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
    [ DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, undefined, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1 ],
    [ undefined, DRAWBEND2, DRAWBEND2, undefined, undefined, DRAWBEND2, DRAWBEND2, undefined, DRAWBEND2, DRAWBEND2 ],
    [ undefined, undefined, DRAWBEND3, undefined, undefined, undefined, DRAWBEND3, undefined, undefined, undefined ],
  ] as const

  const { id, reedArray } = WILDE
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.NotValved)
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
    [ DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, DRAWBEND1, undefined, DRAWBEND1, DRAWBEND1, DRAWBEND1 ],
    [ undefined, DRAWBEND2, DRAWBEND2, undefined, undefined, undefined, undefined, undefined, DRAWBEND2, DRAWBEND2 ],
    [ undefined, DRAWBEND3, undefined, undefined, undefined, undefined, undefined, undefined, DRAWBEND3, undefined ],
  ] as const

  const { id, reedArray } = WOOZLE_MINOR
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.NotValved)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a half-valved Power Draw tuned harp', () => {
  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ -1       , 3        , 6        , 11       , 15       , 18       , 20       , 23       , 27       , 32        ],
    [ 0        , 4        , 7        , 12       , 16       , 19       , 21       , 24       , 28       , 33        ],
    [ 2        , 7        , 11       , 14       , 17       , 21       , 23       , 26       , 31       , 36        ],
    [ 1        , 6        , 10       , 13       , undefined, 20       , 22       , 25       , 30       , 35        ],
    [ undefined, 5        , 9        , undefined, undefined, undefined, undefined, undefined, 29       , 34        ],
    [ undefined, undefined, 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //     1            2            3            4            5            6            7            8            9           10
    [ VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1 ],
    [ BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW        ],
    [ DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW        ],
    [ DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , undefined  , DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , DRAWBEND1   ],
    [ undefined  , DRAWBEND2  , DRAWBEND2  , undefined  , undefined  , undefined  , undefined  , undefined  , DRAWBEND2  , DRAWBEND2   ],
    [ undefined  , undefined  , DRAWBEND3  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined   ],
  ] as const

  const { id, reedArray } = POWER_DRAW
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.HalfValved)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a half-valved Woozle Minor tuned harp', () => {
  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ -1       , 2        , 6        , 11       , 14       , 18       , 20       , 23       , 26       , 32        ],
    [ 0        , 3        , 7        , 12       , 15       , 19       , 21       , 24       , 27       , 33        ],
    [ 2        , 7        , 10       , 14       , 17       , 21       , 22       , 26       , 31       , 36        ],
    [ 1        , 6        , 9        , 13       , 16       , 20       , undefined, 25       , 30       , 35        ],
    [ undefined, 5        , 8        , undefined, undefined, undefined, undefined, undefined, 29       , 34        ],
    [ undefined, 4        , undefined, undefined, undefined, undefined, undefined, undefined, 28       , undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //     1            2            3            4            5            6            7            8            9           10
    [ VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1 ],
    [ BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW        ],
    [ DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW        ],
    [ DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , undefined  , DRAWBEND1  , DRAWBEND1  , DRAWBEND1   ],
    [ undefined  , DRAWBEND2  , DRAWBEND2  , undefined  , undefined  , undefined  , undefined  , undefined  , DRAWBEND2  , DRAWBEND2   ],
    [ undefined  , DRAWBEND3  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined  , DRAWBEND3  , undefined   ],
  ] as const

  const { id, reedArray } = WOOZLE_MINOR
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.HalfValved)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

test('reedArrayToMatrices works as expected for a half-valved major diatonic tuned harp', () => {
  // prettier-ignore
  const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
    //    1          2          3          4          5          6          7          8          9         10
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 34        ],
    [ -1       , 3        , 6        , 11       , 15       , 18       , undefined, 27       , 30       , 35        ],
    [ 0        , 4        , 7        , 12       , 16       , 19       , 24       , 28       , 31       , 36        ],
    [ 2        , 7        , 11       , 14       , 17       , 21       , 23       , 26       , 29       , 33        ],
    [ 1        , 6        , 10       , 13       , undefined, 20       , 22       , 25       , 28       , 32        ],
    [ undefined, 5        , 9        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ] as const

  // prettier-ignore
  const interactionMatrix: HarpFaceMatrix<Interaction> = [
    //     1            2            3            4            5            6            7            8            9           10
    [ undefined  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined  , BLOWBEND2   ],
    [ VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, VALVEDBLOW1, undefined  , BLOWBEND1  , BLOWBEND1  , BLOWBEND1   ],
    [ BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW       , BLOW        ],
    [ DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW       , DRAW        ],
    [ DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , DRAWBEND1  , undefined  , DRAWBEND1  , VALVEDDRAW1, VALVEDDRAW1, VALVEDDRAW1, VALVEDDRAW1 ],
    [ undefined  , DRAWBEND2  , DRAWBEND2  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined   ],
    [ undefined  , undefined  , DRAWBEND3  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined  , undefined   ],
  ] as const

  const { id, reedArray } = MAJOR_DIATONIC
  const matrices = reedArrayToMatrices(reedArray, id, ValvingIds.HalfValved)
  expect(matrices).toStrictEqual({ halfstepIndexMatrix, interactionMatrix })
})

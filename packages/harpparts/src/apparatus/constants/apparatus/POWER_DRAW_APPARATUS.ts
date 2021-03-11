import { BLOW, DRAW, BEND1, BEND2, BEND3, OVERBLOW1 } from '../interaction'
import { ApparatusIds } from '../../types'
import type { Apparatus, Interaction } from '../../types'
import type { HarpFaceMatrix, HalfstepIndex } from '../../../types'

// prettier-ignore
const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
  //    1          2          3          4          5          6          7          8          9         10
  [ 3        , undefined, undefined, 15       , 18       , 22       , undefined, 27       , 32       , 37        ], 
  [ 0        , 4        , 7        , 12       , 16       , 19       , 24       , 24       , 28       , 33        ],
  [ 2        , 7        , 11       , 14       , 17       , 21       , 23       , 26       , 31       , 36        ],
  [ 1        , 6        , 10       , 13       , undefined, 20       , 25       , 25       , 30       , 35        ],
  [ undefined, 5        , 9        , undefined, undefined, undefined, undefined, undefined, 29       , 34        ],
  [ undefined, undefined, 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
] as const

// prettier-ignore
const interactionMatrix: HarpFaceMatrix<Interaction> = [
  //    1          2          3          4          5          6          7          8          9         10
  [ OVERBLOW1, undefined, undefined, OVERBLOW1, OVERBLOW1, OVERBLOW1, undefined, OVERBLOW1, OVERBLOW1, OVERBLOW1 ],
  [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
  [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
  [ BEND1    , BEND1    , BEND1    , BEND1    , undefined, BEND1    , BEND1    , BEND1    , BEND1    , BEND1     ],
  [ undefined, BEND2    , BEND2    , undefined, undefined, undefined, undefined, undefined, BEND2    , BEND2     ],
  [ undefined, undefined, BEND3    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
] as const

export const POWER_DRAW_APPARATUS: Apparatus = {
  id: ApparatusIds.PowerDraw,
  halfstepIndexMatrix,
  interactionMatrix,
} as const

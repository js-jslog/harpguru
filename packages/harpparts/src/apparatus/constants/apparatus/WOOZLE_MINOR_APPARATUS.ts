import { ApparatusIds } from '../../types'
import type { Apparatus } from '../../types'
import type { HarpFaceMatrix, HalfstepIndex } from '../../../types'
import {
  BLOW,
  DRAW,
  BEND1,
  BEND2,
  BEND3,
  OVERBLOW1,
} from '../../../interaction'
import type { Interaction } from '../../../interaction'

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

export const WOOZLE_MINOR_APPARATUS: Apparatus = {
  id: ApparatusIds.WoozleMinor,
  halfstepIndexMatrix,
  interactionMatrix,
} as const

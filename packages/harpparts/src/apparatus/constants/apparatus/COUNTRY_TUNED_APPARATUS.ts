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
} from '../interaction'
import { ApparatusIds } from '../../types'
import type { Apparatus, Interaction } from '../../types'
import type { HarpFaceMatrix, HalfstepIndex } from '../../../types'

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

export const COUNTRY_TUNED_APPARATUS: Apparatus = {
  id: ApparatusIds.CountryTuned,
  halfstepIndexMatrix,
  interactionMatrix,
} as const

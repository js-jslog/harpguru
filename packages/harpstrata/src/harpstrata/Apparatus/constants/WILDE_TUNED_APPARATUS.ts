import { ApparatusIds } from '../types'
import type { Apparatus } from '../types'
import type { InteractionMatrix } from '../Interaction'
import { BLOW, DRAW, BEND1, BEND2, BEND3, OVERBLOW1 } from '../Interaction'
import type { HalfstepIndexMatrix } from '../HalfstepIndex'

// prettier-ignore
const halfstepIndexMatrix: HalfstepIndexMatrix = [
  //    1          2          3          4          5          6          7          8          9         10
  [ 3        , undefined, undefined, 15       , 18       , undefined, undefined, 27       , 32       , undefined ],
  [ 0        , 4        , 7        , 12       , 16       , 16       , 19       , 24       , 28       , 33        ],
  [ 2        , 7        , 11       , 14       , 17       , 19       , 23       , 26       , 31       , 36        ],
  [ 1        , 6        , 10       , 13       , undefined, 18       , 22       , 25       , 30       , 35        ],
  [ undefined, 5        , 9        , undefined, undefined, 17       , 21       , undefined, 29       , 34        ],
  [ undefined, undefined, 8        , undefined, undefined, undefined, 20       , undefined, undefined, undefined ],
] as const

// prettier-ignore
const interactionMatrix: InteractionMatrix = [
  //    1          2          3          4          5          6          7          8          9         10
  [ OVERBLOW1, undefined, undefined, OVERBLOW1, OVERBLOW1, undefined, undefined, OVERBLOW1, OVERBLOW1, undefined ],
  [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
  [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
  [ BEND1    , BEND1    , BEND1    , BEND1    , undefined, BEND1    , BEND1    , BEND1    , BEND1    , BEND1     ],
  [ undefined, BEND2    , BEND2    , undefined, undefined, BEND2    , BEND2    , undefined, BEND2    , BEND2     ],
  [ undefined, undefined, BEND3    , undefined, undefined, undefined, BEND3    , undefined, undefined, undefined ],
] as const

export const WILDE_TUNED_APPARATUS: Apparatus = {
  id: ApparatusIds.WildeTuned,
  halfstepIndexMatrix,
  interactionMatrix,
} as const

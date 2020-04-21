import { ApparatusIds, Apparatus, InteractionMask, HalfstepIndexMatrix } from '../types'
import {
  OVERBLOW2,
  OVERBLOW1,
  BLOW,
  DRAW,
  BEND1,
  BEND2,
  BEND3,
} from '../Interaction/constants'

const halfstepIndexMatrix: HalfstepIndexMatrix = [
  [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 34        ],
  [ 3        , undefined, undefined, 15       , 18       , 22       , undefined, 27       , 30       , 35        ],
  [ 0        , 4        , 7        , 12       , 16       , 19       , 24       , 28       , 31       , 36        ],
  [ 2        , 7        , 11       , 14       , 17       , 21       , 23       , 26       , 29       , 33        ],
  [ 1        , 6        , 10       , 13       , undefined, 20       , 25       , undefined, 32       , 37        ],
  [ undefined, 5        , 9        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  [ undefined, undefined, 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
] as const

const interactionMask: InteractionMask = [
  OVERBLOW2, OVERBLOW1, BLOW, DRAW, BEND1, BEND2, BEND3
] as const

export const MAJOR_DIATONIC_APPARATUS: Apparatus = {
  id: ApparatusIds.MajorDiatonic,
  halfstepIndexMatrix,
  interactionMask,
} as const

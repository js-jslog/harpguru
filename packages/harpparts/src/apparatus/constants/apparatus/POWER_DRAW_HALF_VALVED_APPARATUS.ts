//import { ApparatusIds } from '../../types'
//import type { Apparatus } from '../../types'
//import type { HarpFaceMatrix, HalfstepIndex } from '../../../types'
//import {
//  BLOW,
//  DRAW,
//  BEND1,
//  BEND2,
//  BEND3,
//  VALVEBEND,
//} from '../../../interaction'
//import type { Interaction } from '../../../interaction'
//
//// prettier-ignore
//const halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex> = [
//  //    1          2          3          4          5          6          7          8          9         10
//  [ -1       , 3        , 6        , 11       , 15       , 18       , 20       , 23       , 27       , 32        ],
//  [ 0        , 4        , 7        , 12       , 16       , 19       , 21       , 24       , 28       , 33        ],
//  [ 2        , 7        , 11       , 14       , 17       , 21       , 23       , 26       , 31       , 36        ],
//  [ 1        , 6        , 10       , 13       , undefined, 20       , 22       , 25       , 30       , 35        ],
//  [ undefined, 5        , 9        , undefined, undefined, undefined, undefined, undefined, 29       , 34        ],
//  [ undefined, undefined, 8        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
//] as const
//
//// prettier-ignore
//const interactionMatrix: HarpFaceMatrix<Interaction> = [
//  //    1          2          3          4          5          6          7          8          9         10
//  [ VALVEBEND, VALVEBEND, VALVEBEND, VALVEBEND, VALVEBEND, VALVEBEND, VALVEBEND, VALVEBEND, VALVEBEND, VALVEBEND ],
//  [ BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW     , BLOW      ],
//  [ DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW     , DRAW      ],
//  [ BEND1    , BEND1    , BEND1    , BEND1    , undefined, BEND1    , BEND1    , BEND1    , BEND1    , BEND1     ],
//  [ undefined, BEND2    , BEND2    , undefined, undefined, undefined, undefined, undefined, BEND2    , BEND2     ],
//  [ undefined, undefined, BEND3    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
//] as const
//
//export const POWER_DRAW_HALF_VALVED_APPARATUS: Apparatus = {
//  id: ApparatusIds.PowerDrawHalfValved,
//  halfstepIndexMatrix,
//  interactionMatrix,
//} as const

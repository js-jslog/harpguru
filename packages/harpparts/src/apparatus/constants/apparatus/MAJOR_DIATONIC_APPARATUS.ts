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
// const relativeReedTunings: HarpFaceMatrix<HalfstepIndex> = [
//   //    1          2          3          4          5          6          7          8          9         10
//   [ 0        , 4        , 7        , 12       , 16       , 19       , 24       , 28       , 31       , 36        ],
//   [ 2        , 7        , 11       , 14       , 17       , 21       , 23       , 26       , 29       , 33        ],
// ] as const
// This format is not perfect since we *know* that it will only be 2 rows and the 2 rows must be the same length, but
// there is no typing to guarantee that at the moment. This is a low priority. It's arguably more important to simply
// make the relativeReedTunings as simple to write and read as possible.

// Define a type called hole
// Everything other than the blow and draw need to be optional initially.
// It might be possible to consider a multiple types where only 1 blow type
// and 1 draw type are available, but it would have to work alongside the
// need to have valved setups working too.
// export type Hole = {
//   readonly blow: HalfstepIndex
//   readonly draw: HalfstepIndex
//   readonly overblow1?: HalfstepIndex
//   readonly overdraw1?: HalfstepIndex
//   readonly bend1?: HalfstepIndex
//   readonly bend2?: HalfstepIndex
//   readonly bend3?: HalfstepIndex
//   readonly blowBend1?: HalfstepIndex
//   readonly blowBend2?: HalfstepIndex
//   readonly blowBend3?: HalfstepIndex
// }

// Define a function which takes the halfstepIndexHome and converts it to an array of holes
// with all of the relevant properties populated, probably using a number of passes:
// 1. Create array of holes with blow and draw set
// 2. Add bends and blowbends naturally occuring to fill in the gap
// 3. Add overblow or overdraw (unless valved, in which case add valved bend)
// 4. Remove redundant notes defined as:
//   - Any overblow or overdraw halfstep index which is satisfied by a non overblow or overdraw interaction on an adjacent hole.
//   - Nothing else. Bends and valve bends have their own benefits which aren't made redundant by adjacent siblings.

// Define function which takes the array of Hole definitions and produces a halfstepIndexMatrix and an interactionMatrix
// We will acquire the matrix specs from a function which will tell us how high the matrix needs to be and which row is
// the blow row. The width is just defined by the number of holes.
// Then we can create an array where each element represents a row, initially as an empty array:
//
// eg
// [
//   [],
//   [],
//   [],
// ]
//
// Then we map this array using a function which maps the Hole[] in to a halfstepindex[] using the following rules:
// 1. Each `index` in collaboration with the MatrixSpec will reveal which of the Hole's details to include. That will mean that the MatrixSpec will need to be included in each mapping function some how.
// 2. The bend / overdraw & blowbend / overblow areas will be inspected and whichever (if either) has a value in will be naively included. This will be acceptable because there will be a validation step before we get to this step which will make sure that Holes only have either bends or overdraws and only either blowbends or overblows

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

export const MAJOR_DIATONIC_APPARATUS: Apparatus = {
  id: ApparatusIds.MajorDiatonic,
  halfstepIndexMatrix,
  interactionMatrix,
} as const

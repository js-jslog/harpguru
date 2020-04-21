import type { DegreeMatrix } from '../types'
import {
  ROOT,
  FLAT2,
  SECOND,
  FLAT3,
  THIRD,
  FOURTH,
  FLAT5,
  FIFTH,
  FLAT6,
  SIXTH,
  FLAT7,
  SEVENTH
} from '../constants'

const MAJOR_DIATONIC_FIRST_POZITION: DegreeMatrix = [
  [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, FLAT7     ],
  [ FLAT3    , undefined, undefined, FLAT3    , FLAT5    , FLAT7    , undefined, FLAT3    , FLAT5    , SEVENTH   ],
  [ ROOT     , THIRD    , FIFTH    , ROOT     , THIRD    , FIFTH    , ROOT     , THIRD    , FIFTH    , ROOT      ],
  [ SECOND   , FIFTH    , SEVENTH  , SECOND   , FOURTH   , SIXTH    , SEVENTH  , SECOND   , FOURTH   , SIXTH     ],
  [ FLAT2    , FLAT5    , FLAT7    , FLAT2    , undefined, FLAT6    , FLAT2    , undefined, FLAT6    , FLAT2     ],
  [ undefined, FOURTH   , SIXTH , undefined   , undefined, undefined, undefined, undefined, undefined, undefined ],
  [ undefined, undefined, FLAT6 , undefined   , undefined, undefined, undefined, undefined, undefined, undefined ],
] as const

const MAJOR_DIATONIC_SECOND_POZITION: DegreeMatrix = [
  [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, FLAT3     ],
  [ FLAT6    , undefined, undefined, FLAT6    , SEVENTH  , FLAT3    , undefined, FLAT6    , SEVENTH  , THIRD     ],
  [ FOURTH   , SIXTH    , ROOT     , FOURTH   , SIXTH    , ROOT     , FOURTH   , SIXTH    , ROOT     , FOURTH    ],
  [ FIFTH    , ROOT     , THIRD    , FIFTH    , FLAT7    , SECOND   , THIRD    , FIFTH    , FLAT7    , SECOND    ],
  [ FLAT5    , SEVENTH  , FLAT3    , FLAT5    , undefined, FLAT2    , FLAT5    , undefined, FLAT2    , FLAT5     ],
  [ undefined, FLAT7    , SECOND   , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  [ undefined, undefined, FLAT2    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
] as const

export const EXAMPLE_DEGREE_MATRICES = {
  MAJOR_DIATONIC_FIRST_POZITION,
  MAJOR_DIATONIC_SECOND_POZITION
} as const

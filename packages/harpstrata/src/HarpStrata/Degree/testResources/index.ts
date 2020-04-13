import { DegreeMatrix } from '../types'
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
  [ FLAT3    , undefined, undefined, FLAT3 , ],
  [ ROOT     , THIRD    , FIFTH    , ROOT  , ],
  [ SECOND   , FIFTH    , SEVENTH  , SECOND, ],
  [ FLAT2    , FLAT5    , FLAT7    , FLAT2 , ],
  [ undefined, FOURTH   , SIXTH , undefined, ],
  [ undefined, undefined, FLAT6 , undefined, ],
] as const

const MAJOR_DIATONIC_SECOND_POZITION: DegreeMatrix = [
  [ FLAT6    , undefined, undefined, FLAT6    , ],
  [ FOURTH   , SIXTH    , ROOT     , FOURTH   , ],
  [ FIFTH    , ROOT     , THIRD    , FIFTH    , ],
  [ FLAT5    , SEVENTH  , FLAT3    , FLAT5    , ],
  [ undefined, FLAT7    , SECOND   , undefined, ],
  [ undefined, undefined, FLAT2    , undefined, ],
] as const

export const EXAMPLE_DEGREE_MATRICES = {
  MAJOR_DIATONIC_FIRST_POZITION,
  MAJOR_DIATONIC_SECOND_POZITION
} as const

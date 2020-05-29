import { PitchIds } from '../types'
import type { PitchMatrix } from '../types'
import { getPitch } from '../Pitch'

const c = getPitch(PitchIds.C)
const db = getPitch(PitchIds.Db)
const d = getPitch(PitchIds.D)
const eb = getPitch(PitchIds.Eb)
const e = getPitch(PitchIds.E)
const f = getPitch(PitchIds.F)
const gb = getPitch(PitchIds.Gb)
const g = getPitch(PitchIds.G)
const ab = getPitch(PitchIds.Ab)
const a = getPitch(PitchIds.A)
const bb = getPitch(PitchIds.Bb)
const b = getPitch(PitchIds.B)

const MAJOR_DIATONIC_C_HARMONICA: PitchMatrix = [
  [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, bb        ],
  [ eb       , undefined, undefined, eb       , gb       , bb       , undefined, eb       , gb       , b         ],
  [ c        , e        , g        , c        , e        , g        , c        , e        , g        , c         ],
  [ d        , g        , b        , d        , f        , a        , b        , d        , f        , a         ],
  [ db       , gb       , bb       , db       , undefined, ab       , db       , undefined, ab       , db        ],
  [ undefined, f        , a        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  [ undefined, undefined, ab       , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
] as const

const MAJOR_DIATONIC_F_HARMONICA: PitchMatrix = [
  [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, eb        ],
  [ ab       , undefined, undefined, ab       , b        , eb       , undefined, ab       , b        , e         ],
  [ f        , a        , c        , f        , a        , c        , f        , a        , c        , f         ],
  [ g        , c        , e        , g        , bb       , d        , e        , g        , bb       , d         ],
  [ gb       , b        , eb       , gb       , undefined, db       , gb       , undefined, db       , gb        ],
  [ undefined, bb       , d        , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  [ undefined, undefined, db       , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
] as const

export const EXAMPLE_PITCH_MATRICES = {
  MAJOR_DIATONIC_C_HARMONICA,
  MAJOR_DIATONIC_F_HARMONICA,
} as const

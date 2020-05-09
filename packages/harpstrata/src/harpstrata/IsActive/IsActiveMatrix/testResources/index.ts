import type { IsActiveMatrix } from '../types'
import { IsActiveIds } from '../types'

const { Active, Inactive } = IsActiveIds

const C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC_MATRIX: IsActiveMatrix = [
  [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Inactive  ],
  [ Inactive , undefined, undefined, Inactive , Inactive , Inactive , undefined, Inactive , Inactive , Inactive  ],
  [ Active   , Active   , Active   , Active   , Active   , Active   , Active   , Active   , Active   , Active    ],
  [ Active   , Active   , Inactive , Active   , Inactive , Active   , Inactive , Active   , Inactive , Active    ],
  [ Inactive , Inactive , Inactive , Inactive , undefined, Inactive , Inactive , undefined, Inactive , Inactive  ],
  [ undefined, Inactive , Active   , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  [ undefined, undefined, Inactive , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
] as const

const C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC_MATRIX: IsActiveMatrix = [
  [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Inactive  ],
  [ Inactive , undefined, undefined, Inactive , Inactive , Inactive , undefined, Inactive , Inactive , Active    ],
  [ Inactive , Active   , Active   , Inactive , Active   , Active   , Inactive , Active   , Active   , Inactive  ],
  [ Active   , Active   , Active   , Active   , Inactive , Active   , Active   , Active   , Inactive , Active    ],
  [ Inactive , Inactive , Inactive , Inactive , undefined, Inactive , Inactive , undefined, Inactive , Inactive  ],
  [ undefined, Inactive , Active   , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  [ undefined, undefined, Inactive , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
] as const

export const EXAMPLE_IS_ACTIVE_MATRICES = {
  C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC_MATRIX,
  C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC_MATRIX,
} as const

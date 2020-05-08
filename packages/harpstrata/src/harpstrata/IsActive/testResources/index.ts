import type { IsActiveMatrix } from '../getIsActiveMatrix'
import { IsActiveIds } from '../getIsActiveMatrix'
import { PitchIds } from '../../Pitch'
import { DegreeIds } from '../../Degree'

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

const MAJOR_PENTATONIC_SCALE_DEGREE_IDS: ReadonlyArray<DegreeIds> = [ DegreeIds.Root, DegreeIds.Second, DegreeIds.Third, DegreeIds.Fifth, DegreeIds.Sixth ] as const
const C_MAJOR_PENTATONIC_PITCH_IDS: ReadonlyArray<PitchIds> = [ PitchIds.A, PitchIds.C, PitchIds.D, PitchIds.E, PitchIds.G ] as const
const G_MAJOR_PENTATONIC_PITCH_IDS: ReadonlyArray<PitchIds> = [ PitchIds.A, PitchIds.B, PitchIds.D, PitchIds.E, PitchIds.G ] as const

const C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC = {
  isActiveMatrix: C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC_MATRIX,
  activeDegreeIds: MAJOR_PENTATONIC_SCALE_DEGREE_IDS,
  activePitchIds: C_MAJOR_PENTATONIC_PITCH_IDS,
} as const

const C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC = {
  isActiveMatrix: C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC_MATRIX,
  activeDegreeIds: MAJOR_PENTATONIC_SCALE_DEGREE_IDS,
  activePitchIds: G_MAJOR_PENTATONIC_PITCH_IDS,
} as const

export const EXAMPLE_IS_ACTIVE_COMPLEXES = {
  C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC,
  C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC,
} as const

import { PozitionIds } from '../../Pozition'
import { PitchIds, EXAMPLE_PITCH_MATRICES } from '../../Pitch'
import { EXAMPLE_IS_ACTIVE_COMPLEXES } from '../../IsActive'
import type { HarpStrata } from '../../HarpStrata'
import { EXAMPLE_DEGREE_MATRICES } from '../../Degree'
import { MAJOR_DIATONIC_APPARATUS } from '../../Apparatus'

const C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: HarpStrata = {
  apparatus: MAJOR_DIATONIC_APPARATUS,
  degreeMatrix: EXAMPLE_DEGREE_MATRICES.MAJOR_DIATONIC_FIRST_POZITION,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.MAJOR_DIATONIC_C_HARMONICA,
  isActiveComplex: EXAMPLE_IS_ACTIVE_COMPLEXES.C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC,
  pozitionId: PozitionIds.First,
  rootPitchId: PitchIds.C,
  harpKeyId: PitchIds.C
} as const

const C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC: HarpStrata = {
  apparatus: MAJOR_DIATONIC_APPARATUS,
  degreeMatrix: EXAMPLE_DEGREE_MATRICES.MAJOR_DIATONIC_SECOND_POZITION,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.MAJOR_DIATONIC_C_HARMONICA,
  isActiveComplex: EXAMPLE_IS_ACTIVE_COMPLEXES.C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC,
  pozitionId: PozitionIds.Second,
  rootPitchId: PitchIds.G,
  harpKeyId: PitchIds.C
} as const

export const EXAMPLE_STRATA = {
  C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC,
  C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC,
} as const

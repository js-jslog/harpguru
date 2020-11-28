import { getApparatus, ApparatusIds, PitchIds, PozitionIds } from 'harpparts'

import type { HarpStrata } from '../../types'

import { EXAMPLE_PITCH_MATRICES } from './EXAMPLE_PITCH_MATRICES'
import { EXAMPLE_IS_ACTIVE_IDS_PAIR } from './EXAMPLE_IS_ACTIVE_IDS_PAIR'
import { EXAMPLE_DEGREE_MATRICES } from './EXAMPLE_DEGREE_MATRICES'

const C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: HarpStrata = {
  apparatus: getApparatus(ApparatusIds.MajorDiatonic),
  degreeMatrix: EXAMPLE_DEGREE_MATRICES.MAJOR_DIATONIC_FIRST_POZITION,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.MAJOR_DIATONIC_C_HARMONICA,
  activeDegreeIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR
      .C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC.activeDegreeIds,
  activePitchIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR
      .C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC.activePitchIds,
  pozitionId: PozitionIds.First,
  rootPitchId: PitchIds.C,
  harpKeyId: PitchIds.C,
} as const

const C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC: HarpStrata = {
  apparatus: getApparatus(ApparatusIds.MajorDiatonic),
  degreeMatrix: EXAMPLE_DEGREE_MATRICES.MAJOR_DIATONIC_SECOND_POZITION,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.MAJOR_DIATONIC_C_HARMONICA,
  activeDegreeIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR
      .C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC.activeDegreeIds,
  activePitchIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR
      .C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC.activePitchIds,
  pozitionId: PozitionIds.Second,
  rootPitchId: PitchIds.G,
  harpKeyId: PitchIds.C,
} as const

export const EXAMPLE_STRATA = {
  C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC,
  C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC,
} as const

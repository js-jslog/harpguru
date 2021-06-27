import {
  buildApparatus,
  TuningIds,
  PitchIds,
  PozitionIds,
  ValvingIds,
} from 'harpparts'

import type { HarpStrata } from '../../types'

import { EXAMPLE_PITCH_MATRICES } from './EXAMPLE_PITCH_MATRICES'
import { EXAMPLE_IS_ACTIVE_IDS_PAIR } from './EXAMPLE_IS_ACTIVE_IDS_PAIR'
import { EXAMPLE_DEGREE_MATRICES } from './EXAMPLE_DEGREE_MATRICES'

const C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: HarpStrata = {
  apparatus: buildApparatus(TuningIds.MajorDiatonic, ValvingIds.NotValved),
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

const C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC_HALF_VALVED: HarpStrata = {
  apparatus: buildApparatus(TuningIds.MajorDiatonic, ValvingIds.HalfValved),
  degreeMatrix:
    EXAMPLE_DEGREE_MATRICES.MAJOR_DIATONIC_FIRST_POZITION_HALF_VALVED,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.MAJOR_DIATONIC_C_HARMONICA_HALF_VALVED,
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
  apparatus: buildApparatus(TuningIds.MajorDiatonic, ValvingIds.NotValved),
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
  C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC_HALF_VALVED,
  C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC,
} as const

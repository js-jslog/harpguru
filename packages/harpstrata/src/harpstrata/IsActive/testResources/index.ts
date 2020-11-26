import { DegreeIds } from 'harpparts'

import type { ActivePitchIds, ActiveDegreeIds } from '../types'
import { PitchIds } from '../../Pitch'

const MAJOR_PENTATONIC_SCALE_DEGREE_IDS: ActiveDegreeIds = [
  DegreeIds.Root,
  DegreeIds.Second,
  DegreeIds.Third,
  DegreeIds.Fifth,
  DegreeIds.Sixth,
] as const
const C_MAJOR_PENTATONIC_PITCH_IDS: ActivePitchIds = [
  PitchIds.A,
  PitchIds.C,
  PitchIds.D,
  PitchIds.E,
  PitchIds.G,
] as const
const G_MAJOR_PENTATONIC_PITCH_IDS: ActivePitchIds = [
  PitchIds.A,
  PitchIds.B,
  PitchIds.D,
  PitchIds.E,
  PitchIds.G,
] as const

const C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC = {
  activeDegreeIds: MAJOR_PENTATONIC_SCALE_DEGREE_IDS,
  activePitchIds: C_MAJOR_PENTATONIC_PITCH_IDS,
} as const

const C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC = {
  activeDegreeIds: MAJOR_PENTATONIC_SCALE_DEGREE_IDS,
  activePitchIds: G_MAJOR_PENTATONIC_PITCH_IDS,
} as const

export const EXAMPLE_IS_ACTIVE_IDS_PAIR = {
  C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC,
  C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC,
} as const

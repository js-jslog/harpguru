import type { ActivePitchIds, ActiveDegreeIds } from '../types'
import { PitchIds } from '../../../Pitch'
import { DegreeIds } from '../../../Degree'

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

export const EXAMPLE_ACTIVE_IDS = {
  MAJOR_PENTATONIC_SCALE_DEGREE_IDS,
  C_MAJOR_PENTATONIC_PITCH_IDS,
  G_MAJOR_PENTATONIC_PITCH_IDS,
} as const

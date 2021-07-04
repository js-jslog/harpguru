import { DegreeIds, PitchIds } from 'harpparts'

import type { ActivePitchIds, ActiveDegreeIds } from '../../types'

const majorPentatonicScaleDegreeIds: ActiveDegreeIds = [
  DegreeIds.Root,
  DegreeIds.Second,
  DegreeIds.Third,
  DegreeIds.Fifth,
  DegreeIds.Sixth,
] as const
const cMajorPentatonicPitchIds: ActivePitchIds = [
  PitchIds.A,
  PitchIds.C,
  PitchIds.D,
  PitchIds.E,
  PitchIds.G,
] as const
const gMajorPentatonicPitchIds: ActivePitchIds = [
  PitchIds.A,
  PitchIds.B,
  PitchIds.D,
  PitchIds.E,
  PitchIds.G,
] as const

export const EXAMPLE_IS_ACTIVE_IDS_PAIR = {
  cHarp: {
    firstPozition: {
      cMajorPentatonic: {
        activeDegreeIds: majorPentatonicScaleDegreeIds,
        activePitchIds: cMajorPentatonicPitchIds,
      },
    },
    secondPozition: {
      gMajorPentatonic: {
        activeDegreeIds: majorPentatonicScaleDegreeIds,
        activePitchIds: gMajorPentatonicPitchIds,
      },
    },
  },
} as const

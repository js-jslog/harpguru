import { DegreeIds, PitchIds } from 'harpparts'

const majorPentatonicScaleDegreeIds: ReadonlyArray<DegreeIds> = [
  DegreeIds.Root,
  DegreeIds.Second,
  DegreeIds.Third,
  DegreeIds.Fifth,
  DegreeIds.Sixth,
] as const
const cMajorPentatonicPitchIds: ReadonlyArray<PitchIds> = [
  PitchIds.A,
  PitchIds.C,
  PitchIds.D,
  PitchIds.E,
  PitchIds.G,
] as const
const gMajorPentatonicPitchIds: ReadonlyArray<PitchIds> = [
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

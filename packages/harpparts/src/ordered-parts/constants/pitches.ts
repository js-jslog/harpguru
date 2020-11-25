import { PitchIds, generatePitch } from '../../pitch'
import type { Pitch } from '../../pitch'

export const ORDERED_PITCHES: Record<PitchIds, Pitch> = {
  [PitchIds.Ab]: generatePitch(PitchIds.Ab),
  [PitchIds.A]: generatePitch(PitchIds.A),
  [PitchIds.Bb]: generatePitch(PitchIds.Bb),
  [PitchIds.B]: generatePitch(PitchIds.B),
  [PitchIds.C]: generatePitch(PitchIds.C),
  [PitchIds.Db]: generatePitch(PitchIds.Db),
  [PitchIds.D]: generatePitch(PitchIds.D),
  [PitchIds.Eb]: generatePitch(PitchIds.Eb),
  [PitchIds.E]: generatePitch(PitchIds.E),
  [PitchIds.F]: generatePitch(PitchIds.F),
  [PitchIds.Gb]: generatePitch(PitchIds.Gb),
  [PitchIds.G]: generatePitch(PitchIds.G),
} as const

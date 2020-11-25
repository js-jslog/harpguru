import { PitchIds, getPitch } from '../../pitch'
import type { Pitch } from '../../pitch'

export const ORDERED_PITCHES: Record<PitchIds, Pitch> = {
  [PitchIds.Ab]: getPitch(PitchIds.Ab),
  [PitchIds.A]: getPitch(PitchIds.A),
  [PitchIds.Bb]: getPitch(PitchIds.Bb),
  [PitchIds.B]: getPitch(PitchIds.B),
  [PitchIds.C]: getPitch(PitchIds.C),
  [PitchIds.Db]: getPitch(PitchIds.Db),
  [PitchIds.D]: getPitch(PitchIds.D),
  [PitchIds.Eb]: getPitch(PitchIds.Eb),
  [PitchIds.E]: getPitch(PitchIds.E),
  [PitchIds.F]: getPitch(PitchIds.F),
  [PitchIds.Gb]: getPitch(PitchIds.Gb),
  [PitchIds.G]: getPitch(PitchIds.G),
} as const

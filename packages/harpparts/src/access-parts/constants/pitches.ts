import { PitchIds, generatePitch } from '../../pitch'
import type { Pitch } from '../../pitch'

export const ORDERED_PITCHES = new Map<PitchIds, Pitch>()
ORDERED_PITCHES.set(PitchIds.Ab, generatePitch(PitchIds.Ab))
ORDERED_PITCHES.set(PitchIds.A, generatePitch(PitchIds.A))
ORDERED_PITCHES.set(PitchIds.Bb, generatePitch(PitchIds.Bb))
ORDERED_PITCHES.set(PitchIds.B, generatePitch(PitchIds.B))
ORDERED_PITCHES.set(PitchIds.C, generatePitch(PitchIds.C))
ORDERED_PITCHES.set(PitchIds.Db, generatePitch(PitchIds.Db))
ORDERED_PITCHES.set(PitchIds.D, generatePitch(PitchIds.D))
ORDERED_PITCHES.set(PitchIds.Eb, generatePitch(PitchIds.Eb))
ORDERED_PITCHES.set(PitchIds.E, generatePitch(PitchIds.E))
ORDERED_PITCHES.set(PitchIds.F, generatePitch(PitchIds.F))
ORDERED_PITCHES.set(PitchIds.Gb, generatePitch(PitchIds.Gb))
ORDERED_PITCHES.set(PitchIds.G, generatePitch(PitchIds.G))

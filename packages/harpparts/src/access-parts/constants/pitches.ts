import { PitchIds, generatePitch } from '../../pitch'
import type { Pitch } from '../../pitch'

export const orderedPitches = new Map<PitchIds, Pitch>()
orderedPitches.set(PitchIds.Ab, generatePitch(PitchIds.Ab))
orderedPitches.set(PitchIds.A, generatePitch(PitchIds.A))
orderedPitches.set(PitchIds.Bb, generatePitch(PitchIds.Bb))
orderedPitches.set(PitchIds.B, generatePitch(PitchIds.B))
orderedPitches.set(PitchIds.C, generatePitch(PitchIds.C))
orderedPitches.set(PitchIds.Db, generatePitch(PitchIds.Db))
orderedPitches.set(PitchIds.D, generatePitch(PitchIds.D))
orderedPitches.set(PitchIds.Eb, generatePitch(PitchIds.Eb))
orderedPitches.set(PitchIds.E, generatePitch(PitchIds.E))
orderedPitches.set(PitchIds.F, generatePitch(PitchIds.F))
orderedPitches.set(PitchIds.Gb, generatePitch(PitchIds.Gb))
orderedPitches.set(PitchIds.G, generatePitch(PitchIds.G))

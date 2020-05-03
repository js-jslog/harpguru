import { PitchIds } from '../types'
import type { Pitch } from '../types'

export const A: Pitch = { id: PitchIds.A } as const
export const Bb: Pitch = { id: PitchIds.Bb } as const
export const B: Pitch = { id: PitchIds.B } as const
export const C: Pitch = { id: PitchIds.C } as const
export const Db: Pitch = { id: PitchIds.Db } as const
export const D: Pitch = { id: PitchIds.D } as const
export const Eb: Pitch = { id: PitchIds.Eb } as const
export const E: Pitch = { id: PitchIds.E } as const
export const F: Pitch = { id: PitchIds.F } as const
export const Gb: Pitch = { id: PitchIds.Gb } as const
export const G: Pitch = { id: PitchIds.G } as const
export const Ab: Pitch = { id: PitchIds.Ab } as const

export const ORDERED_PITCHES: readonly Pitch[] = [
  A, Bb, B, C, Db, D, Eb, E, F, Gb, G, Ab,
] as const

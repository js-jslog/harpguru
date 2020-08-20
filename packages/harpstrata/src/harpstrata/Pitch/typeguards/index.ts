import { PitchIds } from '../types'
import type { NaturalPitch, Pitch } from '../types'

export const isPitchId = (idIn: string): idIn is PitchIds => {
  return Object.values(PitchIds).includes(idIn as PitchIds)
}

export const isNaturalPitch = (pitch: Pitch): pitch is NaturalPitch => {
  const { contextualDisplayValues: { natural } } = pitch as NaturalPitch
  return natural !== undefined
}

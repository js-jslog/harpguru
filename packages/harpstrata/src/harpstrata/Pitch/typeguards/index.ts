import { PitchIds } from '../types'

export const isPitchId = (idIn: string): idIn is PitchIds => {
  return Object.values(PitchIds).includes(idIn as PitchIds)
}

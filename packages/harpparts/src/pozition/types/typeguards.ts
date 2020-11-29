import { PozitionIds } from './types'

export const isPozitionId = (idIn: string): idIn is PozitionIds => {
  return Object.values(PozitionIds).includes(idIn as PozitionIds)
}

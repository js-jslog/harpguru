import { HarpPart, HarpPartTypes } from '../../types'

import { PozitionIds } from './types'
import type { Pozition } from './types'

export const isPozitionId = (idIn: string): idIn is PozitionIds => {
  return Object.values(PozitionIds).includes(idIn as PozitionIds)
}

export const isPozition = (harppart: HarpPart): harppart is Pozition => {
  return harppart.type === HarpPartTypes.Pozition
}

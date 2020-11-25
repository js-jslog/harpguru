import { ORDERED_POZITIONS } from '../constants'
import type { PozitionIds, Pozition } from '../../pozition'

export const getPozition = (pozitionId: PozitionIds): Pozition => {
  return ORDERED_POZITIONS[pozitionId]
}

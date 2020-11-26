import { ORDERED_POZITIONS } from '../constants'
import type { PozitionIds, Pozition } from '../../pozition'

export const getPozition = (pozitionId: PozitionIds): Pozition => {
  const pozition = ORDERED_POZITIONS.get(pozitionId)
  if (pozition === undefined)
    throw 'A pozition id for an unlisted pozition was used'
  return pozition
}

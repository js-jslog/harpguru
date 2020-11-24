import { PozitionIds } from '../types'
import type { Pozition } from '../types'
import { POZITION_INSTANCES } from '../constants'

export const getPozition = (pozitionId: PozitionIds): Pozition => {
  const { [pozitionId]: pozition } = POZITION_INSTANCES

  return pozition
}

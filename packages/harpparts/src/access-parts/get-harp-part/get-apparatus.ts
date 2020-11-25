import { ORDERED_APPARATUS } from '../constants'
import type { ApparatusIds, Apparatus } from '../../apparatus'

export const getApparatus = (apparatusId: ApparatusIds): Apparatus => {
  return ORDERED_APPARATUS[apparatusId]
}

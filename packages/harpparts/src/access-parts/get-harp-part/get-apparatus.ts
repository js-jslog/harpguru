import { ORDERED_APPARATUS } from '../constants'
import type { ApparatusIds, Apparatus } from '../../apparatus'

export const getApparatus = (apparatusId: ApparatusIds): Apparatus => {
  const apparatus = ORDERED_APPARATUS.get(apparatusId)
  if (apparatus === undefined)
    throw 'An apparatus id for an unlisted apparatus was used'
  return apparatus
}

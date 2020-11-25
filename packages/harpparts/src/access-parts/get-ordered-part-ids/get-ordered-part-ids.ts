import { OrderablePartId, OrderableParts } from '../types'
import {
  ORDERED_APPARATUS,
  ORDERED_DEGREES,
  ORDERED_PITCHES,
  ORDERED_POZITIONS,
} from '../constants'

type IDdPart = {
  readonly id: OrderablePartId
}

const getRelevantPartList = (
  partType: OrderableParts
): Partial<Record<Partial<OrderablePartId>, IDdPart>> => {
  if (partType === OrderableParts.Apparatus) return ORDERED_APPARATUS
  if (partType === OrderableParts.Degrees) return ORDERED_DEGREES
  if (partType === OrderableParts.Pitches) return ORDERED_PITCHES
  if (partType === OrderableParts.Pozitions) return ORDERED_POZITIONS
  throw 'An orderable part type without an implemented ordered list has been requested'
}

export const getOrderedPartIds = (
  partType: OrderableParts
): ReadonlyArray<OrderablePartId> => {
  return Object.values(getRelevantPartList(partType)).map((part) => {
    if (part === undefined)
      throw 'An undefined object was found in the harppart list'
    return part.id
  })
}

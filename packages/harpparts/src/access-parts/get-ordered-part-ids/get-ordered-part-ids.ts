import { OrderablePartId, OrderableParts } from '../types'
import {
  ORDERED_APPARATUS,
  ORDERED_DEGREES,
  ORDERED_PITCHES,
  ORDERED_POZITIONS,
} from '../constants'

export const getOrderedPartIds = (
  partType: OrderableParts
): ReadonlyArray<OrderablePartId> => {
  if (partType === OrderableParts.Apparatus)
    return Object.values(ORDERED_APPARATUS).map((part) => part.id)
  if (partType === OrderableParts.Degrees)
    return Object.values(ORDERED_DEGREES).map((part) => part.id)
  if (partType === OrderableParts.Pitches)
    return Object.values(ORDERED_PITCHES).map((part) => part.id)
  if (partType === OrderableParts.Pozitions)
    return Object.values(ORDERED_POZITIONS).map((part) => part.id)
  throw 'this is not acceptable'
}

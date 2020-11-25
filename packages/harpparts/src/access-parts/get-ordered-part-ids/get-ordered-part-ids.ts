import { OrderablePartId, OrderableParts } from '../types'
import { ORDERED_APPARATUS } from '../constants'

export const getOrderedPartIds = (
  partType: OrderableParts
): ReadonlyArray<OrderablePartId> => {
  if (partType === OrderableParts.Apparatus)
    return Object.values(ORDERED_APPARATUS).map((part) => part.id)
  throw 'this is not acceptable'
}

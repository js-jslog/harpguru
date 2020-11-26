import { OrderablePartList, OrderablePartId } from '../types'

export const getOrderedPartIds = (
  orderedPartList: OrderablePartList
): ReadonlyArray<OrderablePartId> => {
  return [...orderedPartList.keys()]
}

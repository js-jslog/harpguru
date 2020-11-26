import { OrderablePartList, OrderablePartId } from '../types'

export const getOrderedPartIds = (
  orderedPartList: OrderablePartList,
  originId?: OrderablePartId
): ReadonlyArray<OrderablePartId> => {
  const orderedIds = [...orderedPartList.keys()]
  const originIndex = originId ? orderedIds.indexOf(originId) : 0

  const head = [...orderedIds.slice(originIndex)]
  const tail = [...orderedIds.slice(0, originIndex)]

  return [...head, ...tail]
}

import { OrderableParts } from '../types'

import { getOrderedPartIds } from './get-ordered-part-ids'

test('getOrderedPartIds can return a value', () => {
  const orderedApparatusIds = getOrderedPartIds(OrderableParts.Apparatus)
  expect(orderedApparatusIds).toBeTruthy()
})

import { OrderableParts } from '../types'
import { ApparatusIds } from '../../apparatus'

import { getOrderedPartIds } from './get-ordered-part-ids'

test('getOrderedPartIds can returns some apparatus ids', () => {
  const orderedApparatusIds = getOrderedPartIds(OrderableParts.Apparatus)
  expect(orderedApparatusIds.length).toBeTruthy()
  expect(orderedApparatusIds).toContain(ApparatusIds.MajorDiatonic)
})

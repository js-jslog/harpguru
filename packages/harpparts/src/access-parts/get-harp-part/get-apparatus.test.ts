import { ApparatusIds } from '../../apparatus'

import { getApparatus } from './get-apparatus'

test('getApparatus returns an apparatus object', () => {
  const apparatus = getApparatus(ApparatusIds.MajorDiatonic)
  expect(apparatus.id).toBe(ApparatusIds.MajorDiatonic)
})

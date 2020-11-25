import { OrderableParts } from '../types'
import { PozitionIds } from '../../pozition'
import { PitchIds } from '../../pitch'
import { DegreeIds } from '../../degree'
import { ApparatusIds } from '../../apparatus'

import { getOrderedPartIds } from './get-ordered-part-ids'

test('getOrderedPartIds can returns some ApparatusIds', () => {
  const orderedApparatusIds = getOrderedPartIds(OrderableParts.Apparatus)
  expect(orderedApparatusIds.length).toBeTruthy()
  expect(orderedApparatusIds).toContain(ApparatusIds.MajorDiatonic)
})

test('getOrderedPartIds can return some DegreeIds', () => {
  const orderedApparatusIds = getOrderedPartIds(OrderableParts.Degrees)
  expect(orderedApparatusIds.length).toBeTruthy()
  expect(orderedApparatusIds).toContain(DegreeIds.Root)
})

test('getOrderedPartIds can return some PitchIds', () => {
  const orderedApparatusIds = getOrderedPartIds(OrderableParts.Pitches)
  expect(orderedApparatusIds.length).toBeTruthy()
  expect(orderedApparatusIds).toContain(PitchIds.A)
})

test('getOrderedPartIds can return some PozitionIds', () => {
  const orderedApparatusIds = getOrderedPartIds(OrderableParts.Pozitions)
  expect(orderedApparatusIds.length).toBeTruthy()
  expect(orderedApparatusIds).toContain(PozitionIds.First)
})

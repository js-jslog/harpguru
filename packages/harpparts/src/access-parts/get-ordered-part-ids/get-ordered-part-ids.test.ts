import {
  ORDERED_APPARATUS,
  ORDERED_DEGREES,
  ORDERED_PITCHES,
  ORDERED_POZITIONS,
} from '../constants'
import { PozitionIds } from '../../pozition'
import { PitchIds } from '../../pitch'
import { DegreeIds } from '../../degree'
import { ApparatusIds } from '../../apparatus'

import { getOrderedPartIds } from './get-ordered-part-ids'

test('getOrderedPartIds can returns some ApparatusIds', () => {
  const orderedApparatusIds = getOrderedPartIds(ORDERED_APPARATUS)
  expect(orderedApparatusIds.length).toBeTruthy()
  expect(orderedApparatusIds).toContain(ApparatusIds.MajorDiatonic)
})

test('getOrderedPartIds can return some DegreeIds', () => {
  const orderedDegreeIds = getOrderedPartIds(ORDERED_DEGREES)
  expect(orderedDegreeIds.length).toBeTruthy()
  expect(orderedDegreeIds).toContain(DegreeIds.Root)
})

test('getOrderedPartIds can return some PitchIds', () => {
  const orderedPitchIds = getOrderedPartIds(ORDERED_PITCHES)
  expect(orderedPitchIds.length).toBeTruthy()
  expect(orderedPitchIds).toContain(PitchIds.A)
})

test('getOrderedPartIds can return some PozitionIds', () => {
  const orderedPozitionIds = getOrderedPartIds(ORDERED_POZITIONS)
  expect(orderedPozitionIds.length).toBeTruthy()
  expect(orderedPozitionIds).toContain(PozitionIds.First)
})

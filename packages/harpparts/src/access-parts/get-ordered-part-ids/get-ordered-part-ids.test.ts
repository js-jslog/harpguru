import {
  ORDERED_TUNINGS,
  ORDERED_DEGREES,
  ORDERED_PITCHES,
  ORDERED_POZITIONS,
} from '../constants'
import { TuningIds } from '../../tuning'
import { PozitionIds } from '../../pozition'
import { PitchIds } from '../../pitch'
import { DegreeIds } from '../../degree'

import { getOrderedPartIds } from './get-ordered-part-ids'

test('getOrderedPartIds can returns some TuningIds', () => {
  const orderedTuningIds = getOrderedPartIds(ORDERED_TUNINGS)
  expect(orderedTuningIds.length).toBeTruthy()
  expect(orderedTuningIds).toContain(TuningIds.MajorDiatonic)
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

test('getOrderedPartIds can return an ordered list by origin', () => {
  const orderedPozitionIds = getOrderedPartIds(
    ORDERED_POZITIONS,
    PozitionIds.Tenth
  )
  const expectedPozitionIds = [
    PozitionIds.Tenth,
    PozitionIds.Eleventh,
    PozitionIds.Twelfth,
    PozitionIds.First,
    PozitionIds.Second,
    PozitionIds.Third,
    PozitionIds.Fourth,
    PozitionIds.Fifth,
    PozitionIds.Sixth,
    PozitionIds.Seventh,
    PozitionIds.Eighth,
    PozitionIds.Ninth,
  ]
  expect(orderedPozitionIds).toStrictEqual(expectedPozitionIds)
})

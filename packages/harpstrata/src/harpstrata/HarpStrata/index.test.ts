import { PozitionIds, getPozitionIds } from 'harpparts'

import { PitchIds } from '../Pitch'
import { ApparatusIds } from '../Apparatus'

import { getApparatusIds, getPitchIds } from './index'

test('getApparatusIds function returns an array with a major diatonic as one of the values', () => {
  expect(getApparatusIds().includes(ApparatusIds.MajorDiatonic)).toBeTruthy()
})

test('getPozitionIds function returns an array with a first pozition as one of the values', () => {
  expect(getPozitionIds().includes(PozitionIds.First)).toBeTruthy()
})

test('getPitchIds function returns an array with a C as one of the values', () => {
  expect(getPitchIds().includes(PitchIds.C)).toBeTruthy()
})

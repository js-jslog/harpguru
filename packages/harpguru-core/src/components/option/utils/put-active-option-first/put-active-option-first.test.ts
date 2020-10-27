import { PitchIds, getPitchIds } from 'harpstrata'

import { putActiveOptionFirst } from './put-active-option-first'

test('complete list of PitchIds with the active id at the end is reordered appropriately', () => {
  const orderedOptionIds = getPitchIds(PitchIds.C)
  const { B: activeOptionId } = PitchIds
  const expectedResult = getPitchIds(PitchIds.B)
  const actualResult = putActiveOptionFirst(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('complete list of PitchIds with the active id in the middle is reordered appropriately', () => {
  const orderedOptionIds = getPitchIds(PitchIds.C)
  const { E: activeOptionId } = PitchIds
  const expectedResult = getPitchIds(PitchIds.E)
  const actualResult = putActiveOptionFirst(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a binary list is ordered with the active id left at the beginning if it started at the beginning', () => {
  const orderedOptionIds = [PitchIds.A, PitchIds.B]
  const { A: activeOptionId } = PitchIds
  const expectedResult = orderedOptionIds
  const actualResult = putActiveOptionFirst(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a binary list is ordered with the active id moved to the beginning if it started at the end', () => {
  const orderedOptionIds = [PitchIds.A, PitchIds.B]
  const { B: activeOptionId } = PitchIds
  const expectedResult = [PitchIds.B, PitchIds.A]
  const actualResult = putActiveOptionFirst(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a list of 3 is ordered with the active id left at the beginning if it started at the beginning', () => {
  const orderedOptionIds = [PitchIds.A, PitchIds.B, PitchIds.C]
  const { A: activeOptionId } = PitchIds
  const expectedResult = orderedOptionIds
  const actualResult = putActiveOptionFirst(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a list of 3 is ordered with the active id moved to the beginning if it started at the end', () => {
  const orderedOptionIds = [PitchIds.A, PitchIds.B, PitchIds.C]
  const { C: activeOptionId } = PitchIds
  const expectedResult = [PitchIds.C, PitchIds.A, PitchIds.B]
  const actualResult = putActiveOptionFirst(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a list of 3 is ordered with the active id moved to the beginning if it started in the middle', () => {
  const orderedOptionIds = [PitchIds.A, PitchIds.B, PitchIds.C]
  const { B: activeOptionId } = PitchIds
  const expectedResult = [PitchIds.B, PitchIds.C, PitchIds.A]
  const actualResult = putActiveOptionFirst(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

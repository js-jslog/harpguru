import { PitchIds } from 'harpparts'

import { setOptionsInListOfSix } from './set-options-in-list-of-six'

test('a single item list is put straight in the third *active* position', () => {
  const orderedOptionIds = [PitchIds.C]
  const { C: activeOptionId } = PitchIds
  const expectedResult = [
    undefined,
    undefined,
    PitchIds.C,
    undefined,
    undefined,
    undefined,
  ]
  const actualResult = setOptionsInListOfSix(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a binary list is put with the inactive option underneith the active one at third', () => {
  const orderedOptionIds = [PitchIds.C, PitchIds.D]
  const { C: activeOptionId } = PitchIds
  const expectedResult = [
    undefined,
    undefined,
    PitchIds.C,
    PitchIds.D,
    undefined,
    undefined,
  ]
  const actualResult = setOptionsInListOfSix(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a 3 item list is put with both the inactive options underneith the active one at third', () => {
  const orderedOptionIds = [PitchIds.C, PitchIds.D, PitchIds.E]
  const { C: activeOptionId } = PitchIds
  const expectedResult = [
    undefined,
    undefined,
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    undefined,
  ]
  const actualResult = setOptionsInListOfSix(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a 4 item list is put with all 3 of the inactive options underneith the active one at third', () => {
  const orderedOptionIds = [PitchIds.C, PitchIds.D, PitchIds.E, PitchIds.F]
  const { C: activeOptionId } = PitchIds
  const expectedResult = [
    undefined,
    undefined,
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    PitchIds.F,
  ]
  const actualResult = setOptionsInListOfSix(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a 5 item list is put with the first 3 of the inactive options underneith the active one at third and the 4th directly above', () => {
  const orderedOptionIds = [
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    PitchIds.F,
    PitchIds.G,
  ]
  const { C: activeOptionId } = PitchIds
  const expectedResult = [
    undefined,
    PitchIds.G,
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    PitchIds.F,
  ]
  const actualResult = setOptionsInListOfSix(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a 6 item list is put with the first 3 of the inactive options underneith the active one at third and the 4th and 5th directly above', () => {
  const orderedOptionIds = [
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    PitchIds.F,
    PitchIds.G,
    PitchIds.A,
  ]
  const { C: activeOptionId } = PitchIds
  const expectedResult = [
    PitchIds.G,
    PitchIds.A,
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    PitchIds.F,
  ]
  const actualResult = setOptionsInListOfSix(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a 7 item list is put with the first 3 of the inactive options underneith the active one at third and the 5th and 6th directly above with the 4th inactive option not presented', () => {
  const orderedOptionIds = [
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    PitchIds.F,
    PitchIds.G,
    PitchIds.A,
    PitchIds.B,
  ]
  const { C: activeOptionId } = PitchIds
  const expectedResult = [
    PitchIds.A,
    PitchIds.B,
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    PitchIds.F,
  ]
  const actualResult = setOptionsInListOfSix(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

test('a 7 item list is reoredered and put with the first 3 of the inactive options underneith the active one at third and the 5th and 6th directly above with the 4th inactive option not presented', () => {
  const orderedOptionIds = [
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    PitchIds.F,
    PitchIds.G,
    PitchIds.A,
    PitchIds.B,
  ]
  const { E: activeOptionId } = PitchIds
  const expectedResult = [
    PitchIds.C,
    PitchIds.D,
    PitchIds.E,
    PitchIds.F,
    PitchIds.G,
    PitchIds.A,
  ]
  const actualResult = setOptionsInListOfSix(orderedOptionIds, activeOptionId)

  expect(actualResult).toStrictEqual(expectedResult)
})

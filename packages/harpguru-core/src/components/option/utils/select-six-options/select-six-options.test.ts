import { PitchIds } from 'harpstrata'

import { selectSixOptions } from './select-six-options'

test('selecting 6 from just 2 inputs returns a 6 element array with the inputs in the middle', () => {
  const input = [PitchIds.A, PitchIds.B]
  const expectedResult = [undefined, undefined, ...input, undefined, undefined]
  const actualResult = selectSixOptions(input)
  expect(actualResult).toStrictEqual(expectedResult)
})

test('selecting 6 from just 3 inputs returns a 6 element array with the inputs in the middle', () => {
  const input = [PitchIds.A, PitchIds.B, PitchIds.C]
  const expectedResult = [undefined, undefined, ...input, undefined]
  const actualResult = selectSixOptions(input)
  expect(actualResult).toStrictEqual(expectedResult)
})

test('selecting 6 from just 4 inputs returns a 6 element array with the inputs in the middle', () => {
  const input = [PitchIds.A, PitchIds.B, PitchIds.C, PitchIds.D]
  const expectedResult = [undefined, undefined, ...input]
  const actualResult = selectSixOptions(input)
  expect(actualResult).toStrictEqual(expectedResult)
})

test('selecting 6 from just 4 inputs returns a 6 element array with the inputs in the middle', () => {
  const input = [PitchIds.A, PitchIds.B, PitchIds.C, PitchIds.D, PitchIds.E]
  const expectedResult = [
    undefined,
    PitchIds.E,
    PitchIds.A,
    PitchIds.B,
    PitchIds.C,
    PitchIds.D,
  ]
  const actualResult = selectSixOptions(input)
  expect(actualResult).toStrictEqual(expectedResult)
})

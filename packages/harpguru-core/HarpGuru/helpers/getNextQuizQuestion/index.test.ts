import { PitchIds, isPitchId } from 'harpstrata'

import { DisplayModes } from '../../types'

import { getNextQuizQuestion } from './index'

test('that a degree question is chosen even if the previous question was a pitch when the display mode is degree', () => {
  const { B: previousQuizQuestion } = PitchIds

  expect(
    isPitchId(getNextQuizQuestion(previousQuizQuestion, DisplayModes.Degree))
  ).toBeFalsy()
})

// The purpose of running the same test multiple times is to try and
// account for the randomness inherent in the function. It could avoid
// producing an output identical to the input just by chance, but doing
// so over this many tests is extremely unlikely.
test('that a different pitch question is chosen from the previous one', () => {
  const { A: previousQuizQuestion } = PitchIds

  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
})

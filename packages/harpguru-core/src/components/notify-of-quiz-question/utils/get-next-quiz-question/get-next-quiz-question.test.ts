import { DegreeIds, PitchIds, isPitchId } from 'harpparts'

import { DisplayModes } from '../../../../types'

import { getNextQuizQuestion } from './get-next-quiz-question'

const degreeIdPair = [DegreeIds.Root, DegreeIds.Fifth]

test('that a degree question is chosen even if the previous question was a pitch when the display mode is degree', () => {
  const { B: previousQuizQuestion } = PitchIds

  expect(
    isPitchId(
      getNextQuizQuestion(
        previousQuizQuestion,
        degreeIdPair,
        DisplayModes.Degree
      )
    )
  ).toBeFalsy()
})

test('that the same question will be presented if there is only a single activeQuizDegrees', () => {
  const { Root: previousQuizQuestion } = DegreeIds

  expect(
    getNextQuizQuestion(
      previousQuizQuestion,
      [previousQuizQuestion],
      DisplayModes.Degree
    )
  ).toBe(previousQuizQuestion)
})

// The purpose of running the same test multiple times is to try and
// account for the randomness inherent in the function. It could avoid
// producing an output identical to the input just by chance, but doing
// so over this many tests is extremely unlikely.
test('that a different pitch question is chosen from the previous one', () => {
  const { A: previousQuizQuestion } = PitchIds

  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Pitch)
  ).not.toBe(previousQuizQuestion)
})

test('that the counterpart is always chosen if there are only 2 activeQuizDegrees (this tests that the activeQuizDegrees is filtering the available questions)', () => {
  const { Root: previousQuizQuestion, Fifth: remainingQuizQuestion } = DegreeIds

  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Degree)
  ).toBe(remainingQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Degree)
  ).toBe(remainingQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Degree)
  ).toBe(remainingQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Degree)
  ).toBe(remainingQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, degreeIdPair, DisplayModes.Degree)
  ).toBe(remainingQuizQuestion)
})

test('that the usual rules apply with an implied complete activeQuizDegrees list if the activeQuizDegrees list is empty', () => {
  const { Root: previousQuizQuestion } = DegreeIds

  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
  expect(
    getNextQuizQuestion(previousQuizQuestion, [], DisplayModes.Degree)
  ).not.toBe(previousQuizQuestion)
})

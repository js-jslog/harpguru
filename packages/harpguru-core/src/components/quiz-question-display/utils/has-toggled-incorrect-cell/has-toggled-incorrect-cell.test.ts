import { DegreeIds, PitchIds, PozitionIds } from 'harpparts'

import { hasToggledIncorrectCell } from './has-toggled-incorrect-cell'

test('returns false when toggle buffer is empty', () => {
  const { Root: quizQuestion } = DegreeIds
  const toggleBuffer = [] as ReadonlyArray<DegreeIds>
  const { C: harpKeyId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(
    hasToggledIncorrectCell(toggleBuffer, quizQuestion, harpKeyId, pozitionId)
  ).toBeFalsy()
})
test('returns false when toggle buffer only has the quiz question in it', () => {
  const { Root: quizQuestion } = DegreeIds
  const toggleBuffer = [DegreeIds.Root]
  const { C: harpKeyId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(
    hasToggledIncorrectCell(toggleBuffer, quizQuestion, harpKeyId, pozitionId)
  ).toBeFalsy()
})
test('returns true when toggle buffer has a single incorrect value in it', () => {
  const { Root: quizQuestion } = DegreeIds
  const toggleBuffer = [DegreeIds.Second]
  const { C: harpKeyId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(
    hasToggledIncorrectCell(toggleBuffer, quizQuestion, harpKeyId, pozitionId)
  ).toBeTruthy()
})

test('returns false when the quizQuestion is the correlated Pitch value', () => {
  const { C: quizQuestion } = PitchIds
  const toggleBuffer = [DegreeIds.Root]
  const { C: harpKeyId } = PitchIds
  const { First: pozitionId } = PozitionIds

  expect(
    hasToggledIncorrectCell(toggleBuffer, quizQuestion, harpKeyId, pozitionId)
  ).toBeFalsy()
})

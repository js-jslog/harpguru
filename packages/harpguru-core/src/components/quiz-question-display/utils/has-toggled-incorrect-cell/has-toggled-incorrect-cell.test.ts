import { DegreeIds, PitchIds, PozitionIds } from 'harpparts'

import { hasToggledIncorrectCell } from './has-toggled-incorrect-cell'

test('returns false when toggle buffer is empty', () => {
  const toggleBuffer = [] as ReadonlyArray<DegreeIds>
  const { Root: quizQuestion } = DegreeIds
  const props = {
    toggleBuffer,
    quizQuestion,
  }

  expect(hasToggledIncorrectCell(props)).toBeFalsy()
})
test('returns false when toggle buffer only has the quiz question in it', () => {
  const toggleBuffer = [DegreeIds.Root]
  const { Root: quizQuestion } = DegreeIds
  const props = {
    toggleBuffer,
    quizQuestion,
  }

  expect(hasToggledIncorrectCell(props)).toBeFalsy()
})
test('returns true when toggle buffer has a single incorrect value in it', () => {
  const toggleBuffer = [DegreeIds.Second]
  const { Root: quizQuestion } = DegreeIds
  const props = {
    toggleBuffer,
    quizQuestion,
  }

  expect(hasToggledIncorrectCell(props)).toBeTruthy()
})

test('returns false when the quizQuestion is the correlated Pitch value', () => {
  const toggleBuffer = [DegreeIds.Root]
  const { C: quizQuestion } = PitchIds
  const { C: harpKeyId } = PitchIds
  const { First: pozitionId } = PozitionIds
  const props = {
    toggleBuffer,
    quizQuestion,
    harpKeyId,
    pozitionId,
  }

  expect(hasToggledIncorrectCell(props)).toBeFalsy()
})

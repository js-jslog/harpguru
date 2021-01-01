import { DegreeIds } from 'harpparts'

import { hasToggledIncorrectCell } from './has-toggled-incorrect-cell'

test('returns false when toggle buffer is empty', () => {
  const { Root: quizQuestion } = DegreeIds
  const toggleBuffer = [] as ReadonlyArray<DegreeIds>

  expect(hasToggledIncorrectCell(toggleBuffer, quizQuestion)).toBeFalsy()
})
test('returns false when toggle buffer only has the quiz question in it', () => {
  const { Root: quizQuestion } = DegreeIds
  const toggleBuffer = [DegreeIds.Root]

  expect(hasToggledIncorrectCell(toggleBuffer, quizQuestion)).toBeFalsy()
})
test('returns true when toggle buffer has a single incorrect value in it', () => {
  const { Root: quizQuestion } = DegreeIds
  const toggleBuffer = [DegreeIds.Second]

  expect(hasToggledIncorrectCell(toggleBuffer, quizQuestion)).toBeTruthy()
})

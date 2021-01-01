import { DegreeIds } from 'harpparts'

import { hasToggledIncorrectCell } from './has-toggled-incorrect-cell'

test('returns false when toggle buffer only has the quiz question in it', () => {
  const { Root: quizQuestion } = DegreeIds
  const toggleBuffer = [DegreeIds.Root]

  expect(hasToggledIncorrectCell(toggleBuffer, quizQuestion)).toBeFalsy()
})

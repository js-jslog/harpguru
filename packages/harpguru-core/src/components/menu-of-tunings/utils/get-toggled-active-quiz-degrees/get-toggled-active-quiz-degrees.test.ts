import { DegreeIds } from 'harpparts'

import type { GlobalState } from '../../../../types'

import { getToggledActiveQuizDegrees } from './get-toggled-active-quiz-degrees'

test('toggling a degree in a list containing only that degree returns an empty list', () => {
  const inputGlobal = {
    activeQuizDegrees: [DegreeIds.Root] as ReadonlyArray<DegreeIds>,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeQuizDegrees: newActiveQuizDegrees,
  } = getToggledActiveQuizDegrees(inputGlobal, unusedDispatcher, DegreeIds.Root)

  expect(newActiveQuizDegrees).toStrictEqual([])
})

test('toggling a degree in an empty list returns a list with just that degree in it', () => {
  const inputGlobal = {
    activeQuizDegrees: [] as ReadonlyArray<DegreeIds>,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeQuizDegrees: newActiveQuizDegrees,
  } = getToggledActiveQuizDegrees(inputGlobal, unusedDispatcher, DegreeIds.Root)

  expect(newActiveQuizDegrees).toStrictEqual([DegreeIds.Root])
})

import { DegreeIds } from 'harpparts'

import type { GlobalState } from '../../../../types'

import { getNewActiveQuizDegreesByToggleForDispatcher } from './get-new-active-quiz-degrees-by-toggle-for-dispatcher'

test('toggling a degree in a list containing only that degree returns an empty list', () => {
  const inputGlobal = {
    activeQuizDegrees: [DegreeIds.Root] as ReadonlyArray<DegreeIds>,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeQuizDegrees: newActiveQuizDegrees,
  } = getNewActiveQuizDegreesByToggleForDispatcher(
    inputGlobal,
    unusedDispatcher,
    DegreeIds.Root
  )

  expect(newActiveQuizDegrees).toStrictEqual([])
})

test('toggling a degree in an empty list returns a list with just that degree in it', () => {
  const inputGlobal = {
    activeQuizDegrees: [] as ReadonlyArray<DegreeIds>,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeQuizDegrees: newActiveQuizDegrees,
  } = getNewActiveQuizDegreesByToggleForDispatcher(
    inputGlobal,
    unusedDispatcher,
    DegreeIds.Root
  )

  expect(newActiveQuizDegrees).toStrictEqual([DegreeIds.Root])
})

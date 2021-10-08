import { DegreeIds } from 'harpparts'

import { reduceForNewActiveQuizDegreesByToggle } from './reduce-for-new-activequizdegrees-by-toggle'

test('toggling a degree in a list containing only that degree returns an empty list', () => {
  const activeQuizDegreesIds = [DegreeIds.Root] as ReadonlyArray<DegreeIds>
  const newActiveQuizDegrees = reduceForNewActiveQuizDegreesByToggle(
    activeQuizDegreesIds,
    DegreeIds.Root
  )

  expect(newActiveQuizDegrees).toStrictEqual([])
})

test('toggling a degree in an empty list returns a list with just that degree in it', () => {
  const activeQuizDegreesIds = [] as ReadonlyArray<DegreeIds>
  const newActiveQuizDegrees = reduceForNewActiveQuizDegreesByToggle(
    activeQuizDegreesIds,
    DegreeIds.Root
  )

  expect(newActiveQuizDegrees).toStrictEqual([DegreeIds.Root])
})

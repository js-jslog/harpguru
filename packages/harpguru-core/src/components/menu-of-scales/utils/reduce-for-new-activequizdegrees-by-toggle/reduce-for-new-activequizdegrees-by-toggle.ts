import type { DegreeIds } from 'harpparts'

import { toggleDegreeInList } from '../toggle-degree-in-list'

export const reduceForNewActiveQuizDegreesByToggle = (
  activeQuizDegreesIds: ReadonlyArray<DegreeIds>,
  degreeId: DegreeIds
): ReadonlyArray<DegreeIds> => {
  const nextActiveQuizDegrees = toggleDegreeInList(
    activeQuizDegreesIds,
    degreeId
  )
  return nextActiveQuizDegrees
}

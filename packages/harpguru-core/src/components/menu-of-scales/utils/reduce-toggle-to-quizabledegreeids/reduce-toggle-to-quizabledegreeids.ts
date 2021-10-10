import type { DegreeIds } from 'harpparts'

import { toggleDegreeInList } from '../toggle-degree-in-list'

export const reduceToggleToQuizableDegreeIds = (
  prevQuizableDegreeIds: ReadonlyArray<DegreeIds>,
  degreeId: DegreeIds
): ReadonlyArray<DegreeIds> => {
  const nextQuizableDegreeIds = toggleDegreeInList(
    prevQuizableDegreeIds,
    degreeId
  )
  return nextQuizableDegreeIds
}

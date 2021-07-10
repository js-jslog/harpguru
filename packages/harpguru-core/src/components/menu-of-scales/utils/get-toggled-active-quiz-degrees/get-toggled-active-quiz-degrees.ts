import type Dispatcher from 'reactn/types/dispatcher'
import type { DegreeIds } from 'harpparts'

import { toggleDegreeInList } from '../toggle-degree-in-list'
import type { GlobalState } from '../../../../types'

export const getToggledActiveQuizDegrees = (
  global: GlobalState,
  _dipatch: Dispatcher,
  degreeId: DegreeIds
): Pick<GlobalState, 'activeQuizDegrees'> => {
  const { activeQuizDegrees } = global

  return {
    activeQuizDegrees: toggleDegreeInList(activeQuizDegrees, degreeId),
  }
}

import { isPitchId, PitchIds } from 'harpparts'
import { DegreeIds, getPitchIds, getDegreeIds } from 'harpparts'

import { DisplayModes } from '../../../../types'

const getOrderedIds = (displayMode: DisplayModes) => {
  if (displayMode === DisplayModes.Pitch) return getPitchIds()
  return getDegreeIds()
}

export const getNextQuizQuestion = (
  previous: string,
  activeQuizDegrees: ReadonlyArray<DegreeIds>,
  displayMode: DisplayModes
): DegreeIds | PitchIds => {
  const ids = getOrderedIds(displayMode)
  const { length: max } = ids
  const random = Math.floor(Math.random() * max)
  const { [random]: next } = ids

  if (activeQuizDegrees.length === 1) return activeQuizDegrees[0]
  if (next === previous)
    return getNextQuizQuestion(previous, activeQuizDegrees, displayMode)
  if (activeQuizDegrees.length === 0) return next
  if (!isPitchId(next) && !activeQuizDegrees.includes(next))
    return getNextQuizQuestion(previous, activeQuizDegrees, displayMode)

  return next
}

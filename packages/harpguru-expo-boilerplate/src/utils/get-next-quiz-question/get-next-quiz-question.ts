import { getPitchIds, getDegreeIds } from 'harpstrata'
import type { PitchIds, DegreeIds } from 'harpstrata'

import { DisplayModes } from '../../types'

const getOrderedIds = (displayMode: DisplayModes) => {
  if (displayMode === DisplayModes.Pitch) return getPitchIds()
  return getDegreeIds()
}

export const getNextQuizQuestion = (
  previous: PitchIds | DegreeIds,
  displayMode: DisplayModes
): PitchIds | DegreeIds => {
  const ids = getOrderedIds(displayMode)
  const max = ids.length - 1
  const random = Math.floor(Math.random() * max)
  const { [random]: next } = ids

  if (next === previous) return getNextQuizQuestion(previous, displayMode)
  return next
}

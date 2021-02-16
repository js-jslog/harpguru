import type { PitchIds } from 'harpparts'
import { DegreeIds, getPitchIds, getDegreeIds } from 'harpparts'

import { DisplayModes } from '../../../../types'

const getOrderedIds = (displayMode: DisplayModes) => {
  if (displayMode === DisplayModes.Pitch) return getPitchIds()
  return getDegreeIds()
}

export const getNextQuizQuestion = (
  previous: string,
  displayMode: DisplayModes
): DegreeIds | PitchIds => {
  const ids = getOrderedIds(displayMode)
  const max = ids.length - 1
  const random = Math.floor(Math.random() * max)
  const { [random]: next } = ids

  if (next === previous) return getNextQuizQuestion(previous, displayMode)

  return next
}

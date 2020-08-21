import {
  getPitchIds,
  getPitch,
  getDegreeIds,
  isPitchId,
  isNaturalPitch,
} from 'harpstrata'
import type { PitchIds, DegreeIds } from 'harpstrata'

import { DisplayModes } from '../../types'

const getOrderedIds = (displayMode: DisplayModes) => {
  if (displayMode === DisplayModes.Pitch) return getPitchIds()
  return getDegreeIds()
}

const getDisplayValue = (next: PitchIds | DegreeIds) => {
  if (!isPitchId(next)) return next

  const pitch = getPitch(next)
  if (isNaturalPitch(pitch)) return pitch.contextualDisplayValues.natural

  const random = Math.floor(Math.random() * 2)

  if (random === 0) return `${pitch.contextualDisplayValues.sharp}#`

  return `${pitch.contextualDisplayValues.flat}b`
}

export const getNextQuizQuestion = (
  previous: string,
  displayMode: DisplayModes
): string => {
  const ids = getOrderedIds(displayMode)
  const max = ids.length - 1
  const random = Math.floor(Math.random() * max)
  const { [random]: next } = ids

  if (next === previous) return getNextQuizQuestion(previous, displayMode)

  const displayValue = getDisplayValue(next)
  return displayValue
}

import { getScaleIds, getScale } from 'harpparts'
import type { DegreeIds } from 'harpparts'

import { doScalesMatch } from '../do-scales-match'

export const getScaleLabel = (
  degreeIds: ReadonlyArray<DegreeIds>
): string | undefined => {
  const matchingScales = getScaleIds().filter((scaleId) => {
    const scale = getScale(scaleId)
    return doScalesMatch(degreeIds, scale.degrees)
  })
  if (matchingScales.length === 0) return undefined
  return getScale(matchingScales[0]).label
}

import { doScalesMatch } from '../do-scales-match'
import type { Scale, ScaleCategory } from '../../scale'
import type { DegreeIds } from '../../degree'
import { getScaleIds, getScale } from '../../access-parts'

// The first named scale or chord made of exactly these degrees. With a
// category, only that kind is looked for, so a set of degrees that is both a
// chord and something else is never named as the wrong one.
export const getScaleByDegreeIds = (
  degreeIds: ReadonlyArray<DegreeIds>,
  category?: ScaleCategory
): Scale | undefined => {
  const matchingScales = getScaleIds().filter((scaleId) => {
    const scale = getScale(scaleId)
    if (category !== undefined && scale.category !== category) return false
    return doScalesMatch(degreeIds, scale.degrees)
  })
  if (matchingScales.length === 0) return undefined
  return getScale(matchingScales[0])
}

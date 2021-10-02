import type { HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

export const reduceForNewHarpStrataByTargetScale = (
  activeHarpStrata: HarpStrata,
  targetScale: ReadonlyArray<DegreeIds>
): HarpStrata => {
  const nextHarpStrata = {
    ...activeHarpStrata,
    activeDegreeIds: targetScale,
  }
  return nextHarpStrata
}

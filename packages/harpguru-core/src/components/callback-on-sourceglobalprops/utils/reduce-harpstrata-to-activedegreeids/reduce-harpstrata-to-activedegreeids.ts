import type { HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

export const reduceHarpStrataToActiveDegreeIds = (
  harpStrata: HarpStrata
): ReadonlyArray<DegreeIds> => {
  const { activeDegreeIds } = harpStrata
  return activeDegreeIds
}

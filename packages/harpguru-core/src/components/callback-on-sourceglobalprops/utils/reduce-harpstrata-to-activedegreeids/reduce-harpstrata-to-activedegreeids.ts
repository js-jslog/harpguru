import type { ActiveDegreeIds, HarpStrata } from 'harpstrata'

export const reduceHarpStrataToActiveDegreeIds = (
  harpStrata: HarpStrata
): ActiveDegreeIds => {
  const { activeDegreeIds } = harpStrata
  return activeDegreeIds
}

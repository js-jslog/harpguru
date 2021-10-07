import type { ActiveDegreeIds, HarpStrata } from 'harpstrata'

export const reduceHarpStrataToActiveDegreeIds = (
  activeHarpStrata: HarpStrata
): ActiveDegreeIds => {
  const { activeDegreeIds: newActiveDegreeIds } = activeHarpStrata
  return newActiveDegreeIds
}

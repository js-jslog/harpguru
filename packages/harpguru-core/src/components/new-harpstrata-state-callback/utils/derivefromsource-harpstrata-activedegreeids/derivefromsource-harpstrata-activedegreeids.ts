import type { ActiveDegreeIds, HarpStrata } from 'harpstrata'

export const deriveFromSourceHarpStrataActiveDegreeIds = (
  // TODO: Should consider simplifying this so that
  // only the next degree matrix is passed in rather
  // than the entire harpstrata
  activeHarpStrata: HarpStrata
): ActiveDegreeIds => {
  const { activeDegreeIds: newActiveDegreeIds } = activeHarpStrata
  return newActiveDegreeIds
}

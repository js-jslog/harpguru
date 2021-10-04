import type { ActivePitchIds, HarpStrata } from 'harpstrata'

export const reduceHarpStrataToActivePitchIds = (
  activeHarpStrata: HarpStrata
): ActivePitchIds => {
  const { activePitchIds: newActivePitchIds } = activeHarpStrata
  return newActivePitchIds
}

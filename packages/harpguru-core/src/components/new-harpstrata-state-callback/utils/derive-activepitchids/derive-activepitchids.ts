import type { ActivePitchIds, HarpStrata } from 'harpstrata'

export const deriveActivePitchIds = (
  activeHarpStrata: HarpStrata
): ActivePitchIds => {
  const { activePitchIds: newActivePitchIds } = activeHarpStrata
  return newActivePitchIds
}

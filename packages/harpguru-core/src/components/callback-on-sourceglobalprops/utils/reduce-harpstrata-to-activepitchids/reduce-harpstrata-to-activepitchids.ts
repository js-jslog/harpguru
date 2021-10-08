import type { ActivePitchIds, HarpStrata } from 'harpstrata'

export const reduceHarpStrataToActivePitchIds = (
  nextHarpStrata: HarpStrata
): ActivePitchIds => {
  const { activePitchIds } = nextHarpStrata
  return activePitchIds
}

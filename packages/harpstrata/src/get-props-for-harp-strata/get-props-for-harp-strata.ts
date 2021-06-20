import type { HarpStrata, HarpStrataProps } from '../get-harp-strata'

export const getPropsForHarpStrata = (
  harpStrata: HarpStrata,
  mode: 'DEGREE' | 'PITCH'
): HarpStrataProps => {
  const {
    apparatus: { tuningId },
  } = harpStrata
  const { pozitionId } = harpStrata
  const { harpKeyId } = harpStrata
  const { activePitchIds, activeDegreeIds } = harpStrata

  if (mode === 'DEGREE') {
    return { tuningId, pozitionId, harpKeyId, activeIds: activeDegreeIds }
  }

  return { tuningId, pozitionId, harpKeyId, activeIds: activePitchIds }
}

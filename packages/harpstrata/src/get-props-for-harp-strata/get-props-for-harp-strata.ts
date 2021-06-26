import type { HarpStrata, HarpStrataProps } from '../get-harp-strata'

export const getPropsForHarpStrata = (
  harpStrata: HarpStrata,
  mode: 'DEGREE' | 'PITCH'
): HarpStrataProps => {
  const {
    apparatus: { tuningId, valvingId },
  } = harpStrata
  const { pozitionId } = harpStrata
  const { harpKeyId } = harpStrata
  const { activePitchIds, activeDegreeIds } = harpStrata

  if (mode === 'DEGREE') {
    return {
      tuningId,
      valvingId,
      pozitionId,
      harpKeyId,
      activeIds: activeDegreeIds,
    }
  }

  return {
    tuningId,
    valvingId,
    pozitionId,
    harpKeyId,
    activeIds: activePitchIds,
  }
}

import { getHarpStrata, getPropsForHarpStrata, HarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'

import { DisplayModes } from '../../../../types'

export const reduceCovariantsToHarpStrata = (
  prevHarpStrata: HarpStrata,
  activeDisplayMode: DisplayModes,
  covariants: Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>
): HarpStrata => {
  const nextHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      prevHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    harpKeyId: covariants.harpKeyId,
    pozitionId: covariants.pozitionId,
  }

  const nextHarpStrata = getHarpStrata(nextHarpStrataProps)

  return nextHarpStrata
}

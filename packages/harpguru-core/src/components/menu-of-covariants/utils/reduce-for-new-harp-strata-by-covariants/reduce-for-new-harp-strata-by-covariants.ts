import { getHarpStrata, getPropsForHarpStrata, HarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'

import { DisplayModes } from '../../../../types'

export const reduceForNewHarpStrataByCovariants = (
  activeHarpStrata: HarpStrata,
  activeDisplayMode: DisplayModes,
  partialHarpStrata: Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>
): HarpStrata => {
  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      activeHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    harpKeyId: partialHarpStrata.harpKeyId,
    pozitionId: partialHarpStrata.pozitionId,
  }

  const newHarpStrata = getHarpStrata(newHarpStrataProps)

  return newHarpStrata
}

import { getHarpStrata, getPropsForHarpStrata, HarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'
import type { ValvingIds } from 'harpparts'

import { DisplayModes } from '../../../../types'

export const reduceValvingIdToHarpStrata = (
  prevHarpStrata: HarpStrata,
  activeDisplayMode: DisplayModes,
  valvingId: ValvingIds
): HarpStrata => {
  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      prevHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    valvingId,
  }
  const newHarpStrata = getHarpStrata(newHarpStrataProps)

  return newHarpStrata
}

import { getHarpStrata, getPropsForHarpStrata, HarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'
import type { TuningIds } from 'harpparts'

import { DisplayModes } from '../../../../types'

export const reduceTuningIdToHarpStrata = (
  prevHarpStrata: HarpStrata,
  activeDisplayMode: DisplayModes,
  tuningId: TuningIds
): HarpStrata => {
  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      prevHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    tuningId,
  }
  const newHarpStrata = getHarpStrata(newHarpStrataProps)

  return newHarpStrata
}

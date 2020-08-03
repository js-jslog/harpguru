import { getHarpStrata, isPitchId } from 'harpstrata'
import type { HarpStrata, DegreeIds, PitchIds } from 'harpstrata'

import { getPropsForHarpStrata } from '../../../get-props-for-harp-strata'
import { DisplayModes } from '../../../../types'

export const activateHarpCell = (
  harpStrata: HarpStrata,
  cellId: DegreeIds | PitchIds
): HarpStrata => {
  if (isPitchId(cellId)) {
    const harpStrataProps = getPropsForHarpStrata(
      harpStrata,
      DisplayModes.Pitch
    )
    const { activeIds } = harpStrataProps
    const newActiveIds = [...activeIds, cellId].filter((item, index, self) => {
      return self.indexOf(item) === index
    }) as PitchIds[]
    return getHarpStrata({
      ...harpStrataProps,
      activeIds: newActiveIds,
    })
  }
  const harpStrataProps = getPropsForHarpStrata(harpStrata, DisplayModes.Degree)
  const { activeIds } = harpStrataProps
  const newActiveIds = [...activeIds, cellId].filter((item, index, self) => {
    return self.indexOf(item) === index
  }) as DegreeIds[]
  return getHarpStrata({
    ...harpStrataProps,
    activeIds: newActiveIds,
  })
}

import { getHarpStrata, isPitchId } from 'harpstrata'
import type { HarpStrata, DegreeIds, PitchIds } from 'harpstrata'

import { getPropsForHarpStrata } from '../getPropsForHarpStrata'
import { DisplayModes } from '../../types'

type Props = {
  readonly harpStrata: HarpStrata
  readonly cellId: DegreeIds | PitchIds
}
export const activateHarpCell = (props: Props): HarpStrata => {
  const { harpStrata, cellId } = props
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

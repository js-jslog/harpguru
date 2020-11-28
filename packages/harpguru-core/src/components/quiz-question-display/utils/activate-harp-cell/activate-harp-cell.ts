import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'
import { isPitchId } from 'harpparts'
import type { DegreeIds, PitchIds } from 'harpparts'

export const activateHarpCell = (
  harpStrata: HarpStrata,
  cellId: DegreeIds | PitchIds
): HarpStrata => {
  if (isPitchId(cellId)) {
    const harpStrataProps = getPropsForHarpStrata(harpStrata, 'PITCH')
    const { activeIds } = harpStrataProps
    const newActiveIds = [...activeIds, cellId].filter((item, index, self) => {
      return self.indexOf(item) === index
    }) as PitchIds[]
    return getHarpStrata({
      ...harpStrataProps,
      activeIds: newActiveIds,
    })
  }
  const harpStrataProps = getPropsForHarpStrata(harpStrata, 'DEGREE')
  const { activeIds } = harpStrataProps
  const newActiveIds = [...activeIds, cellId].filter((item, index, self) => {
    return self.indexOf(item) === index
  }) as DegreeIds[]
  return getHarpStrata({
    ...harpStrataProps,
    activeIds: newActiveIds,
  })
}

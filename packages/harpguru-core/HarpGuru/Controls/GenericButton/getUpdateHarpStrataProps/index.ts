import type { HarpStrataProps, PozitionIds, PitchIds } from 'harpstrata'

import { UpdateCategories } from '../types'
import type { GenericButtonProps } from '../types'
import { getPropsForHarpStrata } from '../../ControlHelpers'
import { DisplayModes } from '../../../HarpFace'

export const getUpdateHarpStrataProps = (
  genericUpdateProps: GenericButtonProps
): HarpStrataProps => {
  const { activeHarpStrata, updateCategory, id } = genericUpdateProps
  // TODO: The only reason it has been acceptable to define the display mode statically here is because I expect
  // these components to be removed. They must either be removed or this functionality must be updated to meet the
  // new requiremenets of the getPropsForHarpStrata function.
  const baseHarpStrataProps = getPropsForHarpStrata(
    activeHarpStrata,
    DisplayModes.Degree
  )
  if (updateCategory === UpdateCategories.HarpKey) {
    const harpKeyId = id as PitchIds
    return { ...baseHarpStrataProps, harpKeyId }
  } else {
    const pozitionId = id as PozitionIds
    return { ...baseHarpStrataProps, pozitionId }
  }
}

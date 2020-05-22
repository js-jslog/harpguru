import { PitchIds, PozitionIds } from 'harpstrata'

import { UpdateCategories } from '../types'
import type { GenericButtonProps } from '../types'

export const getActiveIdForUpdateCategory = (props: GenericButtonProps): PitchIds | PozitionIds => {
  const { activeHarpStrata, updateCategory } = props
  const { pozitionId, harpKeyId } = activeHarpStrata

  if (updateCategory === UpdateCategories.HarpKey) {
    return harpKeyId
  } else {
    return pozitionId
  }
}
